"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockTransferRequests, mockStudents, mockSchools } from "@/lib/mock-data"
import { AuthService } from "@/lib/auth"
import { StudentTransferDocuments } from "./student-transfer-documents"
import { useState } from "react"

export function TransferRequestsList() {
  const [showDocuments, setShowDocuments] = useState(false)
  const [documentsStudentId, setDocumentsStudentId] = useState("")

  const currentUser = AuthService.getCurrentUser()
  const requests = mockTransferRequests.filter(
    (r) => r.fromSchoolId === currentUser?.schoolId || r.toSchoolId === currentUser?.schoolId,
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "approved":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "approved":
        return "Aprovada"
      case "rejected":
        return "Rejeitada"
      default:
        return "Desconhecido"
    }
  }

  const handleViewDocuments = (studentId: string) => {
    setDocumentsStudentId(studentId)
    setShowDocuments(true)
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Solicitações de Transferência</h2>
          <p className="text-gray-600">Gerencie as transferências de entrada e saída com documentação completa</p>
        </div>

        <div className="space-y-4">
          {requests.map((request) => {
            const student = mockStudents.find((s) => s.id === request.studentId)
            const fromSchool = mockSchools.find((s) => s.id === request.fromSchoolId)
            const toSchool = mockSchools.find((s) => s.id === request.toSchoolId)
            const isIncoming = request.toSchoolId === currentUser?.schoolId

            return (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={student?.photo || "/placeholder.svg"} alt={student?.name} />
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {student?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{student?.name}</CardTitle>
                        <CardDescription>
                          {isIncoming ? "Transferência de entrada" : "Transferência de saída"}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(request.status)}>{getStatusText(request.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Escola de origem:</p>
                        <p className="text-sm text-gray-600">{fromSchool?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Escola de destino:</p>
                        <p className="text-sm text-gray-600">{toSchool?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Data da solicitação:</p>
                        <p className="text-sm text-gray-600">{request.requestDate}</p>
                      </div>
                      {request.approvalDate && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Data de aprovação:</p>
                          <p className="text-sm text-gray-600">{request.approvalDate}</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Dados acadêmicos:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Notas:</p>
                          <p className="text-gray-600">{request.transferData.grades.length} registros</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Frequência:</p>
                          <p className="text-gray-600">{request.transferData.attendance}%</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Disciplina:</p>
                          <p className="text-gray-600">{request.transferData.disciplinaryRecords.length} registros</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Info. Médica:</p>
                          <p className="text-gray-600">{request.transferData.medicalInfo ? "Sim" : "Não"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleViewDocuments(request.studentId)}
                      >
                        Ver Documentação Completa
                      </Button>

                      {isIncoming && request.status === "pending" && (
                        <>
                          <Button size="sm" variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Aprovar Transferência
                          </Button>
                          <Button size="sm" variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Rejeitar
                          </Button>
                        </>
                      )}
                      {!isIncoming && (
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Gerar Link Novamente
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {requests.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">Nenhuma solicitação de transferência encontrada</p>
            </CardContent>
          </Card>
        )}
      </div>

      {showDocuments && (
        <StudentTransferDocuments studentId={documentsStudentId} onClose={() => setShowDocuments(false)} />
      )}
    </>
  )
}
