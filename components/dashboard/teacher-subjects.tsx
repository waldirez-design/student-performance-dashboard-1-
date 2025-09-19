"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { mockSubjects, mockStudents, mockGrades } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"
import { GradeForm } from "@/components/forms/grade-form"
import { SubjectForm } from "@/components/forms/subject-form"

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

export function TeacherSubjects() {
  const currentUser = AuthService.getCurrentUser()
  const teacherSubjects = mockSubjects.filter((s) => s.teacherId === currentUser?.id)
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false)
  const [subjectDialogOpen, setSubjectDialogOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("")

  const getSubjectStats = (subjectId: string) => {
    const subjectGrades = mockGrades.filter((g) => g.subjectId === subjectId)
    const studentsInSubject = mockStudents.filter((s) => s.schoolId === currentUser?.schoolId)
    const averageGrade =
      subjectGrades.length > 0
        ? (subjectGrades.reduce((sum, g) => sum + g.value, 0) / subjectGrades.length).toFixed(1)
        : "0.0"

    return {
      totalStudents: studentsInSubject.length,
      totalGrades: subjectGrades.length,
      averageGrade,
    }
  }

  const handleLaunchGrades = (subjectId: string) => {
    setSelectedSubject(subjectId)
    setGradeDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Matérias</h1>
          <p className="text-gray-600">Gerencie suas disciplinas e acompanhe o desempenho dos alunos</p>
        </div>
        <Dialog open={subjectDialogOpen} onOpenChange={setSubjectDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Matéria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <SubjectForm onClose={() => setSubjectDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teacherSubjects.map((subject) => {
          const stats = getSubjectStats(subject.id)
          return (
            <Card key={subject.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-blue-700">{subject.name}</CardTitle>
                    <CardDescription>{subject.grade}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Ativa
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
                      <p className="text-sm text-blue-700">Alunos</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{stats.totalGrades}</p>
                      <p className="text-sm text-green-700">Notas</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{stats.averageGrade}</p>
                      <p className="text-sm text-purple-700">Média</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Ver Alunos
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleLaunchGrades(subject.id)}
                    >
                      Lançar Notas
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {teacherSubjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">Nenhuma matéria encontrada</p>
            <Button onClick={() => setSubjectDialogOpen(true)}>Criar Primeira Matéria</Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent className="max-w-4xl">
          <GradeForm subjectId={selectedSubject} onClose={() => setGradeDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
