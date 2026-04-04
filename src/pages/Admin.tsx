import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Shield, Check, X, ArrowLeft, Users, Trophy, Dumbbell,
  TrendingUp, Calendar, Search, UserCheck, UserX, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  is_approved: boolean;
  created_at: string;
}

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

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
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

    // Count workouts per user
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
    const matchesFilter = filter === "all" || (filter === "approved" ? u.is_approved : !u.is_approved);
    return matchesSearch && matchesFilter;
  });

  const getDaysAgo = (dateStr: string) => {
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Hoje";
    if (days === 1) return "Ontem";
    return `${days} dias atrás`;
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

  const approvedCount = users.filter(u => u.is_approved).length;
  const pendingCount = users.filter(u => !u.is_approved).length;

  return (
    <div className="min-h-screen px-4 pb-24 pt-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-3xl text-foreground">
          <Shield className="mr-2 inline h-6 w-6 text-primary" />
          PAINEL ADMIN
        </h1>
      </div>

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
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">Engajamento</span>
          </div>
          <p className="mt-2 font-display text-3xl text-foreground">
            {approvedCount > 0 ? Math.round((Object.keys(userWorkoutCounts).length / approvedCount) * 100) : 0}%
          </p>
          <p className="mt-1 text-xs text-muted-foreground">usuários treinando</p>
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

        <div className="flex items-center gap-2">
          {(["all", "approved", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? "gradient-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:text-foreground"
              }`}
            >
              {f === "all" ? `Todos (${users.length})` : f === "approved" ? `Aprovados (${approvedCount})` : `Pendentes (${pendingCount})`}
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
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {(user.full_name || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {user.full_name || "Sem nome"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{getDaysAgo(user.created_at)}</span>
                      <span>·</span>
                      <Dumbbell className="h-3 w-3" />
                      <span>{userWorkoutCounts[user.user_id] || 0} treinos</span>
                    </div>
                  </div>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
