import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Shield, Check, X, ArrowLeft, Users, Trophy, Dumbbell,
  TrendingUp, Calendar, Search, UserCheck, UserX, Clock,
  LogOut, LogIn, AlertTriangle, Timer, DollarSign, Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

interface AffiliateSale {
  id: string;
  affiliate_name: string;
  customer_name: string;
  amount: number;
  commission: number;
  date: string;
}

const mockSales: AffiliateSale[] = [
  { id: "1", affiliate_name: "João Silva", customer_name: "Maria Oliveira", amount: 97.00, commission: 48.50, date: "2024-04-18" },
  { id: "2", affiliate_name: "Ana Costa", customer_name: "Pedro Santos", amount: 147.00, commission: 73.50, date: "2024-04-17" },
  { id: "3", affiliate_name: "João Silva", customer_name: "Lucas Lima", amount: 97.00, commission: 48.50, date: "2024-04-16" },
  { id: "4", affiliate_name: "Ricardo Souza", customer_name: "Carla Mendes", amount: 197.00, commission: 98.50, date: "2024-04-15" },
];

interface WorkoutStats {
  total: number;
  today: number;
  thisWeek: number;
}

interface MedalStats {
  total: number;
  bronze: number;
  silver: number;
  gold: number;
}

const getTrialStatus = (updatedAt: string, isApproved: boolean) => {
  if (!isApproved) return { trialEnd: null, expired: false, daysLeft: 0 };
  const updated = new Date(updatedAt);
  const trialEnd = new Date(updated.getTime() + 7 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return { trialEnd, expired: daysLeft <= 0, daysLeft: Math.max(0, daysLeft) };
};

const Admin = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "trial_active" | "trial_expired">("all");
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats>({ total: 0, today: 0, thisWeek: 0 });
  const [medalStats, setMedalStats] = useState<MedalStats>({ total: 0, bronze: 0, silver: 0, gold: 0 });
  const [userWorkoutCounts, setUserWorkoutCounts] = useState<Record<string, number>>({});

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

  const fetchStats = async () => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString();

    const [allWorkouts, todayWorkouts, weekWorkouts, medals] = await Promise.all([
      supabase.from("completed_workouts").select("user_id", { count: "exact" }),
      supabase.from("completed_workouts").select("*", { count: "exact" }).gte("completed_at", todayStart),
      supabase.from("completed_workouts").select("*", { count: "exact" }).gte("completed_at", weekStart),
      supabase.from("medals").select("*"),
    ]);

    setWorkoutStats({
      total: allWorkouts.count ?? 0,
      today: todayWorkouts.count ?? 0,
      thisWeek: weekWorkouts.count ?? 0,
    });

    const medalsData = medals.data ?? [];
    setMedalStats({
      total: medalsData.length,
      bronze: medalsData.filter(m => m.medal_name.includes("Bronze")).length,
      silver: medalsData.filter(m => m.medal_name.includes("Prata")).length,
      gold: medalsData.filter(m => m.medal_name.includes("Ouro")).length,
    });

    const counts: Record<string, number> = {};
    (allWorkouts.data ?? []).forEach((w: any) => {
      counts[w.user_id] = (counts[w.user_id] || 0) + 1;
    });
    setUserWorkoutCounts(counts);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchStats();
    }
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

  const approveAll = async () => {
    const pending = users.filter(u => !u.is_approved);
    if (pending.length === 0) return;
    const { error } = await supabase
      .from("profiles")
      .update({ is_approved: true })
      .in("user_id", pending.map(u => u.user_id));
    if (!error) {
      toast.success(`${pending.length} usuários aprovados!`);
      fetchUsers();
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = !searchTerm || (u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filter === "all") return matchesSearch;
    if (filter === "approved") return matchesSearch && u.is_approved;
    if (filter === "pending") return matchesSearch && !u.is_approved;
    const trial = getTrialStatus(u.updated_at, u.is_approved);
    if (filter === "trial_active") return matchesSearch && u.is_approved && !trial.expired;
    if (filter === "trial_expired") return matchesSearch && u.is_approved && trial.expired;
    return matchesSearch;
  });

  const getDaysAgo = (dateStr: string) => {
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Hoje";
    if (days === 1) return "Ontem";
    return `${days} dias atrás`;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/landing");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 font-display text-3xl text-foreground">PAINEL ADMIN</h1>
          <p className="mt-2 text-muted-foreground">Faça login para acessar o painel.</p>
          <Button onClick={() => navigate("/auth?mode=login")} className="mt-4 gradient-primary gap-2">
            <LogIn className="h-4 w-4" /> Entrar
          </Button>
        </div>
      </div>
    );
  }

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

  const approvedCount = users.filter(u => u.is_approved).length;
  const pendingCount = users.filter(u => !u.is_approved).length;
  const trialActiveCount = users.filter(u => u.is_approved && !getTrialStatus(u.updated_at, u.is_approved).expired).length;
  const trialExpiredCount = users.filter(u => u.is_approved && getTrialStatus(u.updated_at, u.is_approved).expired).length;

  const totalSales = mockSales.reduce((acc, sale) => acc + sale.amount, 0);
  const totalCommission = mockSales.reduce((acc, sale) => acc + sale.commission, 0);

  return (
    <div className="min-h-screen px-4 pb-24 pt-6">
      {/* Header with login/logout */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-3xl text-foreground">
            <Shield className="mr-2 inline h-6 w-6 text-primary" />
            PAINEL ADMIN
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-xs text-muted-foreground truncate max-w-[120px]">
            {user.email}
          </span>
          <Button size="sm" variant="outline" onClick={handleSignOut} className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" /> Usuários
          </TabsTrigger>
          <TabsTrigger value="affiliates" className="gap-2">
            <Target className="h-4 w-4" /> Vendas Afiliados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          {/* Stats Grid */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Total Usuários</span>
              </div>
              <p className="mt-2 font-display text-3xl text-foreground">{users.length}</p>
              <div className="mt-1 flex gap-2 text-xs">
                <span className="text-primary">{approvedCount} ativos</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-accent">{pendingCount} pendentes</span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Dumbbell className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Treinos Totais</span>
              </div>
              <p className="mt-2 font-display text-3xl text-foreground">{workoutStats.total}</p>
              <div className="mt-1 flex gap-2 text-xs">
                <span className="text-primary">{workoutStats.today} hoje</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{workoutStats.thisWeek} semana</span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Medalhas</span>
              </div>
              <p className="mt-2 font-display text-3xl text-foreground">{medalStats.total}</p>
              <div className="mt-1 flex gap-2 text-xs">
                <span>🥉{medalStats.bronze}</span>
                <span>🥈{medalStats.silver}</span>
                <span>🥇{medalStats.gold}</span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Teste Grátis</span>
              </div>
              <p className="mt-2 font-display text-3xl text-foreground">{trialExpiredCount}</p>
              <div className="mt-1 flex gap-2 text-xs">
                <span className="text-primary">{trialActiveCount} ativos</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-destructive">{trialExpiredCount} expirados</span>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="mb-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar usuário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {([
                { key: "all", label: `Todos (${users.length})` },
                { key: "approved", label: `Aprovados (${approvedCount})` },
                { key: "pending", label: `Pendentes (${pendingCount})` },
                { key: "trial_active", label: `Trial ativo (${trialActiveCount})` },
                { key: "trial_expired", label: `Trial expirado (${trialExpiredCount})` },
              ] as const).map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    filter === f.key
                      ? "gradient-primary text-primary-foreground"
                      : "bg-card text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}

              {pendingCount > 0 && (
                <Button size="sm" onClick={approveAll} className="ml-auto gradient-primary text-xs">
                  <UserCheck className="mr-1 h-3 w-3" /> Aprovar todos
                </Button>
              )}
            </div>
          </div>

          {/* Users List */}
          {loading ? (
            <p className="text-center text-muted-foreground">Carregando...</p>
          ) : filteredUsers.length === 0 ? (
            <div className="mt-8 text-center">
              <UserX className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((u) => {
                const trial = getTrialStatus(u.updated_at, u.is_approved);
                return (
                  <div
                    key={u.id}
                    className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {(u.full_name || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {u.full_name || "Sem nome"}
                          </p>
                          <p className="text-xs text-muted-foreground mb-1">
                            {u.email || "Sem e-mail cadastrado"}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{getDaysAgo(u.created_at)}</span>
                            <span>·</span>
                            <Dumbbell className="h-3 w-3" />
                            <span>{userWorkoutCounts[u.user_id] || 0} treinos</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant={u.is_approved ? "default" : "secondary"}>
                            {u.is_approved ? "Aprovado" : "Pendente"}
                          </Badge>
                          {u.is_approved && trial.expired ? (
                            <Badge variant="destructive" className="text-[10px] gap-1">
                              <AlertTriangle className="h-3 w-3" /> Trial expirado
                            </Badge>
                          ) : u.is_approved ? (
                            <Badge variant="outline" className="text-[10px] gap-1 border-primary/30 text-primary">
                              <Timer className="h-3 w-3" /> {trial.daysLeft}d restantes
                            </Badge>
                          ) : null}
                        </div>
                        <Button
                          size="icon"
                          variant={u.is_approved ? "destructive" : "default"}
                          onClick={() => toggleApproval(u.user_id, !u.is_approved)}
                          className={!u.is_approved ? "gradient-primary" : ""}
                        >
                          {u.is_approved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="affiliates" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-medium text-gray-400 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" /> Total em Vendas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold text-emerald-500">R$ {totalSales.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-medium text-gray-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-500" /> Comissões Totais
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold text-blue-500">R$ {totalCommission.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Afiliado</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Cliente</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Valor</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Comissão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4 font-medium">{sale.affiliate_name}</td>
                    <td className="px-4 py-4 text-muted-foreground">{sale.customer_name}</td>
                    <td className="px-4 py-4 text-right">R$ {sale.amount.toFixed(2)}</td>
                    <td className="px-4 py-4 text-right font-semibold text-emerald-500">R$ {sale.commission.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
