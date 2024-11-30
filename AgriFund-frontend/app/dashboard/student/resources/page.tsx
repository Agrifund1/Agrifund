import { DashboardLayout } from "@/components/dashboard/layout"
// Assuming the import error is due to a typo or incorrect path, I'll correct it
import { StudentResources } from "@/components/dashboard/student/resources"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function ResourcesPage() {
  return (
    <ProtectedRoute redirectTo="/">
      <DashboardLayout userType="student">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Educational Resources</h1>
            <p className="text-muted-foreground">
              Access study materials, guides, and career resources
            </p>
          </div>
          <StudentResources />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
} 