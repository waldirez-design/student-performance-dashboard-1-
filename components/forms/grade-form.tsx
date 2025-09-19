"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { mockStudents, mockSubjects } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"

interface GradeFormProps {
  studentId?: string
  subjectId?: string
  onClose: () => void
}

export function GradeForm({ studentId, subjectId, onClose }: GradeFormProps) {
  const currentUser = AuthService.getCurrentUser()
  const [formData, setFormData] = useState({
    studentId: studentId || "",
    subjectId: subjectId || "",
    value: "",
    maxValue: "10",
    type: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  const teacherSubjects = mockSubjects.filter((s) => s.teacherId === currentUser?.id)
  const schoolStudents = mockStudents.filter((s) => s.schoolId === currentUser?.schoolId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Nova nota lançada:", formData)
    alert("Nota lançada com sucesso!")
    onClose()
  }

  const getGradeColor = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 70) return "text-blue-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const currentValue = Number.parseFloat(formData.value)
  const currentMaxValue = Number.parseFloat(formData.maxValue)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-blue-700">Lançar Nova Nota</CardTitle>
        <CardDescription>Registre uma nova avaliação para o aluno</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student">Aluno</Label>
              <Select
                value={formData.studentId}
                onValueChange={(value) => setFormData({ ...formData, studentId: value })}
                disabled={!!studentId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o aluno" />
                </SelectTrigger>
                <SelectContent>
                  {schoolStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} - {student.grade} {student.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Matéria</Label>
              <Select
                value={formData.subjectId}
                onValueChange={(value) => setFormData({ ...formData, subjectId: value })}
                disabled={!!subjectId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a matéria" />
                </SelectTrigger>
                <SelectContent>
                  {teacherSubjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name} - {subject.grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Nota</Label>
              <Input
                id="value"
                type="number"
                step="0.1"
                min="0"
                max={formData.maxValue}
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="0.0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxValue">Nota Máxima</Label>
              <Input
                id="maxValue"
                type="number"
                step="0.1"
                min="1"
                value={formData.maxValue}
                onChange={(e) => setFormData({ ...formData, maxValue: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Resultado</Label>
              <div className="flex items-center justify-center h-10 px-3 border rounded-md bg-gray-50">
                {formData.value && (
                  <span className={`font-bold ${getGradeColor(currentValue, currentMaxValue)}`}>
                    {((currentValue / currentMaxValue) * 100).toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Avaliação</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exam">Prova</SelectItem>
                  <SelectItem value="assignment">Trabalho</SelectItem>
                  <SelectItem value="participation">Participação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Data da Avaliação</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ex: Prova Bimestral, Trabalho em Grupo, etc."
              required
            />
          </div>

          {formData.value && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Prévia da Nota</h4>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700">
                  {formData.value}/{formData.maxValue}
                </Badge>
                <span className={`font-bold ${getGradeColor(currentValue, currentMaxValue)}`}>
                  {((currentValue / currentMaxValue) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Lançar Nota
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
