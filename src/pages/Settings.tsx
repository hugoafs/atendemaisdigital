import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Palette, 
  Clock,
  Globe,
  Shield,
  Save,
  Sun,
  Moon,
  Monitor,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Building,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ModernLayout from '@/components/ModernLayout';
import { useToast } from '@/hooks/use-toast';
import { 
  useProfessionalData, 
  useUpdateProfessional, 
  useSessionDurations,
  useUpdateSessionDuration,
  Professional 
} from '@/hooks/useProfessionals';
import PlansManagement from '@/components/PlansManagement';
import { Skeleton } from '@/components/ui/skeleton';

interface BlockedHour {
  start: string;
  end: string;
}

const Settings = () => {
  const { toast } = useToast();
  const { data: professionalData, isLoading: professionalLoading } = useProfessionalData();
  const { data: sessionDurations, isLoading: sessionLoading } = useSessionDurations();
  const updateProfessionalMutation = useUpdateProfessional();
  const updateSessionDurationMutation = useUpdateSessionDuration();
  
  // Estado local simples para configurações gerais
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    notifications: true,
    emailNotifications: true,
    soundEnabled: true,
    workingHoursStart: '08:00',
    workingHoursEnd: '18:00',
    appointmentDuration: '60',
    currency: 'BRL',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as string[],
    blockedHours: [] as BlockedHour[]
  });

  // Estado para dados profissionais
  const [professionalForm, setProfessionalForm] = useState<Partial<Professional>>({
    name: '',
    email: '',
    phone: '',
    professional_type: '',
    specialty: '',
    city: '',
    state: '',
    clinic_name: '',
    plan: '',
    start_work: '08:00',
    end_work: '18:00',
    days_week_work: 'Seg,Ter,Qua,Qui,Sex,Sáb',
    blog_hours_start: '',
    blog_hours_end: ''
  });

  // Inicializar formulário com dados do Supabase
  useEffect(() => {
    if (professionalData) {
      setProfessionalForm(professionalData);
    }
  }, [professionalData]);

  const handleSave = () => {
    // Salvar configurações gerais
    toast({
      title: 'Configurações salvas',
      description: 'Suas preferências foram atualizadas.',
    });
  };

  const handleSaveProfessional = () => {
    if (professionalForm) {
      updateProfessionalMutation.mutate(professionalForm);
    }
  };

  const handleSaveAll = async () => {
    try {
      // Salvar dados profissionais
      if (professionalForm) {
        await updateProfessionalMutation.mutateAsync(professionalForm);
      }

      // Salvar configurações gerais
      toast({
        title: 'Todas as configurações salvas',
        description: 'Seus dados profissionais e preferências foram atualizados com sucesso.',
      });
    } catch (error) {
      console.error('Error saving all settings:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar as configurações. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const themes = [
    { id: 'light', name: 'Claro', icon: Sun, gradient: 'from-yellow-400 to-orange-500' },
    { id: 'dark', name: 'Escuro', icon: Moon, gradient: 'from-gray-700 to-gray-900' },
    { id: 'system', name: 'Sistema', icon: Monitor, gradient: 'from-blue-500 to-purple-500' }
  ];

  return (
    <ModernLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Configurações
            </h1>
            <p className="text-gray-600 mt-2">
              Personalize sua experiência no sistema
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="rounded-xl"
            >
              Restaurar Padrões
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Professional Data */}
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                <span>Dados Profissionais</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {professionalLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="professional_name">Nome Completo</Label>
                      <Input
                        id="professional_name"
                        value={professionalForm.name || ''}
                        onChange={(e) => setProfessionalForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Seu nome completo"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="professional_email">Email</Label>
                      <Input
                        id="professional_email"
                        type="email"
                        value={professionalForm.email || ''}
                        onChange={(e) => setProfessionalForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="seu@email.com"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="professional_phone">Telefone</Label>
                      <Input
                        id="professional_phone"
                        value={professionalForm.phone || ''}
                        onChange={(e) => setProfessionalForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="professional_type">Tipo Profissional</Label>
                      <Input
                        id="professional_type"
                        value={professionalForm.professional_type || ''}
                        onChange={(e) => setProfessionalForm(prev => ({ ...prev, professional_type: e.target.value }))}
                        placeholder="Ex: Médico, Dentista, Psicólogo"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Especialidade</Label>
                      <Input
                        id="specialty"
                        value={professionalForm.specialty || ''}
                        onChange={(e) => setProfessionalForm(prev => ({ ...prev, specialty: e.target.value }))}
                        placeholder="Sua especialidade"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clinic_name">Nome da Clínica</Label>
                      <Input
                        id="clinic_name"
                        value={professionalForm.clinic_name || ''}
                        onChange={(e) => setProfessionalForm(prev => ({ ...prev, clinic_name: e.target.value }))}
                        placeholder="Nome da sua clínica"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={professionalForm.city || ''}
                        onChange={(e) => setProfessionalForm(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Sua cidade"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={professionalForm.state || ''}
                        onChange={(e) => setProfessionalForm(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="SP"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="plan">Plano Atual</Label>
                      <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-blue-900">
                              Plano {professionalForm.plan === 'pro' ? 'Pro' : 'Básico'}
                            </span>
                            <p className="text-sm text-blue-700">
                              {professionalForm.plan === 'pro' 
                                ? 'Recursos avançados incluídos' 
                                : 'Recursos básicos'}
                            </p>
                          </div>
                          <Badge className={professionalForm.plan === 'pro' ? 'bg-purple-500' : 'bg-blue-500'}>
                            {professionalForm.plan === 'pro' ? 'PRO' : 'BÁSICO'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>




                </>
              )}
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span>Conta e Perfil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select 
                    value={settings.language} 
                    onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">🇧🇷 Português</SelectItem>
                      <SelectItem value="en-US">🇺🇸 English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select 
                    value={settings.timezone}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">🇧🇷 Brasília (UTC-3)</SelectItem>
                      <SelectItem value="America/New_York">🇺🇸 Nova York (UTC-5)</SelectItem>
                      <SelectItem value="Europe/London">🇬🇧 Londres (UTC+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Formato de Data</Label>
                  <Select 
                    value={settings.dateFormat}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, dateFormat: value }))}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/MM/yyyy">DD/MM/AAAA (Brasileiro)</SelectItem>
                      <SelectItem value="MM/dd/yyyy">MM/DD/YYYY (Americano)</SelectItem>
                      <SelectItem value="yyyy-MM-dd">AAAA-MM-DD (ISO)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeFormat">Formato de Hora</Label>
                  <Select 
                    value={settings.timeFormat}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, timeFormat: value }))}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24 horas (15:30)</SelectItem>
                      <SelectItem value="12h">12 horas (3:30 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Palette className="h-4 w-4 text-white" />
                </div>
                <span>Aparência</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Tema</Label>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {themes.map((theme) => {
                    const Icon = theme.icon;
                    const isSelected = settings.theme === theme.id;
                    
                    return (
                      <button
                        key={theme.id}
                        onClick={() => setSettings(prev => ({ ...prev, theme: theme.id }))}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-8 h-8 bg-gradient-to-br ${theme.gradient} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {theme.name}
                        </div>
                        {isSelected && (
                          <Badge className="mt-2 bg-blue-500">Ativo</Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <span>Horário de Trabalho</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Expediente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Início do Expediente</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={professionalForm.start_work || '08:00'}
                    onChange={(e) => setProfessionalForm(prev => ({ ...prev, start_work: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">Fim do Expediente</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={professionalForm.end_work || '18:00'}
                    onChange={(e) => setProfessionalForm(prev => ({ ...prev, end_work: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Duração da Consulta */}
              <div className="space-y-2">
                <Label htmlFor="appointmentDuration">Duração Padrão da Consulta</Label>
                {sessionLoading ? (
                  <Skeleton className="h-12 w-full" />
                ) : (
                  <Select 
                    value={sessionDurations?.find(s => s.active)?.duration_minutes?.toString() || '60'}
                    onValueChange={(value) => {
                      const duration = parseInt(value);
                      updateSessionDurationMutation.mutate({ duration_minutes: duration });
                    }}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="50">50 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="90">1 hora e 30 minutos</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Dias de Atendimento */}
              <div className="space-y-2">
                <Label>Dias de Atendimento</Label>
                <div className="grid grid-cols-7 gap-2 mt-3">
                  {[
                    { key: 'Seg', label: 'Seg' },
                    { key: 'Ter', label: 'Ter' },
                    { key: 'Qua', label: 'Qua' },
                    { key: 'Qui', label: 'Qui' },
                    { key: 'Sex', label: 'Sex' },
                    { key: 'Sáb', label: 'Sáb' },
                    { key: 'Dom', label: 'Dom' }
                  ].map((day) => {
                    const currentDays = professionalForm.days_week_work?.split(',') || [];
                    const isSelected = currentDays.includes(day.key);
                    
                    return (
                      <button
                        key={day.key}
                        onClick={() => {
                          const newDays = isSelected 
                            ? currentDays.filter(d => d !== day.key)
                            : [...currentDays, day.key];
                          setProfessionalForm(prev => ({ ...prev, days_week_work: newDays.join(',') }));
                        }}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          isSelected 
                            ? 'bg-green-500 text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Horários Bloqueados */}
              <div className="space-y-4">
                <Label>Horários Bloqueados</Label>
                <div className="space-y-3">
                  {(professionalForm.blog_hours_start && professionalForm.blog_hours_end) ? (
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl border border-red-200">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Input
                          type="time"
                          value={professionalForm.blog_hours_start || ''}
                          onChange={(e) => setProfessionalForm(prev => ({ ...prev, blog_hours_start: e.target.value }))}
                          className="rounded-lg"
                          placeholder="Início"
                        />
                        <Input
                          type="time"
                          value={professionalForm.blog_hours_end || ''}
                          onChange={(e) => setProfessionalForm(prev => ({ ...prev, blog_hours_end: e.target.value }))}
                          className="rounded-lg"
                          placeholder="Fim"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setProfessionalForm(prev => ({ 
                            ...prev, 
                            blog_hours_start: '', 
                            blog_hours_end: '' 
                          }));
                        }}
                        className="text-red-600 hover:bg-red-100"
                      >
                        Remover
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">Nenhum horário bloqueado</p>
                  )}
                  
                  {(!professionalForm.blog_hours_start || !professionalForm.blog_hours_end) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setProfessionalForm(prev => ({ 
                          ...prev, 
                          blog_hours_start: '12:00', 
                          blog_hours_end: '13:00' 
                        }));
                      }}
                      className="w-full rounded-xl"
                    >
                      + Adicionar Horário Bloqueado
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Bell className="h-4 w-4 text-white" />
                </div>
                <span>Notificações</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="notifications">Ativar Notificações</Label>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="emailNotifications">Email</Label>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="soundEnabled">Som</Label>
                </div>
                <Switch
                  id="soundEnabled"
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, soundEnabled: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Planos de Saúde */}
          <PlansManagement />

          {/* System Info */}
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span>Sistema</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-900">Atende+ Digital</span>
                  <Badge className="bg-green-500 text-white">v2.1.0</Badge>
                </div>
                <p className="text-sm text-blue-700">
                  Sistema de gestão para profissionais de saúde
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="font-medium text-gray-900">Status</div>
                  <div className="text-green-600 font-medium">✓ Online</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="font-medium text-gray-900">Uptime</div>
                  <div className="text-blue-600 font-medium">99.9%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botão de Salvar Geral */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          onClick={handleSaveAll}
          disabled={updateProfessionalMutation.isPending || updateSessionDurationMutation.isPending}
          className="h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
        >
          <Save className="h-5 w-5 mr-3" />
          <span className="font-semibold text-lg">
            {(updateProfessionalMutation.isPending || updateSessionDurationMutation.isPending) 
              ? 'Salvando...' 
              : 'Salvar Todas as Configurações'
            }
          </span>
        </Button>
      </div>
    </ModernLayout>
  );
};

export default Settings;