import { DashboardLayout } from "@/components/dashboard/layout"
import { InvestorPortfolio } from "@/components/dashboard/investor/portfolio"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function PortfolioPage() {
  return (
    <ProtectedRoute redirectTo="/">
      <DashboardLayout userType="investor">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
            <p className="text-muted-foreground">
              Track and manage your active investments
            </p>
          </div>
          <InvestorPortfolio />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
} 