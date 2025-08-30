import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  Users, 
  Bell, 
  Plus,
  Search,
  Settings,
  LogOut,
  Sparkles,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import CreateAppointmentDialog from './CreateAppointmentDialog';
import NotificationBell from './NotificationBell';
import { useUserProfile } from '@/hooks/useSettings';
import PageTransition from './PageTransition';

interface ModernLayoutProps {
  children: React.ReactNode;
}

const ModernLayout = ({ children }: ModernLayoutProps) => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const { data: userProfile } = useUserProfile();

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
  ];

  const isActive = (href: string) => {
    if (href === '/app' && (location.pathname === '/' || location.pathname === '/app')) return true;
    if (href !== '/app' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo - Flexible */}
            <div className="flex items-center flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent whitespace-nowrap">
                Atende+ Digital
              </h1>
            </div>

            {/* Center Navigation - Flexible Container */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-4">
              <div className="flex items-center space-x-1 bg-gray-50 rounded-full p-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-full 
                      transition-all duration-300 whitespace-nowrap transform
                      hover:scale-110 hover:shadow-lg hover:-translate-y-1
                      ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-md'
                      }
                    `}
                  >
                    <item.icon className={`mr-2 h-4 w-4 ${
                      isActive(item.href) ? 'text-white' : 'text-gray-400'
                    }`} />
                    <span className="hidden xl:inline">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side - Flexible Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Search Bar - Adaptive Width */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Pesquisar..."
                  className="pl-10 w-32 lg:w-48 xl:w-64 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 focus:w-64"
                />
              </div>

              {/* Quick Search Button for Small Screens */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <NotificationBell />

              {/* New Appointment Button - Responsive */}
              <CreateAppointmentDialog>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
                  <Plus className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Nova Consulta</span>
                </Button>
              </CreateAppointmentDialog>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-full hover:ring-2 hover:ring-blue-200 transition-all duration-300 hover:scale-105 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    {/* Online indicator */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 p-0" align="end" forceMount>
                  {/* User Profile Header */}
                  <div className="p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-white/30 shadow-lg">
                          {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xl truncate">
                            {user?.email?.split('@')[0] || 'Usuário'}
                          </p>
                          <p className="text-blue-100 text-sm truncate">
                            {user?.email}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                              <span className="text-xs text-blue-100 font-medium">Online agora</span>
                            </div>
                            <div className="w-1 h-1 bg-blue-200 rounded-full"></div>
                            <span className="text-xs text-blue-200">Plano Pro</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">{userProfile?.total_appointments || 0}</div>
                          <div className="text-xs text-blue-100">Consultas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{userProfile?.total_patients || 0}</div>
                          <div className="text-xs text-blue-100">Pacientes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">100%</div>
                          <div className="text-xs text-blue-100">Uptime</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <Settings className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Configurações</p>
                          <p className="text-xs text-gray-500">Preferências e conta</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild>
                      <Link to="/notifications" className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <Bell className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Notificações</p>
                          <p className="text-xs text-gray-500">Centro de mensagens</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link to="/reports" className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <BarChart3 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Relatórios</p>
                          <p className="text-xs text-gray-500">Análises e métricas</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-gray-100">
                    <DropdownMenuItem 
                      onClick={handleSignOut} 
                      className="flex items-center px-3 py-3 rounded-lg hover:bg-red-50 transition-colors cursor-pointer text-red-600"
                    >
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        <LogOut className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Sair da Conta</p>
                        <p className="text-xs text-red-500">Desconectar do sistema</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile/Tablet Navigation Menu - Collapsible */}
          <div className="lg:hidden border-t border-gray-200">
            {/* Tablet Navigation - Horizontal Scroll */}
            <div className="hidden md:block lg:hidden py-2">
              <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center px-4 py-2 text-sm font-medium rounded-lg 
                      transition-all duration-300 whitespace-nowrap transform
                      hover:scale-105 hover:shadow-md hover:-translate-y-0.5
                      ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }
                    `}
                  >
                    <item.icon className={`mr-2 h-4 w-4 ${
                      isActive(item.href) ? 'text-white' : 'text-gray-400'
                    }`} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Navigation - Grid Layout */}
            <div className="md:hidden py-3">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg 
                      transition-all duration-300 transform
                      hover:scale-105 hover:shadow-md
                      ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }
                    `}
                  >
                    <item.icon className={`mr-2 h-4 w-4 ${
                      isActive(item.href) ? 'text-white' : 'text-gray-400'
                    }`} />
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </div>
              
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Pesquisar pacientes, consultas..."
                  className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>
    </div>
  );
};

export default ModernLayout;
