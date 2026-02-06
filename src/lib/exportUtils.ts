interface DocSection {
  slug: string;
  title: string;
  content: string;
  icon: string;
  order_index: number;
}

export function exportToMarkdown(
  topic: string,
  description: string,
  sections: DocSection[]
): void {
  let markdown = `# ${topic}\n\n`;
  markdown += `> ${description}\n\n`;
  markdown += `---\n\n`;
  markdown += `## Table of Contents\n\n`;

  // Add TOC
  sections.forEach((section, index) => {
    markdown += `${index + 1}. [${section.title}](#${section.slug})\n`;
  });

  markdown += `\n---\n\n`;

  // Add sections
  sections.forEach((section) => {
    markdown += `<a name="${section.slug}"></a>\n\n`;
    markdown += section.content;
    markdown += `\n\n---\n\n`;
  });

  // Create and download file
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${topic.toLowerCase().replace(/\s+/g, "-")}-documentation.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportToPDF(
  topic: string,
  description: string,
  sections: DocSection[]
): Promise<void> {
  // Create a printable HTML document
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to export PDF");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${topic} Documentation</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: #111;
        }
        .description {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #eee;
        }
        h2 {
          font-size: 1.75rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #222;
          page-break-after: avoid;
        }
        h3 {
          font-size: 1.25rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #333;
        }
        p {
          margin-bottom: 1rem;
        }
        code {
          background: #f4f4f4;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Fira Code', 'Monaco', monospace;
          font-size: 0.9em;
        }
        pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
          page-break-inside: avoid;
        }
        pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        ul, ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        li {
          margin-bottom: 0.5rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 0.75rem;
          text-align: left;
        }
        th {
          background: #f8f8f8;
          font-weight: 600;
        }
        blockquote {
          border-left: 4px solid #6366f1;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #666;
          font-style: italic;
        }
        .section {
          page-break-inside: avoid;
          margin-bottom: 2rem;
        }
        .toc {
          background: #f8f8f8;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }
        .toc h2 {
          margin-top: 0;
        }
        .toc ol {
          margin-bottom: 0;
        }
        @media print {
          body {
            padding: 20px;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        }
      </style>
    </head>
    <body>
      <h1>${topic}</h1>
      <p class="description">${description}</p>
      
      <div class="toc">
        <h2>Table of Contents</h2>
        <ol>
          ${sections.map((s) => `<li>${s.title}</li>`).join("")}
        </ol>
      </div>

      ${sections
        .map(
          (section) => `
        <div class="section">
          ${convertMarkdownToHTML(section.content)}
        </div>
      `
        )
        .join("")}
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Wait for content to load then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };
}

function convertMarkdownToHTML(markdown: string): string {
  return markdown
    // Code blocks (must be first)
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang || "text"}">${escapeHtml(code.trim())}</code></pre>`;
    })
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Wrap consecutive li elements in ul
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Paragraphs (simple approach)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(.+)$/gm, (match) => {
      if (
        match.startsWith("<") ||
        match.trim() === ""
      ) {
        return match;
      }
      return `<p>${match}</p>`;
    })
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, "")
    .replace(/<p>(<h[123]>)/g, "$1")
    .replace(/(<\/h[123]>)<\/p>/g, "$1");
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
