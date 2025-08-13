
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Mail, Phone, Building, GraduationCap, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Constants } from '@/integrations/supabase/types';

const Auth = () => {
  // Estados para login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para cadastro
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    professionalType: '',
    specialty: '',
    clinicName: '',
    city: '',
    state: '',
    plan: 'basic'
  });
  
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: 'Erro no login',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo de volta.',
        });
        navigate('/app');
      }
    } catch (error) {
      toast({
        title: 'Erro inesperado',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validações
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: 'Erro no cadastro',
        description: 'As senhas não coincidem.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        title: 'Erro no cadastro',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    try {
      // Primeiro, criar o usuário no auth
      const { data: authData, error: authError } = await signUp(signUpData.email, signUpData.password);
      
      if (authError) {
        toast({
          title: 'Erro no cadastro',
          description: authError.message,
          variant: 'destructive',
        });
        return;
      }

      if (authData.user) {
        // Depois, inserir os dados na tabela professionals
        const { error: profileError } = await supabase
          .from('professionals')
          .insert({
            user_id: authData.user.id,
            full_name: signUpData.fullName,
            email: signUpData.email,
            phone: signUpData.phone,
            professional_type: signUpData.professionalType,
            specialty: signUpData.specialty,
            clinic_name: signUpData.clinicName,
            city: signUpData.city,
            state: signUpData.state,
            plan: signUpData.plan
          });

        if (profileError) {
          toast({
            title: 'Erro ao salvar perfil',
            description: 'Perfil criado mas dados não foram salvos. Entre em contato com o suporte.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Cadastro realizado com sucesso!',
            description: 'Verifique seu email para confirmar a conta.',
          });
        }

        // Limpar formulário
        setSignUpData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          professionalType: '',
          specialty: '',
          clinicName: '',
          city: '',
          state: '',
          plan: 'basic'
        });
      }
    } catch (error) {
      toast({
        title: 'Erro inesperado',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSignUpField = (field: string, value: string) => {
    setSignUpData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Atende+ Digital
          </CardTitle>
          <CardDescription className="text-lg text-slate-600">
            Gerencie seu consultório de forma eficiente e profissional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" className="text-base">Entrar</TabsTrigger>
              <TabsTrigger value="signup" className="text-base">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-0">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                    <User className="inline w-4 h-4 mr-2" />
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <Button type="submit" className="w-full h-11 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Entrar
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-0">
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Informações Pessoais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                      <User className="inline w-4 h-4 mr-2" />
                      Nome Completo
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome completo"
                      value={signUpData.fullName}
                      onChange={(e) => updateSignUpField('fullName', e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                      <Phone className="inline w-4 h-4 mr-2" />
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={signUpData.phone}
                      onChange={(e) => updateSignUpField('phone', e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium text-slate-700">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={signUpData.email}
                    onChange={(e) => updateSignUpField('email', e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                {/* Informações Profissionais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="professionalType" className="text-sm font-medium text-slate-700">
                      <GraduationCap className="inline w-4 h-4 mr-2" />
                      Tipo de Profissional
                    </Label>
                    <Select value={signUpData.professionalType} onValueChange={(value) => updateSignUpField('professionalType', value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Constants.public.Enums.professional_type.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty" className="text-sm font-medium text-slate-700">
                      <GraduationCap className="inline w-4 h-4 mr-2" />
                      Especialidade
                    </Label>
                    <Input
                      id="specialty"
                      type="text"
                      placeholder="Sua especialidade"
                      value={signUpData.specialty}
                      onChange={(e) => updateSignUpField('specialty', e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                {/* Informações da Clínica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName" className="text-sm font-medium text-slate-700">
                      <Building className="inline w-4 h-4 mr-2" />
                      Nome da Clínica
                    </Label>
                    <Input
                      id="clinicName"
                      type="text"
                      placeholder="Nome da sua clínica"
                      value={signUpData.clinicName}
                      onChange={(e) => updateSignUpField('clinicName', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan" className="text-sm font-medium text-slate-700">
                      <Building className="inline w-4 h-4 mr-2" />
                      Plano Escolhido
                    </Label>
                    <Select value={signUpData.plan} onValueChange={(value) => updateSignUpField('plan', value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Básico - R$ 49,90/mês</SelectItem>
                        <SelectItem value="pro">Pro - R$ 99,90/mês</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium text-slate-700">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Cidade
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Sua cidade"
                      value={signUpData.city}
                      onChange={(e) => updateSignUpField('city', e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium text-slate-700">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Estado
                    </Label>
                    <Select value={signUpData.state} onValueChange={(value) => updateSignUpField('state', value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AC">Acre</SelectItem>
                        <SelectItem value="AL">Alagoas</SelectItem>
                        <SelectItem value="AP">Amapá</SelectItem>
                        <SelectItem value="AM">Amazonas</SelectItem>
                        <SelectItem value="BA">Bahia</SelectItem>
                        <SelectItem value="CE">Ceará</SelectItem>
                        <SelectItem value="DF">Distrito Federal</SelectItem>
                        <SelectItem value="ES">Espírito Santo</SelectItem>
                        <SelectItem value="GO">Goiás</SelectItem>
                        <SelectItem value="MA">Maranhão</SelectItem>
                        <SelectItem value="MT">Mato Grosso</SelectItem>
                        <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        <SelectItem value="PA">Pará</SelectItem>
                        <SelectItem value="PB">Paraíba</SelectItem>
                        <SelectItem value="PR">Paraná</SelectItem>
                        <SelectItem value="PE">Pernambuco</SelectItem>
                        <SelectItem value="PI">Piauí</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                        <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                        <SelectItem value="RO">Rondônia</SelectItem>
                        <SelectItem value="RR">Roraima</SelectItem>
                        <SelectItem value="SC">Santa Catarina</SelectItem>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="SE">Sergipe</SelectItem>
                        <SelectItem value="TO">Tocantins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Senhas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium text-slate-700">
                      <User className="inline w-4 h-4 mr-2" />
                      Senha
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signUpData.password}
                      onChange={(e) => updateSignUpField('password', e.target.value)}
                      required
                      minLength={6}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                      <User className="inline w-4 h-4 mr-2" />
                      Confirmar Senha
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={signUpData.confirmPassword}
                      onChange={(e) => updateSignUpField('confirmPassword', e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Criar Conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
