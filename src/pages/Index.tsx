import { useState } from 'react';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  Plus,
  Activity,
  Search,
  Filter,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTodayAppointments } from '@/hooks/useAppointments';
import { usePatients } from '@/hooks/usePatients';
import { Skeleton } from '@/components/ui/skeleton';
import AppointmentCard from '@/components/AppointmentCard';
import CreateAppointmentDialog from '@/components/CreateAppointmentDialog';
import CreatePatientDialog from '@/components/CreatePatientDialog';
import ModernStatsCard from '@/components/ModernStatsCard';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const { data: todayAppointments, isLoading: appointmentsLoading } = useTodayAppointments();
  const { data: patients } = usePatients();

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

  // Calculate stats
  const totalAppointmentsToday = todayAppointments?.length || 0;
  const totalPatients = patients?.length || 0;
  
  const monthlyRevenue = todayAppointments?.reduce((sum, appointment) => {
    return sum + (appointment.value || 0);
  }, 0) || 0;

  const completedAppointments = todayAppointments?.filter(
    app => app.status === 'concluido'
  ).length || 0;
  
  const attendanceRate = totalAppointmentsToday > 0 
    ? Math.round((completedAppointments / totalAppointmentsToday) * 100)
    : 0;

  const stats = [
    {
      title: 'Consultas Hoje',
      value: totalAppointmentsToday,
      icon: Calendar,
      change: '+2 que ontem',
      changeType: 'positive' as const,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Pacientes Ativos',
      value: totalPatients,
      icon: Users,
      change: '+5 este mês',
      changeType: 'positive' as const,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Receita Hoje',
      value: `R$ ${monthlyRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: '+12% vs ontem',
      changeType: 'positive' as const,
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
    },
    {
      title: 'Taxa de Presença',
      value: `${attendanceRate}%`,
      icon: TrendingUp,
      change: '+2% esta semana',
      changeType: 'positive' as const,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
    },
  ];

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
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm'
                    }`}
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
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
              </Button>

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
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-blue-200 transition-all duration-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">
                        {user?.email?.split('@')[0] || 'Usuário'}
                      </p>
                      <p className="w-[200px] truncate text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
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
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
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
                    className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
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
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Bom dia! 👋
                  </h1>
                  <p className="mt-2 text-lg text-gray-600">
                    Aqui está o resumo da sua prática hoje
                  </p>
                </div>
                <div className="hidden sm:flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4 mr-2" />
                    Relatórios
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, index) => (
                <ModernStatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Today's Appointments */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl rounded-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Consultas de Hoje</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {totalAppointmentsToday} consultas agendadas
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appointmentsLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-24 w-full rounded-xl" />
                        ))}
                      </div>
                    ) : todayAppointments && todayAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {todayAppointments.map((appointment) => (
                          <AppointmentCard 
                            key={appointment.id} 
                            id={appointment.id}
                            patientName={appointment.patient.name}
                            time={appointment.time}
                            date={new Date(appointment.date).toLocaleDateString('pt-BR')}
                            type={appointment.type}
                            status={appointment.status}
                            value={appointment.value}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Calendar className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Nenhuma consulta hoje
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Que tal agendar uma nova consulta?
                        </p>
                        <CreateAppointmentDialog>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Agendar Consulta
                          </Button>
                        </CreateAppointmentDialog>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="border-0 shadow-xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Plus className="h-4 w-4 text-white" />
                      </div>
                      <span>Ações Rápidas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CreateAppointmentDialog>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl h-12">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Consulta
                      </Button>
                    </CreateAppointmentDialog>
                    <CreatePatientDialog />
                    <Button variant="outline" className="w-full rounded-xl h-12 hover:bg-gray-50">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Ver Relatórios
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Resumo Semanal</h3>
                        <p className="text-purple-100 text-sm">Últimos 7 dias</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-100" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-100">Consultas realizadas</span>
                        <span className="font-bold">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-100">Taxa de presença</span>
                        <span className="font-bold">92%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-100">Receita total</span>
                        <span className="font-bold">R$ 2.840</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
};

export default Index;
