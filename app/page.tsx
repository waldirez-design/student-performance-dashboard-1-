import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent } from "@/components/ui/card"
import { PencilIcon, SchoolBuildingIcon, BookIcon, GraduationCapIcon } from "@/components/ui/school-icons"

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 014.438 0 2.5 2.5 0 001.946.806 2.5 2.5 0 013.138 3.138 2.5 2.5 0 00.806 1.946 2.5 2.5 0 010 4.438 2.5 2.5 0 00-.806 1.946 2.5 2.5 0 01-3.138 3.138 2.5 2.5 0 00-1.946.806 2.5 2.5 0 01-4.438 0 2.5 2.5 0 00-1.946-.806 2.5 2.5 0 01-3.138-3.138 2.5 2.5 0 00-.806-1.946 2.5 2.5 0 010-4.438 2.5 2.5 0 00.806-1.946 2.5 2.5 0 013.138-3.138z"
    />
  </svg>
)

const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
    />
  </svg>
)

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary rounded-lg p-2">
                <SchoolBuildingIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">EduSystem</h1>
                <p className="text-sm text-muted-foreground">Gestão Acadêmica Inteligente</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-6">
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  Início
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  Cursos
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  Alunos
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  Professores
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  Contato
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                <GraduationCapIcon className="h-12 w-12 text-primary" />
                <PencilIcon className="h-8 w-8 text-secondary" />
                <BookIcon className="h-10 w-10 text-accent" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4 text-balance">
                Transformando a Educação com Tecnologia
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Plataforma completa para gestão acadêmica, conectando professores, alunos e pais em um ambiente digital
                seguro e intuitivo.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">Gestão de Alunos</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe o desempenho e frequência de todos os estudantes
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-purple-100 rounded-lg p-2">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">Notas e Avaliações</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sistema completo de lançamento e acompanhamento de notas
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-green-100 rounded-lg p-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">Portal dos Pais</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Acesso seguro para acompanhar o progresso dos filhos</p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-orange-100 rounded-lg p-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">Relatórios</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Análises detalhadas de desempenho e frequência</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-primary rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <SchoolBuildingIcon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Acesso ao meu Sistema</h3>
                    <p className="text-muted-foreground">Entre com suas credenciais</p>
                  </div>
                  <LoginForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-2">Nossa Comunidade Educacional</h3>
            <p className="text-muted-foreground">Números que demonstram nosso compromisso com a educação</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">200</div>
              <div className="text-sm text-muted-foreground">Alunos Ativos</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <GraduationCapIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">22</div>
              <div className="text-sm text-muted-foreground">Professores</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <BookIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">15</div>
              <div className="text-sm text-muted-foreground">Disciplinas</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">96%</div>
              <div className="text-sm text-muted-foreground">Satisfação</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <SchoolBuildingIcon className="h-6 w-6" />
                <span className="font-bold text-lg">EduSystem</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Transformando a educação através da tecnologia, conectando toda a comunidade escolar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Portal do Aluno
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Portal do Professor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Portal dos Pais
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Suporte
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>📧 contato@edusystem.com.br</li>
                <li>📞 (11) 3456-7890</li>
                <li>📍 Rua da Educação, 123 - São Paulo</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
            <p>&copy; 2024 EduSystem. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
