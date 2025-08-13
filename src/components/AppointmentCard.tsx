import { Clock, User, DollarSign, Play, CheckCircle2, XCircle, Calendar, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUpdateAppointmentStatus } from '@/hooks/useUpdateAppointmentStatus';

interface AppointmentCardProps {
  appointment?: {
    id: string;
    patient_name: string;
    time: string;
    date: string;
    type: 'particular' | 'plano';
    status: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
    value?: number;
  };
  // Legacy props for backward compatibility
  id?: string;
  patientName?: string;
  time?: string;
  date?: string;
  type?: 'particular' | 'plano';
  status?: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
  value?: number;
}

const AppointmentCard = ({ 
  appointment,
  id,
  patientName, 
  time, 
  date, 
  type, 
  status, 
  value 
}: AppointmentCardProps) => {
  const updateStatus = useUpdateAppointmentStatus();

  // Use appointment object if provided, otherwise use individual props
  const appointmentData = appointment || {
    id: id!,
    patient_name: patientName!,
    time: time!,
    date: date!,
    type: type!,
    status: status!,
    value
  };

  const statusConfig = {
    agendado: {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      gradient: 'from-blue-500 to-blue-600',
      icon: Calendar,
      label: 'Agendado'
    },
    'em-andamento': {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      gradient: 'from-yellow-500 to-orange-500',
      icon: Clock,
      label: 'Em Andamento'
    },
    concluido: {
      color: 'bg-green-100 text-green-800 border-green-200',
      gradient: 'from-green-500 to-green-600',
      icon: CheckCircle2,
      label: 'Concluído'
    },
    cancelado: {
      color: 'bg-red-100 text-red-800 border-red-200',
      gradient: 'from-red-500 to-red-600',
      icon: XCircle,
      label: 'Cancelado'
    },
  };

  const typeConfig = {
    particular: {
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      label: 'Particular'
    },
    plano: {
      color: 'bg-green-100 text-green-800 border-green-200',
      label: 'Plano'
    }
  };

  const currentStatus = statusConfig[appointmentData.status];
  const currentType = typeConfig[appointmentData.type];
  const StatusIcon = currentStatus.icon;

  const handleStatusChange = (newStatus: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado') => {
    updateStatus.mutate({ appointmentId: appointmentData.id, status: newStatus });
  };

  const formatTime = (timeStr: string) => {
    return timeStr.length === 5 ? timeStr : timeStr.substring(0, 5);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit',
      year: '2-digit'
    });
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl overflow-hidden group">
      <CardContent className="p-0">
        {/* Header with status */}
        <div className={`bg-gradient-to-r ${currentStatus.gradient} p-4 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <StatusIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{appointmentData.patient_name}</h3>
                <p className="text-white/80 text-sm">{currentStatus.label}</p>
              </div>
            </div>
            <Badge className={`${currentType.color} font-semibold`}>
              {currentType.label}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Horário</p>
                <p className="font-semibold text-gray-900">{formatTime(appointmentData.time)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Data</p>
                <p className="font-semibold text-gray-900">{formatDate(appointmentData.date)}</p>
              </div>
            </div>
          </div>

          {appointmentData.value && (
            <div className="flex items-center justify-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Valor</p>
                  <p className="font-bold text-xl text-green-700">
                    R$ {appointmentData.value.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="space-y-3">
            {appointmentData.status === 'agendado' && (
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                  onClick={() => handleStatusChange('em-andamento')}
                  disabled={updateStatus.isPending}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Iniciar
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-2 border-gray-300 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 rounded-xl"
                  onClick={() => handleStatusChange('cancelado')}
                  disabled={updateStatus.isPending}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            )}
            
            {appointmentData.status === 'em-andamento' && (
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                onClick={() => handleStatusChange('concluido')}
                disabled={updateStatus.isPending}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Finalizar Consulta
              </Button>
            )}
            
            {appointmentData.status === 'concluido' && (
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-xl"
                >
                  <User className="h-4 w-4 mr-2" />
                  Ver Detalhes
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-2 border-green-300 text-green-600 hover:bg-green-50 transition-all duration-300 rounded-xl"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contatar
                </Button>
              </div>
            )}
            
            {appointmentData.status === 'cancelado' && (
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-xl"
                onClick={() => handleStatusChange('agendado')}
                disabled={updateStatus.isPending}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Reagendar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;