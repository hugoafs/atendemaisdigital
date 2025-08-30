import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Edit, Trash2, MoreVertical, DollarSign, FileText } from 'lucide-react';
import { usePlans, useCreatePlan, useUpdatePlan, useDeletePlan, Plan } from '@/hooks/usePlans';

interface PlanFormData {
  name: string;
  value: string;
}

const PlansManagement = () => {
  const { data: plans, isLoading, error } = usePlans();
  const createPlanMutation = useCreatePlan();
  const updatePlanMutation = useUpdatePlan();
  const deletePlanMutation = useDeletePlan();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const [createForm, setCreateForm] = useState<PlanFormData>({
    name: '',
    value: '',
  });

  const [editForm, setEditForm] = useState<PlanFormData>({
    name: '',
    value: '',
  });

  const handleCreatePlan = async () => {
    if (!createForm.name || !createForm.value) return;

    try {
      await createPlanMutation.mutateAsync({
        name: createForm.name,
        value: parseFloat(createForm.value),
      });

      setCreateForm({ name: '', value: '' });
      setCreateDialogOpen(false);
    } catch (error) {
      console.error('Erro ao criar plano:', error);
    }
  };

  const handleEditPlan = async () => {
    if (!selectedPlan || !editForm.name || !editForm.value) return;

    try {
      await updatePlanMutation.mutateAsync({
        id: selectedPlan.id,
        name: editForm.name,
        value: parseFloat(editForm.value),
      });

      setEditDialogOpen(false);
      setSelectedPlan(null);
    } catch (error) {
      console.error('Erro ao editar plano:', error);
    }
  };

  const openEditDialog = (plan: Plan) => {
    setSelectedPlan(plan);
    setEditForm({
      name: plan.name,
      value: plan.value.toString(),
    });
    setEditDialogOpen(true);
  };

  const handleDeletePlan = async (planId: string) => {
    if (window.confirm('Tem certeza que deseja remover este plano?')) {
      try {
        await deletePlanMutation.mutateAsync(planId);
      } catch (error) {
        console.error('Erro ao deletar plano:', error);
      }
    }
  };

  return (
    <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900">Planos de Saúde</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Configure os planos que você atende
              </p>
            </div>
          </div>
          
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Plano
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Plano</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="create-name">Nome do Plano</Label>
                  <Input
                    id="create-name"
                    placeholder="Ex: Unimed, Bradesco Saúde..."
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-value">Valor da Consulta</Label>
                  <Input
                    id="create-value"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={createForm.value}
                    onChange={(e) => setCreateForm({ ...createForm, value: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setCreateDialogOpen(false)}
                    className="rounded-xl"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleCreatePlan}
                    disabled={createPlanMutation.isPending || !createForm.name || !createForm.value}
                    className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600"
                  >
                    {createPlanMutation.isPending ? 'Criando...' : 'Criar Plano'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Erro ao carregar planos
            </h3>
            <p className="text-red-600 mb-4">
              {error.message || 'Não foi possível carregar os planos de saúde'}
            </p>
            <p className="text-sm text-red-500">
              Verifique se a tabela 'plans' existe no Supabase
            </p>
          </div>
        ) : isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            ))}
          </div>
        ) : plans && plans.length > 0 ? (
          <div className="space-y-3">
            {plans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-white/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="rounded-full">
                          R$ {plan.value.toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(plan)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDeletePlan(plan.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum plano configurado
            </h3>
            <p className="text-gray-600 mb-4">
              Adicione os planos de saúde que você atende
            </p>
          </div>
        )}

        {/* Dialog de Edição */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Editar Plano</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome do Plano</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-value">Valor da Consulta</Label>
                <Input
                  id="edit-value"
                  type="number"
                  step="0.01"
                  value={editForm.value}
                  onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setEditDialogOpen(false)}
                  className="rounded-xl"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleEditPlan}
                  disabled={updatePlanMutation.isPending || !editForm.name || !editForm.value}
                  className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600"
                >
                  {updatePlanMutation.isPending ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PlansManagement;
