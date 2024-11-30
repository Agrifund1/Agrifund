import { DashboardLayout } from "@/components/dashboard/layout"
import { BusinessAnalytics } from "@/components/dashboard/business/analytics"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function AnalyticsPage() {
  return (
    <ProtectedRoute redirectTo="/">
      <DashboardLayout userType="business">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Business Analytics</h1>
            <p className="text-muted-foreground">
              Track your business performance and growth metrics
            </p>
          </div>
          <BusinessAnalytics />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
} 