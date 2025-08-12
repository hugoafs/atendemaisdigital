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
  QrCode,
  Shield,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="w-full border-b sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">Atende+ Digital</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Recursos</a>
            <a href="#how" className="hover:text-foreground">Como funciona</a>
            <a href="#whatsapp" className="hover:text-foreground">WhatsApp</a>
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
        <section className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <Badge className="bg-green-600">Novo: Gestão completa via WhatsApp</Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Simplifique o atendimento e a gestão do seu consultório
            </h1>
            <p className="text-muted-foreground text-lg">
              Agenda inteligente, lembretes automáticos, relatórios — e agora, gerencie tudo pelo seu
              WhatsApp. Zero complicação, 100% produtividade.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/auth">
                <Button size="lg">Começar agora</Button>
              </Link>
              <a href="https://wa.me/00000000000" target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline">
                  Falar no WhatsApp
                  <MessageCircle className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Sem instalação</div>
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-green-600" /> Dados seguros</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-green-600" /> Ativação rápida</div>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-2">
              <AspectRatio ratio={16 / 10} className="bg-muted rounded-md overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Demonstração do sistema Atende+ Digital"
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-bold">Tudo o que você precisa</h2>
            <p className="text-muted-foreground">Ferramentas modernas para o dia a dia do consultório</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-blue-600"><Calendar className="h-5 w-5" /><CardTitle>Agenda inteligente</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Visualizações semanal e mensal, arrastar e soltar, reagendamentos e bloqueios de horários.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-emerald-600"><Bell className="h-5 w-5" /><CardTitle>Notificações automáticas</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Lembretes por WhatsApp e e-mail para reduzir faltas e confirmar presenças automaticamente.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-violet-600"><BarChart2 className="h-5 w-5" /><CardTitle>Relatórios e KPIs</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Acompanhe atendimentos, taxa de comparecimento, receita estimada e evolução por período.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-teal-600"><Smartphone className="h-5 w-5" /><CardTitle>Mobile-first</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Tudo funciona no seu celular. O profissional gerencia a agenda e confirmações pelo WhatsApp.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-green-700"><MessageCircle className="h-5 w-5" /><CardTitle>Integração WhatsApp</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Conecte seu número e centralize confirmações, reagendamentos e follow-ups direto no WhatsApp.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-orange-600"><Users className="h-5 w-5" /><CardTitle>Gestão de pacientes</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Cadastro, histórico, planos e preferências — tudo organizado para facilitar seu trabalho.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-bold">Como funciona</h2>
            <p className="text-muted-foreground">Comece em minutos e gerencie tudo pelo WhatsApp</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-600" /><CardTitle>1. Crie sua conta</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Cadastre-se e personalize horários de atendimento e serviços.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2"><QrCode className="h-5 w-5 text-blue-600" /><CardTitle>2. Conecte o WhatsApp</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Escaneie um QR Code para vincular seu número com o sistema.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2"><Calendar className="h-5 w-5 text-violet-600" /><CardTitle>3. Importe sua agenda</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Leve seus pacientes e compromissos ou comece do zero, fácil.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2"><MessageCircle className="h-5 w-5 text-emerald-600" /><CardTitle>4. Gerencie via WhatsApp</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Confirme, reagende e responda pacientes de qualquer lugar.</CardContent>
            </Card>
          </div>
        </section>

        {/* WhatsApp focus */}
        <section id="whatsapp" className="mx-auto max-w-6xl px-4 py-12">
          <Card className="border-green-600/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                <CardTitle>Gestão completa pelo WhatsApp</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-[1fr_360px] items-center">
              <ul className="text-sm text-muted-foreground space-y-3">
                <li className="flex gap-2 items-start"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" /> Confirmar presença e enviar lembretes automáticos</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" /> Reagendar com um toque e atualizar sua agenda em tempo real</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" /> Responder pacientes e registrar histórico direto no sistema</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" /> Criar blocos de horários e pausas pelo celular</li>
              </ul>
              <div className="grid gap-3">
                <AspectRatio ratio={1} className="bg-muted rounded-md overflow-hidden">
                  <img src="/placeholder.svg" alt="QR Code de conexão do WhatsApp" className="h-full w-full object-cover" />
                </AspectRatio>
                <div className="flex gap-2">
                  <Link to="/auth" className="w-full">
                    <Button className="w-full">Conectar meu WhatsApp</Button>
                  </Link>
                  <a className="w-full" href="https://wa.me/00000000000" target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full">Falar com o time</Button>
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">Usamos o seu número. Não compartilhamos dados com terceiros.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-bold">Planos simples e claros</h2>
            <p className="text-muted-foreground">Comece grátis e evolua conforme a sua necessidade</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
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
            <Card className="border-emerald-600/30">
              <CardHeader>
                <div className="flex items-center gap-2"><Badge className="bg-emerald-600">Recomendado</Badge><CardTitle>Pro</CardTitle></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>• Até 5 profissionais</div>
                <div>• Automação no WhatsApp</div>
                <div>• Relatórios e indicadores</div>
                <Link to="/auth"><Button className="mt-4 w-full">Assinar</Button></Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Clínicas</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>• Equipes e múltiplas agendas</div>
                <div>• Integrações avançadas</div>
                <div>• Suporte prioritário</div>
                <a href="https://wa.me/00000000000" target="_blank" rel="noreferrer"><Button className="mt-4 w-full" variant="outline">Falar com vendas</Button></a>
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
              <AccordionTrigger>Como conecto meu WhatsApp?</AccordionTrigger>
              <AccordionContent>Basta criar sua conta, acessar as configurações e escanear o QR Code gerado. Em segundos, seu número estará ligado ao sistema.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Posso gerenciar tudo pelo celular?</AccordionTrigger>
              <AccordionContent>Sim. A agenda, confirmações e reagendamentos funcionam totalmente pelo WhatsApp, pensado para uso mobile.</AccordionContent>
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
        <section className="mx-auto max-w-6xl px-4 py-16">
          <Card className="bg-gradient-to-br from-emerald-600 to-green-700 text-white">
            <CardContent className="p-8 md:p-10 grid gap-6 md:grid-cols-[2fr_1fr] items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold">Comece hoje e gerencie seu consultório pelo WhatsApp</h3>
                <p className="text-white/90 mt-2">Crie sua conta em minutos e automatize tarefas repetitivas.</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Link to="/auth"><Button size="lg" variant="secondary">Criar conta</Button></Link>
                <a href="https://wa.me/00000000000" target="_blank" rel="noreferrer"><Button size="lg" variant="outline" className="text-white border-white/70">Falar no WhatsApp</Button></a>
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
            <a href="#whatsapp" className="hover:text-foreground">WhatsApp</a>
            <a href="#pricing" className="hover:text-foreground">Planos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;


