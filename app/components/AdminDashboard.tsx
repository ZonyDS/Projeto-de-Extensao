import { useState } from "react";
import {
  Users,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  BookOpen,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const statsData = [
  { icon: <Users className="w-5 h-5" />, label: "Total de Alunos", value: "487", delta: "+12 este mês", color: "bg-[#1B3A6B]", light: "bg-[#EAF0FA]", textColor: "text-[#1B3A6B]" },
  { icon: <GraduationCap className="w-5 h-5" />, label: "Professores", value: "32", delta: "3 turmas vagas", color: "bg-[#2563EB]", light: "bg-[#DBEAFE]", textColor: "text-[#2563EB]" },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Freq. Média", value: "91,4%", delta: "+2,1% vs. mês ant.", color: "bg-[#059669]", light: "bg-[#D1FAE5]", textColor: "text-[#059669]" },
  { icon: <AlertCircle className="w-5 h-5" />, label: "Ocorrências", value: "8", delta: "Pendentes de análise", color: "bg-[#D97706]", light: "bg-[#FEF3C7]", textColor: "text-[#D97706]" },
];

const attendanceData = [
  { month: "Jan", presentes: 91, faltas: 9 },
  { month: "Fev", presentes: 88, faltas: 12 },
  { month: "Mar", presentes: 94, faltas: 6 },
  { month: "Abr", presentes: 90, faltas: 10 },
  { month: "Mai", presentes: 93, faltas: 7 },
  { month: "Jun", presentes: 91, faltas: 9 },
];

const gradesData = [
  { turma: "1ºA", media: 7.8 },
  { turma: "2ºA", media: 8.1 },
  { turma: "3ºA", media: 7.4 },
  { turma: "4ºA", media: 8.5 },
  { turma: "5ºA", media: 7.9 },
  { turma: "1ºB", media: 8.3 },
  { turma: "2ºB", media: 7.6 },
  { turma: "3ºB", media: 8.0 },
];

const recentActivities = [
  { type: "grade", text: "Prof. Ana Santos lançou notas — 3ºA", time: "há 15 min", color: "bg-[#2563EB]" },
  { type: "alert", text: "João Silva — 7 faltas consecutivas em 5ºB", time: "há 1h", color: "bg-[#D97706]" },
  { type: "report", text: "Relatório mensal de maio gerado", time: "há 3h", color: "bg-[#059669]" },
  { type: "enroll", text: "Nova matrícula: Maria Oliveira — 2ºA", time: "hoje, 08:12", color: "bg-[#1B3A6B]" },
  { type: "alert", text: "Reunião de pais agendada: 20/06", time: "ontem", color: "bg-[#7C3AED]" },
];

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const calendarEvents: Record<number, { label: string; color: string }[]> = {
  5: [{ label: "Reunião coord.", color: "bg-[#2563EB]" }],
  12: [{ label: "Conselho de classe", color: "bg-[#059669]" }],
  20: [{ label: "Reunião de pais", color: "bg-[#D97706]" }],
  25: [{ label: "Feriado", color: "bg-[#DC2626]" }],
  28: [{ label: "Encerrramento bim.", color: "bg-[#7C3AED]" }],
};

export function AdminDashboard() {
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F0F4F8] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#1A2744]" style={{ fontSize: "1.375rem", fontWeight: 700 }}>
            Painel Administrativo
          </h1>
          <p className="text-[#5A6D8A]" style={{ fontSize: "0.85rem" }}>
            {today.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B3A6B] text-white hover:bg-[#142d54] transition-all shadow-sm"
          style={{ fontSize: "0.85rem", fontWeight: 500 }}>
          <Download className="w-4 h-4" />
          Gerar Relatório PDF
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EDF5] hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.light} ${stat.textColor} flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-[#1A2744]" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div className="text-[#5A6D8A] mt-0.5" style={{ fontSize: "0.78rem" }}>{stat.label}</div>
            <div className={`mt-2 ${stat.textColor}`} style={{ fontSize: "0.72rem", fontWeight: 500 }}>{stat.delta}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Attendance chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8EDF5]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.95rem" }}>Frequência Mensal</h3>
              <p className="text-[#5A6D8A]" style={{ fontSize: "0.75rem" }}>Presença vs. Faltas (%)</p>
            </div>
            <Activity className="w-4 h-4 text-[#5A6D8A]" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="presGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5A6D8A" }} />
              <YAxis tick={{ fontSize: 11, fill: "#5A6D8A" }} domain={[80, 100]} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Area type="monotone" dataKey="presentes" stroke="#2563EB" strokeWidth={2} fill="url(#presGrad)" name="Presentes %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Grade averages */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8EDF5]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.95rem" }}>Média por Turma</h3>
              <p className="text-[#5A6D8A]" style={{ fontSize: "0.75rem" }}>2º Bimestre — 2025</p>
            </div>
            <BookOpen className="w-4 h-4 text-[#5A6D8A]" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={gradesData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
              <XAxis dataKey="turma" tick={{ fontSize: 11, fill: "#5A6D8A" }} />
              <YAxis tick={{ fontSize: 11, fill: "#5A6D8A" }} domain={[0, 10]} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Bar dataKey="media" fill="#1B3A6B" radius={[4, 4, 0, 0]} name="Média" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calendar + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Calendar */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8EDF5]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
              Calendário Escolar
            </h3>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="w-7 h-7 rounded-lg bg-[#F0F4F8] hover:bg-[#EAF0FA] flex items-center justify-center text-[#5A6D8A] transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[#1A2744]" style={{ fontSize: "0.85rem", fontWeight: 600, minWidth: 110, textAlign: "center" }}>
                {monthNames[calMonth]} {calYear}
              </span>
              <button onClick={nextMonth} className="w-7 h-7 rounded-lg bg-[#F0F4F8] hover:bg-[#EAF0FA] flex items-center justify-center text-[#5A6D8A] transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[#5A6D8A]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = calYear === today.getFullYear() && calMonth === today.getMonth() && day === today.getDate();
              const events = calendarEvents[day];
              return (
                <div key={day} className="flex flex-col items-center py-0.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[#1A2744] hover:bg-[#EAF0FA] cursor-pointer transition-colors ${
                    isToday ? "bg-[#2563EB] !text-white" : ""
                  }`} style={{ fontSize: "0.78rem", fontWeight: isToday ? 600 : 400 }}>
                    {day}
                  </div>
                  {events && events.length > 0 && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${events[0].color}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-3 pt-3 border-t border-[#E8EDF5] space-y-1.5">
            {Object.entries(calendarEvents).map(([day, evts]) =>
              evts.map((ev, i) => (
                <div key={`${day}-${i}`} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ev.color}`} />
                  <span className="text-[#5A6D8A]" style={{ fontSize: "0.72rem" }}>
                    Dia {day} — {ev.label}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8EDF5]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.95rem" }}>Atividade Recente</h3>
            <button className="text-[#2563EB] hover:underline" style={{ fontSize: "0.75rem", fontWeight: 500 }}>Ver tudo</button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${act.color}`} />
                <div className="flex-1">
                  <p className="text-[#1A2744]" style={{ fontSize: "0.82rem", lineHeight: 1.4 }}>{act.text}</p>
                  <p className="text-[#94A3B8]" style={{ fontSize: "0.72rem" }}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mt-4 pt-4 border-t border-[#E8EDF5]">
            <p className="text-[#5A6D8A] mb-3" style={{ fontSize: "0.75rem", fontWeight: 600 }}>AÇÕES RÁPIDAS</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <FileText className="w-4 h-4" />, label: "Boletim PDF" },
                { icon: <Users className="w-4 h-4" />, label: "Lista de Alunos" },
                { icon: <Activity className="w-4 h-4" />, label: "Rel. Frequência" },
                { icon: <GraduationCap className="w-4 h-4" />, label: "Histórico Escolar" },
              ].map((action, i) => (
                <button
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E8EDF5] hover:bg-[#EAF0FA] hover:border-[#2563EB]/30 transition-all text-[#1A2744]"
                  style={{ fontSize: "0.78rem", fontWeight: 500 }}
                >
                  <span className="text-[#2563EB]">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
