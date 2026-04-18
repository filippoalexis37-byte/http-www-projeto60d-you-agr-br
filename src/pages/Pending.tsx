import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Clock } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function Pending() {
  const { user, isApproved, signOut } = useAuth();

  if (!user) return <Navigate to="/landing" replace />;
  if (isApproved) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-black/95 text-white flex flex-col items-center justify-center p-6 text-center">
      <Clock className="w-16 h-16 text-yellow-500 mb-6" />
      <h1 className="text-2xl font-bold mb-4">Aguardando Aprovação</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        O seu cadastro foi recebido com sucesso! No momento, sua conta está pendente de aprovação pelo administrador. Assim que for aprovada, você receberá 7 dias de teste grátis para aproveitar o aplicativo.
      </p>
      <Button 
        onClick={signOut}
        variant="outline"
        className="w-full max-w-xs border-white/20 hover:bg-white/10"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair
      </Button>
    </div>
  );
}
