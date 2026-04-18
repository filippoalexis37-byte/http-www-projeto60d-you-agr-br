import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Copy, Users, MousePointerClick, DollarSign, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Affiliates() {
  const { user } = useAuth();
  const [affiliateLink, setAffiliateLink] = useState("");

  // Métricas mockadas para demonstração
  const stats = {
    clicks: 145,
    signups: 24,
    sales: 12,
    commission: "R$ 582,00"
  };

  useEffect(() => {
    if (user) {
      const link = `${window.location.origin}/landing?ref=${user.id}`;
      setAffiliateLink(link);
    }
  }, [user]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast.success("Link de afiliado copiado!");
  };

  return (
    <div className="pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Target className="text-emerald-500 w-6 h-6" />
          Área de Afiliados
        </h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <p className="text-sm text-gray-400 mb-2">Seu link único de divulgação (50% de comissão)</p>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            readOnly 
            value={affiliateLink} 
            className="flex-1 bg-black border border-zinc-800 rounded-lg p-2 text-sm text-zinc-300 outline-none"
          />
          <Button onClick={handleCopyLink} size="icon" className="bg-emerald-600 hover:bg-emerald-700">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-medium text-gray-400 flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-blue-400" /> Cliques
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{stats.clicks}</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-medium text-gray-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" /> Cadastros
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{stats.signups}</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-medium text-gray-400 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" /> Vendas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{stats.sales}</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-medium text-gray-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" /> Comissão
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold text-green-500">{stats.commission}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
