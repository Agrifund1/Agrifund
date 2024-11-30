import { DashboardLayout } from "@/components/dashboard/layout"
import { TransactionsTable } from "@/components/dashboard/transactions/transactions-table"
import ProtectedRoute from "@/components/ProtectedRoute"
import { redirect } from "next/navigation"

const validRoles = ["investor", "farmer", "business", "student", "admin"] as const
type Role = typeof validRoles[number]

// Role-specific transaction data
const transactionsByRole = {
  investor: [
    {
      id: "1",
      date: "2024-03-15",
      type: "Investment",
      amount: 5000,
      status: "completed" as const,
      description: "Investment in Farm Project #123"
    },
    {
      id: "2",
      date: "2024-03-10",
      type: "Return",
      amount: 750,
      status: "completed" as const,
      description: "ROI from Farm Project #089"
    },
    {
      id: "3",
      date: "2024-03-05",
      type: "Investment",
      amount: 3000,
      status: "pending" as const,
      description: "Investment in Farm Project #156"
    },
  ],
  farmer: [
    {
      id: "1",
      date: "2024-03-15",
      type: "Loan",
      amount: 10000,
      status: "completed" as const,
      description: "Equipment Purchase Loan"
    },
    {
      id: "2",
      date: "2024-03-10",
      type: "Repayment",
      amount: 1000,
      status: "completed" as const,
      description: "Monthly Loan Repayment"
    },
    {
      id: "3",
      date: "2024-03-01",
      type: "Input Purchase",
      amount: 500,
      status: "pending" as const,
      description: "Seeds and Fertilizers"
    },
  ],
  business: [
    {
      id: "1",
      date: "2024-03-15",
      type: "Partnership",
      amount: 15000,
      status: "completed" as const,
      description: "Farmer Support Program"
    },
    {
      id: "2",
      date: "2024-03-10",
      type: "Contribution",
      amount: 5000,
      status: "completed" as const,
      description: "Scholarship Fund"
    },
  ],
  student: [
    {
      id: "1",
      date: "2024-03-15",
      type: "Scholarship",
      amount: 5000,
      status: "completed" as const,
      description: "Spring Semester Tuition"
    },
    {
      id: "2",
      date: "2024-03-10",
      type: "Stipend",
      amount: 500,
      status: "pending" as const,
      description: "Monthly Living Allowance"
    },
  ],
  admin: [
    {
      id: "1",
      date: "2024-03-15",
      type: "Loan Approval",
      amount: 10000,
      status: "completed" as const,
      description: "Farmer Loan #123"
    },
    {
      id: "2",
      date: "2024-03-10",
      type: "Scholarship",
      amount: 5000,
      status: "completed" as const,
      description: "Student Aid #456"
    },
    {
      id: "3",
      date: "2024-03-05",
      type: "System",
      amount: 1000,
      status: "failed" as const,
      description: "Failed Transaction Recovery"
    },
  ],
}

export default function TransactionsPage({
  params: { role },
}: {
  params: { role: string }
}) {
  if (!validRoles.includes(role as Role)) {
    redirect("/get-started")
  }

  const transactions = transactionsByRole[role as Role]

  return (
    <ProtectedRoute redirectTo="/">
      <DashboardLayout userType={role}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground">
              View and manage your transaction history
            </p>
          </div>
          <TransactionsTable transactions={transactions} userType={role} />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
} 