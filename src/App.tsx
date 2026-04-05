import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import BottomNav from "@/components/BottomNav";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Workouts from "./pages/Workouts";
import Diets from "./pages/Diets";
import Tools from "./pages/Tools";
import Mindset from "./pages/Mindset";
import Progress from "./pages/Progress";
import Admin from "./pages/Admin";
import Supplements from "./pages/Supplements";
import FitnessChat from "./pages/FitnessChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/landing" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();
  const hideBottomNav = ["/landing", "/auth", "/admin"].includes(location.pathname);

  return (
    <>
      <div className="mx-auto max-w-lg">
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/treinos" element={<ProtectedRoute><Workouts /></ProtectedRoute>} />
          <Route path="/dietas" element={<ProtectedRoute><Diets /></ProtectedRoute>} />
          <Route path="/ferramentas" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
          <Route path="/mentalidade" element={<ProtectedRoute><Mindset /></ProtectedRoute>} />
          <Route path="/evolucao" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/suplementos" element={<ProtectedRoute><Supplements /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><FitnessChat /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {user && !hideBottomNav && <BottomNav />}
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
