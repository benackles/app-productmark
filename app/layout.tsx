import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { PWAStatusChecker } from "@/components/pwa-status-checker"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ProductMark - Product Marketing Hub",
    template: "%s | ProductMark",
  },
  description: "A Progressive Web App for managing product marketing assets and sales plays",
  keywords: ["product marketing", "sales enablement", "marketing assets", "GTM strategy"],
  authors: [{ name: "ProductMark Team" }],
  creator: "ProductMark",
  publisher: "ProductMark",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://productmark.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ProductMark - Product Marketing Hub",
    description: "A Progressive Web App for managing product marketing assets and sales plays",
    url: "https://productmark.app",
    siteName: "ProductMark",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProductMark - Product Marketing Hub",
    description: "A Progressive Web App for managing product marketing assets and sales plays",
    creator: "@productmark",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ProductMark",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const buildId = process.env.VERCEL_GIT_COMMIT_SHA || "dev"

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ProductMark" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="build-id" content={buildId} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <PWAInstallPrompt />
          <PWAStatusChecker />
          <Toaster />
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                      
                      // Check for updates every 60 seconds
                      setInterval(function() {
                        registration.update();
                      }, 60000);
                      
                      // Listen for updates
                      registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', function() {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              // New version available, prompt user to refresh
                              if (confirm('A new version is available! Click OK to update.')) {
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                window.location.reload();
                              }
                            }
                          });
                        }
                      });
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                  
                  // Reload page when new service worker takes control
                  navigator.serviceWorker.addEventListener('controllerchange', function() {
                    window.location.reload();
                  });
                });
              }
              
              // Check for version changes by comparing build IDs
              function checkForUpdates() {
                fetch('/api/build-info', {
                  cache: 'no-cache'
                }).then(function(response) {
                  return response.json();
                }).then(function(data) {
                  const currentBuildId = document.querySelector('meta[name="build-id"]')?.content;
                  // If we detect a version mismatch, reload
                  if (currentBuildId && data.buildId && currentBuildId !== data.buildId) {
                    console.log('New version detected, reloading...');
                    window.location.reload();
                  }
                }).catch(function(error) {
                  console.log('Version check failed:', error);
                });
              }
              
              // Check for updates every 5 minutes
              setInterval(checkForUpdates, 300000);
            `,
          }}
        />
      </body>
    </html>
  )
}
