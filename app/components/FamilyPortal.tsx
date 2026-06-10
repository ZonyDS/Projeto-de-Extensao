import { useState, useEffect } from "react";
import {
  User,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  CalendarDays,
  Utensils,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Bell,
  ChevronDown,
  Home,
  ArrowRight,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const STUDENTS = ["Lucas Fernandes", "Mariana Fernandes"];

const studentData: Record<string, {
  grade: string;
  class: string;
  teacher: string;
  attendance: number;
  absences: number;
  grades: { subject: string; b1: number; b2: number; b3: number | null; b4: number | null; avg: number | null }[];
  attendanceHistory: { date: string; status: "P" | "F" | "J"; day: string }[];
  cafeteria: { date: string; desc: string; value: number; type: "credit" | "debit" }[];
}> = {
  "Lucas Fernandes": {
    grade: "5º Ano A",
    class: "Tarde",
    teacher: "Prof. Carlos Eduardo",
    attendance: 91,
    absences: 8,
    grades: [
      { subject: "Matemática", b1: 8.5, b2: 7.0, b3: null, b4: null, avg: null },
      { subject: "Português", b1: 9.0, b2: 8.5, b3: null, b4: null, avg: null },
      { subject: "Ciências", b1: 7.5, b2: 8.0, b3: null, b4: null, avg: null },
      { subject: "História", b1: 8.0, b2: 9.0, b3: null, b4: null, avg: null },
      { subject: "Geografia", b1: 7.0, b2: 7.5, b3: null, b4: null, avg: null },
      { subject: "Ed. Física", b1: 9.5, b2: 9.5, b3: null, b4: null, avg: null },
      { subject: "Artes", b1: 10.0, b2: 9.0, b3: null, b4: null, avg: null },
    ],
    attendanceHistory: [
      { date: "10/06", day: "Ter", status: "P" },
      { date: "09/06", day: "Seg", status: "P" },
      { date: "06/06", day: "Sex", status: "F" },
      { date: "05/06", day: "Qui", status: "P" },
      { date: "04/06", day: "Qua", status: "P" },
      { date: "03/06", day: "Ter", status: "J" },
      { date: "02/06", day: "Seg", status: "P" },
      { date: "30/05", day: "Sex", status: "P" },
      { date: "29/05", day: "Qui", status: "F" },
      { date: "28/05", day: "Qua", status: "P" },
    ],
    cafeteria: [
      { date: "10/06", desc: "Almoço completo", value: -8.50, type: "debit" },
      { date: "09/06", desc: "Recarga de saldo", value: 50.00, type: "credit" },
      { date: "09/06", desc: "Lanche da tarde", value: -4.00, type: "debit" },
      { date: "06/06", desc: "Almoço completo", value: -8.50, type: "debit" },
      { date: "05/06", desc: "Suco natural", value: -3.00, type: "debit" },
      { date: "04/06", desc: "Almoço completo", value: -8.50, type: "debit" },
      { date: "03/06", desc: "Lanche + bebida", value: -5.00, type: "debit" },
      { date: "02/06", desc: "Recarga de saldo", value: 30.00, type: "credit" },
    ],
  },
  "Mariana Fernandes": {
    grade: "3º Ano B",
    class: "Manhã",
    teacher: "Prof.ª Ana Santos",
    attendance: 97,
    absences: 2,
    grades: [
      { subject: "Matemática", b1: 9.0, b2: 9.5, b3: null, b4: null, avg: null },
      { subject: "Português", b1: 10.0, b2: 9.5, b3: null, b4: null, avg: null },
      { subject: "Ciências", b1: 9.5, b2: 9.0, b3: null, b4: null, avg: null },
      { subject: "História", b1: 8.5, b2: 9.0, b3: null, b4: null, avg: null },
      { subject: "Geografia", b1: 9.0, b2: 8.5, b3: null, b4: null, avg: null },
      { subject: "Ed. Física", b1: 10.0, b2: 10.0, b3: null, b4: null, avg: null },
      { subject: "Artes", b1: 10.0, b2: 10.0, b3: null, b4: null, avg: null },
    ],
    attendanceHistory: [
      { date: "10/06", day: "Ter", status: "P" },
      { date: "09/06", day: "Seg", status: "P" },
      { date: "06/06", day: "Sex", status: "P" },
      { date: "05/06", day: "Qui", status: "P" },
      { date: "04/06", day: "Qua", status: "P" },
      { date: "03/06", day: "Ter", status: "P" },
      { date: "02/06", day: "Seg", status: "F" },
      { date: "30/05", day: "Sex", status: "P" },
      { date: "29/05", day: "Qui", status: "P" },
      { date: "28/05", day: "Qua", status: "P" },
    ],
    cafeteria: [
      { date: "10/06", desc: "Almoço completo", value: -8.50, type: "debit" },
      { date: "09/06", desc: "Lanche da manhã", value: -3.50, type: "debit" },
      { date: "06/06", desc: "Almoço + suco", value: -11.00, type: "debit" },
      { date: "05/06", desc: "Recarga de saldo", value: 60.00, type: "credit" },
      { date: "04/06", desc: "Almoço completo", value: -8.50, type: "debit" },
      { date: "03/06", desc: "Lanche da manhã", value: -3.50, type: "debit" },
    ],
  },
};

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  P: { bg: "bg-[#D1FAE5]", text: "text-[#059669]", label: "Presente" },
  F: { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]", label: "Falta" },
  J: { bg: "bg-[#FEF3C7]", text: "text-[#D97706]", label: "Justificado" },
};

