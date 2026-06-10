import { useState } from "react";
import { Login } from "./components/Login";
import { Sidebar } from "./components/Sidebar";
import { AdminDashboard } from "./components/AdminDashboard";
import { TeacherDiary } from "./components/TeacherDiary";
import { FamilyPortal } from "./components/FamilyPortal";

type Role = "admin" | "teacher" | "parent";
type Screen = "dashboard" | "diary" | "students" | "reports" | "calendar" | "portal" | "cafeteria" | "settings";

const userNames: Record<Role, string> = {
  admin: "Dra. Maria Helena",
  teacher: "Prof. Carlos Eduardo",
  parent: "Sra. Renata Fernandes",
};

const defaultScreen: Record<Role, Screen> = {
  admin: "dashboard",
  teacher: "diary",
  parent: "portal",
};

function PlaceholderScreen({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex-1 bg-[#F0F4F8] flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-[#EAF0FA] flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📋</span>
        </div>
        <h2 className="text-[#1A2744] mb-2" style={{ fontWeight: 700, fontSize: "1.2rem" }}>{title}</h2>
        <p className="text-[#5A6D8A]" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{description}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [screen, setScreen] = useState<Screen>("dashboard");

  const handleLogin = (loginRole: Role) => {
    setRole(loginRole);
    setScreen(defaultScreen[loginRole]);
  };

  const handleLogout = () => {
    setRole(null);
    setScreen("dashboard");
  };

  if (!role) {
    return <Login onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    if (role === "admin") {
      if (screen === "dashboard") return <AdminDashboard />;
      if (screen === "students") return <PlaceholderScreen title="Gestão de Alunos" description="Cadastro, histórico e gestão completa do corpo discente da escola." />;
      if (screen === "calendar") return <PlaceholderScreen title="Calendário Escolar" description="Eventos, feriados, datas de avaliação e reuniões pedagógicas." />;
      if (screen === "reports") return <PlaceholderScreen title="Relatórios Gerenciais" description="Geração de relatórios de desempenho, frequência e indicadores institucionais." />;
      if (screen === "settings") return <PlaceholderScreen title="Configurações" description="Configurações do sistema, usuários e permissões de acesso." />;
    }

    if (role === "teacher") {
      if (screen === "dashboard") return <AdminDashboard />;
      if (screen === "diary") return <TeacherDiary />;
      if (screen === "students") return <PlaceholderScreen title="Controle de Frequência" description="Visualização detalhada do histórico de frequência por turma e aluno." />;
      if (screen === "reports") return <PlaceholderScreen title="Relatórios Pedagógicos" description="Relatórios de desempenho por turma, disciplina e período." />;
      if (screen === "calendar") return <PlaceholderScreen title="Calendário Acadêmico" description="Datas de entregas, avaliações e eventos da escola." />;
    }

    if (role === "parent") {
      if (screen === "portal") return <FamilyPortal initialTab="home" />;
      if (screen === "dashboard") return <FamilyPortal initialTab="grades" />;
      if (screen === "students") return <FamilyPortal initialTab="attendance" />;
      if (screen === "cafeteria") return <FamilyPortal initialTab="cafeteria" />;
      if (screen === "calendar") return <PlaceholderScreen title="Calendário Escolar" description="Eventos, reuniões de pais e datas importantes do ano letivo." />;
    }

    return <PlaceholderScreen title="Em construção" description="Esta seção estará disponível em breve." />;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F4F8]">
      <Sidebar
        role={role}
        activeScreen={screen}
        onNavigate={(s) => setScreen(s)}
        onLogout={handleLogout}
        userName={userNames[role]}
      />
      <main className="flex-1 overflow-hidden flex flex-col pt-0 md:pt-0">
        {renderScreen()}
      </main>
    </div>
  );
}
