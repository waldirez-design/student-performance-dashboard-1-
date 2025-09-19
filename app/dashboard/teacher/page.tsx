"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { TeacherSidebar } from "@/components/dashboard/teacher-sidebar"
import { TeacherOverview } from "@/components/dashboard/teacher-overview"
import { TeacherSubjects } from "@/components/dashboard/teacher-subjects"
import { TeacherStudents } from "@/components/dashboard/teacher-students"

export default function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (!user || user.role !== "teacher") {
      router.push("/")
    }
  }, [router])

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <TeacherOverview />
      case "subjects":
        return <TeacherSubjects />
      case "students":
        return <TeacherStudents />
      case "grades":
        return <div className="p-8 text-center text-gray-500">Seção de Notas em desenvolvimento</div>
      case "reports":
        return <div className="p-8 text-center text-gray-500">Seção de Relatórios em desenvolvimento</div>
      default:
        return <TeacherOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <TeacherSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
    </div>
  )
}
