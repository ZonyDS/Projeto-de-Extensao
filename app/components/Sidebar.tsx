import { useState } from "react";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Users,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  FileText,
  Home,
  Utensils,
  ClipboardList,
  UserCheck,
  Menu,
  X,
} from "lucide-react";

type Role = "admin" | "teacher" | "parent";
type Screen = "dashboard" | "diary" | "students" | "reports" | "calendar" | "portal" | "cafeteria" | "settings";

interface SidebarProps {
  role: Role;
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  userName: string;
}

const roleLabels: Record<Role, string> = {
  admin: "Administração",
  teacher: "Professor(a)",
  parent: "Responsável",
};

const roleAvatarColors: Record<Role, string> = {
  admin: "bg-[#1B3A6B]",
  teacher: "bg-[#2563EB]",
  parent: "bg-[#0F766E]",
};

const navByRole: Record<Role, { icon: React.ReactNode; label: string; screen: Screen }[]> = {
  admin: [
    { icon: <LayoutDashboard className="w-4.5 h-4.5" />, label: "Painel", screen: "dashboard" },
    { icon: <Users className="w-4.5 h-4.5" />, label: "Alunos", screen: "students" },
    { icon: <CalendarDays className="w-4.5 h-4.5" />, label: "Calendário", screen: "calendar" },
    { icon: <BarChart3 className="w-4.5 h-4.5" />, label: "Relatórios", screen: "reports" },
    { icon: <Settings className="w-4.5 h-4.5" />, label: "Configurações", screen: "settings" },
  ],
  teacher: [
    { icon: <LayoutDashboard className="w-4.5 h-4.5" />, label: "Painel", screen: "dashboard" },
    { icon: <BookOpen className="w-4.5 h-4.5" />, label: "Diário de Classe", screen: "diary" },
    { icon: <UserCheck className="w-4.5 h-4.5" />, label: "Frequência", screen: "students" },
    { icon: <ClipboardList className="w-4.5 h-4.5" />, label: "Relatórios", screen: "reports" },
    { icon: <CalendarDays className="w-4.5 h-4.5" />, label: "Calendário", screen: "calendar" },
  ],
  parent: [
    { icon: <Home className="w-4.5 h-4.5" />, label: "Início", screen: "portal" },
    { icon: <FileText className="w-4.5 h-4.5" />, label: "Boletim", screen: "dashboard" },
    { icon: <UserCheck className="w-4.5 h-4.5" />, label: "Frequência", screen: "students" },
    { icon: <Utensils className="w-4.5 h-4.5" />, label: "Cantina", screen: "cafeteria" },
    { icon: <CalendarDays className="w-4.5 h-4.5" />, label: "Calendário", screen: "calendar" },
  ],
};

export function Sidebar({ role, activeScreen, onNavigate, onLogout, userName }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = navByRole[role];
  const initials = userName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/8">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-md">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-white" style={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>
              Edugestão
            </div>
            <div className="text-[#64748B]" style={{ fontSize: "0.65rem", lineHeight: 1.2 }}>
              EMEF Humberto de Campos
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-[#64748B] hover:text-white transition-colors hidden md:block"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3">
          <div className="bg-[#1B3A6B] rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span className="text-[#94A3B8]" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
              {roleLabels[role].toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => { onNavigate(item.screen); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left group ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-[#94A3B8] hover:bg-[#1B3A6B] hover:text-white"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && (
                <span style={{ fontSize: "0.875rem", fontWeight: isActive ? 600 : 400 }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Notification */}
      {!collapsed && (
        <div className="mx-3 mb-3 bg-[#1B3A6B] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[#38BDF8]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
              AVISO
            </span>
          </div>
          <p className="text-[#94A3B8]" style={{ fontSize: "0.7rem", lineHeight: 1.4 }}>
            Reunião de pais: 20/06 às 19h
          </p>
        </div>
      )}

      {/* User */}
      <div className="border-t border-white/8 px-3 py-3">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className={`w-8 h-8 rounded-full ${roleAvatarColors[role]} flex items-center justify-center flex-shrink-0`}>
            <span className="text-white" style={{ fontSize: "0.7rem", fontWeight: 700 }}>{initials}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <div className="text-white truncate" style={{ fontSize: "0.8rem", fontWeight: 500 }}>{userName}</div>
              <div className="text-[#64748B] truncate" style={{ fontSize: "0.7rem" }}>{roleLabels[role]}</div>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={onLogout}
              className="text-[#64748B] hover:text-red-400 transition-colors"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 bg-[#0F2447] rounded-lg flex items-center justify-center text-white shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#0F2447]">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-[#64748B] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col h-screen bg-[#0F2447] border-r border-white/5 transition-all duration-300 flex-shrink-0 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
