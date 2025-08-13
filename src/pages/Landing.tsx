import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Calendar,
  Bell,
  BarChart3,
  Smartphone,
  Clock,
  Users,
  Shield,
  CheckCircle2,
  ArrowRight,
  Play,
  Zap,
  Target,
  TrendingUp,
  Star,
  MessageCircle,
  Award,
  Sparkles,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Atende+ Digital
                </h1>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-50 rounded-lg">
                  Recursos
                </a>
                <a href="#how" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-50 rounded-lg">
                  Como funciona
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-50 rounded-lg">
                  Planos
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-50 rounded-lg">
                  Depoimentos
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 hidden sm:inline-flex">
                  Entrar
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Começar Grátis
                </Button>
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  Recursos
                </a>
                <a href="#how" className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  Como funciona
                </a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  Planos
                </a>
                <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  Depoimentos
                </a>
                <Link to="/auth" className="block px-3 py-2 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  Entrar
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-8 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 rounded-full text-sm font-semibold shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Revolucione sua gestão médica
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              O futuro da
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                gestão médica
              </span>
              chegou
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transforme sua clínica com nossa plataforma inteligente. Agenda automatizada, 
              comunicação via WhatsApp e relatórios avançados em uma solução completa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/auth">
                <Button size="lg" className="px-10 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl">
                  <Sparkles className="mr-3 h-5 w-5" />
                  Começar Grátis
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-10 py-6 text-lg border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-xl">
                <Play className="mr-3 h-5 w-5" />
                Ver Demonstração
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-medium">Setup em 5 minutos</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="font-medium">100% Seguro</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-green-500" />
                <span className="font-medium">Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-gray-600 font-medium">Disponibilidade</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                -40%
              </div>
              <div className="text-gray-600 font-medium">Redução de faltas</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                5min
              </div>
              <div className="text-gray-600 font-medium">Setup completo</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                +50%
              </div>
              <div className="text-gray-600 font-medium">Produtividade</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-800 border-0 rounded-full font-semibold">
              Recursos Poderosos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tudo o que você precisa
              <span className="block text-blue-600">em um só lugar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma oferece todas as ferramentas necessárias para modernizar 
              e otimizar a gestão do seu consultório médico.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Agenda Inteligente",
                description: "Sistema avançado com visualizações múltiplas, drag & drop, e sincronização em tempo real.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                icon: MessageCircle,
                title: "WhatsApp Integrado",
                description: "Gestão completa via WhatsApp: confirmações, reagendamentos e comunicação automatizada.",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              },
              {
                icon: Bell,
                title: "Automações Inteligentes",
                description: "Lembretes automáticos, confirmações e follow-ups que reduzem faltas significativamente.",
                gradient: "from-purple-500 to-violet-500",
                bgGradient: "from-purple-50 to-violet-50"
              },
              {
                icon: BarChart3,
                title: "Relatórios Avançados",
                description: "Dashboards intuitivos com métricas de desempenho, receita e análise de tendências.",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50"
              },
              {
                icon: Users,
                title: "Gestão de Pacientes",
                description: "Prontuários digitais, histórico completo e sistema de preferências personalizado.",
                gradient: "from-teal-500 to-cyan-500",
                bgGradient: "from-teal-50 to-cyan-50"
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Experiência otimizada para dispositivos móveis com sincronização em nuvem.",
                gradient: "from-pink-500 to-rose-500",
                bgGradient: "from-pink-50 to-rose-50"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white shadow-lg hover:-translate-y-3 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
                <div className={`h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 px-4 py-2 bg-purple-100 text-purple-800 border-0 rounded-full font-semibold">
              Processo Simples
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comece em
              <span className="text-purple-600"> 3 passos simples</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma foi projetada para ser intuitiva e fácil de usar, 
              permitindo que você configure tudo em minutos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Crie sua conta",
                description: "Cadastre-se e configure seu perfil profissional com informações básicas do consultório.",
                icon: Target,
                color: "blue"
              },
              {
                step: "02", 
                title: "Configure a agenda",
                description: "Defina horários, serviços oferecidos e importe seus pacientes existentes.",
                icon: Calendar,
                color: "purple"
              },
              {
                step: "03",
                title: "Comece a usar",
                description: "Ative as automações e comece a gerenciar tudo pelo WhatsApp ou plataforma web.",
                icon: Zap,
                color: "green"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group relative">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-3xl flex items-center justify-center mx-auto text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    {step.step}
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${step.color}-100 rounded-full flex items-center justify-center`}>
                    <step.icon className={`h-4 w-4 text-${step.color}-600`} />
                  </div>
                  
                  {/* Connection line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform translate-x-4 -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 px-4 py-2 bg-yellow-100 text-yellow-800 border-0 rounded-full font-semibold">
              Depoimentos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              O que nossos
              <span className="text-blue-600"> clientes dizem</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Carlos Silva",
                role: "Cardiologista",
                clinic: "Clínica CardioVida",
                content: "Revolucionou minha prática! A integração com WhatsApp reduziu as faltas em 45% e meus pacientes adoram a praticidade.",
                rating: 5,
                avatar: "CS"
              },
              {
                name: "Dra. Ana Santos",
                role: "Dermatologista", 
                clinic: "Instituto de Dermatologia",
                content: "A automação de lembretes e a agenda inteligente me poupam horas por semana. Recomendo para todos os colegas!",
                rating: 5,
                avatar: "AS"
              },
              {
                name: "Dr. João Oliveira",
                role: "Ortopedista",
                clinic: "Centro Ortopédico",
                content: "Interface intuitiva e suporte excepcional. Em uma semana já estava dominando todas as funcionalidades.",
                rating: 5,
                avatar: "JO"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl overflow-hidden group hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-blue-600">{testimonial.clinic}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 px-4 py-2 bg-green-100 text-green-800 border-0 rounded-full font-semibold">
              Planos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Escolha o plano
              <span className="text-green-600"> ideal para você</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Planos transparentes e acessíveis para consultórios de todos os tamanhos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plano Básico */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="text-center pb-8 bg-gradient-to-br from-gray-50 to-blue-50">
                <CardTitle className="text-2xl font-bold text-gray-900">Básico</CardTitle>
                <div className="text-5xl font-bold text-gray-900 mt-4">R$ 49,90</div>
                <p className="text-gray-600 mt-2">Por mês</p>
                <Badge className="mt-4 bg-blue-100 text-blue-800 border-0">
                  Ideal para começar
                </Badge>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4 mb-8">
                  {[
                    "Sistema de agenda via web",
                    "Gestão completa de pacientes",
                    "Visualizações semanal e mensal",
                    "Relatórios básicos",
                    "Suporte por email",
                    "Backup automático"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/auth" className="block">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-lg">
                    Começar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano Pro */}
            <Card className="border-2 border-blue-500 shadow-2xl relative rounded-3xl overflow-hidden">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Mais Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8 bg-gradient-to-br from-blue-50 to-purple-50 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Pro</CardTitle>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-4">
                  R$ 99,90
                </div>
                <p className="text-gray-600 mt-2">Por mês</p>
                <Badge className="mt-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
                  Solução completa
                </Badge>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4 mb-8">
                  {[
                    "Tudo do plano Básico",
                    "Automações de lembretes",
                    "Gestão completa via WhatsApp",
                    "Relatórios avançados e analytics",
                    "Integrações com outros sistemas",
                    "Suporte prioritário 24/7",
                    "Customizações personalizadas"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/auth" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Começar Teste Grátis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-gray-100 text-gray-800 border-0 rounded-full font-semibold">
              FAQ
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Encontre respostas para as principais questões sobre nossa plataforma
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "Como funciona a integração com WhatsApp?",
                answer: "Nossa plataforma se conecta diretamente ao WhatsApp Business, permitindo que você gerencie toda sua agenda, confirme consultas, envie lembretes e se comunique com pacientes diretamente pelo aplicativo que você já usa."
              },
              {
                question: "É seguro armazenar dados de pacientes na plataforma?",
                answer: "Sim, totalmente seguro. Seguimos todas as normas da LGPD e utilizamos criptografia de ponta a ponta. Nossos servidores são hospedados em data centers certificados com backup automático e redundância."
              },
              {
                question: "Posso importar minha agenda atual?",
                answer: "Claro! Oferecemos ferramentas de importação para as principais plataformas de agenda médica. Nossa equipe de suporte ajuda gratuitamente na migração dos seus dados."
              },
              {
                question: "Há período de teste gratuito?",
                answer: "Sim! Oferecemos 14 dias de teste gratuito do plano Pro, sem necessidade de cartão de crédito. Você pode explorar todas as funcionalidades antes de decidir."
              },
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas. Seus dados ficam disponíveis por 30 dias após o cancelamento para download."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl border-0 shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Pronto para revolucionar
            <span className="block">seu consultório?</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Junte-se a milhares de profissionais que já transformaram sua gestão médica 
            com nossa plataforma inteligente.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/auth">
              <Button size="lg" className="px-12 py-6 text-xl bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl font-bold">
                <Sparkles className="mr-3 h-6 w-6" />
                Começar Grátis Agora
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-12 py-6 text-xl border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl font-bold">
              <Play className="mr-3 h-6 w-6" />
              Ver Demonstração
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>Teste grátis por 14 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span>Sem compromisso</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-400" />
              <span>Setup em minutos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Atende+ Digital</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Revolucionando a gestão médica com tecnologia inteligente e design intuitivo. 
                Sua clínica mais eficiente, seus pacientes mais satisfeitos.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Star className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Produto</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#how" className="hover:text-white transition-colors">Como funciona</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Planos</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Depoimentos</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Suporte</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Empresa</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Parceiros</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Atende+ Digital. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;