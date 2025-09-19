"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockStudents } from "@/lib/mock-data"
import type { Student, SpecialNeed } from "@/lib/types"
import {
  Armchair as Wheelchair,
  Eye,
  Ear,
  Brain,
  Heart,
  BookOpen,
  AlertCircle,
  Phone,
  User,
  FileText,
} from "lucide-react"

const getSpecialNeedIcon = (type: SpecialNeed["type"]) => {
  switch (type) {
    case "wheelchair":
      return <Wheelchair className="h-4 w-4" />
    case "visual_impairment":
      return <Eye className="h-4 w-4" />
    case "hearing_impairment":
      return <Ear className="h-4 w-4" />
    case "autism":
      return <Brain className="h-4 w-4" />
    case "adhd":
      return <Heart className="h-4 w-4" />
    case "learning_disability":
      return <BookOpen className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const getSpecialNeedColor = (type: SpecialNeed["type"]) => {
  switch (type) {
    case "wheelchair":
      return "bg-blue-100 text-blue-800"
    case "visual_impairment":
      return "bg-purple-100 text-purple-800"
    case "hearing_impairment":
      return "bg-green-100 text-green-800"
    case "autism":
      return "bg-orange-100 text-orange-800"
    case "adhd":
      return "bg-pink-100 text-pink-800"
    case "learning_disability":
      return "bg-indigo-100 text-indigo-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getSeverityColor = (severity: SpecialNeed["severity"]) => {
  switch (severity) {
    case "mild":
      return "bg-green-100 text-green-800"
    case "moderate":
      return "bg-yellow-100 text-yellow-800"
    case "severe":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function SpecialNeedsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const studentsWithSpecialNeeds = mockStudents.filter(
    (student) => student.specialNeeds && student.specialNeeds.length > 0,
  )

  const filteredStudents = studentsWithSpecialNeeds.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.specialNeeds?.some((need) => need.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Necessidades Especiais</h2>
          <p className="text-muted-foreground">Acompanhamento e suporte para alunos com necessidades especiais</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {studentsWithSpecialNeeds.length} alunos com necessidades especiais
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Resumo Geral</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total de alunos</span>
              <Badge variant="outline">{studentsWithSpecialNeeds.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Deficiência física</span>
              <Badge variant="outline">
                {studentsWithSpecialNeeds.filter((s) => s.specialNeeds?.some((n) => n.type === "wheelchair")).length}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Deficiência visual</span>
              <Badge variant="outline">
                {
                  studentsWithSpecialNeeds.filter((s) => s.specialNeeds?.some((n) => n.type === "visual_impairment"))
                    .length
                }
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Deficiência auditiva</span>
              <Badge variant="outline">
                {
                  studentsWithSpecialNeeds.filter((s) => s.specialNeeds?.some((n) => n.type === "hearing_impairment"))
                    .length
                }
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Transtornos</span>
              <Badge variant="outline">
                {
                  studentsWithSpecialNeeds.filter((s) =>
                    s.specialNeeds?.some((n) => ["autism", "adhd", "learning_disability"].includes(n.type)),
                  ).length
                }
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Buscar Alunos</CardTitle>
            <CardDescription>Encontre alunos por nome, turma ou tipo de necessidade especial</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Buscar por nome, turma ou necessidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Lista de Alunos</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {student.grade} - Turma {student.class}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {student.specialNeeds?.map((need) => (
                            <Badge
                              key={need.id}
                              variant="secondary"
                              className={`${getSpecialNeedColor(need.type)} text-xs`}
                            >
                              {getSpecialNeedIcon(need.type)}
                              <span className="ml-1">{need.type.replace("_", " ")}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {student.specialNeeds?.map((need) => (
                        <Badge key={need.id} className={getSeverityColor(need.severity)}>
                          {need.severity}
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details">
          {selectedStudent ? (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedStudent.photo || "/placeholder.svg"} alt={selectedStudent.name} />
                    <AvatarFallback>
                      {selectedStudent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedStudent.name}</CardTitle>
                    <CardDescription>
                      {selectedStudent.grade} - Turma {selectedStudent.class}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedStudent.specialNeeds?.map((need) => (
                  <div key={need.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getSpecialNeedIcon(need.type)}
                        <h4 className="font-semibold capitalize">{need.type.replace("_", " ")}</h4>
                      </div>
                      <Badge className={getSeverityColor(need.severity)}>{need.severity}</Badge>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Descrição:</h5>
                      <p className="text-sm text-muted-foreground">{need.description}</p>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Acomodações Necessárias:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {need.accommodations.map((accommodation, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="w-1 h-1 bg-current rounded-full"></span>
                            <span>{accommodation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Suporte Necessário:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {need.supportRequired.map((support, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="w-1 h-1 bg-current rounded-full"></span>
                            <span>{support}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {selectedStudent.medicalInfo && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Informações Médicas</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedStudent.medicalInfo}</p>
                  </div>
                )}

                {selectedStudent.emergencyContact && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Contato de Emergência</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span>{selectedStudent.emergencyContact.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3" />
                        <span>{selectedStudent.emergencyContact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">{selectedStudent.emergencyContact.relationship}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Selecione um aluno na lista para ver os detalhes das necessidades especiais
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
