import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Calendar,
  Bell,
  BarChart2,
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
  Heart,
  Award,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Atende+ Digital
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-slate-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
                  Recursos
                </a>
                <a href="#how" className="text-slate-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
                  Como funciona
                </a>
                <a href="#pricing" className="text-slate-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
                  Planos
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-slate-600 hover:text-emerald-600">
                  Entrar
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white">
                  Começar agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 px-4 py-2 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-sm font-medium">
              ✨ Solução completa para consultórios
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Transforme seu
              <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                consultório
              </span>
              em minutos
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Agenda inteligente, automações e relatórios em uma plataforma moderna. 
              Gerencie tudo pelo celular com uma experiência que realmente funciona.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/auth">
                <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Começar agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-600 transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Ver demonstração
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Sem instalação</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span>Dados seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                <span>Ativação em 5 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">99.9%</div>
              <div className="text-slate-600">Disponibilidade</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">-35%</div>
              <div className="text-slate-600">Redução de faltas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">5min</div>
              <div className="text-slate-600">Onboarding</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">+40%</div>
              <div className="text-slate-600">Produtividade</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Tudo o que você precisa em um só lugar
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Ferramentas poderosas que se adaptam ao seu fluxo de trabalho
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Agenda Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Visualizações semanal e mensal, arrastar e soltar, reagendamentos e bloqueios de horários.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Automações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Lembretes automáticos, confirmações e alertas para reduzir faltas e otimizar sua agenda.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Relatórios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Acompanhe atendimentos, receita estimada e evolução com dashboards intuitivos.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Mobile First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Tudo funciona perfeitamente no seu celular. Gerencie de qualquer lugar.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Gestão de Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Cadastro completo, histórico, planos e preferências organizados de forma inteligente.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Fluxo Ágil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Confirmação, reagendamento e finalização em segundos, sem complicações.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Comece em minutos, não em dias
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Processo simples e rápido para você focar no que realmente importa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                {window.innerWidth > 768 && (
                  <div className="absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent transform translate-x-4"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Crie sua conta</h3>
              <p className="text-slate-600">
                Defina horários, serviços e preferências do seu consultório em poucos cliques.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                {window.innerWidth > 768 && (
                  <div className="absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent transform translate-x-4"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Organize a agenda</h3>
              <p className="text-slate-600">
                Cadastre pacientes, importe compromissos e personalize sua rotina diária.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Automatize tudo</h3>
              <p className="text-slate-600">
                Reduza faltas com confirmações automáticas e gerencie de qualquer lugar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-8 w-8 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-2xl font-semibold text-slate-900 mb-2">
              "A plataforma que realmente funciona"
            </p>
            <p className="text-lg text-slate-600 mb-6">
              "Simplificou minha rotina completamente. Confirmo, reagendo e finalizo em segundos, 
              sem depender do notebook. O atendimento ficou muito mais fluido e profissional."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full"></div>
              <div className="text-left">
                <div className="font-semibold text-slate-900">Dr. Carlos Silva</div>
                <div className="text-slate-600">Clínica Saúde & Bem-estar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Planos simples e transparentes
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Escolha o plano ideal para o tamanho do seu consultório
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-slate-900">Básico</CardTitle>
                <div className="text-4xl font-bold text-slate-900">R$ 49,90</div>
                <p className="text-slate-600">Por mês</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">Sistema de agenda via web</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">Gestão de pacientes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">Visualizações semanal e mensal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">Relatórios básicos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">Suporte por email</span>
                  </div>
                </div>
                <Link to="/auth" className="block">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    Começar agora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-500 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-emerald-600 text-white px-4 py-2 rounded-full">
                  Mais completo
                </Badge>
              </div>
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-2xl text-slate-900">Pro</CardTitle>
                <div className="text-4xl font-bold text-emerald-600">R$ 99,90</div>
                <p className="text-slate-600">Por mês</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">Tudo do plano Básico</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">Automações de lembretes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">Controle total via WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">Relatórios avançados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">Suporte prioritário</span>
                  </div>
                </div>
                <Link to="/auth" className="block">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white">
                    Começar teste grátis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar seu consultório?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já simplificaram sua gestão
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="px-8 py-4 text-lg bg-white text-emerald-600 hover:bg-slate-100 shadow-lg">
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 border-white/30 text-white hover:bg-white/10">
              Ver demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Atende+ Digital
              </h3>
              <p className="text-slate-400">
                Transformando a gestão de consultórios com tecnologia moderna e design intuitivo.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#how" className="hover:text-white transition-colors">Como funciona</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Planos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Atende+ Digital. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;


