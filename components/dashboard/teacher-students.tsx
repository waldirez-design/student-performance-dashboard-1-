"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { mockStudents, mockGrades } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"
import { GradeForm } from "@/components/forms/grade-form"
import { StudentPerformanceChart } from "@/components/charts/student-performance-chart"

export function TeacherStudents() {
  const currentUser = AuthService.getCurrentUser()
  const schoolStudents = mockStudents.filter((s) => s.schoolId === currentUser?.schoolId)
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [performanceDialogOpen, setPerformanceDialogOpen] = useState(false)
  const [performanceStudentId, setPerformanceStudentId] = useState<string>("")

  const getStudentPerformance = (studentId: string) => {
    const studentGrades = mockGrades.filter((g) => g.studentId === studentId)
    const average =
      studentGrades.length > 0
        ? (studentGrades.reduce((sum, g) => sum + g.value, 0) / studentGrades.length).toFixed(1)
        : "0.0"

    const performance = Number.parseFloat(average)
    let status = "Baixo"
    let statusColor = "bg-red-100 text-red-700"

    if (performance >= 8) {
      status = "Excelente"
      statusColor = "bg-green-100 text-green-700"
    } else if (performance >= 7) {
      status = "Bom"
      statusColor = "bg-blue-100 text-blue-700"
    } else if (performance >= 6) {
      status = "Regular"
      statusColor = "bg-yellow-100 text-yellow-700"
    }

    return { average, status, statusColor, totalGrades: studentGrades.length }
  }

  const handleLaunchGrade = (studentId: string) => {
    setSelectedStudent(studentId)
    setGradeDialogOpen(true)
  }

  const handleViewPerformance = (studentId: string) => {
    setPerformanceStudentId(studentId)
    setPerformanceDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alunos</h1>
        <p className="text-gray-600">Acompanhe o desempenho e progresso dos seus alunos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {schoolStudents.map((student) => {
          const performance = getStudentPerformance(student.id)
          return (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    {student.photo && <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />}
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <CardDescription>
                      {student.grade} - Turma {student.class}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Média Geral:</span>
                    <span className="text-lg font-bold text-blue-600">{performance.average}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge className={performance.statusColor}>{performance.status}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Avaliações:</span>
                    <span className="text-sm text-gray-600">{performance.totalGrades} notas</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleViewPerformance(student.id)}
                    >
                      Ver Gráfico
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleLaunchGrade(student.id)}
                    >
                      Lançar Nota
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {schoolStudents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">Nenhum aluno encontrado</p>
          </CardContent>
        </Card>
      )}

      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent className="max-w-4xl">
          <GradeForm studentId={selectedStudent} onClose={() => setGradeDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={performanceDialogOpen} onOpenChange={setPerformanceDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Análise de Desempenho - {mockStudents.find((s) => s.id === performanceStudentId)?.name}
            </DialogTitle>
          </DialogHeader>
          {performanceStudentId && (
            <StudentPerformanceChart studentId={performanceStudentId} showRecommendations={true} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
