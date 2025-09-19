"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { ParentSidebar } from "@/components/dashboard/parent-sidebar"
import { ParentOverview } from "@/components/dashboard/parent-overview"
import { ParentChildren } from "@/components/dashboard/parent-children"
import { ParentGrades } from "@/components/dashboard/parent-grades"

export default function ParentDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (!user || user.role !== "parent") {
      router.push("/")
    }
  }, [router])

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <ParentOverview />
      case "children":
        return <ParentChildren />
      case "grades":
        return <ParentGrades />
      case "attendance":
        return <div className="p-8 text-center text-gray-500">Seção de Frequência em desenvolvimento</div>
      case "communication":
        return <div className="p-8 text-center text-gray-500">Seção de Comunicados em desenvolvimento</div>
      default:
        return <ParentOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ParentSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
    </div>
  )
}
