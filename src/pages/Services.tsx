import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Services = () => {
  const services = [
    {
      category: 'Спа и wellness',
      icon: 'Sparkles',
      items: [
        { name: 'Массаж всех видов', price: 'от 3500₽', duration: '60 мин' },
        { name: 'Косметические процедуры', price: 'от 2500₽', duration: '45 мин' },
        { name: 'Сауна', price: '1500₽', duration: '1 час' },
        { name: 'Хамам', price: '2000₽', duration: '1 час' },
        { name: 'Бассейн', price: 'Бесплатно', duration: 'Для гостей' },
      ],
    },
    {
      category: 'Ресторан и бар',
      icon: 'UtensilsCrossed',
      items: [
        { name: 'Завтрак "Шведский стол"', price: 'Включено', duration: '07:00-11:00' },
        { name: 'Обед à la carte', price: 'от 1500₽', duration: '12:00-16:00' },
        { name: 'Ужин в ресторане', price: 'от 2500₽', duration: '18:00-23:00' },
        { name: 'Room service 24/7', price: 'от 800₽', duration: 'Круглосуточно' },
        { name: 'Лобби-бар', price: 'от 500₽', duration: '10:00-02:00' },
      ],
    },
    {
      category: 'Бизнес-услуги',
      icon: 'Briefcase',
      items: [
        { name: 'Конференц-зал', price: 'от 5000₽', duration: '1 час' },
        { name: 'Переговорная комната', price: 'от 2000₽', duration: '1 час' },
        { name: 'Услуги секретаря', price: 'по запросу', duration: '-' },
        { name: 'Печать и копирование', price: 'от 50₽', duration: 'За страницу' },
        { name: 'Высокоскоростной Wi-Fi', price: 'Бесплатно', duration: 'Для гостей' },
      ],
    },
    {
      category: 'Дополнительные услуги',
      icon: 'Settings',
      items: [
        { name: 'Трансфер от/до аэропорта', price: 'от 2500₽', duration: '-' },
        { name: 'Прокат автомобилей', price: 'от 3000₽', duration: 'В сутки' },
        { name: 'Экскурсионное бюро', price: 'от 1500₽', duration: '-' },
        { name: 'Услуги консьержа', price: 'Бесплатно', duration: '24/7' },
        { name: 'Прачечная и химчистка', price: 'от 500₽', duration: '24 часа' },
      ],
    },
    {
      category: 'Развлечения',
      icon: 'Gamepad2',
      items: [
        { name: 'Фитнес-центр', price: 'Бесплатно', duration: '06:00-23:00' },
        { name: 'Кинозал', price: '1000₽', duration: 'Сеанс' },
        { name: 'Настольные игры', price: 'Бесплатно', duration: 'Для гостей' },
        { name: 'Детская комната', price: 'Бесплатно', duration: '10:00-20:00' },
        { name: 'Библиотека', price: 'Бесплатно', duration: 'Круглосуточно' },
      ],
    },
  ];

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Наши услуги</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Мы предлагаем широкий спектр услуг для комфортного и незабываемого отдыха
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-xl transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name={service.icon as any} size={32} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">{service.category}</h2>
                  </div>

                  <div className="space-y-4">
                    {service.items.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.duration}</p>
                        </div>
                        <Badge variant={item.price === 'Бесплатно' || item.price === 'Включено' ? 'default' : 'secondary'} className="whitespace-nowrap">
                          {item.price}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-primary text-primary-foreground animate-fade-in" style={{ animationDelay: '600ms' }}>
            <CardContent className="p-8 text-center">
              <Icon name="Phone" size={48} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Нужна консультация?</h2>
              <p className="text-lg mb-6 opacity-90">
                Свяжитесь с нашей службой поддержки для получения дополнительной информации
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+74951234567" className="text-2xl font-bold hover:opacity-80 transition">
                  +7 (495) 123-45-67
                </a>
                <span className="hidden sm:block opacity-50">|</span>
                <a href="mailto:info@luxstay.com" className="text-xl hover:opacity-80 transition">
                  info@luxstay.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
