"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, X, Smartphone, Monitor } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop")

  useEffect(() => {
    // Check if already installed
    const checkInstalled =
      window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true

    setIsInstalled(checkInstalled)

    // Detect device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setDeviceType(isMobile ? "mobile" : "desktop")

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      console.log("beforeinstallprompt event fired")
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Don't show immediately on mobile - let them explore first
      if (isMobile) {
        // Show after 30 seconds or on second visit
        const hasSeenBefore = localStorage.getItem("pwa-prompt-seen")
        if (hasSeenBefore) {
          setShowInstallPrompt(true)
        } else {
          setTimeout(() => {
            setShowInstallPrompt(true)
            localStorage.setItem("pwa-prompt-seen", "true")
          }, 30000)
        }
      } else {
        // Show immediately on desktop
        setShowInstallPrompt(true)
      }
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Listen for successful installation
    window.addEventListener("appinstalled", () => {
      console.log("PWA was installed")
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.log("No deferred prompt available")
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response to the install prompt: ${outcome}`)

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString())
  }

  // Don't show if already installed or no prompt available
  if (isInstalled || !showInstallPrompt) return null

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {deviceType === "mobile" ? (
              <Smartphone className="h-5 w-5 text-primary" />
            ) : (
              <Monitor className="h-5 w-5 text-primary" />
            )}
            <CardTitle className="text-lg">Install ProductMark</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={handleDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          {deviceType === "mobile"
            ? "Add ProductMark to your home screen for quick access and offline functionality."
            : "Install ProductMark as a desktop app for quick access and a native experience."}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <Button onClick={handleInstall} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Install App
        </Button>
        <div className="text-xs text-muted-foreground text-center">
          {deviceType === "mobile" ? (
            <span>Works offline • Faster loading • No app store needed</span>
          ) : (
            <span>Native experience • Offline access • System integration</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
