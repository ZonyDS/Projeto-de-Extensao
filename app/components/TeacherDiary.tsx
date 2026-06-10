import { useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Download,
  ChevronDown,
  Save,
  BookOpen,
  Users,
  AlertTriangle,
  FileText,
} from "lucide-react";

type AttendanceStatus = "P" | "F" | "J";

interface Student {
  id: number;
  name: string;
  number: number;
  attendance: AttendanceStatus[];
  grades: { b1: string; b2: string; b3: string; b4: string };
  absences: number;
}

const CLASSES = ["3º Ano A", "3º Ano B", "4º Ano A"];
const SUBJECTS = ["Matemática", "Português", "Ciências", "História", "Geografia"];
const DATES = ["02/06", "03/06", "04/06", "05/06", "09/06", "10/06"];

const initialStudents: Student[] = [
  { id: 1, name: "Ana Clara Sousa", number: 1, attendance: ["P","P","P","P","F","P"], grades: { b1: "8,5", b2: "9,0", b3: "", b4: "" }, absences: 2 },
  { id: 2, name: "Bruno Ferreira Lima", number: 2, attendance: ["P","F","P","P","P","P"], grades: { b1: "7,0", b2: "7,5", b3: "", b4: "" }, absences: 4 },
  { id: 3, name: "Carla Mendes Rocha", number: 3, attendance: ["P","P","P","F","F","P"], grades: { b1: "9,5", b2: "9,0", b3: "", b4: "" }, absences: 3 },
  { id: 4, name: "Diego Santos Costa", number: 4, attendance: ["F","F","F","F","F","P"], grades: { b1: "5,0", b2: "5,5", b3: "", b4: "" }, absences: 12 },
  { id: 5, name: "Eduarda Pires Alves", number: 5, attendance: ["P","P","P","P","P","P"], grades: { b1: "10,0", b2: "9,5", b3: "", b4: "" }, absences: 0 },
  { id: 6, name: "Felipe Gonçalves", number: 6, attendance: ["P","P","F","P","P","P"], grades: { b1: "6,5", b2: "7,0", b3: "", b4: "" }, absences: 5 },
  { id: 7, name: "Gabriela Torres", number: 7, attendance: ["P","P","P","P","P","F"], grades: { b1: "8,0", b2: "8,5", b3: "", b4: "" }, absences: 1 },
  { id: 8, name: "Henrique Barbosa", number: 8, attendance: ["P","J","P","P","P","P"], grades: { b1: "7,5", b2: "8,0", b3: "", b4: "" }, absences: 3 },
  { id: 9, name: "Isabela Martins", number: 9, attendance: ["P","P","P","P","P","P"], grades: { b1: "9,0", b2: "9,5", b3: "", b4: "" }, absences: 0 },
  { id: 10, name: "João Victor Nunes", number: 10, attendance: ["F","P","P","F","P","P"], grades: { b1: "6,0", b2: "6,5", b3: "", b4: "" }, absences: 7 },
];

const statusColors: Record<AttendanceStatus, string> = {
  P: "bg-[#D1FAE5] text-[#059669]",
  F: "bg-[#FEE2E2] text-[#DC2626]",
  J: "bg-[#FEF3C7] text-[#D97706]",
};

const statusNext: Record<AttendanceStatus, AttendanceStatus> = { P: "F", F: "J", J: "P" };

