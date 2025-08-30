import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Calendar, Clock, User, CheckCircle, DollarSign, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Appointment } from '@/hooks/useAppointments';
import { useUpdateAppointmentStatus } from '@/hooks/useUpdateAppointmentStatus';
import { useUpdateAppointment } from '@/hooks/useUpdateAppointment';
import { useProfessionalData, useSessionDurations } from '@/hooks/useProfessionals';
import CreateAppointmentDialog from './CreateAppointmentDialog';
import { useUserSettings } from '@/hooks/useSettings';
import { usePlans } from '@/hooks/usePlans';
import { 
  parseAppointmentDate, 
  getWeekDatesBR, 
  dateToDBFormat, 
  formatTimeBR, 
  isToday as isTodayUtil,
  formatDateBR 
} from '@/utils/dateUtils';

interface WeeklyCalendarViewProps {
  appointments: Appointment[];
  selectedDate: Date;
}

const WeeklyCalendarView = ({ appointments, selectedDate }: WeeklyCalendarViewProps) => {
  const updateStatusMutation = useUpdateAppointmentStatus();
  const updateAppointmentMutation = useUpdateAppointment();
  const { data: professionalData } = useProfessionalData();
  const { data: sessionDurations } = useSessionDurations();
  const { data: userSettings } = useUserSettings();
  const { data: plans } = usePlans();
  const [currentWeek, setCurrentWeek] = useState(selectedDate);
  const [draggedAppointment, setDraggedAppointment] = useState<Appointment | null>(null);
  
  // Estados para modal de edição
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editForm, setEditForm] = useState({
    date: '',
    time: '',
    type: '',
    plan_id: '',
    value: '',
    notes: ''
  });

  // Update value when plan is selected in edit form
  useEffect(() => {
    if (editForm.type === 'plano' && editForm.plan_id && plans) {
      const selectedPlan = plans.find(plan => plan.id === editForm.plan_id);
      if (selectedPlan) {
        setEditForm(prev => ({ ...prev, value: selectedPlan.value.toString() }));
      }
    }
  }, [editForm.type, editForm.plan_id, plans]);

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  // Funções de drag and drop
  const handleDragStart = (e: React.DragEvent, appointment: Appointment) => {
    setDraggedAppointment(appointment);
    e.dataTransfer.effectAllowed = 'move';
    console.log('🎯 Iniciando drag:', appointment.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetDate: Date, targetTime: string) => {
    e.preventDefault();
    
    if (draggedAppointment) {
      const newDate = dateToDBFormat(targetDate);
      const newTime = targetTime;

      console.log('🎯 Drop detectado:', {
        appointmentId: draggedAppointment.id,
        oldDate: draggedAppointment.date,
        oldTime: draggedAppointment.time,
        newDate,
        newTime
      });

      // Atualizar a consulta no Supabase
      updateAppointmentMutation.mutate({
        id: draggedAppointment.id,
        date: newDate,
        time: newTime
      }, {
        onSuccess: () => {
          console.log('✅ Consulta reagendada com sucesso via drag-and-drop');
        },
        onError: (error) => {
          console.error('❌ Erro ao reagendar consulta:', error);
        }
      });

      setDraggedAppointment(null);
    }
  };

  // Função para clique em agendamento - abre modal de edição
  const handleAppointmentClick = (appointment: Appointment) => {
    console.log('🎯 Clique na consulta:', appointment);
    
    setSelectedAppointment(appointment);
    setEditForm({
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      plan_id: '', // Will be populated if needed
      value: appointment.value?.toString() || '',
      notes: appointment.notes || ''
    });
    setEditDialogOpen(true);
  };

  // Função para salvar edições do modal
  const handleSaveEdit = () => {
    if (selectedAppointment) {
      const updateData: any = {
        id: selectedAppointment.id,
      };

      // Apenas incluir campos que foram alterados
      if (editForm.date !== selectedAppointment.date) {
        updateData.date = editForm.date;
      }
      if (editForm.time !== selectedAppointment.time) {
        updateData.time = editForm.time;
      }
      if (editForm.type !== selectedAppointment.type) {
        updateData.type = editForm.type;
      }
      if (editForm.value !== (selectedAppointment.value?.toString() || '')) {
        updateData.value = editForm.value ? parseFloat(editForm.value) : null;
      }
      if (editForm.notes !== (selectedAppointment.notes || '')) {
        updateData.notes = editForm.notes || null;
      }

      console.log('🔄 Salvando edição da consulta via modal:', updateData);

      updateAppointmentMutation.mutate(updateData, {
        onSuccess: () => {
          setEditDialogOpen(false);
          setSelectedAppointment(null);
          console.log('✅ Consulta editada com sucesso via modal');
        },
        onError: (error) => {
          console.error('❌ Erro ao editar consulta via modal:', error);
        }
      });
    }
  };

  // Função para obter próximo status lógico
  const getNextStatus = (currentStatus: string): 'agendado' | 'em-andamento' | 'concluido' | 'cancelado' | null => {
    switch (currentStatus) {
      case 'agendado':
        return 'em-andamento';
      case 'em-andamento':
        return 'concluido';
      case 'concluido':
        return 'agendado'; // Permitir reagendar
      case 'cancelado':
        return 'agendado';
      default:
        return null;
    }
  };

  // Gerar horários baseados nas configurações do usuário
  const generateTimeSlots = () => {
    const slots = [];
    
    // Pegar horários das configurações ou usar padrão
    const startWork = professionalData?.start_work || '08:00';
    const endWork = professionalData?.end_work || '18:00';
    
    // Pegar duração da consulta das configurações ou usar padrão
    const activeDuration = sessionDurations?.find(s => s.active);
    const intervalMinutes = activeDuration?.duration_minutes || 60;
    
    // Converter horários para minutos
    const [startHour, startMin] = startWork.split(':').map(Number);
    const [endHour, endMin] = endWork.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    // Gerar slots baseados no intervalo definido
    for (let minutes = startMinutes; minutes < endMinutes; minutes += intervalMinutes) {
      const hour = Math.floor(minutes / 60);
      const min = minutes % 60;
      const timeSlot = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      slots.push(timeSlot);
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

    // Gerar datas da semana usando utilitários brasileiros
  const weekDates = getWeekDatesBR(currentWeek);
  

  


  // Obter consultas para uma data e horário específicos
  const getAppointmentsForDateTime = (date: Date, timeSlot: string) => {
    const targetDateString = dateToDBFormat(date);
    
    const filtered = appointments.filter(appointment => {
      // Comparar datas usando função utilitária
      const dateMatches = appointment.date === targetDateString;
      
      // Comparar horários formatados
      const appointmentTime = formatTimeBR(appointment.time);
      const timeMatches = appointmentTime === timeSlot;
      
      return dateMatches && timeMatches;
    });
    
    return filtered;
  };

  // Obter cor baseada no status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'bg-blue-500 text-white';
      case 'em-andamento':
        return 'bg-orange-500 text-white';
      case 'concluido':
        return 'bg-green-500 text-white';
      case 'cancelado':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Obter ícone baseado no status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendado':
        return <Clock className="h-3 w-3" />;
      case 'em-andamento':
        return <AlertCircle className="h-3 w-3" />;
      case 'concluido':
        return <CheckCircle className="h-3 w-3" />;
      case 'cancelado':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  // Verificar se é horário de trabalho baseado nas configurações
  const isWorkingHour = (timeSlot: string) => {
    const startWork = professionalData?.start_work || '08:00';
    const endWork = professionalData?.end_work || '18:00';
    
    const [slotHour, slotMin] = timeSlot.split(':').map(Number);
    const [startHour, startMin] = startWork.split(':').map(Number);
    const [endHour, endMin] = endWork.split(':').map(Number);
    
    const slotMinutes = slotHour * 60 + slotMin;
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    return slotMinutes >= startMinutes && slotMinutes < endMinutes;
  };

  // Verificar se é horário bloqueado baseado nas configurações
  const isBlockedHour = (timeSlot: string) => {
    if (!professionalData?.blog_hours_start || !professionalData?.blog_hours_end) {
      return false;
    }
    
    const [slotHour, slotMin] = timeSlot.split(':').map(Number);
    const [blockStartHour, blockStartMin] = professionalData.blog_hours_start.split(':').map(Number);
    const [blockEndHour, blockEndMin] = professionalData.blog_hours_end.split(':').map(Number);
    
    const slotMinutes = slotHour * 60 + slotMin;
    const blockStartMinutes = blockStartHour * 60 + blockStartMin;
    const blockEndMinutes = blockEndHour * 60 + blockEndMin;
    
    return slotMinutes >= blockStartMinutes && slotMinutes < blockEndMinutes;
  };

  // Converter horário de 24h para 12h
  const formatTimeFor12h = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // Converter horário de 12h para 24h
  const parseTimeFrom12h = (time12: string) => {
    if (!time12) return '';
    const match = time12.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return time12;
    
    const [, hours, minutes, ampm] = match;
    let hour = parseInt(hours, 10);
    
    if (ampm.toUpperCase() === 'PM' && hour !== 12) {
      hour += 12;
    } else if (ampm.toUpperCase() === 'AM' && hour === 12) {
      hour = 0;
    }
    
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Header Compacto */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousWeek}
                className="p-1 h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 h-8 px-3"
              >
                Hoje
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextWeek}
                className="p-1 h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {weekDates[0].toLocaleDateString('pt-BR', { day: 'numeric' })} – {weekDates[6].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} de {weekDates[0].toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </h2>
            </div>
          </div>
          <CreateAppointmentDialog>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Consulta
            </Button>
          </CreateAppointmentDialog>
        </div>

        {/* Calendário de Grade Otimizado */}
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
                             <div className="min-w-[1400px]">
                 {/* Header dos dias */}
                 <div className="grid grid-cols-8 gap-1 bg-gray-50 border-b border-gray-200" style={{ gridTemplateColumns: '80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
                   <div className="p-3 font-semibold text-gray-700 text-sm">
                     Horário
                   </div>
                  {weekDates.map((date) => {
                                            const isTodayFlag = isTodayUtil(date);
                    return (
                      <div
                        key={date.toDateString()}
                        className={`p-3 text-center border-l border-gray-200 ${
                          isTodayFlag ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="font-semibold text-gray-900 text-sm">
                          {date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                        </div>
                        <div className="text-xs text-gray-600">
                          {date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                        </div>
                        {isTodayFlag && (
                          <Badge className="mt-1 bg-blue-500 text-white text-xs px-1 py-0">
                            Hoje
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Linhas de horário */}
                {timeSlots.map((timeSlot) => {
                  const isWorking = isWorkingHour(timeSlot);
                  const isBlocked = isBlockedHour(timeSlot);
                  
                  return (
                                         <div key={timeSlot} className="grid grid-cols-8 gap-1 border-b border-gray-100 hover:bg-gray-50 transition-colors" style={{ gridTemplateColumns: '80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
                       {/* Coluna de horário */}
                       <div className={`p-2 font-medium text-sm text-gray-700 flex items-center ${
                         isBlocked ? 'bg-red-50 text-red-600' : 
                         isWorking ? 'bg-white' : 'bg-gray-50'
                       }`}>
                         <Clock className="h-3 w-3 mr-1 text-gray-500" />
                         {timeSlot}
                       </div>

                      {/* Colunas dos dias */}
                      {weekDates.map((date) => {
                        const dayAppointments = getAppointmentsForDateTime(date, timeSlot);
                        const isTodayFlag = isTodayUtil(date);
                        
                        return (
                          <div
                            key={`${date.toDateString()}-${timeSlot}`}
                            className={`p-1 border-l border-gray-100 min-h-[60px] transition-colors ${
                              isTodayFlag ? 'bg-blue-50/50' : ''
                            } ${isBlocked ? 'bg-red-50 border-red-200' : ''} ${
                              draggedAppointment ? 'hover:bg-green-100 hover:border-green-300' : ''
                            }`}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, date, timeSlot)}
                          >
                            {dayAppointments.length > 0 ? (
                              dayAppointments.map((appointment) => (
                                <Tooltip key={appointment.id}>
                                  <TooltipTrigger asChild>
                                    <div
                                      className={`${getStatusColor(appointment.status)} rounded-md p-1 mb-1 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
                                        draggedAppointment?.id === appointment.id ? 'opacity-50 scale-95' : ''
                                      }`}
                                      draggable={true}
                                      onDragStart={(e) => handleDragStart(e, appointment)}
                                      onClick={() => handleAppointmentClick(appointment)}
                                    >
                                      <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center">
                                          {getStatusIcon(appointment.status)}
                                          <span className="ml-1 text-xs font-medium">
                                            {formatTimeBR(appointment.time)}
                                          </span>
                                        </div>
                                        <Badge variant="secondary" className="bg-white/20 text-white text-xs px-1">
                                          {appointment.type === 'particular' ? 'P' : 'Pl'}
                                        </Badge>
                                      </div>
                                      
                                      <div className="text-xs font-semibold mb-1 truncate">
                                        {appointment.patient?.name || `Paciente ${appointment.patient_id}`}
                                      </div>
                                      
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="opacity-90 truncate">
                                          {appointment.status}
                                        </span>
                                        {appointment.value && (
                                          <div className="flex items-center">
                                            <DollarSign className="h-3 w-3 mr-1" />
                                            <span>{appointment.value.toFixed(0)}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs">
                                    <div className="space-y-2">
                                      <div className="font-semibold">
                                        {appointment.patient?.name || `Paciente ${appointment.patient_id}`}
                                      </div>
                                      <div className="text-sm space-y-1">
                                        <div><strong>Horário:</strong> {formatTimeBR(appointment.time)}</div>
                                        <div><strong>Status:</strong> {appointment.status}</div>
                                        <div><strong>Tipo:</strong> {appointment.type}</div>
                                        {appointment.value && (
                                          <div><strong>Valor:</strong> R$ {appointment.value.toFixed(2)}</div>
                                        )}
                                        {appointment.notes && (
                                          <div><strong>Observações:</strong> {appointment.notes}</div>
                                        )}
                                      </div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              ))
                            ) : isBlocked ? (
                              <div className="text-center py-1 text-red-600 text-xs font-medium">
                                Bloqueado
                              </div>
                            ) : !isWorking ? (
                              <div className="text-center py-1 text-gray-400 text-xs">
                                Fechado
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legenda e Instruções */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-0 shadow-md rounded-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-900">
                Legenda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-xs text-gray-700">Agendado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-xs text-gray-700">Em Andamento</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-xs text-gray-700">Concluído</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-xs text-gray-700">Cancelado</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md rounded-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-900">
                Como Usar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs text-gray-600">
                <div>• <strong>Clique</strong> em uma consulta para editar</div>
                <div>• <strong>Arraste</strong> consultas para reagendar</div>
                <div>• <strong>Modal</strong> abre para edição completa</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal de Edição */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Editar Consulta</span>
              </DialogTitle>
              <DialogDescription>
                Edite os detalhes da consulta de {selectedAppointment?.patient?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Data</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Horário</Label>
                  {userSettings?.time_format === '12h' ? (
                    <Input
                      id="edit-time"
                      type="text"
                      placeholder="Ex: 02:30 PM"
                      value={editForm.time ? formatTimeFor12h(editForm.time) : ''}
                      onChange={(e) => {
                        const time24 = parseTimeFrom12h(e.target.value);
                        setEditForm({ ...editForm, time: time24 });
                      }}
                    />
                  ) : (
                    <Input
                      id="edit-time"
                      type="time"
                      value={editForm.time}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Tipo</Label>
                  <Select value={editForm.type} onValueChange={(value) => setEditForm({ ...editForm, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="particular">Particular</SelectItem>
                      <SelectItem value="plano">Plano de Saúde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {editForm.type === 'plano' && (
                  <div className="space-y-2">
                    <Label htmlFor="edit-plan">Plano de Saúde</Label>
                    <Select value={editForm.plan_id} onValueChange={(value) => setEditForm({ ...editForm, plan_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o plano" />
                      </SelectTrigger>
                      <SelectContent>
                        {plans?.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name} - R$ {plan.value.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="edit-value">Valor (R$)</Label>
                  <Input
                    id="edit-value"
                    type="number"
                    step="0.01"
                    value={editForm.value}
                    onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                    placeholder="0.00"
                    disabled={editForm.type === 'plano' && editForm.plan_id !== ''}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Observações</Label>
                <Textarea
                  id="edit-notes"
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  placeholder="Adicione observações sobre a consulta..."
                  rows={3}
                />
              </div>

              {/* Ações Rápidas de Status */}
              <div className="space-y-2">
                <Label>Ações Rápidas</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedAppointment?.status === 'agendado' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          updateStatusMutation.mutate({
                            appointmentId: selectedAppointment.id,
                            newStatus: 'em-andamento'
                          });
                          setEditDialogOpen(false);
                        }}
                        className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                      >
                        Iniciar Consulta
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          updateStatusMutation.mutate({
                            appointmentId: selectedAppointment.id,
                            newStatus: 'cancelado'
                          });
                          setEditDialogOpen(false);
                        }}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                  {selectedAppointment?.status === 'em-andamento' && (
                    <Button 
                      size="sm" 
                      onClick={() => {
                        updateStatusMutation.mutate({
                          appointmentId: selectedAppointment.id,
                          newStatus: 'concluido'
                        });
                        setEditDialogOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Finalizar Consulta
                    </Button>
                  )}
                  {selectedAppointment?.status === 'cancelado' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        updateStatusMutation.mutate({
                          appointmentId: selectedAppointment.id,
                          newStatus: 'agendado'
                        });
                        setEditDialogOpen(false);
                      }}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      Reagendar
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveEdit}
                disabled={updateAppointmentMutation.isPending}
              >
                {updateAppointmentMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default WeeklyCalendarView;
