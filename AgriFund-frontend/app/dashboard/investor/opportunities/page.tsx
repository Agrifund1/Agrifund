import { DashboardLayout } from "@/components/dashboard/layout"
import { LoanOpportunities } from "../../../../components/dashboard/investor/opportunities"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function OpportunitiesPage() {
  return (
    <ProtectedRoute redirectTo="/">
      <DashboardLayout userType="investor">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Loan Opportunities</h1>
            <p className="text-muted-foreground">
              Browse and invest in verified farmer loan requests
            </p>
          </div>
          <LoanOpportunities />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
} 