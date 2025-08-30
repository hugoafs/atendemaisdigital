import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const SupabaseConnectionTest = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{
    connected: boolean;
    message: string;
    details?: any;
  } | null>(null);
  const { user } = useAuth();

  const testConnection = async () => {
    setTesting(true);
    setResult(null);

    try {
      console.log('🧪 Testing Supabase connection...');
      
      // Test 1: Basic connection
      const { data: healthCheck, error: healthError } = await supabase
        .from('appointments')
        .select('count', { count: 'exact', head: true });

      if (healthError) {
        console.error('❌ Health check failed:', healthError);
        setResult({
          connected: false,
          message: `Erro de conexão: ${healthError.message}`,
          details: healthError
        });
        return;
      }

      // Test 2: User-specific query
      if (user) {
        const { data: userAppointments, error: userError } = await supabase
          .from('appointments')
          .select('*')
          .eq('user_id', user.id)
          .limit(1);

        if (userError) {
          console.error('❌ User query failed:', userError);
          setResult({
            connected: false,
            message: `Erro na consulta do usuário: ${userError.message}`,
            details: userError
          });
          return;
        }

        setResult({
          connected: true,
          message: `Conexão estabelecida com sucesso! Encontrados ${healthCheck?.count || 0} registros total.`,
          details: {
            totalAppointments: healthCheck?.count,
            userAppointments: userAppointments?.length || 0,
            userId: user.id
          }
        });
      } else {
        setResult({
          connected: false,
          message: 'Usuário não autenticado',
          details: { user: null }
        });
      }

    } catch (error) {
      console.error('❌ Connection test failed:', error);
      setResult({
        connected: false,
        message: `Erro inesperado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        details: error
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="border-0 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Database className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Teste de Conectividade</h3>
            <p className="text-sm text-gray-500 mt-1">
              Verificar conexão com o banco de dados
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={testConnection}
          disabled={testing}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
        >
          {testing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testando conexão...
            </>
          ) : (
            <>
              <Database className="h-4 w-4 mr-2" />
              Testar Conexão
            </>
          )}
        </Button>

        {result && (
          <Alert className={`${result.connected ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            {result.connected ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={result.connected ? 'text-green-800' : 'text-red-800'}>
              <strong>{result.connected ? 'Sucesso:' : 'Erro:'}</strong> {result.message}
              
              {result.details && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium">
                    Ver detalhes técnicos
                  </summary>
                  <pre className="mt-2 text-xs bg-white/50 p-2 rounded border overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Informações de Debug:</strong></p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Usuário ID: {user?.id || 'Não autenticado'}</li>
            <li>Email: {user?.email || 'N/A'}</li>
            <li>Abra o console do navegador (F12) para ver logs detalhados</li>
            <li>Se houver erro, verifique se as tabelas 'appointments' e 'patients' existem</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseConnectionTest;
