import { Home, Dumbbell, Salad, MessageCircle, TrendingUp, Target, Activity, Pill } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", icon: Home, label: "Início" },
  { path: "/treinos", icon: Dumbbell, label: "Treinos" },
  { path: "/chat", icon: MessageCircle, label: "Chat IA" },
  { path: "/suplementos", icon: Pill, label: "Suplementos" },
  { path: "/corrida", icon: Activity, label: "Corrida" },
  { path: "/dietas", icon: Salad, label: "Dietas" },
  { path: "/afiliados", icon: Target, label: "Afiliado" },
  { path: "/evolucao", icon: TrendingUp, label: "Evolução" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full gradient-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                className={`h-5 w-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area for mobile */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
};

export default BottomNav;
