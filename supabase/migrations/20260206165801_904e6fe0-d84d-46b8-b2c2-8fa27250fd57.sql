-- Create table for generated documentation projects
CREATE TABLE public.generated_docs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for documentation sections (multi-page support)
CREATE TABLE public.doc_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  doc_id UUID NOT NULL REFERENCES public.generated_docs(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  icon TEXT DEFAULT 'FileText',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_doc_sections_doc_id ON public.doc_sections(doc_id);
CREATE INDEX idx_doc_sections_order ON public.doc_sections(doc_id, order_index);

-- Enable RLS
ALTER TABLE public.generated_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doc_sections ENABLE ROW LEVEL SECURITY;

-- Allow public read/write access (no auth required for this demo)
CREATE POLICY "Allow public read access to generated_docs" 
ON public.generated_docs 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access to generated_docs" 
ON public.generated_docs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public delete access to generated_docs" 
ON public.generated_docs 
FOR DELETE 
USING (true);

CREATE POLICY "Allow public read access to doc_sections" 
ON public.doc_sections 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access to doc_sections" 
ON public.doc_sections 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public delete access to doc_sections" 
ON public.doc_sections 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_generated_docs_updated_at
BEFORE UPDATE ON public.generated_docs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();