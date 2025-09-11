-- Создание основных таблиц для MobFrame

-- Профили пользователей
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  city TEXT,
  phone TEXT,
  rating DECIMAL DEFAULT 0,
  balance DECIMAL DEFAULT 0,
  user_type TEXT DEFAULT 'client' CHECK (user_type IN ('client', 'mobilographer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Категории контента
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_kz TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Вставляем базовые категории
INSERT INTO categories (name, name_kz, icon, color) VALUES
('Music', 'Музыка', 'music', 'bg-purple-600'),
('Sound Effects', 'Дыбыс эффектілері', 'volume-2', 'bg-blue-600'),
('LUT Presets', 'LUT пресеттері', 'palette', 'bg-green-600'),
('Camera Angles', 'Камера бұрыштары', 'camera', 'bg-red-600'),
('Plans', 'Жоспарлар', 'eye', 'bg-yellow-600'),
('Compositions', 'Композициялар', 'layers', 'bg-pink-600');

-- Медиа контент
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  thumbnail_url TEXT,
  file_type TEXT,
  file_size BIGINT,
  category_id UUID REFERENCES categories(id),
  price DECIMAL DEFAULT 0,
  is_free BOOLEAN DEFAULT true,
  author_id UUID REFERENCES profiles(id),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Лайки
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  media_id UUID REFERENCES media(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, media_id)
);

-- Комментарии
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  media_id UUID REFERENCES media(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Заказы/Работы
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  budget DECIMAL,
  deadline DATE,
  job_type TEXT,
  client_id UUID REFERENCES profiles(id),
  assigned_to UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'in_progress', 'completed', 'cancelled')),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Отклики на работы
CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id),
  applicant_id UUID REFERENCES profiles(id),
  message TEXT,
  proposed_price DECIMAL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Транзакции/Платежи
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'KZT',
  transaction_type TEXT CHECK (transaction_type IN ('payment', 'withdrawal', 'refund')),
  payment_method TEXT,
  payment_id TEXT, -- ID от PayBox
  order_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Сообщения
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id),
  recipient_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для производительности
CREATE INDEX idx_media_author ON media(author_id);
CREATE INDEX idx_media_category ON media(category_id);
CREATE INDEX idx_media_created ON media(created_at DESC);
CREATE INDEX idx_jobs_client ON jobs(client_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);

-- RLS (Row Level Security) политики
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Политики для profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Политики для media
CREATE POLICY "Anyone can view media" ON media FOR SELECT USING (true);
CREATE POLICY "Users can insert own media" ON media FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own media" ON media FOR UPDATE USING (auth.uid() = author_id);

-- Политики для jobs
CREATE POLICY "Anyone can view active jobs" ON jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Clients can insert jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Clients can update own jobs" ON jobs FOR UPDATE USING (auth.uid() = client_id);

-- Функции для обновления счетчиков
CREATE OR REPLACE FUNCTION update_media_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE media SET likes_count = likes_count + 1 WHERE id = NEW.media_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE media SET likes_count = likes_count - 1 WHERE id = OLD.media_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_likes_count
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW EXECUTE FUNCTION update_media_likes_count();
