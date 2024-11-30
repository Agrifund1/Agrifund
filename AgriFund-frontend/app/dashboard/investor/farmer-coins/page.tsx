import { DashboardLayout } from "@/components/dashboard/layout"
import { FarmerCoins } from "@/components/dashboard/investor/farmer-coins"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function FarmerCoinsPage() {
  return (
    <ProtectedRoute redirectTo="/">
      <DashboardLayout userType="investor">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Farmer Coins</h1>
            <p className="text-muted-foreground">
              Invest in tokenized agricultural assets
            </p>
          </div>
          <FarmerCoins />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
} 