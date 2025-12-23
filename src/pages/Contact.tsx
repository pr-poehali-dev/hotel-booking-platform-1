import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-muted-foreground text-lg">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <Card>
                <CardHeader>
                  <CardTitle>Отправьте нам сообщение</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">ФИО *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Иванов Иван Иванович"
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@mail.com"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 (999) 123-45-67"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Сообщение *</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Расскажите о вашем вопросе..."
                        className="mt-2 min-h-32"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Icon name="Send" size={20} className="mr-2" />
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" size={24} />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">г. Москва, ул. Примерная, д. 1</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="Map" size={48} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" size={24} />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Reception</p>
                      <a href="tel:+74951234567" className="text-xl font-bold hover:text-primary transition">
                        +7 (495) 123-45-67
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Бронирование</p>
                      <a href="tel:+74951234568" className="text-xl font-bold hover:text-primary transition">
                        +7 (495) 123-45-68
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Mail" size={24} />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Общие вопросы</p>
                      <a href="mailto:info@luxstay.com" className="text-lg font-semibold hover:text-primary transition">
                        info@luxstay.com
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Бронирование</p>
                      <a href="mailto:booking@luxstay.com" className="text-lg font-semibold hover:text-primary transition">
                        booking@luxstay.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" size={24} />
                    Время работы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reception</span>
                      <span className="font-semibold">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ресторан</span>
                      <span className="font-semibold">07:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Спа-центр</span>
                      <span className="font-semibold">10:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Фитнес</span>
                      <span className="font-semibold">06:00 - 23:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="flex-1">
                      <Icon name="Facebook" size={20} />
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1">
                      <Icon name="Instagram" size={20} />
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1">
                      <Icon name="Twitter" size={20} />
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1">
                      <Icon name="Youtube" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-12 bg-primary text-primary-foreground animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-8 text-center">
              <Icon name="HeadphonesIcon" size={48} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Круглосуточная поддержка</h2>
              <p className="text-lg opacity-90">
                Наша служба поддержки готова помочь вам 24 часа в сутки, 7 дней в неделю
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
