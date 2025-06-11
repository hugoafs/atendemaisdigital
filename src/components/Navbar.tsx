
import { Calendar, Settings, BarChart3, Bell, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Logout realizado com sucesso',
        description: 'Até a próxima!',
      });
    } catch (error) {
      toast({
        title: 'Erro no logout',
        description: 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: BarChart3, href: '/' },
    { name: 'Agenda', icon: Calendar, href: '/agenda' },
    { name: 'Notificações', icon: Bell, href: '#notifications' },
    { name: 'Configurações', icon: Settings, href: '#settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-blue-600">PsicoManager</h1>
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            ))}
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{user.email}</span>
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 transition-colors duration-200 px-4 py-2 ${
                      isActive(item.href)
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              ))}
              {user && (
                <div className="px-4 pt-2 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">{user.email}</div>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Sair</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
