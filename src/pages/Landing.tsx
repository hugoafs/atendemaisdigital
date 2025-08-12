import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="w-full border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">Atende+ Digital</Link>
          <div className="flex items-center gap-2">
            <Link to="/auth">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link to="/auth">
              <Button>Começar</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-16 grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Simplifique o atendimento e a gestão do seu consultório
            </h1>
            <p className="text-muted-foreground text-lg">
              Agenda inteligente, lembretes automáticos e relatórios – tudo em um só lugar.
            </p>
            <div className="flex gap-3">
              <Link to="/auth">
                <Button size="lg">Começar agora</Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline">Fazer login</Button>
              </Link>
            </div>
          </div>

          <Card className="mt-6 md:mt-0">
            <CardHeader>
              <CardTitle>Principais recursos</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <p className="font-medium">Agenda visual e responsiva</p>
                <p className="text-sm text-muted-foreground">Arraste e solte, visualização semanal e mensal.</p>
              </div>
              <div>
                <p className="font-medium">Notificações automáticas</p>
                <p className="text-sm text-muted-foreground">Lembretes para reduzir faltas e otimizar o fluxo.</p>
              </div>
              <div>
                <p className="font-medium">Relatórios e indicadores</p>
                <p className="text-sm text-muted-foreground">Acompanhe produtividade e crescimento.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Atende+ Digital. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Landing;


