"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { updateUserData } from "@/firebase/firestore/addData"
import { useAuthContext } from "@/context/AuthContext"

const roles = [
  {
    id: "investor",
    title: "Investor",
    description: "Support farmers and students through investments",
  },
  {
    id: "farmer",
    title: "Farmer",
    description: "Access loans and agricultural support",
  },
  {
    id: "business",
    title: "Local Business",
    description: "Partner with farmers and contribute to community growth",
  },
  {
    id: "student",
    title: "Student",
    description: "Apply for educational scholarships",
  },
  {
    id: "admin",
    title: "Administrator",
    description: "Manage platform operations",
  },
]

export function RoleSelectionForm() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const { user } = useAuthContext();
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateUserData('users', `${user?.uid}`, { role: selectedRole });
    } catch (e) {
      console.error(e)
    }

    if (selectedRole) {
      router.push(`/dashboard/${selectedRole}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-card rounded-xl shadow-lg border"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Select Your Role</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose your role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{role.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {role.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="submit"
          className="w-full"
          disabled={!selectedRole}
          size="lg"
        >
          Continue to Dashboard
        </Button>
      </form>
    </motion.div>
  )
} 