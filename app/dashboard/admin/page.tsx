"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { AdminSidebar } from "@/components/dashboard/admin-sidebar"
import { AdminOverview } from "@/components/admin/admin-overview"
import { UserManagement } from "@/components/admin/user-management"
import { TransferRequestForm } from "@/components/transfer/transfer-request-form"
import { TransferRequestsList } from "@/components/transfer/transfer-requests-list"
import { StudentManagement } from "@/components/admin/student-management"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (!user || user.role !== "admin") {
      router.push("/")
    }
  }, [router])

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <AdminOverview />
      case "users":
        return <UserManagement />
      case "students":
        return <StudentManagement />
      case "transfers":
        return (
          <div className="space-y-8">
            <TransferRequestForm />
            <TransferRequestsList />
          </div>
        )
      case "reports":
        return <div className="p-8 text-center text-gray-500">Relatórios em desenvolvimento</div>
      default:
        return <AdminOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
    </div>
  )
}
