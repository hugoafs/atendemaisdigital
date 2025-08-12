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
  MessageCircle,
  Clock,
  Users,
  Shield,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Star,
  Globe,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Layered background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        {/* radial gradient spotlight */}
        <div className="absolute -top-48 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.emerald.500)/15%,transparent_60%)] blur-3xl" />
        {/* conic subtle gradient */}
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,0.08)_0deg,rgba(59,130,246,0.08)_120deg,transparent_240deg)]" />
        {/* grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>
      {/* Header */}
      <header className="w-full border-b sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">Atende+ Digital</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Recursos</a>
            <a href="#how" className="hover:text-foreground">Como funciona</a>
            <a href="#pricing" className="hover:text-foreground">Planos</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="/auth">
              <Button variant="outline">Entrar</Button>
            </a>
            <a href="/auth">
              <Button>
                Começar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="relative mx-auto max-w-6xl px-4 py-20 grid gap-12 md:grid-cols-2 items-center">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -z-10 -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -z-10 -bottom-32 -right-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="space-y-6">
            <Badge className="bg-emerald-600/90 backdrop-blur border border-white/20">Solução completa para consultórios</Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-br from-emerald-400 via-emerald-200 to-white bg-clip-text text-transparent">
                Gerencie seu consultório
              </span>
              <br />
              com eficiência e sofisticação
            </h1>
            <p className="text-muted-foreground text-lg">
              Agenda inteligente, automações e relatórios — tudo em uma plataforma moderna
              pensada para o dia a dia do profissional, com experiência mobile impecável.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/auth">
                <Button size="lg" className="group relative overflow-hidden">
                  <span className="relative z-10">Começar agora</span>
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="backdrop-blur">
                  Ver recursos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Sem instalação</div>
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-green-600" /> Dados seguros</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-green-600" /> Ativação rápida</div>
            </div>
          </div>
          {/* right visual: glass card with gradient border */}
          <div className="relative">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-emerald-400/60 via-white/10 to-blue-400/60">
              <div className="rounded-2xl bg-background/60 backdrop-blur-xl border border-white/10">
                <Card className="border-0 shadow-xl bg-transparent">
                  <CardContent className="p-4 md:p-6">
                    <AspectRatio ratio={16 / 10} className="rounded-lg overflow-hidden ring-1 ring-white/10 bg-gradient-to-b from-muted/40 to-muted/10">
                      <img
                        src="/placeholder.svg"
                        alt="Demonstração do sistema Atende+ Digital"
                        className="h-full w-full object-cover"
                      />
                    </AspectRatio>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-2xl font-semibold">99.9%</div>
                        <div className="text-xs text-muted-foreground">Uptime</div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-2xl font-semibold">-35%</div>
                        <div className="text-xs text-muted-foreground">No-shows</div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-2xl font-semibold">5min</div>
                        <div className="text-xs text-muted-foreground">Onboarding</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Logos strip */}
        <section className="mx-auto max-w-6xl px-4 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale">
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Lumina</div>
            <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> Orbit</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4" /> NovaLabs</div>
            <div className="flex items-center gap-2"><Shield className="h-4 w-4" /> Sentinel</div>
            <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> Wave</div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-bold">Tudo o que você precisa</h2>
            <p className="text-muted-foreground">Ferramentas modernas para o dia a dia do consultório</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="transition-all duration-300 hover:shadow-emerald-500/20 hover:-translate-y-0.5">
              <CardHeader>
                <div className="flex items-center gap-2 text-blue-600"><Calendar className="h-5 w-5" /><CardTitle>Agenda inteligente</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Visualizações semanal e mensal, arrastar e soltar, reagendamentos e bloqueios de horários.
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-emerald-500/20 hover:-translate-y-0.5">
              <CardHeader>
                <div className="flex items-center gap-2 text-emerald-600"><Bell className="h-5 w-5" /><CardTitle>Notificações automáticas</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Lembretes e alertas para reduzir faltas, confirmar e finalizar atendimentos
                de forma simples e eficiente.
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-emerald-500/20 hover:-translate-y-0.5">
              <CardHeader>
                <div className="flex items-center gap-2 text-violet-600"><BarChart2 className="h-5 w-5" /><CardTitle>Relatórios e KPIs</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Acompanhe atendimentos, taxa de comparecimento, receita estimada e evolução por período.
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-emerald-500/20 hover:-translate-y-0.5">
              <CardHeader>
                <div className="flex items-center gap-2 text-teal-600"><Smartphone className="h-5 w-5" /><CardTitle>Mobile-first</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Tudo funciona no seu celular. O profissional gerencia a agenda e confirmações de qualquer lugar.
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-emerald-500/20 hover:-translate-y-0.5">
              <CardHeader>
                <div className="flex items-center gap-2 text-green-700"><MessageCircle className="h-5 w-5" /><CardTitle>Atendimento ágil</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Fluxo de confirmação, reagendamento e finalização sem fricção, com foco na rotina do profissional.
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-emerald-500/20 hover:-translate-y-0.5">
              <CardHeader>
                <div className="flex items-center gap-2 text-orange-600"><Users className="h-5 w-5" /><CardTitle>Gestão de pacientes</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Cadastro, histórico, planos e preferências — tudo organizado para facilitar seu trabalho.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-6xl px-4 pb-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              { k: "+30%", v: "Aumento de produtividade" },
              { k: "-35%", v: "Redução de faltas" },
              { k: "5 min", v: "Tempo médio de onboarding" },
              { k: "24/7", v: "Monitoramento e segurança" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 text-center">
                <div className="text-3xl font-semibold">{s.k}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-bold">Como funciona</h2>
            <p className="text-muted-foreground">Comece em minutos e gerencie tudo em qualquer dispositivo</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-600" /><CardTitle>1. Crie sua conta</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Defina horários, serviços e preferências do seu consultório.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2"><Calendar className="h-5 w-5 text-violet-600" /><CardTitle>2. Organize a agenda</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Cadastre pacientes, importe compromissos e personalize a rotina.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2"><Bell className="h-5 w-5 text-emerald-600" /><CardTitle>3. Automatize lembretes</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Reduza faltas com confirmações e alertas no momento certo.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2"><BarChart2 className="h-5 w-5 text-blue-600" /><CardTitle>4. Acompanhe resultados</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Monitore indicadores e evolua a gestão com dados.</CardContent>
            </Card>
          </div>
        </section>

        

        {/* Testimonial */}
        <section className="mx-auto max-w-5xl px-4 py-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-8 md:p-10 text-center shadow-xl">
            <p className="text-lg md:text-xl leading-relaxed">
              “A plataforma simplificou minha rotina. Confirmo, reagendo e finalizo em segundos,
              sem depender do notebook. O atendimento ficou muito mais fluido.”
            </p>
            <div className="mt-4 text-sm text-muted-foreground">— Profissional da saúde, usuário do Atende+ Digital</div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-bold">Planos simples e claros</h2>
            <p className="text-muted-foreground">Comece grátis e evolua conforme a sua necessidade</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="transition-all duration-300 hover:shadow-emerald-500/20 hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle>Gratuito</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>• 1 profissional</div>
                <div>• Agenda básica</div>
                <div>• Lembretes manuais</div>
                <Link to="/auth"><Button className="mt-4 w-full" variant="outline">Começar</Button></Link>
              </CardContent>
            </Card>
            <Card className="border-emerald-600/40 shadow-emerald-500/10 shadow-xl scale-[1.01]">
              <CardHeader>
                <div className="flex items-center gap-2"><Badge className="bg-emerald-600">Recomendado</Badge><CardTitle>Pro</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>• Até 5 profissionais</div>
                <div>• Automações de lembretes</div>
                <div>• Relatórios e indicadores</div>
                <Link to="/auth"><Button className="mt-4 w-full">Assinar</Button></Link>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-emerald-500/20 hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle>Clínicas</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>• Equipes e múltiplas agendas</div>
                <div>• Integrações avançadas</div>
                <div>• Suporte prioritário</div>
                <a href="#faq"><Button className="mt-4 w-full" variant="outline">Falar com vendas</Button></a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-12">
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-3xl font-bold">Perguntas frequentes</h2>
            <p className="text-muted-foreground">Tire suas dúvidas rapidamente</p>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>Preciso instalar algo?</AccordionTrigger>
              <AccordionContent>Não. É 100% web e funciona nos principais navegadores, desktop e mobile.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Funciona bem no celular?</AccordionTrigger>
              <AccordionContent>Sim. A experiência é mobile-first: você gerencia sua agenda de qualquer lugar.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Meus dados estão seguros?</AccordionTrigger>
              <AccordionContent>Sim. Utilizamos boas práticas de segurança e criptografia em trânsito. Seus dados não são compartilhados.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Posso migrar de outro sistema?</AccordionTrigger>
              <AccordionContent>Você pode importar pacientes e compromissos via planilha. Nosso time ajuda no onboarding se necessário.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <Card className="bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-2xl">
            <CardContent className="p-8 md:p-10 grid gap-6 md:grid-cols-[2fr_1fr] items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold">Comece hoje e simplifique sua gestão</h3>
                <p className="text-white/90 mt-2">Crie sua conta em minutos e automatize tarefas repetitivas.</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Link to="/auth"><Button size="lg" variant="secondary">Criar conta</Button></Link>
                <a href="#pricing"><Button size="lg" variant="outline" className="text-white border-white/70">Ver planos</Button></a>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Atende+ Digital. Todos os direitos reservados.</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-foreground">Recursos</a>
            <a href="#how" className="hover:text-foreground">Como funciona</a>
            <a href="#pricing" className="hover:text-foreground">Planos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;


