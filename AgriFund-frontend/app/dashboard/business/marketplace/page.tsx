import { DashboardLayout } from "@/components/dashboard/layout"
import { BusinessMarketplace } from "@/components/dashboard/business/marketplace"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function MarketplacePage() {
  return (
    <ProtectedRoute redirectTo="/">
      <DashboardLayout userType="business">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">
            Connect with farmers and explore partnership opportunities
          </p>
        </div>
        <BusinessMarketplace />
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  )
} 