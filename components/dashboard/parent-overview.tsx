import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockStudents, mockGrades } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"

export function ParentOverview() {
  const currentUser = AuthService.getCurrentUser()
  const children = mockStudents.filter((s) => s.parentId === currentUser?.id)

  const getChildPerformance = (studentId: string) => {
    const studentGrades = mockGrades.filter((g) => g.studentId === studentId)
    const average =
      studentGrades.length > 0
        ? (studentGrades.reduce((sum, g) => sum + g.value, 0) / studentGrades.length).toFixed(1)
        : "0.0"

    const performance = Number.parseFloat(average)
    let status = "Precisa Melhorar"
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

    return { average, status, statusColor }
  }

  const recentActivities = [
    {
      type: "grade",
      message: "Nova nota lançada em Matemática",
      date: "Hoje",
      student: "João Oliveira",
    },
    {
      type: "communication",
      message: "Reunião de pais agendada",
      date: "Ontem",
      student: "Geral",
    },
    {
      type: "attendance",
      message: "Frequência atualizada",
      date: "2 dias atrás",
      student: "Maria Silva",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bem-vindo, {currentUser?.name}!</h1>
        <p className="text-gray-600">Acompanhe o progresso acadêmico dos seus filhos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Meus Filhos</CardTitle>
            <CardDescription>Desempenho acadêmico atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.map((child) => {
                const performance = getChildPerformance(child.id)
                return (
                  <div key={child.id} className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <Avatar>
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {child.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800">{child.name}</h3>
                      <p className="text-sm text-green-600">
                        {child.grade} - Turma {child.class}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-700">Média: {performance.average}</p>
                      <Badge className={performance.statusColor}>{performance.status}</Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">Atividades Recentes</CardTitle>
            <CardDescription>Últimas atualizações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-800">{activity.message}</p>
                    <p className="text-sm text-blue-600">{activity.student}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Próxima Reunião</CardDescription>
            <CardTitle className="text-2xl font-bold text-purple-600">15/04</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Reunião de Pais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Frequência Média</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-600">95%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Este Bimestre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Comunicados</CardDescription>
            <CardTitle className="text-2xl font-bold text-orange-600">3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Não Lidos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
