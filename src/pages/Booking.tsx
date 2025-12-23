import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { toast } from 'sonner';

const Booking = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [selectedRoom, setSelectedRoom] = useState('');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const rooms = [
    { id: '1', name: 'Стандартный номер', price: 8500 },
    { id: '2', name: 'Улучшенный стандарт', price: 11000 },
    { id: '3', name: 'Делюкс', price: 15000 },
    { id: '4', name: 'Семейный люкс', price: 18000 },
    { id: '5', name: 'Президентский люкс', price: 35000 },
    { id: '6', name: 'Пентхаус', price: 50000 },
  ];

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diff = checkOut.getTime() - checkIn.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    const room = rooms.find(r => r.id === selectedRoom);
    if (room && checkIn && checkOut) {
      return room.price * calculateNights();
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut || !selectedRoom || !name || !email || !phone) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    toast.success('Бронирование успешно создано! Мы свяжемся с вами в ближайшее время.');
    
    setCheckIn(undefined);
    setCheckOut(undefined);
    setSelectedRoom('');
    setGuests('2');
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-muted/50 to-background min-h-screen">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Бронирование номера</h1>
            <p className="text-muted-foreground text-lg">
              Заполните форму ниже для бронирования номера
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="text-2xl">Детали бронирования</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Дата заезда</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal mt-2"
                          >
                            <Icon name="Calendar" size={16} className="mr-2" />
                            {checkIn ? format(checkIn, 'PPP', { locale: ru }) : 'Выберите дату'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label>Дата выезда</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal mt-2"
                          >
                            <Icon name="Calendar" size={16} className="mr-2" />
                            {checkOut ? format(checkOut, 'PPP', { locale: ru }) : 'Выберите дату'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            disabled={(date) => date < (checkIn || new Date())}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="room">Тип номера</Label>
                      <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Выберите номер" />
                        </SelectTrigger>
                        <SelectContent>
                          {rooms.map(room => (
                            <SelectItem key={room.id} value={room.id}>
                              {room.name} - {room.price}₽/ночь
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="guests">Количество гостей</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'гость' : 'гостя'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold mb-4">Контактные данные</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">ФИО</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Иванов Иван Иванович"
                          className="mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
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
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Icon name="CheckCircle" size={20} className="mr-2" />
                    Подтвердить бронирование
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Card>
                <CardHeader>
                  <CardTitle>Итого к оплате</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {checkIn && checkOut && selectedRoom ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Заезд:</span>
                          <span className="font-medium">{format(checkIn, 'dd.MM.yyyy')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Выезд:</span>
                          <span className="font-medium">{format(checkOut, 'dd.MM.yyyy')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Ночей:</span>
                          <span className="font-medium">{calculateNights()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Гостей:</span>
                          <span className="font-medium">{guests}</span>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Всего:</span>
                          <span className="text-3xl font-bold text-primary">{calculateTotal().toLocaleString()}₽</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Выберите даты и номер для расчета стоимости
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={20} />
                    Способы оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Icon name="CreditCard" size={24} className="text-primary" />
                    <div>
                      <p className="font-medium text-sm">Банковская карта</p>
                      <p className="text-xs text-muted-foreground">Visa, MasterCard, Mir</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Icon name="Smartphone" size={24} className="text-primary" />
                    <div>
                      <p className="font-medium text-sm">Электронные кошельки</p>
                      <p className="text-xs text-muted-foreground">ЮMoney, QIWI</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Icon name="Building" size={24} className="text-primary" />
                    <div>
                      <p className="font-medium text-sm">При заселении</p>
                      <p className="text-xs text-muted-foreground">Наличные или карта</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Icon name="ShieldCheck" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">Безопасная оплата</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Clock" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">Бесплатная отмена за 24 часа</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Percent" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">Специальные предложения для постоянных гостей</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
