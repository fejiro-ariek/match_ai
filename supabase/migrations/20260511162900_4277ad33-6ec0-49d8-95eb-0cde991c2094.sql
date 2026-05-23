CREATE TABLE public.brand_logos (
  brand_key TEXT NOT NULL PRIMARY KEY,
  brand_name TEXT NOT NULL,
  logo_url TEXT,
  domain TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.brand_logos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand logos are readable by authenticated users"
ON public.brand_logos
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert brand logos"
ON public.brand_logos
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update brand logos"
ON public.brand_logos
FOR UPDATE
TO authenticated
USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_brand_logos_updated_at
BEFORE UPDATE ON public.brand_logos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();