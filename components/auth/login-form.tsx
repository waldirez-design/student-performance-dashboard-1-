"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthService } from "@/lib/auth"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const user = await AuthService.login(email, password)
      if (user) {
        // Redireciona baseado no tipo de usuário
        switch (user.role) {
          case "teacher":
            router.push("/dashboard/teacher")
            break
          case "parent":
            router.push("/dashboard/parent")
            break
          case "admin":
            router.push("/dashboard/admin")
            break
          default:
            router.push("/dashboard")
        }
      } else {
        setError("Email ou senha incorretos")
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-700">Sistema Acadêmico</CardTitle>
        <CardDescription>Faça login para acessar o sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@escola.edu.br"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
          <p className="font-semibold mb-2">Contas de teste:</p>
          <p>
            <strong>Professor:</strong> ana.costa@emjs.edu.br
          </p>
          <p>
            <strong>Pai/Mãe:</strong> carlos.oliveira@gmail.com
          </p>
          <p>
            <strong>Admin:</strong> admin@sistema.edu.br
          </p>
          <p className="mt-2 text-gray-600">
            Senha para todos: <strong>123456</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
