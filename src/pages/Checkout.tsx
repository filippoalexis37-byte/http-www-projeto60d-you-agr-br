import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, CreditCard, QrCode, Lock } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function Checkout() {
  const { user, isApproved, isSubscribed, signOut } = useAuth();

  if (!user) return <Navigate to="/landing" replace />;
  if (!isApproved) return <Navigate to="/pending" replace />;
  if (isSubscribed) return <Navigate to="/" replace />;

  const handleStripe = async (planType: string) => {
    // Integração futura com o Supabase edge function create-checkout
    alert(`Iniciando pagamento Stripe para o plano: ${planType}`);
  };

  const handlePix = () => {
    alert("Chave Pix CNPJ: 62.485.678/0001-69. (O QR Code dinâmico será gerado na integração oficial)");
  };

  return (
    <div className="min-h-screen bg-black/95 text-white flex flex-col items-center justify-center p-6 pb-20">
      <Lock className="w-16 h-16 text-rose-500 mb-6" />
      <h1 className="text-2xl font-bold mb-2">Período de Teste Encerrado</h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Seus 7 dias gratuitos chegaram ao fim. Escolha um dos planos abaixo para continuar tendo acesso a todos os treinos, dietas e ferramentas.
      </p>

      <div className="w-full max-w-md space-y-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col space-y-3">
          <div className="flex items-center text-lg font-semibold">
            <CreditCard className="w-5 h-5 mr-2 text-indigo-400" /> Cartão de Crédito (Stripe)
          </div>
          <Button onClick={() => handleStripe('3months')} className="w-full bg-indigo-600 hover:bg-indigo-700">Plano 3 Meses</Button>
          <Button onClick={() => handleStripe('6months')} className="w-full bg-indigo-600 hover:bg-indigo-700">Plano 6 Meses</Button>
          <Button onClick={() => handleStripe('1year')} className="w-full bg-indigo-600 hover:bg-indigo-700">Plano 1 Ano</Button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col space-y-3">
          <div className="flex items-center text-lg font-semibold">
            <QrCode className="w-5 h-5 mr-2 text-emerald-400" /> Pagamento via Pix
          </div>
          <p className="text-sm text-gray-400 text-center">Liberação instantânea com QR Code</p>
          <Button onClick={handlePix} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Gerar QR Code Pix</Button>
        </div>
      </div>

      <Button 
        onClick={signOut}
        variant="ghost"
        className="w-full max-w-xs text-gray-400 hover:text-white"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair da conta
      </Button>
    </div>
  );
}
