import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePatient } from '@/hooks/useCreatePatient';
import { Users, User, Mail, Phone, Calendar, MapPin, FileText, Sparkles, Plus } from 'lucide-react';

interface CreatePatientDialogProps {
  children?: React.ReactNode;
}

const CreatePatientDialog = ({ children }: CreatePatientDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birth_date: '',
    address: '',
    notes: '',
  });

  const createPatient = useCreatePatient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createPatient.mutate({
      name: formData.name,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      birth_date: formData.birth_date || undefined,
      address: formData.address || undefined,
      notes: formData.notes || undefined,
    }, {
      onSuccess: () => {
        setOpen(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          birth_date: '',
          address: '',
          notes: '',
        });
      },
    });
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getMaxDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-xl">
            <Plus className="mr-2 h-5 w-5" />
            Novo Paciente
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl border-0 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white p-6 -m-6 mb-6">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                Novo Paciente
              </DialogTitle>
              <p className="text-green-100 mt-1">
                Cadastre um novo paciente no sistema
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 -mt-6">
          {/* Personal Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Informações Pessoais</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite o nome completo do paciente"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birth_date" className="text-sm font-semibold text-gray-700">
                  Data de Nascimento
                </Label>
                <Input
                  id="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => updateField('birth_date', e.target.value)}
                  max={getMaxDate()}
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Contato</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Endereço</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-semibold text-gray-700">
                Endereço Completo
              </Label>
              <Textarea
                id="address"
                placeholder="Rua, número, bairro, cidade, CEP..."
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                rows={3}
                className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 resize-none"
              />
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
                Notas Médicas (opcional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Adicione informações importantes sobre o paciente..."
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                rows={4}
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
              disabled={createPatient.isPending || !formData.name.trim()}
              className="flex-1 h-12 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {createPatient.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Cadastrando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Cadastrar Paciente
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePatientDialog;