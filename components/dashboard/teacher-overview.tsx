import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockStudents, mockSubjects, mockGrades } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"

export function TeacherOverview() {
  const currentUser = AuthService.getCurrentUser()
  const teacherSubjects = mockSubjects.filter((s) => s.teacherId === currentUser?.id)
  const totalStudents = mockStudents.filter((s) => s.schoolId === currentUser?.schoolId).length
  const recentGrades = mockGrades.slice(0, 3)

  const stats = [
    {
      title: "Matérias Lecionadas",
      value: teacherSubjects.length,
      description: "Disciplinas ativas",
      color: "text-blue-600",
    },
    {
      title: "Total de Alunos",
      value: totalStudents,
      description: "Estudantes na escola",
      color: "text-green-600",
    },
    {
      title: "Notas Lançadas",
      value: mockGrades.length,
      description: "Este bimestre",
      color: "text-purple-600",
    },
    {
      title: "Média Geral",
      value: "8.3",
      description: "Desempenho da turma",
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bem-vindo, {currentUser?.name}!</h1>
        <p className="text-gray-600">Aqui está um resumo das suas atividades acadêmicas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription className="text-sm">{stat.description}</CardDescription>
              <CardTitle className={`text-2xl font-bold ${stat.color}`}>{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">Minhas Matérias</CardTitle>
            <CardDescription>Disciplinas que você leciona</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teacherSubjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-800">{subject.name}</p>
                    <p className="text-sm text-blue-600">{subject.grade}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Ativa</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Notas Recentes</CardTitle>
            <CardDescription>Últimas avaliações lançadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGrades.map((grade) => {
                const student = mockStudents.find((s) => s.id === grade.studentId)
                const subject = mockSubjects.find((s) => s.id === grade.subjectId)
                return (
                  <div key={grade.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">{student?.name}</p>
                      <p className="text-sm text-green-600">{subject?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-700">
                        {grade.value}/{grade.maxValue}
                      </p>
                      <p className="text-xs text-gray-600">{grade.type}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
