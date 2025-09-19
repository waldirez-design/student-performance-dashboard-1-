"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockStudents, mockGrades, mockSubjects } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"
import { StudentPerformanceChart } from "@/components/charts/student-performance-chart"

export function ParentGrades() {
  const currentUser = AuthService.getCurrentUser()
  const children = mockStudents.filter((s) => s.parentId === currentUser?.id)
  const [performanceDialogOpen, setPerformanceDialogOpen] = useState(false)
  const [performanceStudentId, setPerformanceStudentId] = useState<string>("")

  const getGradesByStudent = (studentId: string) => {
    const studentGrades = mockGrades.filter((g) => g.studentId === studentId)
    return studentGrades.map((grade) => {
      const subject = mockSubjects.find((s) => s.id === grade.subjectId)
      return {
        ...grade,
        subjectName: subject?.name || "Matéria não encontrada",
      }
    })
  }

  const getGradeColor = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 70) return "text-blue-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getGradeStatus = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100
    if (percentage >= 80) return { label: "Excelente", color: "bg-green-100 text-green-700" }
    if (percentage >= 70) return { label: "Bom", color: "bg-blue-100 text-blue-700" }
    if (percentage >= 60) return { label: "Regular", color: "bg-yellow-100 text-yellow-700" }
    return { label: "Precisa Melhorar", color: "bg-red-100 text-red-700" }
  }

  const handleViewPerformance = (studentId: string) => {
    setPerformanceStudentId(studentId)
    setPerformanceDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notas e Boletim</h1>
        <p className="text-gray-600">Acompanhe todas as avaliações e o desempenho acadêmico</p>
      </div>

      <Tabs defaultValue={children[0]?.id || ""} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {children.map((child) => (
            <TabsTrigger key={child.id} value={child.id} className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                {child.photo && <AvatarImage src={child.photo || "/placeholder.svg"} alt={child.name} />}
                <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                  {child.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {child.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {children.map((child) => {
          const grades = getGradesByStudent(child.id)
          const groupedGrades = grades.reduce(
            (acc, grade) => {
              if (!acc[grade.subjectName]) {
                acc[grade.subjectName] = []
              }
              acc[grade.subjectName].push(grade)
              return acc
            },
            {} as Record<string, typeof grades>,
          )

          return (
            <TabsContent key={child.id} value={child.id} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      {child.photo && <AvatarImage src={child.photo || "/placeholder.svg"} alt={child.name} />}
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {child.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-green-700">Boletim - {child.name}</CardTitle>
                      <CardDescription>
                        {child.grade} - Turma {child.class}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(groupedGrades).map(([subjectName, subjectGrades]) => {
                      const average = subjectGrades.reduce((sum, g) => sum + g.value, 0) / subjectGrades.length
                      const status = getGradeStatus(average, 10)

                      return (
                        <div key={subjectName} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{subjectName}</h3>
                            <div className="flex items-center gap-3">
                              <span className={`text-xl font-bold ${getGradeColor(average, 10)}`}>
                                {average.toFixed(1)}
                              </span>
                              <Badge className={status.color}>{status.label}</Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {subjectGrades.map((grade) => (
                              <div key={grade.id} className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-700">{grade.description}</span>
                                  <span className={`font-bold ${getGradeColor(grade.value, grade.maxValue)}`}>
                                    {grade.value}/{grade.maxValue}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>{grade.type}</span>
                                  <span>{grade.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleViewPerformance(child.id)}>
                  Ver Gráfico de Evolução
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">Baixar Boletim PDF</Button>
                <Button variant="outline" className="bg-transparent">
                  Histórico Completo
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Solicitar Reunião
                </Button>
              </div>
            </TabsContent>
          )
        })}
      </Tabs>

      {children.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">Nenhum filho encontrado no sistema</p>
          </CardContent>
        </Card>
      )}

      <Dialog open={performanceDialogOpen} onOpenChange={setPerformanceDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Evolução Acadêmica - {mockStudents.find((s) => s.id === performanceStudentId)?.name}
            </DialogTitle>
          </DialogHeader>
          {performanceStudentId && (
            <StudentPerformanceChart studentId={performanceStudentId} showRecommendations={false} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
