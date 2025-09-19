"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { mockStudents, mockSchools } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"
import { StudentTransferDocuments } from "./student-transfer-documents"

export function TransferRequestForm() {
  const [selectedStudent, setSelectedStudent] = useState("")
  const [targetSchool, setTargetSchool] = useState("")
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showDocuments, setShowDocuments] = useState(false)
  const [documentsStudentId, setDocumentsStudentId] = useState("")

  const currentUser = AuthService.getCurrentUser()
  const availableStudents = mockStudents.filter((s) => s.schoolId === currentUser?.schoolId)
  const targetSchools = mockSchools.filter((s) => s.id !== currentUser?.schoolId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular processamento
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      // Reset form
      setSelectedStudent("")
      setTargetSchool("")
      setReason("")
    }, 2000)
  }

  const generateTransferLink = () => {
    const transferId = Math.random().toString(36).substr(2, 9).toUpperCase()
    return `https://edusystem.edu.br/transfer/${transferId}`
  }

  const handleViewDocuments = (studentId: string) => {
    setDocumentsStudentId(studentId)
    setShowDocuments(true)
  }

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-purple-700">Solicitar Transferência de Aluno</CardTitle>
          <CardDescription>Preencha os dados para gerar um link de transferência seguro</CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                <strong>Transferência solicitada com sucesso!</strong>
                <br />
                Link gerado: <code className="bg-green-100 px-2 py-1 rounded">{generateTransferLink()}</code>
                <br />
                <small>Compartilhe este link com a escola de destino para completar a transferência.</small>
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="student">Aluno a ser transferido</Label>
              <div className="flex gap-2">
                <Select value={selectedStudent} onValueChange={setSelectedStudent} required>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecione o aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} - {student.grade} Turma {student.class}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedStudent && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleViewDocuments(selectedStudent)}
                    className="whitespace-nowrap"
                  >
                    Ver Documentos
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetSchool">Escola de destino</Label>
              <Select value={targetSchool} onValueChange={setTargetSchool} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a escola de destino" />
                </SelectTrigger>
                <SelectContent>
                  {targetSchools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name} - {school.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo da transferência</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Descreva o motivo da transferência..."
                required
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Documentação completa que será compartilhada:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                <div>
                  <p className="font-medium mb-1">📋 Documentos Pessoais:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Certidão de nascimento</li>
                    <li>• RG e CPF do aluno</li>
                    <li>• RG e CPF dos responsáveis</li>
                    <li>• Comprovante de residência</li>
                    <li>• Cartão de vacinação</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">🎓 Documentos Acadêmicos:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Histórico escolar completo</li>
                    <li>• Boletim e notas atuais</li>
                    <li>• Registro de frequência</li>
                    <li>• Ficha individual do aluno</li>
                    <li>• Relatórios de desempenho</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
              {loading ? "Processando..." : "Gerar Link de Transferência"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {showDocuments && (
        <StudentTransferDocuments studentId={documentsStudentId} onClose={() => setShowDocuments(false)} />
      )}
    </>
  )
}
