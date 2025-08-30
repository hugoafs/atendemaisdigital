import { useState } from 'react';
import { Bell, X, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { useNotifications, useMarkNotificationRead, Notification } from '@/hooks/useNotifications';
import { formatTimeBR, formatDateBR, parseAppointmentDate } from '@/utils/dateUtils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notifications, isLoading } = useNotifications();
  const markAsReadMutation = useMarkNotificationRead();

  const unreadCount = notifications?.filter(n => !n.read).length || 0;
  const recentNotifications = notifications?.slice(0, 5) || [];

  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = { className: "h-4 w-4" };
    
    switch (type) {
      case 'appointment_soon':
        return <Clock {...iconProps} className="h-4 w-4 text-red-500" />;
      case 'appointment_reminder':
        return <Bell {...iconProps} className="h-4 w-4 text-blue-500" />;
      case 'missed_appointment':
        return <AlertTriangle {...iconProps} className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell {...iconProps} className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    markAsReadMutation.mutate(notificationId);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notificações</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount} não lidas
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Nenhuma notificação</p>
            </div>
          ) : (
            <div className="divide-y">
              {recentNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${!notification.read ? 'bg-white' : 'bg-gray-100'}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-1 h-auto"
                          >
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          </Button>
                        )}
                      </div>
                      
                      <p className={`text-xs ${
                        !notification.read ? 'text-gray-700' : 'text-gray-500'
                      } mb-2`}>
                        {notification.message}
                      </p>
                      
                      <div className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(notification.created_at), { 
                          addSuffix: true, 
                          locale: ptBR 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications && notifications.length > 5 && (
          <div className="p-4 border-t">
            <Link to="/notifications">
              <Button variant="outline" className="w-full rounded-xl" onClick={() => setIsOpen(false)}>
                Ver Todas as Notificações
              </Button>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