export function TeacherDiary() {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [activeTab, setActiveTab] = useState<"attendance" | "grades">("attendance");
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAttendance = (studentId: number, dateIdx: number) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const att = [...s.attendance];
        att[dateIdx] = statusNext[att[dateIdx]];
        const absences = att.filter((a) => a === "F").length;
        return { ...s, attendance: att, absences };
      })
    );
  };

  const updateGrade = (studentId: number, bim: keyof Student["grades"], value: string) => {
    setStudents((prev) =>
      prev.map((s) => s.id === studentId ? { ...s, grades: { ...s.grades, [bim]: value } } : s)
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const presentToday = students.filter((s) => s.attendance[5] === "P").length;

  return (
    <div className="flex-1 overflow-y-auto bg-[#F0F4F8] p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1A2744]" style={{ fontSize: "1.375rem", fontWeight: 700 }}>
            Diário de Classe
          </h1>
          <p className="text-[#5A6D8A]" style={{ fontSize: "0.85rem" }}>
            Prof. Carlos Eduardo · {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm ${
              saved ? "bg-[#059669] text-white" : "bg-[#1B3A6B] text-white hover:bg-[#142d54]"
            }`}
            style={{ fontSize: "0.85rem", fontWeight: 500 }}
          >
            {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "Salvo!" : "Salvar"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E8EDF5] bg-white text-[#1A2744] hover:bg-[#F0F4F8] transition-all"
            style={{ fontSize: "0.85rem", fontWeight: 500 }}>
            <Download className="w-4 h-4 text-[#5A6D8A]" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EDF5] mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#5A6D8A]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>Turma:</span>
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="pl-3 pr-8 py-1.5 rounded-lg border border-[#E8EDF5] bg-[#F4F7FB] text-[#1A2744] appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                style={{ fontSize: "0.85rem" }}
              >
                {CLASSES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5A6D8A] pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#5A6D8A]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>Disciplina:</span>
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="pl-3 pr-8 py-1.5 rounded-lg border border-[#E8EDF5] bg-[#F4F7FB] text-[#1A2744] appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                style={{ fontSize: "0.85rem" }}
              >
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5A6D8A] pointer-events-none" />
            </div>
          </div>

          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar aluno..."
              className="pl-9 pr-4 py-1.5 rounded-lg border border-[#E8EDF5] bg-[#F4F7FB] text-[#1A2744] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 w-48"
              style={{ fontSize: "0.85rem" }}
            />
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { icon: <Users className="w-4 h-4" />, label: "Total de Alunos", value: students.length, color: "text-[#1B3A6B]", bg: "bg-[#EAF0FA]" },
          { icon: <CheckCircle2 className="w-4 h-4" />, label: "Presentes Hoje", value: `${presentToday}/${students.length}`, color: "text-[#059669]", bg: "bg-[#D1FAE5]" },
          { icon: <AlertTriangle className="w-4 h-4" />, label: "Em Risco (>10 faltas)", value: students.filter(s => s.absences >= 10).length, color: "text-[#D97706]", bg: "bg-[#FEF3C7]" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl px-4 py-3 shadow-sm border border-[#E8EDF5] flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0`}>
              {item.icon}
            </div>
            <div>
              <div className="text-[#1A2744]" style={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>{item.value}</div>
              <div className="text-[#5A6D8A]" style={{ fontSize: "0.72rem" }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8EDF5] overflow-hidden">
        <div className="flex border-b border-[#E8EDF5]">
          {[
            { id: "attendance" as const, label: "Frequência", icon: <Users className="w-4 h-4" /> },
            { id: "grades" as const, label: "Notas / Avaliações", icon: <BookOpen className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 transition-all border-b-2 ${
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

        {activeTab === "attendance" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F4F7FB] border-b border-[#E8EDF5]">
                  <th className="text-left px-4 py-3 text-[#5A6D8A] sticky left-0 bg-[#F4F7FB]" style={{ fontSize: "0.75rem", fontWeight: 600, minWidth: 180 }}>ALUNO</th>
                  {DATES.map((d) => (
                    <th key={d} className="text-center px-3 py-3 text-[#5A6D8A]" style={{ fontSize: "0.75rem", fontWeight: 600, minWidth: 60 }}>{d}</th>
                  ))}
                  <th className="text-center px-3 py-3 text-[#5A6D8A]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>FALTAS</th>
                  <th className="text-center px-3 py-3 text-[#5A6D8A]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student, si) => (
                  <tr key={student.id} className={`border-b border-[#F0F4F8] hover:bg-[#F8FAFC] transition-colors ${si % 2 === 0 ? "" : "bg-[#FAFBFD]"}`}>
                    <td className="px-4 py-2.5 sticky left-0 bg-inherit">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#1B3A6B] flex items-center justify-center flex-shrink-0">
                          <span className="text-white" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                            {student.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                          </span>
                        </div>
                        <div>
                          <div className="text-[#1A2744]" style={{ fontSize: "0.83rem", fontWeight: 500 }}>{student.name}</div>
                          <div className="text-[#94A3B8]" style={{ fontSize: "0.7rem" }}>Nº {student.number}</div>
                        </div>
                      </div>
                    </td>
                    {student.attendance.map((status, di) => (
                      <td key={di} className="text-center px-2 py-2.5">
                        <button
                          onClick={() => toggleAttendance(student.id, di)}
                          className={`w-8 h-7 rounded-md text-center transition-all hover:opacity-80 ${statusColors[status]}`}
                          style={{ fontSize: "0.72rem", fontWeight: 700 }}
                          title={status === "P" ? "Presente" : status === "F" ? "Falta" : "Justificado"}
                        >
                          {status}
                        </button>
                      </td>
                    ))}
                    <td className="text-center px-3 py-2.5">
                      <span className={`inline-block px-2 py-0.5 rounded-full ${student.absences >= 10 ? "bg-[#FEE2E2] text-[#DC2626]" : student.absences >= 5 ? "bg-[#FEF3C7] text-[#D97706]" : "bg-[#F0F4F8] text-[#5A6D8A]"}`}
                        style={{ fontSize: "0.78rem", fontWeight: 600 }}>
                        {student.absences}
                      </span>
                    </td>
                    <td className="text-center px-3 py-2.5">
                      {student.absences >= 10 ? (
                        <span className="flex items-center justify-center gap-1 text-[#DC2626]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                          <XCircle className="w-3.5 h-3.5" /> Risco
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1 text-[#059669]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Regular
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-2 bg-[#F4F7FB] border-t border-[#E8EDF5] flex items-center gap-4">
              {[
                { color: "bg-[#D1FAE5] text-[#059669]", label: "P = Presente" },
                { color: "bg-[#FEE2E2] text-[#DC2626]", label: "F = Falta" },
                { color: "bg-[#FEF3C7] text-[#D97706]", label: "J = Justificado" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className={`px-1.5 py-0.5 rounded text-center ${item.color}`} style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                    {item.label.split(" = ")[0]}
                  </span>
                  <span className="text-[#5A6D8A]" style={{ fontSize: "0.72rem" }}>{item.label.split(" = ")[1]}</span>
                </div>
              ))}
              <span className="ml-auto text-[#94A3B8]" style={{ fontSize: "0.72rem" }}>Clique na célula para alternar status</span>
            </div>
          </div>
        )}

        {activeTab === "grades" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F4F7FB] border-b border-[#E8EDF5]">
                  <th className="text-left px-4 py-3 text-[#5A6D8A] sticky left-0 bg-[#F4F7FB]" style={{ fontSize: "0.75rem", fontWeight: 600, minWidth: 200 }}>ALUNO</th>
                  {["1º Bim.", "2º Bim.", "3º Bim.", "4º Bim."].map((b) => (
                    <th key={b} className="text-center px-4 py-3 text-[#5A6D8A]" style={{ fontSize: "0.75rem", fontWeight: 600, minWidth: 100 }}>{b}</th>
                  ))}
                  <th className="text-center px-4 py-3 text-[#5A6D8A]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>MÉDIA</th>
                  <th className="text-center px-4 py-3 text-[#5A6D8A]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>SITUAÇÃO</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student, si) => {
                  const nums = [student.grades.b1, student.grades.b2, student.grades.b3, student.grades.b4]
                    .map((g) => parseFloat(g.replace(",", ".")))
                    .filter((n) => !isNaN(n));
                  const avg = nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1).replace(".", ",") : "–";
                  const avgNum = parseFloat(avg.replace(",", "."));
                  return (
                    <tr key={student.id} className={`border-b border-[#F0F4F8] hover:bg-[#F8FAFC] transition-colors ${si % 2 === 0 ? "" : "bg-[#FAFBFD]"}`}>
                      <td className="px-4 py-2.5 sticky left-0 bg-inherit">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#1B3A6B] flex items-center justify-center flex-shrink-0">
                            <span className="text-white" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                              {student.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                            </span>
                          </div>
                          <span className="text-[#1A2744]" style={{ fontSize: "0.83rem", fontWeight: 500 }}>{student.name}</span>
                        </div>
                      </td>
                      {(["b1", "b2", "b3", "b4"] as const).map((bim) => (
                        <td key={bim} className="text-center px-4 py-2">
                          <input
                            type="text"
                            value={student.grades[bim]}
                            onChange={(e) => updateGrade(student.id, bim, e.target.value)}
                            placeholder="–"
                            className="w-16 text-center px-2 py-1 rounded-lg border border-[#E8EDF5] bg-[#F4F7FB] text-[#1A2744] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all"
                            style={{ fontSize: "0.85rem" }}
                          />
                        </td>
                      ))}
                      <td className="text-center px-4 py-2.5">
                        <span className="text-[#1A2744]" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{avg}</span>
                      </td>
                      <td className="text-center px-4 py-2.5">
                        {avg === "–" ? (
                          <span className="text-[#94A3B8]" style={{ fontSize: "0.78rem" }}>–</span>
                        ) : avgNum >= 6 ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#D1FAE5] text-[#059669]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Aprovado</span>
                        ) : avgNum >= 5 ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Recuperação</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#DC2626]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Reprovado</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-[#F4F7FB] border-t border-[#E8EDF5] flex items-center justify-between">
              <span className="text-[#94A3B8]" style={{ fontSize: "0.72rem" }}>Clique na célula de nota para editar · Média mínima para aprovação: 6,0</span>
              <button className="flex items-center gap-1.5 text-[#2563EB] hover:underline" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
                <FileText className="w-3.5 h-3.5" /> Exportar boletim
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
