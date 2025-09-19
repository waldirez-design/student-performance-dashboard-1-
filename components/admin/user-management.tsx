"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { mockUsers, mockSchools } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    schoolId: "",
  })
  const [success, setSuccess] = useState("")

  const currentUser = AuthService.getCurrentUser()
  const availableSchools = mockSchools

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700"
      case "teacher":
        return "bg-blue-100 text-blue-700"
      case "parent":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "teacher":
        return "Professor"
      case "parent":
        return "Pai/Mãe"
      default:
        return "Desconhecido"
    }
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()

    const user = {
      id: (users.length + 1).toString(),
      ...newUser,
    }

    setUsers([...users, user])
    setNewUser({ name: "", email: "", role: "", schoolId: "" })
    setIsAddingUser(false)
    setSuccess(`Usuário ${user.name} adicionado com sucesso!`)

    setTimeout(() => setSuccess(""), 3000)
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers(users.filter((u) => u.id !== userId))
      setSuccess("Usuário excluído com sucesso!")
      setTimeout(() => setSuccess(""), 3000)
    }
  }

  const generateTempPassword = () => {
    return Math.random().toString(36).slice(-8).toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Usuários</h1>
          <p className="text-gray-600">Gerencie professores, pais e administradores do sistema</p>
        </div>

        <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">Adicionar Usuário</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
              <DialogDescription>Preencha os dados do novo usuário do sistema</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Nome do usuário"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="email@escola.edu.br"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Tipo de Usuário</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Professor</SelectItem>
                    <SelectItem value="parent">Pai/Mãe</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="school">Escola</Label>
                <Select
                  value={newUser.schoolId}
                  onValueChange={(value) => setNewUser({ ...newUser, schoolId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a escola" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSchools.map((school) => (
                      <SelectItem key={school.id} value={school.id}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Senha temporária:</strong> {generateTempPassword()}
                </p>
                <p className="text-xs text-blue-600 mt-1">O usuário deverá alterar a senha no primeiro acesso</p>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Adicionar Usuário
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingUser(false)}
                  className="bg-transparent"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {users.map((user) => {
          const school = availableSchools.find((s) => s.id === user.schoolId)
          return (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                  <Badge className={getRoleColor(user.role)}>{getRoleText(user.role)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Escola:</p>
                    <p className="text-sm text-gray-600">{school?.name}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Status:</p>
                    <Badge className="bg-green-100 text-green-700">Ativo</Badge>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Resetar Senha
                    </Button>
                    {user.id !== currentUser?.id && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Excluir
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Usuários</CardDescription>
            <CardTitle className="text-2xl font-bold text-purple-600">{users.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Usuários Ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Professores</CardDescription>
            <CardTitle className="text-2xl font-bold text-blue-600">
              {users.filter((u) => u.role === "teacher").length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Docentes Cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pais/Responsáveis</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.role === "parent").length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Responsáveis Cadastrados</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
