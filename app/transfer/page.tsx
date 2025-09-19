import { TransferLinkAccess } from "@/components/transfer/transfer-link-access"

export default function TransferPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Sistema de Transferência</h1>
          <p className="text-gray-600">Acesse os dados acadêmicos para transferência de alunos</p>
        </div>
        <TransferLinkAccess />
      </div>
    </div>
  )
}
