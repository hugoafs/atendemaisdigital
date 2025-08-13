import { useState } from 'react';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Bell, 
  Settings, 
  BarChart3, 
  X, 
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ModernSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModernSidebar = ({ isOpen, onClose }: ModernSidebarProps) => {
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
    { name: 'Dashboard', icon: BarChart3, href: '/app', color: 'blue' },
    { name: 'Agenda', icon: Calendar, href: '/agenda', color: 'green' },
    { name: 'Pacientes', icon: Users, href: '/patients', color: 'purple' },
    { name: 'Relatórios', icon: TrendingUp, href: '/reports', color: 'orange' },
    { name: 'Notificações', icon: Bell, href: '/notifications', color: 'red' },
    { name: 'Configurações', icon: Settings, href: '/settings', color: 'gray' },
  ];

  const isActive = (href: string) => {
    if (href === '/app' && (location.pathname === '/' || location.pathname === '/app')) return true;
    if (href !== '/app' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Atende+ Digital
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="mt-8 px-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={onClose}
            >
              <item.icon className={`mr-3 h-5 w-5 ${
                isActive(item.href) 
                  ? 'text-white' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`} />
              {item.name}
              {isActive(item.href) && (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.email?.split('@')[0] || 'Usuário'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Button>
      </div>
    </div>
  );
};

export default ModernSidebar;
