import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const UserDashboard = () => {
  const [name, setName] = useState('Иван Иванов');
  const [email, setEmail] = useState('ivan@example.com');
  const [phone, setPhone] = useState('+7 (999) 123-45-67');

  const bookings = [
    {
      id: 1,
      room: 'Делюкс',
      checkIn: '2024-12-25',
      checkOut: '2024-12-28',
      status: 'active',
      price: 45000,
      nights: 3,
    },
    {
      id: 2,
      room: 'Стандартный номер',
      checkIn: '2024-11-15',
      checkOut: '2024-11-17',
      status: 'completed',
      price: 17000,
      nights: 2,
    },
    {
      id: 3,
      room: 'Президентский люкс',
      checkIn: '2024-10-05',
      checkOut: '2024-10-08',
      status: 'completed',
      price: 105000,
      nights: 3,
    },
  ];

  const activeBookings = bookings.filter(b => b.status === 'active');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  const handleSaveProfile = () => {
    toast.success('Профиль успешно обновлен');
  };

  const handleCancelBooking = (id: number) => {
    toast.success('Бронирование успешно отменено');
  };

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-muted/50 to-background min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl font-bold">{name}</h1>
                <p className="text-muted-foreground">Добро пожаловать в личный кабинет</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Icon name="CalendarDays" size={16} />
                Бронирования
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Icon name="User" size={16} />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Icon name="History" size={16} />
                История
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-6">
              <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Активные бронирования</span>
                    <Badge variant="default">{activeBookings.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeBookings.length > 0 ? (
                    <div className="space-y-4">
                      {activeBookings.map((booking) => (
                        <Card key={booking.id} className="border-primary/20">
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="space-y-2">
                                <h3 className="text-xl font-bold">{booking.room}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Icon name="Calendar" size={16} />
                                    <span>{booking.checkIn} - {booking.checkOut}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Icon name="Moon" size={16} />
                                    <span>{booking.nights} ночей</span>
                                  </div>
                                </div>
                                <div className="text-2xl font-bold text-primary">
                                  {booking.price.toLocaleString()}₽
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Button variant="outline" size="sm">
                                  <Icon name="FileText" size={16} className="mr-2" />
                                  Детали
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  <Icon name="XCircle" size={16} className="mr-2" />
                                  Отменить
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="CalendarX" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">У вас нет активных бронирований</p>
                      <Button className="mt-4">
                        Забронировать номер
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="Hotel" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Всего визитов</p>
                        <p className="text-2xl font-bold">{bookings.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                        <Icon name="Moon" size={24} className="text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Всего ночей</p>
                        <p className="text-2xl font-bold">{bookings.reduce((acc, b) => acc + b.nights, 0)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Icon name="Star" size={24} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Статус</p>
                        <p className="text-lg font-bold">VIP Гость</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader>
                  <CardTitle>Личные данные</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name">ФИО</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveProfile} size="lg">
                      <Icon name="Save" size={20} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader>
                  <CardTitle>История бронирований</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedBookings.map((booking) => (
                      <Card key={booking.id} className="border-muted">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold">{booking.room}</h3>
                                <Badge variant="outline">Завершено</Badge>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Icon name="Calendar" size={16} />
                                  <span>{booking.checkIn} - {booking.checkOut}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Icon name="Moon" size={16} />
                                  <span>{booking.nights} ночей</span>
                                </div>
                              </div>
                              <div className="text-xl font-bold">
                                {booking.price.toLocaleString()}₽
                              </div>
                            </div>
                            <Button variant="outline">
                              <Icon name="RotateCcw" size={16} className="mr-2" />
                              Забронировать снова
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default UserDashboard;
