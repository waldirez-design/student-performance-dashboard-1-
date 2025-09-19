"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockStudents } from "@/lib/mock-data"
import { StudentPerformanceChart } from "@/components/charts/student-performance-chart"

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || student.class === selectedClass
    return matchesSearch && matchesClass
  })

  const getPerformanceStatus = (average: number) => {
    if (average >= 8) return { status: "Excelente", color: "bg-green-500" }
    if (average >= 7) return { status: "Bom", color: "bg-blue-500" }
    if (average >= 6) return { status: "Regular", color: "bg-yellow-500" }
    return { status: "Precisa Atenção", color: "bg-red-500" }
  }

  const calculateAverage = (student: any) => {
    if (!student.subjects || !Array.isArray(student.subjects)) {
      return 0
    }

    const allGrades = student.subjects.flatMap((subject: any) => {
      if (!subject.grades || !Array.isArray(subject.grades)) {
        return []
      }
      return subject.grades.map((grade: any) => grade.value)
    })

    return allGrades.length > 0
      ? allGrades.reduce((sum: number, grade: number) => sum + grade, 0) / allGrades.length
      : 0
  }

  const classes = [...new Set(mockStudents.map((student) => student.class))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Alunos</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Aluno
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por turma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as turmas</SelectItem>
            {classes.map((className) => (
              <SelectItem key={className} value={className}>
                {className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{mockStudents.length}</div>
            <div className="text-sm text-gray-600">Total de Alunos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {mockStudents.filter((s) => calculateAverage(s) >= 7).length}
            </div>
            <div className="text-sm text-gray-600">Com Bom Desempenho</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {mockStudents.filter((s) => calculateAverage(s) >= 6 && calculateAverage(s) < 7).length}
            </div>
            <div className="text-sm text-gray-600">Desempenho Regular</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {mockStudents.filter((s) => calculateAverage(s) < 6).length}
            </div>
            <div className="text-sm text-gray-600">Precisam Atenção</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Alunos */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => {
          const average = calculateAverage(student)
          const performance = getPerformanceStatus(average)

          return (
            <Card key={student.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      {student.photo && <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />}
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-lg">
                        {student.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{student.name}</h3>
                      <p className="text-gray-600">{student.email}</p>
                      <p className="text-sm text-gray-500">Turma: {student.class}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold">{average.toFixed(1)}</div>
                      <Badge className={`${performance.color} text-white`}>{performance.status}</Badge>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedStudent(student)}>
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Aluno: {student.name}</DialogTitle>
                        </DialogHeader>

                        {selectedStudent && (
                          <div className="space-y-6">
                            {/* Informações Básicas */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Nome Completo</Label>
                                <p className="font-medium">{selectedStudent.name}</p>
                              </div>
                              <div>
                                <Label>Email</Label>
                                <p className="font-medium">{selectedStudent.email}</p>
                              </div>
                              <div>
                                <Label>Turma</Label>
                                <p className="font-medium">{selectedStudent.class}</p>
                              </div>
                              <div>
                                <Label>Média Geral</Label>
                                <p className="font-medium text-lg">{calculateAverage(selectedStudent).toFixed(1)}</p>
                              </div>
                            </div>

                            {/* Gráfico de Desempenho */}
                            <div>
                              <Label className="text-lg font-semibold">Evolução do Desempenho</Label>
                              <StudentPerformanceChart studentId={selectedStudent.id} />
                            </div>

                            {/* Notas por Matéria */}
                            <div>
                              <Label className="text-lg font-semibold">Notas por Matéria</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {selectedStudent.subjects && Array.isArray(selectedStudent.subjects) ? (
                                  selectedStudent.subjects.map((subject: any) => {
                                    if (
                                      !subject.grades ||
                                      !Array.isArray(subject.grades) ||
                                      subject.grades.length === 0
                                    ) {
                                      return (
                                        <Card key={subject.subjectId}>
                                          <CardHeader className="pb-2">
                                            <CardTitle className="text-sm">{subject.name}</CardTitle>
                                          </CardHeader>
                                          <CardContent>
                                            <p className="text-gray-500">Nenhuma nota disponível</p>
                                          </CardContent>
                                        </Card>
                                      )
                                    }

                                    const subjectAverage =
                                      subject.grades.reduce((sum: number, grade: any) => sum + grade.value, 0) /
                                      subject.grades.length
                                    const subjectPerformance = getPerformanceStatus(subjectAverage)

                                    return (
                                      <Card key={subject.subjectId}>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-sm">{subject.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="flex justify-between items-center">
                                            <Badge className={`${subjectPerformance.color} text-white`}>
                                              {subjectPerformance.status}
                                            </Badge>
                                            <span className="font-bold text-lg">{subjectAverage.toFixed(1)}</span>
                                          </div>
                                          <div className="mt-2 space-y-1">
                                            {subject.grades.map((grade: any, index: number) => (
                                              <div key={index} className="flex justify-between text-sm">
                                                <span>{grade.type}</span>
                                                <span className={grade.value < 6 ? "text-red-600 font-semibold" : ""}>
                                                  {grade.value.toFixed(1)}
                                                </span>
                                              </div>
                                            ))}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    )
                                  })
                                ) : (
                                  <p className="text-gray-500 col-span-2">
                                    Nenhuma matéria encontrada para este aluno.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum aluno encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  )
}
