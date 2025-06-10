
-- Primeiro, vamos garantir que o enum user_type existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type') THEN
        CREATE TYPE user_type AS ENUM ('client', 'barbershop', 'barber');
    END IF;
END $$;

-- Recriar a função handle_new_user com melhor tratamento de erros
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Inserir perfil do usuário
  INSERT INTO public.profiles (id, user_type, name, email, phone)
  VALUES (
    new.id,
    COALESCE((new.raw_user_meta_data ->> 'user_type')::user_type, 'client'::user_type),
    COALESCE(new.raw_user_meta_data ->> 'name', ''),
    COALESCE(new.email, ''),
    new.raw_user_meta_data ->> 'phone'
  );
  
  -- Se for barbearia, criar registro na tabela barbershops
  IF COALESCE(new.raw_user_meta_data ->> 'user_type', 'client') = 'barbershop' THEN
    INSERT INTO public.barbershops (user_id, name, address)
    VALUES (
      new.id,
      COALESCE(new.raw_user_meta_data ->> 'name', ''),
      COALESCE(new.raw_user_meta_data ->> 'address', '')
    );
  END IF;
  
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Log do erro mas não interrompe o processo de cadastro
  RAISE WARNING 'Erro ao criar perfil do usuário: %', SQLERRM;
  RETURN new;
END;
$$;

-- Recriar o trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
