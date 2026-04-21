-- 1. Create a fixed UUID for our test user
-- You can change this UUID if you want, but keep it consistent
DO $$ 
DECLARE
  test_user_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN
  -- Insert into auth.users 
  -- We set a dummy password and confirmed_at to ensure they are 'active'
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role
  ) VALUES (
    test_user_id,
    '00000000-0000-0000-0000-000000000000',
    'andrew@example.com',
    crypt('password123', gen_salt('bf')), -- This encrypts the password
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    'authenticated'
  )
  ON CONFLICT (id) DO NOTHING;

  -- 2. Insert into public.profiles
  INSERT INTO public.profiles (
    id,
    name,
    email,
    age,
    gender,
    city,
    bio
  ) VALUES (
    test_user_id,
    'Andrew Developer',
    'andrew@example.com',
    25,
    'male',
    'Nairobi',
    'Founder of Chat254 and lead dev.'
  )
  ON CONFLICT (id) DO NOTHING;
END $$;