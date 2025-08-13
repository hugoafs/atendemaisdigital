-- Criar tabela professionals
CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  professional_type TEXT NOT NULL,
  specialty TEXT,
  clinic_name TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'basic',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para professionals
CREATE POLICY "Users can view their own professional profile" 
  ON public.professionals 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own professional profile" 
  ON public.professionals 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own professional profile" 
  ON public.professionals 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_professionals_updated_at BEFORE UPDATE ON public.professionals 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_professionals_user_id ON public.professionals(user_id);
CREATE INDEX IF NOT EXISTS idx_professionals_email ON public.professionals(email);
CREATE INDEX IF NOT EXISTS idx_professionals_city ON public.professionals(city);
CREATE INDEX IF NOT EXISTS idx_professionals_state ON public.professionals(state);
CREATE INDEX IF NOT EXISTS idx_professionals_professional_type ON public.professionals(professional_type);
