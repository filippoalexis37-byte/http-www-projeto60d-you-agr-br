import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Bot, User, Loader2, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "Qual o melhor treino para iniciante?",
  "Como montar uma dieta para emagrecer?",
  "Posso tomar creatina todo dia?",
  "Qual a diferença entre Whey Isolado e Concentrado?",
  "Como fazer um treino de peito completo?",
  "Quantas calorias preciso para ganhar massa?",
  "Pré-treino faz mal para o coração?",
  "O que comer antes do treino?",
];

const FitnessChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("fitness-chat", {
        body: { messages: newMessages.slice(-10) },
      });

      if (error) throw error;

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Desculpe, ocorreu um erro. Tente novamente!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col px-4 pb-20 pt-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl tracking-wide text-foreground">
          <MessageCircle className="mb-1 mr-2 inline h-7 w-7 text-primary" />
          CHAT FITNESS
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tire suas dúvidas sobre treino, dieta e suplementos
        </p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
              <Bot className="mx-auto h-10 w-10 text-primary" />
              <p className="mt-2 font-semibold text-foreground">Olá! Sou seu assistente fitness 💪</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Pergunte sobre treinos, dietas, suplementos e muito mais!
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Sugestões
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-lg border border-border bg-card p-3 text-left text-sm text-foreground transition-all hover:border-primary/50 hover:bg-primary/5"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full gradient-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "gradient-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border text-foreground rounded-bl-md"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-primary">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Pergunte sobre treino, dieta..."
          className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
          disabled={loading}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground transition-all disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FitnessChat;