type Tab = "home" | "grades" | "attendance" | "cafeteria";

interface FamilyPortalProps {
  initialTab?: Tab;
}

export function FamilyPortal({ initialTab = "home" }: FamilyPortalProps) {
  const [selectedStudent, setSelectedStudent] = useState(STUDENTS[0]);
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const data = studentData[selectedStudent];
  const balance = data.cafeteria.reduce((acc, t) => acc + t.value, 0);

  const radialData = [{ name: "Frequência", value: data.attendance, fill: data.attendance >= 90 ? "#059669" : "#D97706" }];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F0F4F8] p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1A2744]" style={{ fontSize: "1.375rem", fontWeight: 700 }}>
            Portal da Família
          </h1>
          <p className="text-[#5A6D8A]" style={{ fontSize: "0.85rem" }}>
            Responsável: Sra. Renata Fernandes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-lg border border-[#E8EDF5] bg-white text-[#1A2744] appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 shadow-sm"
              style={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              {STUDENTS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6D8A] pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B3A6B] text-white hover:bg-[#142d54] transition-all shadow-sm"
            style={{ fontSize: "0.85rem", fontWeight: 500 }}>
            <Download className="w-4 h-4" />
            Baixar Boletim
          </button>
        </div>
      </div>

      {/* Student info + quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Student card */}
        <div className="md:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-[#E8EDF5] flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1B3A6B] to-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-md">
            <User className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[#1A2744]" style={{ fontWeight: 700, fontSize: "1.05rem" }}>{selectedStudent}</div>
            <div className="text-[#5A6D8A]" style={{ fontSize: "0.82rem" }}>{data.grade} · Turno {data.class}</div>
            <div className="text-[#94A3B8]" style={{ fontSize: "0.78rem" }}>{data.teacher}</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {data.absences >= 8 ? (
              <div className="flex items-center gap-1 bg-[#FEF3C7] text-[#D97706] px-2 py-1 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5" />
                <span style={{ fontSize: "0.72rem", fontWeight: 600 }}>Atenção às faltas</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-[#D1FAE5] text-[#059669] px-2 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span style={{ fontSize: "0.72rem", fontWeight: 600 }}>Frequência regular</span>
              </div>
            )}
          </div>
        </div>

        {/* Attendance radial */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EDF5] flex flex-col items-center justify-center">
          <div style={{ width: 80, height: 80 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="60%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "#F0F4F8" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[#1A2744] -mt-1" style={{ fontWeight: 700, fontSize: "1.2rem", textAlign: "center" }}>{data.attendance}%</div>
          <div className="text-[#5A6D8A]" style={{ fontSize: "0.72rem" }}>Frequência</div>
          <div className="text-[#DC2626]" style={{ fontSize: "0.7rem", fontWeight: 500 }}>{data.absences} faltas</div>
        </div>

        {/* Cafeteria balance */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EDF5] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#EAF0FA] flex items-center justify-center">
              <Utensils className="w-4 h-4 text-[#1B3A6B]" />
            </div>
            <span className="text-[#5A6D8A]" style={{ fontSize: "0.78rem", fontWeight: 500 }}>Saldo Cantina</span>
          </div>
          <div className={`${balance >= 0 ? "text-[#059669]" : "text-[#DC2626]"}`} style={{ fontSize: "1.4rem", fontWeight: 700 }}>
            R$ {Math.abs(balance).toFixed(2).replace(".", ",")}
          </div>
          <div className="text-[#94A3B8]" style={{ fontSize: "0.72rem" }}>
            {balance >= 0 ? "Saldo disponível" : "Saldo devedor"}
          </div>
          <button className="mt-2 text-[#2563EB] hover:underline text-left" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
            Ver extrato completo →
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8EDF5] overflow-hidden">
        <div className="flex border-b border-[#E8EDF5] overflow-x-auto">
          {[
            { id: "home" as const, label: "Início", icon: <Home className="w-4 h-4" /> },
            { id: "grades" as const, label: "Boletim", icon: <BookOpen className="w-4 h-4" /> },
            { id: "attendance" as const, label: "Frequência", icon: <CalendarDays className="w-4 h-4" /> },
            { id: "cafeteria" as const, label: "Cantina", icon: <Utensils className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[#2563EB] text-[#2563EB] bg-[#EAF0FA]/50"
                  : "border-transparent text-[#5A6D8A] hover:text-[#1A2744] hover:bg-[#F4F7FB]"
              }`}
              style={{ fontSize: "0.875rem", fontWeight: activeTab === tab.id ? 600 : 400 }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Home tab */}
        {activeTab === "home" && (
          <div className="p-5 space-y-4">
            <h3 className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
              Resumo de {selectedStudent}
            </h3>

            {/* Alert if needed */}
            {data.absences >= 8 && (
              <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-3 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#D97706] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#92400E]" style={{ fontWeight: 600, fontSize: "0.82rem" }}>Atenção: faltas acumuladas</p>
                  <p className="text-[#78350F]" style={{ fontSize: "0.78rem" }}>
                    {selectedStudent} acumulou {data.absences} faltas. Entre em contato com a escola.
                  </p>
                </div>
              </div>
            )}

            {/* Quick summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setActiveTab("grades")}
                className="bg-[#EAF0FA] hover:bg-[#DBEAFE] rounded-xl p-4 text-left transition-colors group border border-transparent hover:border-[#2563EB]/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1B3A6B] flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[#1A2744]" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                  {(() => {
                    const allGrades = data.grades.flatMap(g => [g.b1, g.b2, g.b3, g.b4].filter(n => n !== null) as number[]);
                    return allGrades.length
                      ? (allGrades.reduce((a, b) => a + b, 0) / allGrades.length).toFixed(1).replace(".", ",")
                      : "–";
                  })()}
                </div>
                <div className="text-[#5A6D8A]" style={{ fontSize: "0.78rem" }}>Média geral</div>
                <div className="text-[#2563EB] mt-1" style={{ fontSize: "0.72rem", fontWeight: 500 }}>Ver boletim →</div>
              </button>

              <button
                onClick={() => setActiveTab("attendance")}
                className="bg-[#D1FAE5] hover:bg-[#A7F3D0] rounded-xl p-4 text-left transition-colors group border border-transparent hover:border-[#059669]/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#059669] flex items-center justify-center">
                    <CalendarDays className="w-4 h-4 text-white" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#059669] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[#1A2744]" style={{ fontWeight: 700, fontSize: "1.2rem" }}>{data.attendance}%</div>
                <div className="text-[#5A6D8A]" style={{ fontSize: "0.78rem" }}>Frequência</div>
                <div className="text-[#059669] mt-1" style={{ fontSize: "0.72rem", fontWeight: 500 }}>{data.absences} faltas registradas →</div>
              </button>

              <button
                onClick={() => setActiveTab("cafeteria")}
                className="bg-[#F0F4F8] hover:bg-[#E8EDF5] rounded-xl p-4 text-left transition-colors group border border-transparent hover:border-[#1B3A6B]/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1B3A6B] flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-white" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#1B3A6B] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className={`${balance >= 0 ? "text-[#059669]" : "text-[#DC2626]"}`} style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                  R$ {Math.abs(balance).toFixed(2).replace(".", ",")}
                </div>
                <div className="text-[#5A6D8A]" style={{ fontSize: "0.78rem" }}>Saldo cantina</div>
                <div className="text-[#1B3A6B] mt-1" style={{ fontSize: "0.72rem", fontWeight: 500 }}>Ver extrato →</div>
              </button>
            </div>

            {/* Recent grades snapshot */}
            <div className="bg-white rounded-xl border border-[#E8EDF5] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F4F8]">
                <p className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Últimas notas</p>
                <button onClick={() => setActiveTab("grades")} className="text-[#2563EB] hover:underline" style={{ fontSize: "0.75rem" }}>Ver boletim completo</button>
              </div>
              <div className="divide-y divide-[#F0F4F8]">
                {data.grades.slice(0, 4).map((g, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                    <span className="text-[#1A2744] flex-1" style={{ fontSize: "0.85rem" }}>{g.subject}</span>
                    <span className={`px-2 py-0.5 rounded-lg ${g.b2 >= 8 ? "bg-[#D1FAE5] text-[#059669]" : g.b2 >= 6 ? "bg-[#DBEAFE] text-[#1D4ED8]" : "bg-[#FEF3C7] text-[#D97706]"}`}
                      style={{ fontSize: "0.78rem", fontWeight: 700 }}>
                      {g.b2.toFixed(1).replace(".", ",")}
                    </span>
                    <span className="text-[#94A3B8]" style={{ fontSize: "0.7rem" }}>2º Bim.</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Last cafeteria transactions */}
            <div className="bg-white rounded-xl border border-[#E8EDF5] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F4F8]">
                <p className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Cantina — últimos lançamentos</p>
                <button onClick={() => setActiveTab("cafeteria")} className="text-[#2563EB] hover:underline" style={{ fontSize: "0.75rem" }}>Ver extrato</button>
              </div>
              <div className="divide-y divide-[#F0F4F8]">
                {data.cafeteria.slice(0, 3).map((tx, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${tx.type === "credit" ? "bg-[#D1FAE5]" : "bg-[#FEE2E2]"}`}>
                      {tx.type === "credit"
                        ? <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />
                        : <Utensils className="w-3.5 h-3.5 text-[#DC2626]" />}
                    </div>
                    <span className="text-[#1A2744] flex-1" style={{ fontSize: "0.82rem" }}>{tx.desc}</span>
                    <span className="text-[#94A3B8]" style={{ fontSize: "0.72rem" }}>{tx.date}</span>
                    <span className={`${tx.type === "credit" ? "text-[#059669]" : "text-[#DC2626]"}`} style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                      {tx.type === "credit" ? "+" : ""}R$ {Math.abs(tx.value).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grades tab */}
        {activeTab === "grades" && (
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                Boletim — 2º Semestre 2025
              </h3>
              <button className="flex items-center gap-1.5 text-[#2563EB] hover:underline" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8EDF5]">
                    <th className="text-left py-2 px-3 text-[#5A6D8A]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>DISCIPLINA</th>
                    <th className="text-center py-2 px-3 text-[#5A6D8A]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>1º BIM.</th>
                    <th className="text-center py-2 px-3 text-[#5A6D8A]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>2º BIM.</th>
                    <th className="text-center py-2 px-3 text-[#5A6D8A]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>3º BIM.</th>
                    <th className="text-center py-2 px-3 text-[#5A6D8A]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>4º BIM.</th>
                    <th className="text-center py-2 px-3 text-[#5A6D8A]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>SITUAÇÃO</th>
                  </tr>
                </thead>
                <tbody>
                  {data.grades.map((g, i) => {
                    const filled = [g.b1, g.b2, g.b3, g.b4].filter((n) => n !== null) as number[];
                    const avg = filled.length ? filled.reduce((a, b) => a + b, 0) / filled.length : null;
                    const delta = g.b2 - g.b1;
                    return (
                      <tr key={i} className={`border-b border-[#F0F4F8] hover:bg-[#F8FAFC] transition-colors`}>
                        <td className="py-3 px-3">
                          <span className="text-[#1A2744]" style={{ fontWeight: 500, fontSize: "0.85rem" }}>{g.subject}</span>
                        </td>
                        {[g.b1, g.b2, g.b3, g.b4].map((grade, gi) => (
                          <td key={gi} className="text-center py-3 px-3">
                            {grade !== null ? (
                              <span className={`inline-block px-2 py-0.5 rounded-lg ${
                                grade >= 8 ? "bg-[#D1FAE5] text-[#059669]" :
                                grade >= 6 ? "bg-[#DBEAFE] text-[#1D4ED8]" :
                                grade >= 5 ? "bg-[#FEF3C7] text-[#D97706]" :
                                "bg-[#FEE2E2] text-[#DC2626]"
                              }`} style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                                {grade.toFixed(1).replace(".", ",")}
                              </span>
                            ) : (
                              <span className="text-[#D1D5DB]" style={{ fontSize: "0.85rem" }}>–</span>
                            )}
                          </td>
                        ))}
                        <td className="text-center py-3 px-3">
                          <div className="flex items-center justify-center gap-1">
                            {delta > 0 ? (
                              <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />
                            ) : delta < 0 ? (
                              <TrendingDown className="w-3.5 h-3.5 text-[#DC2626]" />
                            ) : (
                              <Minus className="w-3.5 h-3.5 text-[#94A3B8]" />
                            )}
                            <span className={`${delta > 0 ? "text-[#059669]" : delta < 0 ? "text-[#DC2626]" : "text-[#94A3B8]"}`}
                              style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                              {avg !== null
                                ? avg >= 6 ? "Aprovado" : avg >= 5 ? "Recup." : "Risco"
                                : "Em andamento"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#D1FAE5]" />
                <span className="text-[#5A6D8A]" style={{ fontSize: "0.7rem" }}>≥ 8,0</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#DBEAFE]" />
                <span className="text-[#5A6D8A]" style={{ fontSize: "0.7rem" }}>6,0 – 7,9</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#FEF3C7]" />
                <span className="text-[#5A6D8A]" style={{ fontSize: "0.7rem" }}>5,0 – 5,9</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#FEE2E2]" />
                <span className="text-[#5A6D8A]" style={{ fontSize: "0.7rem" }}>&lt; 5,0</span>
              </div>
            </div>
          </div>
        )}

        {/* Attendance history tab */}
        {activeTab === "attendance" && (
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                Histórico de Frequência
              </h3>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-[#059669]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{data.attendance}%</div>
                  <div className="text-[#5A6D8A]" style={{ fontSize: "0.7rem" }}>frequência</div>
                </div>
                <div className="text-center">
                  <div className="text-[#DC2626]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{data.absences}</div>
                  <div className="text-[#5A6D8A]" style={{ fontSize: "0.7rem" }}>faltas</div>
                </div>
              </div>
            </div>

            {data.absences >= 8 && (
              <div className="mb-4 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-3 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#D97706] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#92400E]" style={{ fontWeight: 600, fontSize: "0.82rem" }}>Atenção: limite de faltas</p>
                  <p className="text-[#78350F]" style={{ fontSize: "0.78rem" }}>
                    O aluno está próximo do limite permitido de faltas (25% da carga horária). Entre em contato com a escola.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {data.attendanceHistory.map((entry, i) => {
                const cfg = statusConfig[entry.status];
                return (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-[#F0F4F8] hover:bg-[#F8FAFC] transition-colors">
                    <div className="w-10 text-center">
                      <div className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.85rem" }}>{entry.date}</div>
                      <div className="text-[#94A3B8]" style={{ fontSize: "0.7rem" }}>{entry.day}</div>
                    </div>
                    <div className="flex-1 h-px bg-[#F0F4F8]" />
                    <span className={`px-3 py-1 rounded-full ${cfg.bg} ${cfg.text}`} style={{ fontSize: "0.78rem", fontWeight: 600 }}>
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cafeteria tab */}
        {activeTab === "cafeteria" && (
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1A2744]" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                Extrato da Cantina
              </h3>
              <button className="flex items-center gap-1.5 text-[#2563EB] hover:underline" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                <Download className="w-3.5 h-3.5" /> Exportar PDF
              </button>
            </div>

            {/* Balance card */}
            <div className="bg-gradient-to-r from-[#0F2447] to-[#1B3A6B] rounded-xl p-4 mb-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#94A3B8]" style={{ fontSize: "0.78rem" }}>Saldo atual</p>
                  <p style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                    R$ {balance.toFixed(2).replace(".", ",").replace("-", "")}
                  </p>
                  <p className="text-[#94A3B8]" style={{ fontSize: "0.75rem" }}>{balance >= 0 ? "Disponível para uso" : "Saldo devedor"}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#94A3B8]" style={{ fontSize: "0.7rem" }}>Total consumido (jun.)</p>
                  <p className="text-white" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    R$ {data.cafeteria.filter(t => t.type === "debit").reduce((a, t) => a + Math.abs(t.value), 0).toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <div>
                  <p className="text-[#94A3B8]" style={{ fontSize: "0.7rem" }}>Total recarregado (jun.)</p>
                  <p className="text-white" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    R$ {data.cafeteria.filter(t => t.type === "credit").reduce((a, t) => a + t.value, 0).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="space-y-2">
              {data.cafeteria.map((tx, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-[#F0F4F8] hover:bg-[#F8FAFC] transition-colors">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    tx.type === "credit" ? "bg-[#D1FAE5]" : "bg-[#FEE2E2]"
                  }`}>
                    {tx.type === "credit"
                      ? <TrendingUp className="w-4 h-4 text-[#059669]" />
                      : <Utensils className="w-4 h-4 text-[#DC2626]" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1A2744]" style={{ fontWeight: 500, fontSize: "0.85rem" }}>{tx.desc}</p>
                    <p className="text-[#94A3B8]" style={{ fontSize: "0.72rem" }}>{tx.date}</p>
                  </div>
                  <span className={`${tx.type === "credit" ? "text-[#059669]" : "text-[#DC2626]"}`}
                    style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    {tx.type === "credit" ? "+" : ""}R$ {Math.abs(tx.value).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[#EAF0FA] border border-[#DBEAFE] flex items-start gap-2">
              <Bell className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
              <p className="text-[#1D4ED8]" style={{ fontSize: "0.78rem" }}>
                Recarregue o saldo pelo aplicativo Edugestão ou diretamente na secretaria da escola.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
