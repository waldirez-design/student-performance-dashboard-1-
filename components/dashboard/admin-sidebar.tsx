"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AuthService } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    AuthService.logout()
    router.push("/")
  }

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: "📊" },
    { id: "users", label: "Usuários", icon: "👥" },
    { id: "students", label: "Alunos", icon: "🎓" },
    { id: "transfers", label: "Transferências", icon: "🔄" },
    { id: "reports", label: "Relatórios", icon: "📈" },
  ]

  return (
    <Card className="w-64 h-full p-4 bg-purple-50 border-purple-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-purple-800">Painel Admin</h2>
        <p className="text-sm text-purple-600">{AuthService.getCurrentUser()?.name}</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              activeSection === item.id
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "text-purple-700 hover:bg-purple-100"
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
