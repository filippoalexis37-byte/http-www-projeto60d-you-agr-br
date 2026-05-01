import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Lock, ExternalLink, CheckCircle } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function Checkout() {
  const { user, isApproved, isSubscribed, signOut } = useAuth();

  if (!user) return <Navigate to="/landing" replace />;
  if (!isApproved) return <Navigate to="/pending" replace />;
  if (isSubscribed) return <Navigate to="/" replace />;

  const HOTMART_URL = "https://pay.hotmart.com/E98949409P";

  const handleHotmart = () => {
    window.open(HOTMART_URL, "_blank");
  };

  return (
    <div className="min-h-screen bg-black/95 text-white flex flex-col items-center justify-center p-6 pb-20">
      <Lock className="w-16 h-16 text-rose-500 mb-6" />
      <h1 className="text-2xl font-bold mb-2">Período de Teste Encerrado</h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Seus 7 dias gratuitos chegaram ao fim. Continue sua transformação com acesso completo a todos os treinos, dietas, assistente de IA e ferramentas.
      </p>

      <div className="w-full max-w-md mb-8">
        <div className="bg-gradient-to-br from-primary/20 to-zinc-900 border border-primary/40 p-6 rounded-2xl flex flex-col space-y-4 shadow-[0_0_40px_rgba(74,222,128,0.15)]">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Plano Mensal</p>
            <p className="mt-2 text-5xl font-black text-white">R$ 29,90<span className="text-base font-normal text-zinc-400">/mês</span></p>
            <p className="mt-1 text-xs text-zinc-400">Cancele quando quiser</p>
          </div>

          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Treinos completos com vídeo</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Dietas personalizadas + receitas</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Assistente Virtual IA 24h</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Cronômetro de corrida com GPS</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Mentalidade, suplementos e mais</li>
          </ul>

          <Button onClick={handleHotmart} className="w-full bg-primary hover:bg-primary/90 text-black font-black h-14 text-base uppercase tracking-wider">
            Assinar agora <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
          <p className="text-[10px] text-zinc-500 text-center uppercase font-bold">Pagamento seguro via Hotmart</p>
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
