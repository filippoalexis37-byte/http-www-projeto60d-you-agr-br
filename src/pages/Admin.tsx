import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Shield, Check, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  is_approved: boolean;
  created_at: string;
}

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUsers(data as UserProfile[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const toggleApproval = async (userId: string, approve: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_approved: approve })
      .eq("user_id", userId);

    if (error) {
      toast.error("Erro ao atualizar");
    } else {
      toast.success(approve ? "Usuário aprovado!" : "Acesso revogado!");
      fetchUsers();
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-destructive" />
          <h1 className="mt-4 font-display text-3xl text-foreground">ACESSO NEGADO</h1>
          <p className="mt-2 text-muted-foreground">Apenas administradores.</p>
          <Button variant="outline" onClick={() => navigate("/")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-24 pt-6">
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-3xl text-foreground">
          <Shield className="mr-2 inline h-6 w-6 text-primary" />
          PAINEL ADMIN
        </h1>
      </div>

      <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-primary">{users.filter(u => u.is_approved).length}</strong> aprovados ·{" "}
          <strong className="text-accent">{users.filter(u => !u.is_approved).length}</strong> pendentes ·{" "}
          <strong className="text-foreground">{users.length}</strong> total
        </p>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground">Carregando...</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div>
                <p className="font-semibold text-foreground">
                  {user.full_name || "Sem nome"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={user.is_approved ? "default" : "secondary"}>
                  {user.is_approved ? "Aprovado" : "Pendente"}
                </Badge>
                <Button
                  size="icon"
                  variant={user.is_approved ? "destructive" : "default"}
                  onClick={() => toggleApproval(user.user_id, !user.is_approved)}
                  className={!user.is_approved ? "gradient-primary" : ""}
                >
                  {user.is_approved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
