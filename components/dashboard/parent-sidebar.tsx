"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AuthService } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface ParentSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function ParentSidebar({ activeSection, onSectionChange }: ParentSidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    AuthService.logout()
    router.push("/")
  }

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: "🏠" },
    { id: "children", label: "Meus Filhos", icon: "👨‍👩‍👧‍👦" },
    { id: "grades", label: "Notas e Boletim", icon: "📊" },
    { id: "attendance", label: "Frequência", icon: "📅" },
    { id: "communication", label: "Comunicados", icon: "📢" },
  ]

  return (
    <Card className="w-64 h-full p-4 bg-green-50 border-green-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-800">Portal dos Pais</h2>
        <p className="text-sm text-green-600">{AuthService.getCurrentUser()?.name}</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              activeSection === item.id
                ? "bg-green-600 text-white hover:bg-green-700"
                : "text-green-700 hover:bg-green-100"
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
