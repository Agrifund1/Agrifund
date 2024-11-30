import { DashboardLayout } from "@/components/dashboard/layout"
import { StudentScholarships } from "@/components/dashboard/student/scholarships"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function ScholarshipsPage() {
  return (
    <ProtectedRoute redirectTo="/">
      <DashboardLayout userType="student">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Scholarships</h1>
            <p className="text-muted-foreground">
              Browse and apply for available scholarships
            </p>
          </div>
          <StudentScholarships />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
} 