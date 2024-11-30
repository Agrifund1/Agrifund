import { DashboardLayout } from "@/components/dashboard/layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import { FarmersMarketplace } from "@/components/dashboard/farmer/marketplace"

export default function MarketplacePage() {
  return (
    <ProtectedRoute redirectTo="/">
      <DashboardLayout userType="farmer">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
            <p className="text-muted-foreground">
              Connect with Businesses and explore partnership opportunities
            </p>
          </div>
          <FarmersMarketplace />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
} 