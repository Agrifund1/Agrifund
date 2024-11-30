"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  User,
  FileText,
  ArrowLeft,
  Store,
  ShoppingBag,
  LineChart,
  Users,
  GraduationCap,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation"
import signOut from "@/firebase/auth/signout"
import ChatBot from "@/components/ChatBot"


export function DashboardLayout({
  children,
  userType
}: {
  children: React.ReactNode
  userType: string
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    // Add any logout logic here (e.g., clearing tokens/session)
    let result = await signOut()
    // console.log(result);

    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <div className="flex-1">
            <Link href="/dashboard" className="text-xl font-bold text-primary">
              AgriFund
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="mr-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  // className="text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-16 z-40 w-64 shrink-0 border-r bg-card/50 backdrop-blur-lg h-[calc(100vh-4rem)] transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
        >
          <div className="flex flex-col h-full p-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <nav className="space-y-2">
              <SidebarLink icon={Home} href={`/dashboard/${userType}`}>
                Dashboard
              </SidebarLink>
              <SidebarLink icon={FileText} href={`/dashboard/${userType}/transactions`}>
                Transactions
              </SidebarLink>
              {userType === 'investor' && (
                <>
                  <SidebarLink icon={FileText} href={`/dashboard/${userType}/opportunities`}>
                    Loan Opportunities
                  </SidebarLink>
                  <SidebarLink icon={FileText} href={`/dashboard/${userType}/portfolio`}>
                    Portfolio
                  </SidebarLink>
                  <SidebarLink icon={FileText} href={`/dashboard/${userType}/farmer-coins`}>
                    Farmer Coins
                  </SidebarLink>
                </>
              )}
              {userType === 'business' && (
                <>
                  <SidebarLink icon={Store} href={`/dashboard/${userType}/loan-management`}>
                    Loan Management
                  </SidebarLink>
                  <SidebarLink icon={ShoppingBag} href={`/dashboard/${userType}/marketplace`}>
                    Marketplace
                  </SidebarLink>
                  <SidebarLink icon={LineChart} href={`/dashboard/${userType}/analytics`}>
                    Analytics
                  </SidebarLink>
                  <SidebarLink icon={Users} href={`/dashboard/${userType}/community`}>
                    Community
                  </SidebarLink>
                </>
              )}
              {userType === 'student' && (
                <>
                  <SidebarLink icon={GraduationCap} href={`/dashboard/${userType}/scholarships`}>
                    Scholarships
                  </SidebarLink>
                  <SidebarLink icon={BookOpen} href={`/dashboard/${userType}/resources`}>
                    Resources
                  </SidebarLink>
                  <SidebarLink icon={Users} href={`/dashboard/${userType}/community`}>
                    Community
                  </SidebarLink>
                  <SidebarLink icon={FileText} href={`/dashboard/${userType}/loans`}>
                    Loans
                  </SidebarLink>
                </>
              )}
              {userType === 'farmer' && (
                <>
                  <SidebarLink icon={Store} href={`/dashboard/${userType}/marketplace`}>
                    Marketplace
                  </SidebarLink>
                </>
              )}

            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>
        <div className="relative">
          <ChatBot />
        </div>
      </div>
    </div>
  )
}

function SidebarLink({
  children,
  icon: Icon,
  href
}: {
  children: React.ReactNode
  icon: any
  href: string
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive
        ? "bg-primary text-primary-foreground"
        : "hover:bg-accent text-muted-foreground hover:text-foreground"
        }`}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  )
}