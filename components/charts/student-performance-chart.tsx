"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockGrades, mockSubjects, mockStudents } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

interface StudentPerformanceChartProps {
  studentId: string
  showRecommendations?: boolean
}

export function StudentPerformanceChart({ studentId, showRecommendations = true }: StudentPerformanceChartProps) {
  const student = mockStudents.find((s) => s.id === studentId)
  const studentGrades = mockGrades.filter((g) => g.studentId === studentId)

  if (!student || studentGrades.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Nenhum dado de desempenho encontrado para este aluno.</p>
        </CardContent>
      </Card>
    )
  }

  const subjectPerformance = mockSubjects
    .filter((subject) => {
      const gradeLevel = student.grade
      return subject.grade === gradeLevel && studentGrades.some((g) => g.subjectId === subject.id)
    })
    .map((subject) => {
      const subjectGrades = studentGrades
        .filter((g) => g.subjectId === subject.id)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      const average = subjectGrades.reduce((sum, g) => sum + g.value, 0) / subjectGrades.length
      const trend =
        subjectGrades.length > 1 ? subjectGrades[subjectGrades.length - 1].value - subjectGrades[0].value : 0

      return {
        subject: subject.name,
        grades: subjectGrades,
        average: Number(average.toFixed(1)),
        trend: Number(trend.toFixed(1)),
        latest: subjectGrades[subjectGrades.length - 1]?.value || 0,
      }
    })

  const needsAttention = subjectPerformance.filter((perf) => perf.average < 7.0 || perf.trend < -0.5)
  const strongSubjects = subjectPerformance.filter((perf) => perf.average >= 8.5 && perf.trend >= 0)

  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#84cc16"]

  const SimpleBarChart = ({ data }: { data: any[] }) => {
    const maxValue = 10
    const chartWidth = 400
    const chartHeight = 200
    const barWidth = chartWidth / data.length - 10

    return (
      <div className="w-full overflow-x-auto">
        <svg width={chartWidth} height={chartHeight + 60} className="mx-auto">
          {/* Grid lines */}
          {[0, 2, 4, 6, 8, 10].map((value) => (
            <g key={value}>
              <line
                x1={40}
                y1={chartHeight - (value * chartHeight) / maxValue}
                x2={chartWidth}
                y2={chartHeight - (value * chartHeight) / maxValue}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text
                x={35}
                y={chartHeight - (value * chartHeight) / maxValue + 5}
                fontSize={12}
                fill="#6b7280"
                textAnchor="end"
              >
                {value}
              </text>
            </g>
          ))}

          {/* Bars */}
          {data.map((item, index) => {
            const barHeight = (item.average * chartHeight) / maxValue
            const x = 50 + index * (barWidth + 10)
            const color = item.average >= 7 ? "#10b981" : item.average >= 6 ? "#f59e0b" : "#ef4444"

            return (
              <g key={index}>
                <rect x={x} y={chartHeight - barHeight} width={barWidth} height={barHeight} fill={color} rx={4} />
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 15}
                  fontSize={10}
                  fill="#374151"
                  textAnchor="middle"
                  transform={`rotate(-45, ${x + barWidth / 2}, ${chartHeight + 15})`}
                >
                  {item.subject.length > 8 ? item.subject.substring(0, 8) + "..." : item.subject}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - barHeight - 5}
                  fontSize={10}
                  fill="#374151"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {item.average}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }

  const SimpleLineChart = ({ data }: { data: any[] }) => {
    const chartWidth = 500
    const chartHeight = 200
    const maxValue = 10

    // Preparar dados para o gráfico de linha
    const timelineData = subjectPerformance
      .reduce((acc: any[], curr) => {
        curr.grades.forEach((grade) => {
          const existingEntry = acc.find((entry) => entry.date === grade.date)
          if (existingEntry) {
            existingEntry[curr.subject] = grade.value
          } else {
            acc.push({
              date: grade.date,
              dateFormatted: new Date(grade.date).toLocaleDateString("pt-BR"),
              [curr.subject]: grade.value,
            })
          }
        })
        return acc
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    if (timelineData.length === 0) return null

    return (
      <div className="w-full overflow-x-auto">
        <svg width={chartWidth} height={chartHeight + 80} className="mx-auto">
          {/* Grid lines */}
          {[0, 2, 4, 6, 8, 10].map((value) => (
            <g key={value}>
              <line
                x1={60}
                y1={chartHeight - (value * chartHeight) / maxValue}
                x2={chartWidth - 20}
                y2={chartHeight - (value * chartHeight) / maxValue}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text
                x={55}
                y={chartHeight - (value * chartHeight) / maxValue + 5}
                fontSize={12}
                fill="#6b7280"
                textAnchor="end"
              >
                {value}
              </text>
            </g>
          ))}

          {/* Lines for each subject */}
          {subjectPerformance.map((subject, subjectIndex) => {
            const color = colors[subjectIndex % colors.length]
            const points = timelineData
              .map((point, index) => {
                const value = point[subject.subject]
                if (value === undefined) return null
                const x = 60 + (index * (chartWidth - 80)) / (timelineData.length - 1)
                const y = chartHeight - (value * chartHeight) / maxValue
                return { x, y, value }
              })
              .filter(Boolean)

            if (points.length < 2) return null

            const pathData = points
              .map((point, index) => `${index === 0 ? "M" : "L"} ${point!.x} ${point!.y}`)
              .join(" ")

            return (
              <g key={subject.subject}>
                <path d={pathData} stroke={color} strokeWidth={2} fill="none" />
                {points.map((point, index) => (
                  <circle key={index} cx={point!.x} cy={point!.y} r={4} fill={color} />
                ))}
              </g>
            )
          })}

          {/* X-axis labels */}
          {timelineData.map((point, index) => (
            <text
              key={index}
              x={60 + (index * (chartWidth - 80)) / (timelineData.length - 1)}
              y={chartHeight + 20}
              fontSize={10}
              fill="#374151"
              textAnchor="middle"
              transform={`rotate(-45, ${60 + (index * (chartWidth - 80)) / (timelineData.length - 1)}, ${chartHeight + 20})`}
            >
              {point.dateFormatted}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {subjectPerformance.map((subject, index) => (
            <div key={subject.subject} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
              <span className="text-sm text-gray-600">{subject.subject}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Desempenho - {student.name}</CardTitle>
          <CardDescription>Acompanhamento das notas ao longo do tempo por matéria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <SimpleLineChart data={subjectPerformance} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Média por Matéria</CardTitle>
          <CardDescription>Desempenho médio atual em cada disciplina</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <SimpleBarChart data={subjectPerformance} />
          </div>
        </CardContent>
      </Card>

      {showRecommendations && (
        <div className="grid gap-4 md:grid-cols-2">
          {needsAttention.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Necessita Atenção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {needsAttention.map((subject) => (
                    <div key={subject.subject} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-800">{subject.subject}</p>
                        <p className="text-sm text-red-600">
                          Média: {subject.average}/10
                          {subject.trend < 0 && (
                            <span className="ml-2">
                              (Tendência: {subject.trend > 0 ? "+" : ""}
                              {subject.trend})
                            </span>
                          )}
                        </p>
                      </div>
                      <Badge variant="destructive">{subject.average < 6 ? "Crítico" : "Atenção"}</Badge>
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-red-100 rounded-lg">
                    <p className="text-sm text-red-800 font-medium">Recomendações:</p>
                    <ul className="text-sm text-red-700 mt-1 space-y-1">
                      <li>• Aulas de reforço individualizadas</li>
                      <li>• Exercícios extras para casa</li>
                      <li>• Acompanhamento semanal do progresso</li>
                      <li>• Comunicação frequente com os pais</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {strongSubjects.length > 0 && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Pontos Fortes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {strongSubjects.map((subject) => (
                    <div key={subject.subject} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-800">{subject.subject}</p>
                        <p className="text-sm text-green-600">
                          Média: {subject.average}/10
                          {subject.trend > 0 && <span className="ml-2">(Melhoria: +{subject.trend})</span>}
                        </p>
                      </div>
                      <Badge className="bg-green-600">Excelente</Badge>
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">Oportunidades:</p>
                    <ul className="text-sm text-green-700 mt-1 space-y-1">
                      <li>• Atividades de monitoria para colegas</li>
                      <li>• Projetos avançados e desafios extras</li>
                      <li>• Participação em olimpíadas acadêmicas</li>
                      <li>• Desenvolvimento de liderança em grupo</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
