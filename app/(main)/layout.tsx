"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Edit, HelpCircle, Home, Brain, LogOut, Rocket, Settings, Target, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BackNav } from "@/components/ui/back-nav"

const mainNavItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/insights", icon: Brain, label: "Insights" },
  { href: "/strategy", icon: Target, label: "Strategy" },
  { href: "/enablement", icon: Rocket, label: "Enablement" },
]

const settingsNavItem = {
  href: "/settings",
  icon: Settings,
  label: "Settings",
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isNewPage = pathname.includes("/new")

  const NavLink = ({
    href,
    icon: Icon,
    label,
    isMobile = false,
  }: {
    href: string
    icon: React.ElementType
    label: string
    isMobile?: boolean
  }) => {
    // Check if current path matches the nav item or any of its child routes
    const isActive =
      pathname === href ||
      (href !== "/" && pathname.startsWith(href + "/")) ||
      (href === "/settings" && pathname.startsWith("/settings"))

    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 text-muted-foreground transition-all hover:text-accent-500 relative",
          !isMobile && "py-3 px-4 lg:px-6 w-full",
          !isMobile && isActive && "text-accent-600 font-semibold bg-[#FFFEFE]",
          !isMobile && !isActive && "py-3",
          isMobile && "py-2 flex-col h-auto gap-1 rounded-lg px-3",
          isMobile && isActive && "text-accent-600 font-medium",
        )}
      >
        {isActive && !isMobile && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-600" />}

        <Icon className="h-5 w-5" />
        <span className={cn("text-sm font-medium", isMobile && "text-[10px]")}>{label}</span>

        {isActive && isMobile && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent-600 rounded-full" />
        )}
      </Link>
    )
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[150px_1fr] lg:grid-cols-[190px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-background">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              🧐<span className="text-foreground">ProductMark</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto py-2 bg-background">
            <nav className="grid items-start text-sm font-medium">
              {mainNavItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </nav>
          </div>
          <div className="border-t pt-4 bg-background">
            <nav className="grid items-start text-sm font-medium mt-2">
              <NavLink {...settingsNavItem} />
            </nav>
            <p className="mt-4 px-4 lg:px-6 text-xs text-muted-foreground pb-4">© 2025 ProductMark</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-screen">
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 bg-background">
          <div className="w-full flex-1 md:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold pl-0">
              <span className="text-xl">🧐</span>
              <span className="text-foreground">ProductMark</span>
            </Link>
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#6b8f71]/10">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 border-gray-100">
                <div className="px-4 py-3">
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@company.com</p>
                </div>
                <div className="h-px bg-gray-100 my-1" />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href="/settings/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-[#6b8f71]/10 focus:bg-[#6b8f71]/10 text-sm"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <div className="h-px bg-gray-100 my-1" />
                <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 text-red-600 focus:text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer text-sm">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-background p-4 pb-20 md:pb-4 lg:p-6 flex flex-col">
          {isNewPage && <BackNav />}
          {children}
          <Link
            href="/help"
            className="mt-8 self-end flex items-center gap-2 text-muted-foreground hover:text-accent-500 bg-background p-2 rounded-md shadow-lg mr-4 mb-4"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm">Help & Support</span>
          </Link>
        </main>
      </div>

      <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
        <nav className="grid grid-cols-5 h-16">
          {[...mainNavItems, settingsNavItem].map((item) => (
            <NavLink key={item.href} {...item} isMobile />
          ))}
        </nav>
      </div>
    </div>
  )
}
