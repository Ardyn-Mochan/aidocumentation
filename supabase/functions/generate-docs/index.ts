import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert technical documentation writer. Your task is to generate comprehensive, well-structured documentation for any topic the user provides.

You MUST respond with a valid JSON object containing an array of documentation sections. Each section should be a complete, standalone page of documentation.

Generate 6-8 sections covering:
1. Introduction/Overview - What is this topic, why it matters
2. Getting Started - Quick start guide with prerequisites
3. Core Concepts - Key terminology and fundamental concepts
4. Installation/Setup - Step-by-step setup instructions
5. Basic Usage - Common use cases with code examples
6. Advanced Topics - Advanced features and patterns
7. API Reference - Detailed API documentation (if applicable)
8. Troubleshooting - Common issues and solutions

For each section, provide:
- slug: URL-friendly identifier (e.g., "getting-started")
- title: Human-readable title
- icon: One of: BookOpen, Rocket, Code, Settings, Database, Shield, Zap, Terminal, FileText, HelpCircle, Layers, Box
- content: Rich markdown content with:
  - Clear headings (## and ###)
  - Code blocks with language specification
  - Bullet points and numbered lists
  - Tables where appropriate
  - Practical examples
  - Best practices and tips

IMPORTANT: Your response MUST be valid JSON in exactly this format:
{
  "description": "A brief 1-2 sentence description of the documentation",
  "sections": [
    {
      "slug": "introduction",
      "title": "Introduction",
      "icon": "BookOpen",
      "content": "## Introduction\\n\\nYour markdown content here..."
    }
  ]
}

Make the content practical, accurate, and comprehensive. Include real code examples that would actually work.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, save } = await req.json();
    
    if (!topic || typeof topic !== "string") {
      return new Response(
        JSON.stringify({ error: "Topic is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating documentation for topic: ${topic}`);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Generate comprehensive documentation for: ${topic}` },
        ],
        temperature: 0.7,
        max_tokens: 16000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from AI");
    }

    console.log("Raw AI response:", content.substring(0, 500));

    // Parse the JSON response - handle potential markdown code blocks
    let parsedContent;
    try {
      // Remove markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith("```")) {
        cleanContent = cleanContent.slice(0, -3);
      }
      parsedContent = JSON.parse(cleanContent.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Content was:", content);
      throw new Error("Failed to parse generated documentation");
    }

    if (!parsedContent.sections || !Array.isArray(parsedContent.sections)) {
      throw new Error("Invalid documentation structure");
    }

    // If save is requested, store in database
    let docId = null;
    if (save) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Insert the main doc
      const { data: docData, error: docError } = await supabase
        .from("generated_docs")
        .insert({
          topic: topic,
          description: parsedContent.description || `Documentation for ${topic}`,
        })
        .select()
        .single();

      if (docError) {
        console.error("Error saving doc:", docError);
        throw new Error("Failed to save documentation");
      }

      docId = docData.id;

      // Insert all sections
      const sectionsToInsert = parsedContent.sections.map((section: any, index: number) => ({
        doc_id: docId,
        slug: section.slug,
        title: section.title,
        content: section.content,
        icon: section.icon || "FileText",
        order_index: index,
      }));

      const { error: sectionsError } = await supabase
        .from("doc_sections")
        .insert(sectionsToInsert);

      if (sectionsError) {
        console.error("Error saving sections:", sectionsError);
        throw new Error("Failed to save documentation sections");
      }

      console.log(`Documentation saved with ID: ${docId}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        docId,
        topic,
        description: parsedContent.description,
        sections: parsedContent.sections,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Generate docs error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
