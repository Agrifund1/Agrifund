import { FarmerCoinInsights } from "@/components/dashboard/farmer/coin-insights"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function CoinInsightsPage() {
  return (
    <ProtectedRoute redirectTo="/">
      <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Farmer Coin Insights</h2>
      </div>
      <FarmerCoinInsights />
    </div>
    </ProtectedRoute>
  )
} 