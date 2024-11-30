import ProtectedRoute from "@/components/ProtectedRoute"
import { RoleSelectionForm } from "@/components/role-selection-form"

export default function GetStartedPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-accent to-background py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4">
              Welcome to AgriFund
            </h1>
            <p className="text-lg text-muted-foreground">
              Let's get you started by selecting your role in our community
            </p>
          </div>
          <RoleSelectionForm />
        </div>
      </div>
    </ProtectedRoute>
  )
} 