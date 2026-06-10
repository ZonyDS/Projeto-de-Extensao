import { useState } from "react";
import { Eye, EyeOff, GraduationCap, Lock, User } from "lucide-react";

interface LoginProps {
  onLogin: (role: "admin" | "teacher" | "parent") => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const demoAccounts = [
    { role: "admin" as const, email: "diretor@emefhc.edu.br", label: "Diretor(a)", color: "bg-[#1B3A6B]" },
    { role: "teacher" as const, email: "professor@emefhc.edu.br", label: "Professor(a)", color: "bg-[#2563EB]" },
    { role: "parent" as const, email: "responsavel@emefhc.edu.br", label: "Responsável", color: "bg-[#0F766E]" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const found = demoAccounts.find((a) => a.email === email);
      if (found && password === "edu2025") {
        onLogin(found.role);
      } else {
        setError("E-mail ou senha incorretos. Use uma conta de demonstração.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0F2447] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#1B3A6B]/60" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#2563EB]/20" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-[#1B3A6B]/30" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2563EB] shadow-lg mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white mb-1" style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.2 }}>
            Edugestão
          </h1>
          <p className="text-[#94A3B8]" style={{ fontSize: "0.875rem" }}>
            EMEF Humberto de Campos
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-[#1A2744] mb-1" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
            Acesso ao Sistema
          </h2>
          <p className="text-[#5A6D8A] mb-6" style={{ fontSize: "0.875rem" }}>
            Entre com suas credenciais institucionais
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#1A2744] mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                E-mail institucional
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6D8A]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@emefhc.edu.br"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E8F0] bg-[#F4F7FB] text-[#1A2744] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all"
                  style={{ fontSize: "0.9rem" }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#1A2744] mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6D8A]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#E2E8F0] bg-[#F4F7FB] text-[#1A2744] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all"
                  style={{ fontSize: "0.9rem" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6D8A] hover:text-[#1A2744] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-red-600" style={{ fontSize: "0.8rem" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#1B3A6B] hover:bg-[#142d54] text-white transition-all shadow-sm disabled:opacity-70"
              style={{ fontWeight: 600, fontSize: "0.9rem" }}
            >
              {loading ? "Verificando..." : "Entrar"}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-6 border-t border-[#E8EDF5]">
            <p className="text-[#5A6D8A] text-center mb-3" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
              CONTAS DE DEMONSTRAÇÃO (senha: edu2025)
            </p>
            <div className="space-y-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => { setEmail(acc.email); setPassword("edu2025"); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-[#E8EDF5] hover:bg-[#F4F7FB] transition-all text-left"
                >
                  <span className={`w-2 h-2 rounded-full ${acc.color}`} />
                  <span className="text-[#1A2744]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>{acc.label}</span>
                  <span className="text-[#5A6D8A] ml-auto" style={{ fontSize: "0.75rem" }}>{acc.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-[#64748B] mt-6" style={{ fontSize: "0.75rem" }}>
          © 2025 EMEF Humberto de Campos · Sistema Edugestão
        </p>
      </div>
    </div>
  );
}
