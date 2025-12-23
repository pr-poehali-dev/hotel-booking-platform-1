import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Стандартный номер', price: 8500, status: 'available', category: 'standard' },
    { id: 2, name: 'Делюкс', price: 15000, status: 'occupied', category: 'lux' },
    { id: 3, name: 'Президентский люкс', price: 35000, status: 'available', category: 'premium' },
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, guest: 'Иван Иванов', room: 'Делюкс', checkIn: '2024-12-25', checkOut: '2024-12-28', status: 'confirmed', price: 45000 },
    { id: 2, guest: 'Мария Петрова', room: 'Стандартный', checkIn: '2024-12-26', checkOut: '2024-12-27', status: 'pending', price: 8500 },
    { id: 3, guest: 'Алексей Сидоров', room: 'Люкс', checkIn: '2024-12-24', checkOut: '2024-12-26', status: 'checked-in', price: 70000 },
  ]);

  const stats = {
    totalRooms: rooms.length,
    occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
    availableRooms: rooms.filter(r => r.status === 'available').length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    revenue: bookings.reduce((acc, b) => acc + b.price, 0),
  };

  const handleApproveBooking = (id: number) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'confirmed' } : b));
    toast.success('Бронирование подтверждено');
  };

  const handleCancelBooking = (id: number) => {
    setBookings(bookings.filter(b => b.id !== id));
    toast.success('Бронирование отменено');
  };

  const handleAddRoom = () => {
    toast.success('Номер успешно добавлен');
  };

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-muted/50 to-background min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">Панель администратора</h1>
                <p className="text-muted-foreground">Управление отелем и бронированиями</p>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                <Icon name="ShieldCheck" size={20} className="mr-2" />
                Admin
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Hotel" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Всего номеров</p>
                    <p className="text-2xl font-bold">{stats.totalRooms}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Icon name="DoorOpen" size={24} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Доступно</p>
                    <p className="text-2xl font-bold">{stats.availableRooms}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                    <Icon name="CalendarCheck" size={24} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Бронирований</p>
                    <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Выручка</p>
                    <p className="text-2xl font-bold">{(stats.revenue / 1000).toFixed(0)}к₽</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Icon name="CalendarDays" size={16} />
                Бронирования
                {stats.pendingBookings > 0 && (
                  <Badge variant="destructive" className="ml-1">{stats.pendingBookings}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="rooms" className="flex items-center gap-2">
                <Icon name="Hotel" size={16} />
                Номера
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Icon name="BarChart3" size={16} />
                Аналитика
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-4">
              <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Все бронирования</span>
                    <Button size="sm">
                      <Icon name="Filter" size={16} className="mr-2" />
                      Фильтры
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className={booking.status === 'pending' ? 'border-orange-500/50' : ''}>
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-xl font-bold">{booking.guest}</h3>
                                <Badge variant={
                                  booking.status === 'confirmed' ? 'default' : 
                                  booking.status === 'pending' ? 'secondary' : 
                                  'outline'
                                }>
                                  {booking.status === 'confirmed' ? 'Подтверждено' : 
                                   booking.status === 'pending' ? 'Ожидает' : 
                                   'Заселен'}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Icon name="Hotel" size={16} />
                                  <span>{booking.room}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Icon name="Calendar" size={16} />
                                  <span>{booking.checkIn} - {booking.checkOut}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Icon name="Wallet" size={16} />
                                  <span>{booking.price.toLocaleString()}₽</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {booking.status === 'pending' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleApproveBooking(booking.id)}
                                >
                                  <Icon name="CheckCircle" size={16} className="mr-2" />
                                  Подтвердить
                                </Button>
                              )}
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rooms" className="space-y-4">
              <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Управление номерами</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Icon name="Plus" size={16} className="mr-2" />
                          Добавить номер
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Добавить новый номер</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="roomName">Название номера</Label>
                            <Input id="roomName" placeholder="Люкс делюкс" className="mt-2" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="price">Цена за ночь</Label>
                              <Input id="price" type="number" placeholder="15000" className="mt-2" />
                            </div>
                            <div>
                              <Label htmlFor="category">Категория</Label>
                              <Select>
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="Выберите" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="standard">Стандарт</SelectItem>
                                  <SelectItem value="lux">Люкс</SelectItem>
                                  <SelectItem value="premium">Премиум</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="description">Описание</Label>
                            <Textarea id="description" placeholder="Описание номера" className="mt-2" />
                          </div>
                          <Button onClick={handleAddRoom} className="w-full">
                            Добавить номер
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rooms.map((room) => (
                      <Card key={room.id}>
                        <CardContent className="pt-6">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h3 className="text-lg font-bold">{room.name}</h3>
                              <Badge variant={room.status === 'available' ? 'default' : 'secondary'}>
                                {room.status === 'available' ? 'Доступен' : 'Занят'}
                              </Badge>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              {room.price.toLocaleString()}₽
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Icon name="Edit" size={16} className="mr-1" />
                                Изменить
                              </Button>
                              <Button variant="destructive" size="sm">
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardHeader>
                  <CardTitle>Аналитика и статистика</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-semibold mb-4">Загруженность по категориям</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Стандарт</span>
                                <span className="font-semibold">75%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: '75%' }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Люкс</span>
                                <span className="font-semibold">60%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: '60%' }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Премиум</span>
                                <span className="font-semibold">40%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: '40%' }} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-semibold mb-4">Выручка за период</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Сегодня</span>
                              <span className="text-lg font-bold">45 000₽</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Эта неделя</span>
                              <span className="text-lg font-bold">315 000₽</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Этот месяц</span>
                              <span className="text-lg font-bold">1 250 000₽</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t">
                              <span className="text-sm font-semibold">Всего за год</span>
                              <span className="text-2xl font-bold text-primary">12 500 000₽</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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

export default AdminDashboard;
