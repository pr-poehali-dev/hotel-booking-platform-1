import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await api.getRooms(selectedCategory);
        setRooms(data.rooms.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [selectedCategory]);

  const filteredRooms = rooms;

  return (
    <Layout>
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/d2f6f135-90cd-42bf-b8b1-bc18f54e0adc.jpg" 
            alt="Hotel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Добро пожаловать в LuxStay
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Премиальный отдых в сердце города с безупречным сервисом
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/booking">
              <Button size="lg" className="text-lg px-8">
                Забронировать номер
              </Button>
            </Link>
            <Link to="/rooms">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                Смотреть номера
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши преимущества</h2>
            <p className="text-muted-foreground text-lg">Почему гости выбирают LuxStay</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: 'MapPin', title: 'Отличное расположение', desc: 'В центре города рядом с достопримечательностями' },
              { icon: 'Wifi', title: 'Бесплатный Wi-Fi', desc: 'Высокоскоростной интернет во всех номерах' },
              { icon: 'UtensilsCrossed', title: 'Ресторан', desc: 'Изысканная кухня от шеф-повара' },
              { icon: 'Sparkles', title: 'Спа-центр', desc: 'Полный комплекс wellness-услуг' },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={feature.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши номера</h2>
            <p className="text-muted-foreground text-lg mb-8">Выберите идеальный номер для вашего отдыха</p>
            
            <div className="flex gap-2 justify-center flex-wrap">
              <Button 
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                Все номера
              </Button>
              <Button 
                variant={selectedCategory === 'standard' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('standard')}
              >
                Стандартные
              </Button>
              <Button 
                variant={selectedCategory === 'lux' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('lux')}
              >
                Люкс
              </Button>
              <Button 
                variant={selectedCategory === 'premium' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('premium')}
              >
                Премиум
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center py-12">
                <Icon name="Loader2" size={48} className="mx-auto animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Загрузка номеров...</p>
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <Icon name="BedDouble" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Номера не найдены</p>
              </div>
            ) : (
              filteredRooms.map((room, index) => (
                <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                    <Badge className="absolute top-4 right-4">
                      {room.category === 'standard' ? 'Стандарт' : room.category === 'lux' ? 'Люкс' : 'Премиум'}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{room.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      {room.features.slice(0, 3).map((feature: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-primary">{room.price}₽</span>
                        <span className="text-muted-foreground text-sm ml-1">/ночь</span>
                      </div>
                      <Link to="/booking">
                        <Button>
                          Забронировать
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img 
                src="https://cdn.poehali.dev/projects/6e378c01-4a59-4b8f-b497-69d8bbb08df0/files/cf898887-1e66-4600-a07d-d4a16efc2357.jpg" 
                alt="Spa" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-4xl font-bold mb-6">Спа и wellness</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Погрузитесь в атмосферу релакса и заботы о себе. Наш спа-центр предлагает 
                широкий выбор процедур для восстановления сил и красоты.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Массаж всех видов',
                  'Косметические процедуры',
                  'Сауна и хамам',
                  'Бассейн с подогревом',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={16} className="text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/services">
                <Button size="lg">
                  Узнать больше
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;