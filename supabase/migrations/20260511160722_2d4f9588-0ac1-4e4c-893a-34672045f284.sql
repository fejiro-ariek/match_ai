ALTER TABLE public.match_runs
ADD COLUMN IF NOT EXISTS brand_data jsonb,
ADD COLUMN IF NOT EXISTS creator_profile jsonb;