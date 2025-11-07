import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import { mockPlans, mockPaymentMethods, mockBillingHistory } from "@/lib/mock-billing"
import { CurrentPlanCard } from "@/components/billing/current-plan-card"

export default function BillingPage() {
  const currentPlan = mockPlans.find((plan) => plan.isCurrent)
  const defaultPaymentMethod = mockPaymentMethods.find((pm) => pm.isDefault)

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold tracking-tight text-2xl">Billing</h2>
          <p className="text-muted-foreground">Manage payment plans and view history.</p>
        </div>
        <Button asChild variant="outline" className="bg-transparent">
          <Link href="/settings/billing/plans">
            View All Plans
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Current Plan */}
      <CurrentPlanCard currentPlan={currentPlan} />

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          {defaultPaymentMethod ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">
                    {defaultPaymentMethod.brand} ending in {defaultPaymentMethod.last4}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Expires {defaultPaymentMethod.expiryMonth}/{defaultPaymentMethod.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Update
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Add New
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="mb-4 text-muted-foreground">No payment method on file</p>
              <Button>Add Payment Method</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBillingHistory.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.description}</p>
                  <p className="text-muted-foreground text-sm">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">${item.amount.toFixed(2)}</p>
                    <Badge
                      variant={
                        item.status === "paid" ? "secondary" : item.status === "pending" ? "outline" : "destructive"
                      }
                      className="text-xs"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  {item.invoiceUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={item.invoiceUrl} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
