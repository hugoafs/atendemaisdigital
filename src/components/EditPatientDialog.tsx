import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUpdatePatient } from '@/hooks/useUpdatePatient';
import { Patient } from '@/hooks/usePatients';
import { Edit } from 'lucide-react';

interface EditPatientDialogProps {
  patient: Patient;
  children?: React.ReactNode;
}

const EditPatientDialog = ({ patient, children }: EditPatientDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: patient.name,
    email: patient.email || '',
    phone: patient.phone || '',
    address: patient.address || '',
    birth_date: patient.birth_date || '',
    notes: patient.notes || '',
  });

  const updatePatientMutation = useUpdatePatient();

  // Reset form when patient changes
  useEffect(() => {
    setFormData({
      name: patient.name,
      email: patient.email || '',
      phone: patient.phone || '',
      address: patient.address || '',
      birth_date: patient.birth_date || '',
      notes: patient.notes || '',
    });
  }, [patient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      return;
    }

    // Only send changed fields
    const changedData: any = { id: patient.id };
    
    if (formData.name !== patient.name) changedData.name = formData.name;
    if (formData.email !== (patient.email || '')) changedData.email = formData.email || null;
    if (formData.phone !== (patient.phone || '')) changedData.phone = formData.phone || null;
    if (formData.address !== (patient.address || '')) changedData.address = formData.address || null;
    if (formData.birth_date !== (patient.birth_date || '')) changedData.birth_date = formData.birth_date || null;
    if (formData.notes !== (patient.notes || '')) changedData.notes = formData.notes || null;

    // Only update if there are changes
    if (Object.keys(changedData).length > 1) {
      updatePatientMutation.mutate(changedData, {
        onSuccess: () => {
          setOpen(false);
        }
      });
    } else {
      setOpen(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="rounded-lg">
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit className="h-5 w-5 text-blue-600" />
            <span>Editar Paciente</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nome do paciente"
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="email@exemplo.com"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="birth_date">Data de Nascimento</Label>
              <Input
                id="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={(e) => handleInputChange('birth_date', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Endereço completo"
                className="mt-1"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Observações sobre o paciente, histórico médico, etc."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={updatePatientMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updatePatientMutation.isPending || !formData.name.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {updatePatientMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPatientDialog;
