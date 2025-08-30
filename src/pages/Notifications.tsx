import { useState } from 'react';
import { 
  Bell, 
  Clock, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  Filter,
  MarkAsUnread,
  Trash2,
  Settings,
  Volume2,
  VolumeX,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModernLayout from '@/components/ModernLayout';
import ModernStatsCard from '@/components/ModernStatsCard';
import { 
  useNotifications, 
  useMarkNotificationRead, 
  useMarkAllNotificationsRead,
  useNotificationStats,
  Notification 
} from '@/hooks/useNotifications';
import { formatDateBR, getCurrentDateBR, formatTimeBR } from '@/utils/dateUtils';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Notifications = () => {
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'high' | 'medium' | 'low'>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  
  // Data hooks
  const { data: notifications, isLoading: notificationsLoading } = useNotifications();
  const { data: notificationStats } = useNotificationStats();
  const markAsReadMutation = useMarkNotificationRead();
  const markAllAsReadMutation = useMarkAllNotificationsRead();

  // Filter notifications
  const filteredNotifications = notifications?.filter(notification => {
    if (filterType === 'unread') return !notification.read;
    if (filterType === 'high' || filterType === 'medium' || filterType === 'low') {
      return notification.priority === filterType;
    }
    return true;
  }) || [];

  // Get notification icon and color
  const getNotificationIcon = (type: Notification['type'], priority: Notification['priority']) => {
    const iconProps = { className: "h-5 w-5" };
    
    switch (type) {
      case 'appointment_soon':
        return <Clock {...iconProps} className="h-5 w-5 text-red-500" />;
      case 'appointment_reminder':
        return <Bell {...iconProps} className="h-5 w-5 text-blue-500" />;
      case 'missed_appointment':
        return <AlertTriangle {...iconProps} className="h-5 w-5 text-orange-500" />;
      case 'new_appointment':
        return <Calendar {...iconProps} className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Info {...iconProps} className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell {...iconProps} className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-900';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'low': return 'bg-blue-50 border-blue-200 text-blue-900';
      default: return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return <Badge className="bg-red-500 text-white">Alta</Badge>;
      case 'medium': return <Badge className="bg-yellow-500 text-white">Média</Badge>;
      case 'low': return <Badge className="bg-blue-500 text-white">Baixa</Badge>;
      default: return null;
    }
  };

  // Stats for header
  const stats = [
    {
      title: 'Total de Notificações',
      value: notificationStats?.total || 0,
      icon: Bell,
      change: `${notificationStats?.unread || 0} não lidas`,
      changeType: (notificationStats?.unread || 0) > 0 ? 'negative' as const : 'positive' as const,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Alta Prioridade',
      value: notificationStats?.high || 0,
      icon: AlertTriangle,
      change: 'Requer atenção',
      changeType: (notificationStats?.high || 0) > 0 ? 'negative' as const : 'positive' as const,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
    },
    {
      title: 'Consultas Próximas',
      value: notificationStats?.byType.appointment_soon || 0,
      icon: Clock,
      change: 'Próximos 30 min',
      changeType: 'neutral' as const,
      gradient: 'from-orange-500 to-yellow-500',
      bgGradient: 'from-orange-50 to-yellow-50',
    },
    {
      title: 'Lembretes',
      value: notificationStats?.byType.appointment_reminder || 0,
      icon: Calendar,
      change: 'Próximas 2h',
      changeType: 'neutral' as const,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
  ];

  return (
    <ModernLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Notificações
            </h1>
            <p className="text-gray-600 mt-2">
              Centro de notificações e lembretes - {format(getCurrentDateBR(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button 
              variant="outline" 
              onClick={() => markAllAsReadMutation.mutate()}
              disabled={markAllAsReadMutation.isPending || (notificationStats?.unread || 0) === 0}
              className="rounded-xl"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Marcar Todas como Lidas
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {notificationsLoading ? (
          [...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))
        ) : (
          stats.map((stat, index) => (
            <ModernStatsCard key={index} {...stat} />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Notifications List */}
        <div className="lg:col-span-3">
          {/* Filters */}
          <Card className="mb-6 border-0 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="filter">Filtrar por:</Label>
                  <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                    <SelectTrigger className="w-40 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="unread">Não Lidas</SelectItem>
                      <SelectItem value="high">Alta Prioridade</SelectItem>
                      <SelectItem value="medium">Média Prioridade</SelectItem>
                      <SelectItem value="low">Baixa Prioridade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notificação' : 'notificações'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Bell className="h-4 w-4 text-white" />
                </div>
                <span>Suas Notificações</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {notificationsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-4 p-4 border rounded-xl">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {filterType === 'all' ? 'Nenhuma notificação' : 'Nenhuma notificação encontrada'}
                  </h3>
                  <p className="text-gray-500">
                    {filterType === 'all' 
                      ? 'Você está em dia! Não há notificações pendentes.' 
                      : 'Tente ajustar os filtros para ver outras notificações.'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                        notification.read 
                          ? 'bg-gray-50 border-gray-200' 
                          : getPriorityColor(notification.priority)
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-lg ${
                            notification.read ? 'bg-gray-200' : 'bg-white'
                          }`}>
                            {getNotificationIcon(notification.type, notification.priority)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`font-semibold ${
                                notification.read ? 'text-gray-600' : 'text-gray-900'
                              }`}>
                                {notification.title}
                              </h3>
                              {!notification.read && getPriorityBadge(notification.priority)}
                            </div>
                            
                            <p className={`text-sm ${
                              notification.read ? 'text-gray-500' : 'text-gray-700'
                            } mb-2`}>
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>
                                {formatDistanceToNow(new Date(notification.created_at), { 
                                  addSuffix: true, 
                                  locale: ptBR 
                                })}
                              </span>
                              {notification.appointment_date && notification.appointment_time && (
                                <span className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    {formatDateBR(parseAppointmentDate(notification.appointment_date))} às {formatTimeBR(notification.appointment_time)}
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsReadMutation.mutate(notification.id)}
                              disabled={markAsReadMutation.isPending}
                              className="rounded-lg"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-white" />
                </div>
                <span>Configurações</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="sound">Notificações Sonoras</Label>
                </div>
                <Switch
                  id="sound"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="push">Push Notifications</Label>
                </div>
                <Switch
                  id="push"
                  checked={pushEnabled}
                  onCheckedChange={setPushEnabled}
                />
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full rounded-xl">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações Avançadas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Resumo</h3>
                  <p className="text-blue-100 text-sm">Notificações de Hoje</p>
                </div>
                <Bell className="h-8 w-8 text-blue-100" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-100">Não lidas</span>
                  <span className="font-bold">{notificationStats?.unread || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-100">Alta prioridade</span>
                  <span className="font-bold">{notificationStats?.high || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-100">Consultas próximas</span>
                  <span className="font-bold">{notificationStats?.byType.appointment_soon || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Types */}
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Filter className="h-4 w-4 text-white" />
                </div>
                <span>Por Tipo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Consultas Próximas</span>
                </div>
                <Badge className="bg-red-500 text-white">
                  {notificationStats?.byType.appointment_soon || 0}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Lembretes</span>
                </div>
                <Badge className="bg-blue-500 text-white">
                  {notificationStats?.byType.appointment_reminder || 0}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Consultas Perdidas</span>
                </div>
                <Badge className="bg-orange-500 text-white">
                  {notificationStats?.byType.missed_appointment || 0}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Amanhã</span>
                </div>
                <Badge className="bg-green-500 text-white">
                  {notificationStats?.byType.new_appointment || 0}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModernLayout>
  );
};

export default Notifications;
