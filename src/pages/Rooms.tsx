import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Rooms = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const rooms = [
    {
      id: 1,
      name: 'Стандартный номер',
      category: 'standard',
      price: 8500,
      image: 'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg',
      area: 25,
      guests: 2,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак'],
      description: 'Уютный номер с современным дизайном и всеми необходимыми удобствами для комфортного проживания.',
    },
    {
      id: 2,
      name: 'Улучшенный стандарт',
      category: 'standard',
      price: 11000,
      image: 'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg',
      area: 30,
      guests: 2,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак', 'Вид на город'],
      description: 'Просторный номер с прекрасным видом на город и дополнительными удобствами.',
    },
    {
      id: 3,
      name: 'Делюкс',
      category: 'lux',
      price: 15000,
      image: 'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg',
      area: 40,
      guests: 3,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак', 'Джакузи', 'Халаты'],
      description: 'Элегантный номер с джакузи и панорамными окнами для особого отдыха.',
    },
    {
      id: 4,
      name: 'Семейный люкс',
      category: 'lux',
      price: 18000,
      image: 'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg',
      area: 50,
      guests: 4,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак', 'Джакузи', 'Кухня', 'Гостиная'],
      description: 'Идеальный номер для семейного отдыха с отдельной гостиной и кухней.',
    },
    {
      id: 5,
      name: 'Президентский люкс',
      category: 'premium',
      price: 35000,
      image: 'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg',
      area: 80,
      guests: 6,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак', 'Джакузи', 'Терраса', 'Сауна', 'Кухня', 'Гостиная', 'Рабочий кабинет'],
      description: 'Роскошный номер с террасой, сауной и эксклюзивными услугами для VIP-гостей.',
    },
    {
      id: 6,
      name: 'Пентхаус',
      category: 'premium',
      price: 50000,
      image: 'https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/98c79f78-ce18-4cf5-98f4-1e859ef3799c.jpg',
      area: 120,
      guests: 8,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Минибар', 'Завтрак', 'Джакузи', 'Терраса', 'Сауна', 'Кухня', 'Гостиная', 'Рабочий кабинет', 'Камин', 'Бар'],
      description: 'Эксклюзивный пентхаус на последнем этаже с панорамным видом и премиальным сервисом.',
    },
  ];

  const filteredRooms = selectedCategory === 'all' 
    ? rooms 
    : rooms.filter(room => room.category === selectedCategory);

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Наши номера</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Выберите идеальный номер для вашего отдыха из широкого ассортимента категорий
            </p>
          </div>

          <div className="flex gap-2 justify-center flex-wrap mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <Button 
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="lg"
            >
              <Icon name="Hotel" size={20} className="mr-2" />
              Все номера
            </Button>
            <Button 
              variant={selectedCategory === 'standard' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('standard')}
              size="lg"
            >
              Стандартные
            </Button>
            <Button 
              variant={selectedCategory === 'lux' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('lux')}
              size="lg"
            >
              Люкс
            </Button>
            <Button 
              variant={selectedCategory === 'premium' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('premium')}
              size="lg"
            >
              Премиум
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredRooms.map((room, index) => (
              <Card 
                key={room.id} 
                className="overflow-hidden hover:shadow-2xl transition-all animate-fade-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                    <Badge className="absolute top-4 left-4">
                      {room.category === 'standard' ? 'Стандарт' : room.category === 'lux' ? 'Люкс' : 'Премиум'}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{room.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{room.description}</p>
                      
                      <div className="flex gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Icon name="Maximize2" size={16} className="text-primary" />
                          <span>{room.area} м²</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Users" size={16} className="text-primary" />
                          <span>до {room.guests} гостей</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.features.slice(0, 5).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {room.features.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{room.features.length - 5}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-3xl font-bold text-primary">{room.price}₽</span>
                        <span className="text-muted-foreground text-sm ml-1">/ночь</span>
                      </div>
                      <Link to="/booking">
                        <Button size="lg">
                          Забронировать
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Rooms;
