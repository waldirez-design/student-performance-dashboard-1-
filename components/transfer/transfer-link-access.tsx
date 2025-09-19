"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockTransferRequests, mockStudents, mockSchools, mockSubjects } from "@/lib/mock-data"

export function TransferLinkAccess() {
  const [transferCode, setTransferCode] = useState("")
  const [transferData, setTransferData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAccessTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simular validação do código
    setTimeout(() => {
      if (transferCode.length >= 8) {
        // Simular dados de transferência
        const mockTransfer = mockTransferRequests[0]
        const student = mockStudents.find((s) => s.id === mockTransfer.studentId)
        const fromSchool = mockSchools.find((s) => s.id === mockTransfer.fromSchoolId)

        setTransferData({
          ...mockTransfer,
          student,
          fromSchool,
          detailedGrades: mockTransfer.transferData.grades.map((grade) => ({
            ...grade,
            subjectName: mockSubjects.find((s) => s.id === grade.subjectId)?.name,
          })),
        })
      } else {
        setError("Código de transferência inválido")
      }
      setLoading(false)
    }, 1500)
  }

  const handleAcceptTransfer = () => {
    alert("Transferência aceita! O aluno será matriculado em sua escola.")
    setTransferData(null)
    setTransferCode("")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-700">Acessar Dados de Transferência</CardTitle>
          <CardDescription>Digite o código de transferência fornecido pela escola de origem</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAccessTransfer} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transferCode">Código de Transferência</Label>
              <Input
                id="transferCode"
                value={transferCode}
                onChange={(e) => setTransferCode(e.target.value)}
                placeholder="Ex: ABC123XYZ"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={loading}>
              {loading ? "Verificando..." : "Acessar Dados"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {transferData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Dados do Aluno para Transferência</CardTitle>
            <CardDescription>Informações acadêmicas completas de {transferData.student?.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Informações básicas do aluno */}
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                    {transferData.student?.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-800">{transferData.student?.name}</h3>
                  <p className="text-green-600">
                    {transferData.student?.grade} - Turma {transferData.student?.class}
                  </p>
                  <p className="text-sm text-green-600">Escola de origem: {transferData.fromSchool?.name}</p>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  Frequência: {transferData.transferData.attendance}%
                </Badge>
              </div>

              {/* Histórico de notas */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Histórico de Notas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(
                    transferData.detailedGrades.reduce((acc: any, grade: any) => {
                      if (!acc[grade.subjectName]) {
                        acc[grade.subjectName] = []
                      }
                      acc[grade.subjectName].push(grade)
                      return acc
                    }, {}),
                  ).map(([subject, grades]: [string, any]) => {
                    const average = grades.reduce((sum: number, g: any) => sum + g.value, 0) / grades.length
                    return (
                      <div key={subject} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-800">{subject}</h5>
                          <span className="text-lg font-bold text-blue-600">{average.toFixed(1)}</span>
                        </div>
                        <div className="space-y-2">
                          {grades.map((grade: any) => (
                            <div key={grade.id} className="flex justify-between text-sm">
                              <span className="text-gray-600">{grade.description}</span>
                              <span className="font-medium">
                                {grade.value}/{grade.maxValue}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Informações adicionais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Registros Disciplinares</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {transferData.transferData.disciplinaryRecords.length > 0 ? (
                      <ul className="space-y-2">
                        {transferData.transferData.disciplinaryRecords.map((record: string, index: number) => (
                          <li key={index} className="text-sm text-gray-700">
                            • {record}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">Nenhum registro disciplinar</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Informações Médicas</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {transferData.transferData.medicalInfo || "Nenhuma informação médica especial"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-4 pt-4 border-t">
                <Button onClick={handleAcceptTransfer} className="bg-green-600 hover:bg-green-700">
                  Aceitar Transferência
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Baixar Documentos PDF
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Solicitar Informações Adicionais
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
