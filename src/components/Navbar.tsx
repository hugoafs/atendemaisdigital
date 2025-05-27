
import { Calendar, Settings, BarChart3, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: BarChart3, href: '#dashboard' },
    { name: 'Agenda', icon: Calendar, href: '#agenda' },
    { name: 'Notificações', icon: Bell, href: '#notifications' },
    { name: 'Configurações', icon: Settings, href: '#settings' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">PsicoManager</h1>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
            <Button className="bg-blue-600 hover:bg-blue-700">
              Sair
            </Button>
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
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
              <div className="px-4 pt-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Sair
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
