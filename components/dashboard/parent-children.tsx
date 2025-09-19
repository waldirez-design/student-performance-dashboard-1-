import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockStudents, mockGrades, mockSubjects } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"

export function ParentChildren() {
  const currentUser = AuthService.getCurrentUser()
  const children = mockStudents.filter((s) => s.parentId === currentUser?.id)

  const getChildDetails = (studentId: string) => {
    const studentGrades = mockGrades.filter((g) => g.studentId === studentId)
    const subjectPerformance = mockSubjects.map((subject) => {
      const subjectGrades = studentGrades.filter((g) => g.subjectId === subject.id)
      const average =
        subjectGrades.length > 0
          ? (subjectGrades.reduce((sum, g) => sum + g.value, 0) / subjectGrades.length).toFixed(1)
          : "0.0"
      return {
        subject: subject.name,
        average: Number.parseFloat(average),
        gradesCount: subjectGrades.length,
      }
    })

    const overallAverage =
      studentGrades.length > 0
        ? (studentGrades.reduce((sum, g) => sum + g.value, 0) / studentGrades.length).toFixed(1)
        : "0.0"

    return { subjectPerformance, overallAverage }
  }

  const getUniqueAccessCode = (studentId: string) => {
    return AuthService.generateParentCode(studentId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meus Filhos</h1>
        <p className="text-gray-600">Acompanhe detalhadamente o desempenho de cada filho</p>
      </div>

      {children.map((child) => {
        const details = getChildDetails(child.id)
        const accessCode = getUniqueAccessCode(child.id)

        return (
          <Card key={child.id} className="overflow-hidden">
            <CardHeader className="bg-green-50">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                    {child.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl text-green-800">{child.name}</CardTitle>
                  <CardDescription className="text-green-600">
                    {child.grade} - Turma {child.class}
                  </CardDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                      Código de Acesso: {accessCode}
                    </Badge>
                    <p className="text-sm text-green-600">Matrícula desde: {child.enrollmentDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-700">{details.overallAverage}</p>
                  <p className="text-sm text-green-600">Média Geral</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Desempenho por Matéria</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {details.subjectPerformance.map((subject, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-800">{subject.subject}</h4>
                          <span className="text-lg font-bold text-blue-600">{subject.average.toFixed(1)}</span>
                        </div>
                        <Progress value={(subject.average / 10) * 100} className="h-2 mb-2" />
                        <p className="text-xs text-gray-600">{subject.gradesCount} avaliações</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">95%</p>
                    <p className="text-sm text-blue-700">Frequência</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">12</p>
                    <p className="text-sm text-purple-700">Avaliações</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-600">2</p>
                    <p className="text-sm text-orange-700">Faltas</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">Ver Boletim Completo</Button>
                  <Button variant="outline" className="bg-transparent">
                    Histórico de Notas
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    Comunicar com Professores
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {children.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">Nenhum filho encontrado no sistema</p>
            <Button>Solicitar Vinculação</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
