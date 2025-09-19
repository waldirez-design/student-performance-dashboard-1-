"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthService } from "@/lib/auth"

interface SubjectFormProps {
  onClose: () => void
}

export function SubjectForm({ onClose }: SubjectFormProps) {
  const currentUser = AuthService.getCurrentUser()
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    teacherId: currentUser?.id || "",
    schoolId: currentUser?.schoolId || "",
  })

  const grades = ["6º Ano", "7º Ano", "8º Ano", "9º Ano", "1º Ano EM", "2º Ano EM", "3º Ano EM"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Nova matéria criada:", formData)
    alert("Matéria criada com sucesso!")
    onClose()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-blue-700">Nova Matéria</CardTitle>
        <CardDescription>Adicione uma nova disciplina ao sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Matéria</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Matemática, Português, História"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Série/Ano</Label>
            <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a série" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Criar Matéria
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
