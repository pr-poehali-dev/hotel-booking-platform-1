-- Таблица категорий номеров
CREATE TABLE IF NOT EXISTS room_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица номеров
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category_id INTEGER REFERENCES room_categories(id),
    price_per_night INTEGER NOT NULL,
    area INTEGER,
    max_guests INTEGER NOT NULL,
    description TEXT,
    features TEXT[],
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    phone VARCHAR(50),
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица бронирований
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    room_id INTEGER REFERENCES rooms(id),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests_count INTEGER NOT NULL,
    total_price INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    guest_name VARCHAR(200) NOT NULL,
    guest_email VARCHAR(200) NOT NULL,
    guest_phone VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_rooms_category ON rooms(category_id);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);

-- Вставка начальных категорий
INSERT INTO room_categories (name, code) VALUES 
    ('Стандарт', 'standard'),
    ('Люкс', 'lux'),
    ('Премиум', 'premium')
ON CONFLICT (code) DO NOTHING;

-- Вставка тестовых номеров
INSERT INTO rooms (name, category_id, price_per_night, area, max_guests, description, features, image_url, status) VALUES 
    ('Стандартный номер', 1, 8500, 25, 2, 'Уютный номер с современным дизайном и всеми необходимыми удобствами для комфортного проживания.', 
     ARRAY['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак'], 
     'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg', 
     'available'),
    ('Улучшенный стандарт', 1, 11000, 30, 2, 'Просторный номер с прекрасным видом на город и дополнительными удобствами.', 
     ARRAY['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак', 'Вид на город'], 
     'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg', 
     'available'),
    ('Делюкс', 2, 15000, 40, 3, 'Элегантный номер с джакузи и панорамными окнами для особого отдыха.', 
     ARRAY['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак', 'Джакузи', 'Халаты'], 
     'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg', 
     'available'),
    ('Семейный люкс', 2, 18000, 50, 4, 'Идеальный номер для семейного отдыха с отдельной гостиной и кухней.', 
     ARRAY['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак', 'Джакузи', 'Кухня', 'Гостиная'], 
     'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg', 
     'available'),
    ('Президентский люкс', 3, 35000, 80, 6, 'Роскошный номер с террасой, сауной и эксклюзивными услугами для VIP-гостей.', 
     ARRAY['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак', 'Джакузи', 'Терраса', 'Сауна', 'Кухня', 'Гостиная', 'Рабочий кабинет'], 
     'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg', 
     'available'),
    ('Пентхаус', 3, 50000, 120, 8, 'Эксклюзивный пентхаус на последнем этаже с панорамным видом и премиальным сервисом.', 
     ARRAY['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак', 'Джакузи', 'Терраса', 'Сауна', 'Кухня', 'Гостиная', 'Рабочий кабинет', 'Камин', 'Бар'], 
     'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg', 
     'available')
ON CONFLICT DO NOTHING;
