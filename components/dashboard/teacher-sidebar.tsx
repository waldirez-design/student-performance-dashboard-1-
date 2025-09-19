"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AuthService } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface TeacherSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function TeacherSidebar({ activeSection, onSectionChange }: TeacherSidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    AuthService.logout()
    router.push("/")
  }

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: "📊" },
    { id: "subjects", label: "Minhas Matérias", icon: "📚" },
    { id: "students", label: "Alunos", icon: "👥" },
    { id: "grades", label: "Notas", icon: "📝" },
    { id: "reports", label: "Relatórios", icon: "📈" },
  ]

  return (
    <Card className="w-64 h-full p-4 bg-blue-50 border-blue-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-800">Dashboard Professor</h2>
        <p className="text-sm text-blue-600">{AuthService.getCurrentUser()?.name}</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              activeSection === item.id ? "bg-blue-600 text-white hover:bg-blue-700" : "text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => onSectionChange(item.id)}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <Button
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          onClick={handleLogout}
        >
          Sair
        </Button>
      </div>
    </Card>
  )
}
