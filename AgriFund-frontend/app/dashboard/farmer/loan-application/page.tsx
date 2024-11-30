"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProtectedRoute from "@/components/ProtectedRoute"

interface LoanApplication {
  amount: string
  purpose: string
  duration: string
  description: string
}

export default function LoanApplicationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoanApplication>({
    amount: '',
    purpose: '',
    duration: '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData)
    // You can add API call here
  }

  const handleInputChange = (field: keyof LoanApplication, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <ProtectedRoute redirectTo="/">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Apply for a New Loan</CardTitle>
              <CardDescription>Fill out the form below to submit your loan application</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Loan Amount (USD)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        className="pl-8"
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Select
                      value={formData.purpose}
                      onValueChange={(value) => handleInputChange('purpose', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Equipment Purchase</SelectItem>
                        <SelectItem value="seeds">Seeds and Fertilizers</SelectItem>
                        <SelectItem value="expansion">Farm Expansion</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure Development</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Repayment Duration</Label>
                    <Select
                      value={formData.duration}
                      onValueChange={(value) => handleInputChange('duration', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <textarea
                      id="description"
                      className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                      placeholder="Provide additional details about your loan request..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">Submit Application</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Application History</CardTitle>
              <CardDescription>Track your previous loan applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, amount: 5000, purpose: "Equipment", status: "Approved", date: "2024-02-15" },
                  { id: 2, amount: 3000, purpose: "Seeds", status: "Pending", date: "2024-03-10" },
                  { id: 3, amount: 8000, purpose: "Expansion", status: "Rejected", date: "2024-01-05" },
                ].map((application) => (
                  <div
                    key={application.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold">${application.amount.toLocaleString()}</h4>
                      <p className="text-sm text-muted-foreground">
                        {application.purpose} • {new Date(application.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-sm mt-2 sm:mt-0 px-3 py-1 rounded-full ${application.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        application.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                      }`}>
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
} 