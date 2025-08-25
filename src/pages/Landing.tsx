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
  Menu,
  X,
  Heart,
  Globe,
  Layers,
  Rocket
} from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Atende+ Digital
                </h1>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                <a href="#features" className="text-gray-700 hover:text-blue-600 px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-blue-50 rounded-xl">
                  Recursos
                </a>
                <a href="#how" className="text-gray-700 hover:text-blue-600 px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-blue-50 rounded-xl">
                  Como funciona
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-blue-50 rounded-xl">
                  Planos
                </a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-blue-50 rounded-xl">
                  Depoimentos
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 hidden sm:inline-flex font-medium">
                  Entrar
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl px-6 py-3">
                  <Rocket className="w-4 h-4 mr-2" />
                  Começar Grátis
                </Button>
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100/50 bg-white/95 backdrop-blur-xl">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
                  Recursos
                </a>
                <a href="#how" className="block px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
                  Como funciona
                </a>
                <a href="#pricing" className="block px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
                  Planos
                </a>
                <a href="#testimonials" className="block px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
                  Depoimentos
                </a>
                <Link to="/auth" className="block px-4 py-3 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
                  Entrar
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-8 inline-flex items-center">
              <Badge className="px-6 py-3 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-800 border-0 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Sparkles className="w-4 h-4 mr-2" />
                Revolucione sua gestão médica
                <ArrowRight className="w-4 h-4 ml-2" />
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              O futuro da
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                gestão médica
              </span>
              <span className="block text-5xl md:text-7xl mt-4 text-gray-700">
                chegou
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Transforme sua clínica com nossa plataforma inteligente. Agenda automatizada, 
              comunicação via WhatsApp e relatórios avançados em uma solução completa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Link to="/auth">
                <Button size="lg" className="px-12 py-6 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl font-semibold">
                  <Rocket className="mr-3 h-6 w-6" />
                  Começar Grátis
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-12 py-6 text-lg border-2 border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-2xl font-semibold backdrop-blur-sm">
                <Play className="mr-3 h-6 w-6" />
                Ver Demonstração
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-full shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-medium">Setup em 5 minutos</span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-full shadow-sm">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="font-medium">100% Seguro</span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-full shadow-sm">
                <Award className="h-5 w-5 text-green-500" />
                <span className="font-medium">Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.9%", label: "Disponibilidade", gradient: "from-blue-600 to-purple-600" },
              { value: "-40%", label: "Redução de faltas", gradient: "from-green-600 to-blue-600" },
              { value: "5min", label: "Setup completo", gradient: "from-purple-600 to-pink-600" },
              { value: "+50%", label: "Produtividade", gradient: "from-pink-600 to-red-600" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="mb-8 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 rounded-full font-semibold shadow-lg">
              <Layers className="w-4 h-4 mr-2" />
              Recursos Poderosos
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Tudo o que você precisa
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                em um só lugar
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Nossa plataforma oferece todas as ferramentas necessárias para modernizar 
              e otimizar a gestão do seu consultório médico com tecnologia de ponta.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: Calendar,
                title: "Agenda Inteligente",
                description: "Sistema avançado com visualizações múltiplas, drag & drop, e sincronização em tempo real para máxima eficiência.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                icon: MessageCircle,
                title: "WhatsApp Integrado",
                description: "Gestão completa via WhatsApp: confirmações automáticas, reagendamentos e comunicação personalizada.",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              },
              {
                icon: Bell,
                title: "Automações Inteligentes",
                description: "Lembretes automáticos, confirmações e follow-ups que reduzem faltas em até 40% comprovadamente.",
                gradient: "from-purple-500 to-violet-500",
                bgGradient: "from-purple-50 to-violet-50"
              },
              {
                icon: BarChart3,
                title: "Relatórios Avançados",
                description: "Dashboards intuitivos com métricas de desempenho, análise de receita e insights estratégicos.",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50"
              },
              {
                icon: Users,
                title: "Gestão de Pacientes",
                description: "Prontuários digitais completos, histórico detalhado e sistema de preferências personalizado.",
                gradient: "from-teal-500 to-cyan-500",
                bgGradient: "from-teal-50 to-cyan-50"
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Experiência otimizada para dispositivos móveis com sincronização em nuvem instantânea.",
                gradient: "from-pink-500 to-rose-500",
                bgGradient: "from-pink-50 to-rose-50"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-700 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:-translate-y-4 rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-6 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </CardContent>
                <div className={`h-2 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200`}></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="mb-8 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0 rounded-full font-semibold shadow-lg">
              <Target className="w-4 h-4 mr-2" />
              Processo Simples
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Comece em
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                3 passos simples
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Nossa plataforma foi projetada para ser intuitiva e fácil de usar, 
              permitindo que você configure tudo em minutos, não horas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                step: "01",
                title: "Crie sua conta",
                description: "Cadastre-se e configure seu perfil profissional com informações básicas do consultório em menos de 2 minutos.",
                icon: Target,
                color: "blue"
              },
              {
                step: "02", 
                title: "Configure a agenda",
                description: "Defina horários de atendimento, serviços oferecidos e importe seus pacientes existentes facilmente.",
                icon: Calendar,
                color: "purple"
              },
              {
                step: "03",
                title: "Comece a usar",
                description: "Ative as automações inteligentes e comece a gerenciar tudo pelo WhatsApp ou plataforma web.",
                icon: Zap,
                color: "green"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group relative">
                <div className="relative mb-10">
                  <div className={`w-24 h-24 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                    {step.step}
                  </div>
                  <div className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-${step.color}-100 to-${step.color}-200 rounded-full flex items-center justify-center shadow-lg`}>
                    <step.icon className={`h-5 w-5 text-${step.color}-600`} />
                  </div>
                  
                  {/* Connection line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-transparent transform translate-x-8 -translate-y-1/2 rounded-full"></div>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="mb-8 px-6 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-0 rounded-full font-semibold shadow-lg">
              <Heart className="w-4 h-4 mr-2" />
              Depoimentos
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              O que nossos
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                clientes dizem
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias reais de profissionais que transformaram suas práticas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Dr. Carlos Silva",
                role: "Cardiologista",
                clinic: "Clínica CardioVida",
                content: "Revolucionou minha prática! A integração com WhatsApp reduziu as faltas em 45% e meus pacientes adoram a praticidade. Não consigo mais imaginar meu consultório sem essa ferramenta.",
                rating: 5,
                avatar: "CS"
              },
              {
                name: "Dra. Ana Santos",
                role: "Dermatologista", 
                clinic: "Instituto de Dermatologia",
                content: "A automação de lembretes e a agenda inteligente me poupam horas por semana. Posso focar no que realmente importa: cuidar dos meus pacientes. Recomendo para todos os colegas!",
                rating: 5,
                avatar: "AS"
              },
              {
                name: "Dr. João Oliveira",
                role: "Ortopedista",
                clinic: "Centro Ortopédico",
                content: "Interface intuitiva e suporte excepcional. Em uma semana já estava dominando todas as funcionalidades. O retorno do investimento foi imediato com a redução de faltas.",
                rating: 5,
                avatar: "JO"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl overflow-hidden group hover:-translate-y-3 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-10 relative z-10">
                  <div className="flex items-center mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-10 italic leading-relaxed text-lg font-light">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold mr-6 text-lg shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-gray-600 font-medium">{testimonial.role}</div>
                      <div className="text-blue-600 font-medium">{testimonial.clinic}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="mb-8 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-0 rounded-full font-semibold shadow-lg">
              <Globe className="w-4 h-4 mr-2" />
              Planos
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Escolha o plano
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ideal para você
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Planos transparentes e acessíveis para consultórios de todos os tamanhos, 
              com a flexibilidade que você precisa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Plano Básico */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl rounded-3xl overflow-hidden group">
              <CardHeader className="text-center pb-10 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative z-10">
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Básico</CardTitle>
                  <div className="text-6xl font-bold text-gray-900 mt-6 mb-2">R$ 49,90</div>
                  <p className="text-gray-600 text-lg">Por mês</p>
                  <Badge className="mt-6 bg-blue-100 text-blue-800 border-0 px-4 py-2 rounded-full">
                    Ideal para começar
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-10">
                <div className="space-y-6 mb-10">
                  {[
                    "Sistema de agenda via web",
                    "Gestão completa de pacientes",
                    "Visualizações semanal e mensal",
                    "Relatórios básicos",
                    "Suporte por email",
                    "Backup automático"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/auth" className="block">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-2xl text-lg font-semibold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                    Começar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano Pro */}
            <Card className="border-2 border-blue-500 shadow-2xl relative rounded-3xl overflow-hidden group">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                <Badge className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white px-8 py-4 rounded-full text-sm font-bold shadow-xl">
                  ⭐ Mais Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-10 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 pt-12 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative z-10">
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Pro</CardTitle>
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mt-6 mb-2">
                    R$ 99,90
                  </div>
                  <p className="text-gray-600 text-lg">Por mês</p>
                  <Badge className="mt-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-800 border-0 px-4 py-2 rounded-full">
                    Solução completa
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-10">
                <div className="space-y-6 mb-10">
                  {[
                    "Tudo do plano Básico",
                    "Automações de lembretes",
                    "Gestão completa via WhatsApp",
                    "Relatórios avançados e analytics",
                    "Integrações com outros sistemas",
                    "Suporte prioritário 24/7",
                    "Customizações personalizadas"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/auth" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white py-6 rounded-2xl text-lg font-semibold transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2">
                    <Sparkles className="mr-3 h-6 w-6" />
                    Começar Teste Grátis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-gradient-to-br from-gray-50/30 to-blue-50/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-8 px-6 py-3 bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800 border-0 rounded-full font-semibold shadow-lg">
              FAQ
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Dúvidas Frequentes
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Encontre respostas para as principais questões sobre nossa plataforma
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            {[
              {
                question: "Como funciona a integração com WhatsApp?",
                answer: "Nossa plataforma se conecta diretamente ao WhatsApp Business, permitindo que você gerencie toda sua agenda, confirme consultas, envie lembretes e se comunique com pacientes diretamente pelo aplicativo que você já usa. É simples, seguro e eficiente."
              },
              {
                question: "É seguro armazenar dados de pacientes na plataforma?",
                answer: "Sim, totalmente seguro. Seguimos rigorosamente todas as normas da LGPD e utilizamos criptografia de ponta a ponta. Nossos servidores são hospedados em data centers certificados com backup automático, redundância e monitoramento 24/7."
              },
              {
                question: "Posso importar minha agenda atual?",
                answer: "Claro! Oferecemos ferramentas de importação para as principais plataformas de agenda médica do mercado. Nossa equipe de suporte especializada ajuda gratuitamente na migração completa dos seus dados, garantindo que nada seja perdido."
              },
              {
                question: "Há período de teste gratuito?",
                answer: "Sim! Oferecemos 14 dias de teste gratuito completo do plano Pro, sem necessidade de cartão de crédito. Você pode explorar todas as funcionalidades avançadas antes de tomar sua decisão."
              },
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem multas, taxas ou burocracias. Seus dados ficam disponíveis por 30 dias após o cancelamento para download completo, garantindo sua tranquilidade."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <AccordionTrigger className="px-8 py-6 text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-gray-600 leading-relaxed text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-tight">
            Pronto para revolucionar
            <span className="block">seu consultório?</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Junte-se a milhares de profissionais que já transformaram sua gestão médica 
            com nossa plataforma inteligente e moderna.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/auth">
              <Button size="lg" className="px-16 py-8 text-xl bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl font-bold">
                <Rocket className="mr-4 h-7 w-7" />
                Começar Grátis Agora
                <ArrowRight className="ml-4 h-7 w-7" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-16 py-8 text-xl border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-2xl font-bold">
              <Play className="mr-4 h-7 w-7" />
              Ver Demonstração
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-10 text-blue-100">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
              <span className="font-medium text-lg">Teste grátis por 14 dias</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full">
              <Shield className="h-6 w-6 text-green-400" />
              <span className="font-medium text-lg">Sem compromisso</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full">
              <Clock className="h-6 w-6 text-green-400" />
              <span className="font-medium text-lg">Setup em minutos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Atende+ Digital</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Revolucionando a gestão médica com tecnologia inteligente e design intuitivo. 
                Sua clínica mais eficiente, seus pacientes mais satisfeitos.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer group">
                  <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer group">
                  <Star className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 text-xl">Produto</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors text-lg">Recursos</a></li>
                <li><a href="#how" className="hover:text-white transition-colors text-lg">Como funciona</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors text-lg">Planos</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors text-lg">Depoimentos</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 text-xl">Suporte</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors text-lg">Central de ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-lg">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-lg">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-lg">WhatsApp</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 text-xl">Empresa</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors text-lg">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-lg">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-lg">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-lg">Parceiros</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-10 text-center text-gray-400">
            <p className="text-lg">&copy; {new Date().getFullYear()} Atende+ Digital. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;