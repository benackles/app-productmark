"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Settings, Bell, CreditCard, Plug, Palette, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const settingsNavItems = [
  { href: "/settings/profile", label: "Profile", icon: User },
  { href: "/settings/account", label: "Account", icon: Settings },
  { href: "/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/settings/billing", label: "Billing", icon: CreditCard },
  { href: "/settings/integrations", label: "Integrations", icon: Plug },
  { href: "/settings/customization", label: "Customization", icon: Palette },
  { href: "/settings/team", label: "Team", icon: Users },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const currentItem = settingsNavItems.find((item) => pathname === item.href) || settingsNavItems[0]
  const CurrentIcon = currentItem.icon

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-bold tracking-tight text-4xl">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-col gap-2 min-w-[200px]">
          {settingsNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  isActive
                    ? "bg-[#6b8f71] text-white font-medium"
                    : "text-muted-foreground hover:bg-[#6b8f71]/10 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Dropdown */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-transparent">
                <span className="flex items-center gap-2">
                  <CurrentIcon className="h-4 w-4" />
                  {currentItem.label}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[calc(100vw-2rem)]">
              {settingsNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content Area */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
