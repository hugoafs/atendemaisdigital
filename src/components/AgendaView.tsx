
import { useState, useEffect } from 'react';
import { Calendar, List, Plus, Filter, Activity, AlertCircle, Grid3X3, CalendarDays, MoreVertical, Edit, Trash2, RotateCcw, Users, TrendingUp, Clock, User, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AgendaCalendar from './AgendaCalendar';
import KanbanView from './KanbanView';
import WeeklyCalendarView from './WeeklyCalendarView';
import AppointmentsList from './AppointmentsList';
import CreateAppointmentDialog from './CreateAppointmentDialog';
import { useAppointments } from '@/hooks/useAppointments';
import { useAuth } from '@/contexts/AuthContext';
import { useUpdateAppointmentStatus } from '@/hooks/useUpdateAppointmentStatus';
import { useUpdateAppointment } from '@/hooks/useUpdateAppointment';
import { usePlans } from '@/hooks/usePlans';
import { Skeleton } from '@/components/ui/skeleton';
import { Appointment } from '@/hooks/useAppointments';
import { 
  parseAppointmentDate, 
  isSameDate, 
  normalizeDate, 
  formatDateBR, 
  formatTimeBR,
  isToday as isTodayUtil
} from '@/utils/dateUtils';

const AgendaView = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const { data: appointments, isLoading, error } = useAppointments();
  const { user } = useAuth();
  const updateStatusMutation = useUpdateAppointmentStatus();
  const updateAppointmentMutation = useUpdateAppointment();
  const { data: plans } = usePlans();

  // Estados para diálogos
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  // Estados para formulário de edição
  const [editForm, setEditForm] = useState({
    date: '',
    time: '',
    type: '',
    plan_id: '',
    value: '',
    notes: ''
  });

  // Estados para formulário de reagendamento
  const [rescheduleForm, setRescheduleForm] = useState({
    date: '',
    time: ''
  });

  // Update value when plan is selected in edit form
  useEffect(() => {
    if (editForm.type === 'plano' && editForm.plan_id && plans) {
      const selectedPlan = plans.find(plan => plan.id === editForm.plan_id);
      if (selectedPlan) {
        setEditForm(prev => ({ ...prev, value: selectedPlan.value.toString() }));
      }
    } else if (editForm.type === 'particular') {
      setEditForm(prev => ({ ...prev, plan_id: '' }));
    }
  }, [editForm.type, editForm.plan_id, plans]);

  // Funções de data agora vêm dos utilitários brasileiros

  // useEffect para monitorar mudanças na data selecionada
  useEffect(() => {
    console.log('🔄 AgendaView - selectedDate changed to:', selectedDate.toDateString());
  }, [selectedDate]);



  // Filter appointments for selected date using Brazilian date utilities
  const selectedDateAppointments = appointments?.filter(appointment => {
    try {
      const appointmentDate = parseAppointmentDate(appointment.date);
      const matches = isSameDate(appointmentDate, selectedDate);
      
      // Debug específico para identificar problema de data
      if (appointment.date && selectedDate) {
        console.log('🔍 Date comparison:', {
          appointmentDateString: appointment.date,
          appointmentDateParsed: appointmentDate.toDateString(),
          selectedDateString: selectedDate.toDateString(),
          appointmentDay: appointmentDate.getDate(),
          selectedDay: selectedDate.getDate(),
          appointmentMonth: appointmentDate.getMonth(),
          selectedMonth: selectedDate.getMonth(),
          matches
        });
      }
      
      return matches;
    } catch (error) {
      console.error('Error filtering appointment:', error, appointment);
      return false;
    }
  }) || [];



  // Get appointments count for today using Brazilian date utilities
  const today = new Date();
  const todayAppointments = appointments?.filter(appointment => {
    try {
      const appointmentDate = parseAppointmentDate(appointment.date);
      return isTodayUtil(appointmentDate);
    } catch (error) {
      console.error('Error filtering today appointment:', error, appointment);
      return false;
    }
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'bg-blue-100 text-blue-800';
      case 'em-andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'concluido':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (appointmentId: string, newStatus: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado') => {
    updateStatusMutation.mutate({
      appointmentId,
      newStatus
    });
  };

  const handleEditAppointment = (appointment: Appointment) => {
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

  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelDialogOpen(true);
  };

  const handleRescheduleAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleForm({
      date: appointment.date,
      time: appointment.time
    });
    setRescheduleDialogOpen(true);
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    // TODO: Implementar exclusão de consulta
    console.log('Excluir consulta:', appointment);
  };

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

      console.log('🔄 Salvando edição da consulta:', updateData);

      updateAppointmentMutation.mutate(updateData, {
        onSuccess: () => {
          setEditDialogOpen(false);
          setSelectedAppointment(null);
          console.log('✅ Consulta editada com sucesso');
        },
        onError: (error) => {
          console.error('❌ Erro ao editar consulta:', error);
        }
      });
    }
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      handleStatusChange(selectedAppointment.id, 'cancelado');
      setCancelDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  const handleSaveReschedule = () => {
    if (selectedAppointment) {
      // TODO: Implementar reagendamento no Supabase
      console.log('Reagendando:', { id: selectedAppointment.id, ...rescheduleForm });
      setRescheduleDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  // Se houver erro, mostrar mensagem de erro
  if (error) {
    return (
      <div className="space-y-8">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Erro ao carregar a agenda: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Se está carregando, mostrar skeleton
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="mb-8">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full" />
          </div>
          <div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Agenda 📅
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Gerencie suas consultas e horários de forma eficiente
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-1.5 shadow-inner">
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('month')}
                className={`
                  relative rounded-xl transition-all duration-300 transform hover:scale-105
                  ${viewMode === 'month' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/70 hover:shadow-md'
                  }
                `}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Mês
                {viewMode === 'month' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-20 animate-pulse"></div>
                )}
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('week')}
                className={`
                  relative rounded-xl transition-all duration-300 transform hover:scale-105
                  ${viewMode === 'week' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/70 hover:shadow-md'
                  }
                `}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Semana
                {viewMode === 'week' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-20 animate-pulse"></div>
                )}
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('day')}
                className={`
                  relative rounded-xl transition-all duration-300 transform hover:scale-105
                  ${viewMode === 'day' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/70 hover:shadow-md'
                  }
                `}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Dia
                {viewMode === 'day' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl opacity-20 animate-pulse"></div>
                )}
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Consultas Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Consultas</p>
                <p className="text-2xl font-bold text-gray-900">{appointments?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Ocupação</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Calendário</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center space-x-2">
            <List className="h-4 w-4" />
            <span>Lista</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className={`grid grid-cols-1 gap-8 ${viewMode === 'week' || viewMode === 'day' ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
            {/* Calendar */}
            <div className={viewMode === 'week' || viewMode === 'day' ? 'w-full' : 'lg:col-span-2'}>
              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          Calendário de Consultas
                        </CardTitle>
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="font-medium">Visualização:</span> {
                            viewMode === 'month' ? 'Mensal' : 
                            viewMode === 'week' ? 'Semanal (Grade)' : 'Diária (Kanban)'
                          }
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointments?.length || 0} consulta(s) total
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode === 'month' ? (
                    <AgendaCalendar 
                      selectedDate={selectedDate}
                      onSelectDate={(date) => {
                        // Normalizar a data para evitar problemas de timezone
                        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        console.log('📅 Data selecionada normalizada:', normalizedDate.toDateString());
                        setSelectedDate(normalizedDate);
                      }}
                      appointments={appointments || []}
                    />
                  ) : viewMode === 'week' ? (
                    <WeeklyCalendarView
                      appointments={appointments || []}
                      selectedDate={selectedDate}
                    />
                  ) : (
                    <KanbanView
                      appointments={appointments || []}
                      viewMode={viewMode}
                      selectedDate={selectedDate}
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Side Panel - Selected Date Appointments */}
            {viewMode !== 'week' && viewMode !== 'day' && (
              <div>
                <Card className="border-0 shadow-xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      Consultas para {selectedDate.toLocaleDateString('pt-BR')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-24 w-full rounded-xl" />
                        ))}
                      </div>
                    ) : selectedDateAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {selectedDateAppointments.map((appointment) => (
                          <div key={appointment.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-200 bg-white">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-semibold text-gray-900">
                                {appointment.patient?.name || `Paciente ${appointment.patient_id}`}
                              </span>
                              <div className="flex items-center space-x-2">
                                <Badge className={`${getStatusColor(appointment.status)} rounded-full px-3 py-1 text-xs font-medium`}>
                                  {appointment.status}
                                </Badge>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEditAppointment(appointment)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {appointment.status === 'agendado' && (
                                      <>
                                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'em-andamento')}>
                                          <Activity className="h-4 w-4 mr-2" />
                                          Iniciar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleCancelAppointment(appointment)}>
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Cancelar
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                    {appointment.status === 'em-andamento' && (
                                      <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'concluido')}>
                                        <Activity className="h-4 w-4 mr-2" />
                                        Finalizar
                                      </DropdownMenuItem>
                                    )}
                                    {appointment.status === 'cancelado' && (
                                      <DropdownMenuItem onClick={() => handleRescheduleAppointment(appointment)}>
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        Reagendar
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleDeleteAppointment(appointment)} className="text-red-600">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Excluir
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p className="flex items-center">
                                <span className="font-medium text-gray-700">Horário:</span>
                                <span className="ml-2">{appointment.time}</span>
                              </p>
                              <p className="flex items-center">
                                <span className="font-medium text-gray-700">Tipo:</span>
                                <span className="ml-2">{appointment.type}</span>
                              </p>
                              {appointment.value && (
                                <p className="flex items-center">
                                  <span className="font-medium text-gray-700">Valor:</span>
                                  <span className="ml-2 text-green-600 font-semibold">R$ {appointment.value.toFixed(2)}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Calendar className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Nenhuma consulta
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Não há consultas agendadas para esta data
                        </p>
                        <CreateAppointmentDialog>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl">
                            <Plus className="h-4 w-4 mr-2" />
                            Agendar Consulta
                          </Button>
                        </CreateAppointmentDialog>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <List className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">
                    Lista de Consultas
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Visualize todas as suas consultas em formato de lista
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentsList appointments={appointments || []} isLoading={false} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de Edição */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Editar Consulta</span>
            </DialogTitle>
            <DialogDescription>
              Edite os detalhes da consulta do paciente {selectedAppointment?.patient?.name}
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
                <Input
                  id="edit-time"
                  type="time"
                  value={editForm.time}
                  onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                />
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
            </div>
            
            <div className="grid grid-cols-1 gap-4">
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

      {/* Dialog de Confirmação de Cancelamento */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              <span>Confirmar Cancelamento</span>
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar a consulta do paciente{' '}
              <strong>{selectedAppointment?.patient?.name}</strong>?
              <br />
              <span className="text-sm text-gray-500">
                Data: {selectedAppointment?.date} às {selectedAppointment?.time}
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Não, manter consulta
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancel}>
              Sim, cancelar consulta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Reagendamento */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5" />
              <span>Reagendar Consulta</span>
            </DialogTitle>
            <DialogDescription>
              Escolha uma nova data e horário para a consulta do paciente{' '}
              <strong>{selectedAppointment?.patient?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reschedule-date">Nova Data</Label>
              <Input
                id="reschedule-date"
                type="date"
                value={rescheduleForm.date}
                onChange={(e) => setRescheduleForm({ ...rescheduleForm, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reschedule-time">Novo Horário</Label>
              <Input
                id="reschedule-time"
                type="time"
                value={rescheduleForm.time}
                onChange={(e) => setRescheduleForm({ ...rescheduleForm, time: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveReschedule}>
              Confirmar Reagendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgendaView;
