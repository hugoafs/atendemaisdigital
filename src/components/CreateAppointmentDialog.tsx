import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { usePatients } from '@/hooks/usePatients';
import { useCreateAppointment } from '@/hooks/useCreateAppointment';
import { Plus, Calendar, User, Clock, DollarSign, FileText, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CreateAppointmentDialogProps {
  children?: React.ReactNode;
}

const CreateAppointmentDialog = ({ children }: CreateAppointmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    date: '',
    time: '',
    type: 'particular' as 'particular' | 'plano',
    value: '',
    notes: '',
  });

  const { data: patients } = usePatients();
  const createAppointment = useCreateAppointment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createAppointment.mutate({
      patient_id: formData.patient_id,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'agendado',
      value: formData.value ? parseFloat(formData.value) : undefined,
      notes: formData.notes || undefined,
    }, {
      onSuccess: () => {
        setOpen(false);
        setFormData({
          patient_id: '',
          date: '',
          time: '',
          type: 'particular',
          value: '',
          notes: '',
        });
      },
    });
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-xl">
            <Plus className="mr-2 h-5 w-5" />
            Nova Consulta
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 -m-6 mb-6">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                Nova Consulta
              </DialogTitle>
              <p className="text-blue-100 mt-1">
                Agende uma nova consulta para seu paciente
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 -mt-6">
          {/* Patient Selection */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Paciente</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="patient" className="text-sm font-semibold text-gray-700">
                Selecionar Paciente *
              </Label>
              <Select value={formData.patient_id} onValueChange={(value) => updateField('patient_id', value)}>
                <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Escolha um paciente..." />
                </SelectTrigger>
                <SelectContent>
                  {patients?.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {patient.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-xs text-gray-500">{patient.phone}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Agendamento</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
                  Data *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  min={getTomorrowDate()}
                  required
                  className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-semibold text-gray-700">
                  Horário *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => updateField('time', e.target.value)}
                  required
                  className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                />
              </div>
            </div>
          </div>

          {/* Type and Value */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Financeiro</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-semibold text-gray-700">
                  Tipo de Atendimento *
                </Label>
                <Select value={formData.type} onValueChange={(value: 'particular' | 'plano') => updateField('type', value)}>
                  <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="particular">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-100 text-purple-700">Particular</Badge>
                        <span>Pagamento direto</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="plano">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-700">Plano</Badge>
                        <span>Convênio médico</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="value" className="text-sm font-semibold text-gray-700">
                  Valor (R$)
                </Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={formData.value}
                  onChange={(e) => updateField('value', e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Observações</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">
                Notas (opcional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Adicione observações sobre a consulta..."
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                rows={3}
                className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 transition-all duration-300 rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createAppointment.isPending || !formData.patient_id || !formData.date || !formData.time}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {createAppointment.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Agendando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Agendar Consulta
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointmentDialog;