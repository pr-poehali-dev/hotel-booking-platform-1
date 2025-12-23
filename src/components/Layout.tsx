import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Hotel" size={28} className="text-primary" />
              <span className="text-2xl font-bold text-foreground">LuxStay</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-1">
              <Link to="/">
                <Button variant={isActive('/') ? 'default' : 'ghost'}>
                  Главная
                </Button>
              </Link>
              <Link to="/rooms">
                <Button variant={isActive('/rooms') ? 'default' : 'ghost'}>
                  Номера
                </Button>
              </Link>
              <Link to="/services">
                <Button variant={isActive('/services') ? 'default' : 'ghost'}>
                  Услуги
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant={isActive('/contact') ? 'default' : 'ghost'}>
                  Контакты
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button variant="outline" size="icon">
                  <Icon name="User" size={20} />
                </Button>
              </Link>
              <Link to="/booking">
                <Button>
                  Забронировать
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-1 pt-20">
        {children}
      </main>
      
      <footer className="bg-muted border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Hotel" size={24} className="text-primary" />
                <span className="text-xl font-bold">LuxStay</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Премиальный отель с безупречным сервисом и комфортом
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <div className="flex flex-col gap-2">
                <Link to="/rooms" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Номера
                </Link>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Услуги
                </Link>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Контакты
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@luxstay.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Примерная, 1</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Социальные сети</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 LuxStay. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
