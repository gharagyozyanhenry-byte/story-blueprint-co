CREATE TABLE public.daily_concepts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  concept_date DATE NOT NULL UNIQUE,
  formula TEXT NOT NULL,
  title TEXT NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.daily_concepts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Daily concepts are publicly readable"
ON public.daily_concepts
FOR SELECT
USING (true);

CREATE INDEX idx_daily_concepts_date ON public.daily_concepts(concept_date DESC);