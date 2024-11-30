"use client"

import { DashboardLayout } from "@/components/dashboard/layout";
import { InvestorDashboardContent } from "@/components/dashboard/investor/dashboard-content";
import { FarmerDashboardContent } from "@/components/dashboard/farmer/dashboard-content";
import { BusinessDashboardContent } from "@/components/dashboard/business/dashboard-content";
import { StudentDashboardContent } from "@/components/dashboard/student/dashboard-content";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ProtectedRoute from "@/components/ProtectedRoute";

const validRoles = ["investor", "farmer", "business", "student"] as const;

const roleComponents = {
  investor: InvestorDashboardContent,
  farmer: FarmerDashboardContent,
  business: BusinessDashboardContent,
  student: StudentDashboardContent,
};

type Role = (typeof validRoles)[number];

export const revalidate = 3600; // Revalidate metadata every hour

interface DashboardPageProps {
  params: {
    role: string;
  };
}

export default async function DashboardPage({ params: { role } }: DashboardPageProps) {
  if (!validRoles.includes(role as Role)) {
    console.warn(`Invalid role "${role}". Redirecting to /get-started.`);
    redirect("/get-started");
  }

  const DashboardContent = roleComponents[role as keyof typeof roleComponents];

  if (!DashboardContent) {
    console.error(`DashboardContent not found for role: ${role}. Redirecting to /error.`);
    redirect("/error");
  }

  return (
    <ProtectedRoute redirectTo="/">
      <DashboardLayout userType={role}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to your {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your {role} activities and track your progress.
            </p>
          </div>
          <DashboardContent />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
