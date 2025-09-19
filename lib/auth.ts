import type { User } from "./types"
import { mockUsers } from "./mock-data"

export class AuthService {
  private static currentUser: User | null = null

  static async login(email: string, password: string): Promise<User | null> {
    // Simulação de autenticação
    const user = mockUsers.find((u) => u.email === email)
    if (user && password === "123456") {
      this.currentUser = user
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(user))
      }
      return user
    }
    return null
  }

  static logout(): void {
    this.currentUser = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
    }
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser")
      if (stored) {
        this.currentUser = JSON.parse(stored)
        return this.currentUser
      }
    }

    return null
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  static hasRole(role: string): boolean {
    const user = this.getCurrentUser()
    return user?.role === role
  }

  static generateParentCode(studentId: string): string {
    // Gera código único para pais acessarem dados do filho
    return `PAI${studentId}${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  }
}
