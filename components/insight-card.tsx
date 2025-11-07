"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Edit3, Trash2, Users, Target, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import type { InsightData } from "@/lib/mock-insights"

interface InsightCardProps {
  insight: InsightData
}

const typeConfig = {
  customer: {
    color: "bg-blue-500",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    icon: Users,
    label: "Customer",
  },
  competitive: {
    color: "bg-red-500",
    textColor: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
    icon: Target,
    label: "Competitive",
  },
  market: {
    color: "bg-green-500",
    textColor: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    icon: TrendingUp,
    label: "Market",
  },
}

export function InsightCard({ insight }: InsightCardProps) {
  const router = useRouter()
  const config = typeConfig[insight.type]
  const Icon = config.icon

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/insights/edit/${insight.id}`)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Handle delete
  }

  return (
    <Link href={`/insights/details/${insight.id}`}>
      <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <div className={cn("p-2 rounded-lg", config.color)}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Badge variant="secondary" className="mb-2">
              {config.label}
            </Badge>
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {insight.observation}
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{insight.evidence}</p>
        </CardContent>
        <CardFooter className="pt-4">
          <div className="flex flex-wrap gap-1">
            {insight.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {insight.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{insight.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
