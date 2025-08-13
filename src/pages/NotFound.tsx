import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

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
      <div className="relative z-10 flex items-center justify-center px-4 min-h-[calc(100vh-120px)]">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oops! Página não encontrada
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              A página que você está procurando não existe ou foi movida. 
              Que tal voltar ao início?
            </p>
          </div>

          {/* Current Path Info */}
          <div className="mb-12 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-center text-gray-500">
              <Search className="h-5 w-5 mr-2" />
              <span className="text-sm">Você tentou acessar: </span>
              <code className="ml-2 px-3 py-1 bg-gray-100 rounded-lg text-sm font-mono text-gray-700">
                {location.pathname}
              </code>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl">
                <Home className="mr-3 h-5 w-5" />
                Ir para Home
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => window.history.back()}
              className="px-8 py-4 text-lg border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-xl"
            >
              <ArrowLeft className="mr-3 h-5 w-5" />
              Voltar
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-12 text-gray-500">
            <p className="text-sm">
              Precisa de ajuda? Entre em contato com nosso suporte.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
    </div>
  );
};

export default NotFound;