import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockUsers, mockStudents, mockGrades, mockTransferRequests, mockSchools } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"

export function AdminOverview() {
  const currentUser = AuthService.getCurrentUser()
  const currentSchool = mockSchools.find((s) => s.id === currentUser?.schoolId)

  const stats = {
    totalUsers: mockUsers.length,
    totalStudents: mockStudents.length,
    totalGrades: mockGrades.length,
    pendingTransfers: mockTransferRequests.filter((t) => t.status === "pending").length,
    teachers: mockUsers.filter((u) => u.role === "teacher").length,
    parents: mockUsers.filter((u) => u.role === "parent").length,
  }

  const recentActivities = [
    {
      type: "user",
      message: "Novo professor cadastrado",
      user: "Prof. Ana Costa",
      time: "2 horas atrás",
    },
    {
      type: "transfer",
      message: "Solicitação de transferência aprovada",
      user: "Maria Silva",
      time: "1 dia atrás",
    },
    {
      type: "grade",
      message: "Notas lançadas em massa",
      user: "Sistema",
      time: "2 dias atrás",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="text-gray-600">Visão geral do sistema - {currentSchool?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Usuários</CardDescription>
            <CardTitle className="text-2xl font-bold text-purple-600">{stats.totalUsers}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Usuários Ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Alunos Matriculados</CardDescription>
            <CardTitle className="text-2xl font-bold text-blue-600">{stats.totalStudents}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Estudantes Ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Notas Lançadas</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-600">{stats.totalGrades}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Este Bimestre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Transferências</CardDescription>
            <CardTitle className="text-2xl font-bold text-orange-600">{stats.pendingTransfers}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Pendentes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-700">Distribuição de Usuários</CardTitle>
            <CardDescription>Tipos de usuários no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-800">Professores</p>
                  <p className="text-sm text-blue-600">Docentes ativos</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700">{stats.teachers}</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">Pais/Responsáveis</p>
                  <p className="text-sm text-green-600">Responsáveis cadastrados</p>
                </div>
                <Badge className="bg-green-100 text-green-700">{stats.parents}</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-800">Administradores</p>
                  <p className="text-sm text-purple-600">Gestores do sistema</p>
                </div>
                <Badge className="bg-purple-100 text-purple-700">
                  {mockUsers.filter((u) => u.role === "admin").length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-700">Atividades Recentes</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.message}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-700">Informações da Escola</CardTitle>
          <CardDescription>Dados da instituição atual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Nome da Escola:</p>
                <p className="text-gray-900">{currentSchool?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Código:</p>
                <p className="text-gray-900">{currentSchool?.code}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Endereço:</p>
                <p className="text-gray-900">{currentSchool?.address}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Telefone:</p>
                <p className="text-gray-900">{currentSchool?.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Email:</p>
                <p className="text-gray-900">{currentSchool?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Status:</p>
                <Badge className="bg-green-100 text-green-700">Ativa</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
