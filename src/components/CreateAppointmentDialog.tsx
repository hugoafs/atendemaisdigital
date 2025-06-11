
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { usePatients } from '@/hooks/usePatients';
import { useCreateAppointment } from '@/hooks/useCreateAppointment';
import { Plus } from 'lucide-react';

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

  const trigger = children || (
    <Button className="bg-blue-600 hover:bg-blue-700">
      <Plus size={16} className="mr-2" />
      Agendar Consulta
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar Nova Consulta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient">Paciente</Label>
            <Select value={formData.patient_id} onValueChange={(value) => setFormData({ ...formData, patient_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um paciente" />
              </SelectTrigger>
              <SelectContent>
                {patients?.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Horário</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={formData.type} onValueChange={(value: 'particular' | 'plano') => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="particular">Particular</SelectItem>
                  <SelectItem value="plano">Plano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Valor (R$)</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Observações sobre a consulta..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createAppointment.isPending}>
              {createAppointment.isPending ? 'Agendando...' : 'Agendar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointmentDialog;
