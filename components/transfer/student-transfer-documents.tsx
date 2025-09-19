"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockStudents, mockGrades, mockSubjects } from "@/lib/mock-data"

interface StudentTransferDocumentsProps {
  studentId: string
  onClose: () => void
}

export function StudentTransferDocuments({ studentId, onClose }: StudentTransferDocumentsProps) {
  const [generatingDocuments, setGeneratingDocuments] = useState(false)

  const student = mockStudents.find((s) => s.id === studentId)
  const studentGrades = mockGrades.filter((g) => g.studentId === studentId)

  if (!student) return null

  const generateDocuments = async () => {
    setGeneratingDocuments(true)
    // Simular geração de documentos
    setTimeout(() => {
      setGeneratingDocuments(false)
      alert("Documentos de transferência gerados com sucesso!")
    }, 3000)
  }

  const calculateSubjectAverage = (subjectId: string) => {
    const subjectGrades = studentGrades.filter((g) => g.subjectId === subjectId)
    if (subjectGrades.length === 0) return 0
    const sum = subjectGrades.reduce((acc, grade) => acc + grade.value, 0)
    return sum / subjectGrades.length
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 7) return "text-green-600"
    if (grade >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const personalDocuments = [
    { name: "Certidão de Nascimento", status: "verified", required: true },
    { name: "RG do Aluno", status: "verified", required: true },
    { name: "CPF do Aluno", status: "verified", required: true },
    { name: "Comprovante de Residência", status: "verified", required: true },
    { name: "RG dos Responsáveis", status: "verified", required: true },
    { name: "CPF dos Responsáveis", status: "verified", required: true },
    { name: "Cartão de Vacinação", status: "verified", required: true },
    { name: "Laudo Médico (se aplicável)", status: "not_required", required: false },
    { name: "Declaração de Transferência", status: "pending", required: true },
  ]

  const academicDocuments = [
    { name: "Histórico Escolar Completo", status: "ready", required: true },
    { name: "Boletim do Ano Atual", status: "ready", required: true },
    { name: "Ficha Individual do Aluno", status: "ready", required: true },
    { name: "Registro de Frequência", status: "ready", required: true },
    { name: "Avaliações e Provas", status: "ready", required: false },
    { name: "Relatório de Desempenho", status: "ready", required: true },
    { name: "Registro Disciplinar", status: "ready", required: true },
    { name: "Atividades Extracurriculares", status: "ready", required: false },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-700">Verificado</Badge>
      case "ready":
        return <Badge className="bg-blue-100 text-blue-700">Pronto</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pendente</Badge>
      case "not_required":
        return <Badge className="bg-gray-100 text-gray-700">Não Obrigatório</Badge>
      default:
        return <Badge className="bg-red-100 text-red-700">Pendente</Badge>
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                <AvatarFallback className="bg-purple-100 text-purple-700 text-lg">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Documentação de Transferência</h2>
                <p className="text-gray-600">
                  {student.name} - {student.grade} Turma {student.class}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Documentos Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">📋 Documentos Pessoais</CardTitle>
                <CardDescription>Documentação pessoal e familiar necessária</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {personalDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm ${doc.required ? "font-medium" : "text-gray-600"}`}>{doc.name}</span>
                        {doc.required && <span className="text-red-500 text-xs">*</span>}
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documentos Acadêmicos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">🎓 Documentos Acadêmicos</CardTitle>
                <CardDescription>Histórico escolar e registros acadêmicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {academicDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm ${doc.required ? "font-medium" : "text-gray-600"}`}>{doc.name}</span>
                        {doc.required && <span className="text-red-500 text-xs">*</span>}
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-6" />

          {/* Histórico Escolar Detalhado */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-700">📊 Histórico Escolar Detalhado</CardTitle>
              <CardDescription>Notas e desempenho por matéria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockSubjects
                  .filter((s) => s.schoolId === student.schoolId && s.grade === student.grade)
                  .map((subject) => {
                    const average = calculateSubjectAverage(subject.id)
                    const subjectGrades = studentGrades.filter((g) => g.subjectId === subject.id)

                    return (
                      <div key={subject.id} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">{subject.name}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Média:</span>
                            <span className={`font-bold ${getGradeColor(average)}`}>{average.toFixed(1)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Avaliações:</span>
                            <span className="text-sm">{subjectGrades.length}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Última nota:{" "}
                            {subjectGrades.length > 0
                              ? subjectGrades[subjectGrades.length - 1].value.toFixed(1)
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>

          <Separator className="my-6" />

          {/* Informações Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-purple-700">📅 Frequência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">94.5%</div>
                <p className="text-xs text-gray-600">Presença no ano letivo</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-purple-700">⚠️ Ocorrências</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <p className="text-xs text-gray-600">Registros disciplinares</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-purple-700">🏆 Atividades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">5</div>
                <p className="text-xs text-gray-600">Extracurriculares</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex gap-4">
            <Button
              onClick={generateDocuments}
              disabled={generatingDocuments}
              className="bg-purple-600 hover:bg-purple-700 flex-1"
            >
              {generatingDocuments ? "Gerando Documentos..." : "Gerar Pacote Completo de Transferência"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📋 Checklist de Transferência</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>✅ Todos os documentos pessoais verificados</p>
              <p>✅ Histórico escolar completo disponível</p>
              <p>✅ Registros de frequência atualizados</p>
              <p>⏳ Aguardando declaração de transferência da escola destino</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
