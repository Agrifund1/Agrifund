"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Coins, 
  TrendingUp,
  FileText,
  LineChart,
  Store,
  Users,
  GraduationCap,
  BookOpen
} from "lucide-react"

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Nav({ className, ...props }: NavProps) {
  const pathname = usePathname()

  const farmerRoutes = [
    {
      href: "/dashboard/farmer",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/farmer/marketplace",
      label: "Marketplace",
      icon: Store,
    },
    {
      href: "/dashboard/farmer/loan-application",
      label: "Apply for Loan",
      icon: FileText,
    },
    {
      href: "/dashboard/farmer/coin-insights",
      label: "Coin Insights",
      icon: LineChart,
    },
    {
      href: `/posts/:id`,
      label: "View Article/Blog",
      icon: "",
    },
  ]

  const investorRoutes = [
    {
      href: "/dashboard/investor",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/investor/opportunities",
      label: "Opportunities",
      icon: TrendingUp,
    },
    {
      href: "/dashboard/investor/farmer-coins",
      label: "Farmer Coins",
      icon: Coins,
    },
  ]

  const businessRoutes = [
    {
      href: "/dashboard/business",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/business/loan-management",
      label: "Loan Management",
      icon: FileText,
    },
    {
      href: "/dashboard/business/marketplace",
      label: "Marketplace",
      icon: Store,
    },
    {
      href: "/dashboard/business/analytics",
      label: "Analytics",
      icon: LineChart,
    },
    {
      href: "/dashboard/business/community",
      label: "Community",
      icon: Users,
    }
  ]

  const studentRoutes = [
    {
      href: "/dashboard/student",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/student/scholarships",
      label: "Scholarships",
      icon: GraduationCap,
    },
    {
      href: "/dashboard/student/loans",
      label: "Student Loans",
      icon: FileText,
    },
    {
      href: "/dashboard/student/resources",
      label: "Resources",
      icon: BookOpen,
    },
    {
      href: "/dashboard/student/community",
      label: "Community",
      icon: Users,
    },
    {
      href: `/posts/:id`,
      label: "View Article/Blog",
      icon: "",
    },
  ]

  const routes = pathname.includes('/dashboard/student')
    ? studentRoutes
    : pathname.includes('/dashboard/business')
    ? businessRoutes
    : pathname.includes('/dashboard/farmer')
    ? farmerRoutes
    : investorRoutes

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === route.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          <route.icon className="mr-2 h-4 w-4" />
          {route.label}
        </Link>
      ))}
    </nav>
  )
} 