import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Building, 
  GraduationCap, 
  MapPin, 
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Shield
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  // Estados para login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
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
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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
          description: 'Bem-vindo de volta!',
        });
        navigate('/app');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast({
        title: 'Erro no login',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSignUpField = (field: string, value: string) => {
    setSignUpData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validações do formulário
    if (!signUpData.fullName.trim()) {
      toast({
        title: 'Erro no cadastro',
        description: 'Nome completo é obrigatório.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    if (!signUpData.email.trim()) {
      toast({
        title: 'Erro no cadastro',
        description: 'Email é obrigatório.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

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

    if (!signUpData.phone.trim()) {
      toast({
        title: 'Erro no cadastro',
        description: 'Telefone é obrigatório.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    if (!signUpData.professionalType) {
      toast({
        title: 'Erro no cadastro',
        description: 'Tipo de profissional é obrigatório.',
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
        console.log('🚀 Usuário Auth criado, preparando dados do profissional...');

        // Preparar dados limpos para inserção
        const professionalData = {
          user_id: authData.user.id,
          name: signUpData.fullName.trim(),
          email: signUpData.email.toLowerCase().trim(),
          phone: signUpData.phone.replace(/\D/g, ''), // Remove caracteres não numéricos
          professional_type: signUpData.professionalType,
          specialty: signUpData.specialty.trim(),
          clinic_name: signUpData.clinicName.trim(),
          city: signUpData.city.trim(),
          state: signUpData.state,
          plan: signUpData.plan,
          is_active: true,
          working_hours: ""
        };

        const { data: insertData, error: profileError } = await supabase
          .from('professionals')
          .insert(professionalData)
          .select()
          .single();

        if (profileError) {
          console.error('❌ Erro ao inserir dados do profissional:', profileError);
          console.error('📋 Dados que causaram erro:', professionalData);
          
          toast({
            title: 'Erro ao salvar perfil',
            description: `Erro: ${profileError.message}. Código: ${profileError.code}`,
            variant: 'destructive',
          });
          return;
        }

        console.log('✅ Perfil profissional criado com sucesso:', insertData);
        
        toast({
          title: 'Cadastro realizado com sucesso!',
          description: 'Bem-vindo ao Atende+ Digital!',
          variant: 'default',
        });
        
        // Redirecionar para a área logada
        navigate('/app');

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
      console.error('Erro no cadastro:', error);
      toast({
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/5 to-purple-300/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group">
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Voltar</span>
        </Link>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Atende+ Digital
          </h1>
        </div>
        <div className="w-20"></div> {/* Spacer for balance */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 py-8 min-h-[calc(100vh-120px)]">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-8 bg-gradient-to-br from-white to-blue-50/30">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Bem-vindo!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Acesse sua conta ou crie uma nova para começar
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-2xl">
                <TabsTrigger 
                  value="signin" 
                  className="text-base font-semibold rounded-xl transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-600"
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="text-base font-semibold rounded-xl transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-600"
                >
                  Cadastrar
                </TabsTrigger>
              </TabsList>
              
              {/* Login Tab */}
              <TabsContent value="signin" className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Entre na sua conta</h3>
                  <p className="text-gray-600">Gerencie seu consultório de forma eficiente</p>
                </div>
                
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-blue-600" />
                      Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Crie sua conta</h3>
                  <p className="text-gray-600">Comece a transformar seu consultório hoje</p>
                </div>
                
                <form onSubmit={handleSignUp} className="space-y-6">
                  {/* Informações Pessoais */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Informações Pessoais
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                          Nome Completo *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Seu nome completo"
                          value={signUpData.fullName}
                          onChange={(e) => updateSignUpField('fullName', e.target.value)}
                          required
                          className="h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                          Telefone *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={signUpData.phone}
                          onChange={(e) => updateSignUpField('phone', e.target.value)}
                          required
                          className="h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="signup-email" className="text-sm font-semibold text-gray-700">
                        Email *
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={signUpData.email}
                        onChange={(e) => updateSignUpField('email', e.target.value)}
                        required
                        className="h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Informações Profissionais */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2 text-green-600" />
                      Informações Profissionais
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="professionalType" className="text-sm font-semibold text-gray-700">
                          Tipo de Profissional *
                        </Label>
                        <Select value={signUpData.professionalType} onValueChange={(value) => updateSignUpField('professionalType', value)}>
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medico">Médico</SelectItem>
                            <SelectItem value="dentista">Dentista</SelectItem>
                            <SelectItem value="psicologo">Psicólogo</SelectItem>
                            <SelectItem value="fisioterapeuta">Fisioterapeuta</SelectItem>
                            <SelectItem value="nutricionista">Nutricionista</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialty" className="text-sm font-semibold text-gray-700">
                          Especialidade
                        </Label>
                        <Input
                          id="specialty"
                          type="text"
                          placeholder="Sua especialidade"
                          value={signUpData.specialty}
                          onChange={(e) => updateSignUpField('specialty', e.target.value)}
                          className="h-11 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informações da Clínica */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-purple-600" />
                      Informações da Clínica
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clinicName" className="text-sm font-semibold text-gray-700">
                          Nome da Clínica
                        </Label>
                        <Input
                          id="clinicName"
                          type="text"
                          placeholder="Nome da sua clínica"
                          value={signUpData.clinicName}
                          onChange={(e) => updateSignUpField('clinicName', e.target.value)}
                          className="h-11 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="plan" className="text-sm font-semibold text-gray-700">
                          Plano Escolhido
                        </Label>
                        <Select value={signUpData.plan} onValueChange={(value) => updateSignUpField('plan', value)}>
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                                Básico - R$ 49,90/mês
                              </div>
                            </SelectItem>
                            <SelectItem value="pro">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></div>
                                Pro - R$ 99,90/mês
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                          Cidade
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Sua cidade"
                          value={signUpData.city}
                          onChange={(e) => updateSignUpField('city', e.target.value)}
                          className="h-11 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
                          Estado
                        </Label>
                        <Select value={signUpData.state} onValueChange={(value) => updateSignUpField('state', value)}>
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20">
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
                  </div>

                  {/* Segurança */}
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-red-600" />
                      Segurança
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-sm font-semibold text-gray-700">
                          Senha *
                        </Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showSignUpPassword ? "text" : "password"}
                            placeholder="Mínimo 6 caracteres"
                            value={signUpData.password}
                            onChange={(e) => updateSignUpField('password', e.target.value)}
                            required
                            className="h-11 rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500/20 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showSignUpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                          Confirmar Senha *
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirme sua senha"
                            value={signUpData.confirmPassword}
                            onChange={(e) => updateSignUpField('confirmPassword', e.target.value)}
                            required
                            className="h-11 rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500/20 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 py-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Dados seguros</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Criptografia SSL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-green-500" />
                      <span>Setup em 5 min</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Criando conta...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-3 h-6 w-6" />
                        Criar Conta Grátis
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;