import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import Workouts from "./pages/Workouts";
import Diets from "./pages/Diets";
import Tools from "./pages/Tools";
import Mindset from "./pages/Mindset";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="mx-auto max-w-lg">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/treinos" element={<Workouts />} />
            <Route path="/dietas" element={<Diets />} />
            <Route path="/ferramentas" element={<Tools />} />
            <Route path="/mentalidade" element={<Mindset />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
