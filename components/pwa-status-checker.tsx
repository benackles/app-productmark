"use client"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

export function PWAStatusChecker() {
  // Always hidden for now
  return null

  // Remove or comment out all the existing logic below
  /*
  const [status, setStatus] = useState({
    serviceWorker: false,
    manifest: false,
    https: false,
    installable: false,
    installed: false,
  })

  useEffect(() => {
    const checkPWAStatus = async () => {
      // Check Service Worker
      const swSupported = "serviceWorker" in navigator
      let swRegistered = false
      if (swSupported) {
        const registration = await navigator.serviceWorker.getRegistration()
        swRegistered = !!registration
      }

      // Check Manifest
      const manifestLink = document.querySelector('link[rel="manifest"]')
      const manifestExists = !!manifestLink

      // Check HTTPS
      const isHTTPS = window.location.protocol === "https:" || window.location.hostname === "localhost"

      // Check if already installed
      const isInstalled =
        window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true

      // Check if installable (beforeinstallprompt event)
      let canInstall = false
      window.addEventListener("beforeinstallprompt", (e) => {
        canInstall = true
      })

      setStatus({
        serviceWorker: swRegistered,
        manifest: manifestExists,
        https: isHTTPS,
        installable: canInstall,
        installed: isInstalled,
      })
    }

    checkPWAStatus()
  }, [])

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">PWA Status</CardTitle>
        <CardDescription className="text-xs">Development only</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <StatusItem label="Service Worker" status={status.serviceWorker} />
        <StatusItem label="Manifest" status={status.manifest} />
        <StatusItem label="HTTPS/Localhost" status={status.https} />
        <StatusItem label="Installable" status={status.installable} />
        <StatusItem label="Installed" status={status.installed} />
      </CardContent>
    </Card>
  )
  */
}

function StatusItem({ label, status }: { label: string; status: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span>{label}</span>
      {status ? (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Yes
        </Badge>
      ) : (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          No
        </Badge>
      )}
    </div>
  )
}
