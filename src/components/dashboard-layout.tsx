"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Shield, Globe, FileText, Bell, Menu, X, Eye, Brain, ChevronRight } from "lucide-react"

const navigation = [
  { name: "Command Center", href: "/", icon: Brain, description: "AI Analytics Hub" },
  { name: "Neural Scan", href: "/media-verification", icon: Eye, description: "Media Analysis" },
  { name: "Secure Vault", href: "/secure-browser", icon: Globe, description: "Protected Browsing" },
  { name: "Intel Reports", href: "/reports", icon: FileText, description: "Data Archives" },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 backdrop-blur-2xl bg-card/20 border-r border-primary/20 transform transition-all duration-300 ease-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col relative">
          <div className="flex h-20 items-center justify-between px-6 border-b border-primary/20 relative">
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10 text-primary glow-primary" />
              <div>
                <span className="text-xl font-bold text-foreground tracking-wider">DEEPGUARD</span>
                <div className="text-xs text-primary font-mono">NEURAL SECURITY</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-foreground hover:text-primary"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group relative flex flex-col gap-1 p-4 rounded-xl text-sm font-medium transition-all duration-200 border",
                    isActive
                      ? "bg-primary/10 text-primary border-primary/30 glow-primary"
                      : "text-foreground/80 hover:text-foreground border-border/20 hover:border-primary/20 hover:bg-primary/5",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? "text-primary" : "text-foreground/60 group-hover:text-primary",
                      )}
                    />
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-8">{item.description}</span>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full glow-primary" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="fixed left-4 top-4 bottom-4 w-20 backdrop-blur-2xl bg-card/20 border border-primary/20 rounded-2xl z-50 transition-all duration-300 hover:w-72 group">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-center px-4 border-b border-primary/20">
              {/* Center shield properly with icons */}
              <Shield className="h-6 w-6 text-primary glow-primary flex-shrink-0" />
              <div className="ml-3 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <span className="text-lg font-bold text-foreground tracking-wider">DEEPGUARD</span>
                <div className="text-xs text-primary font-mono">NEURAL SECURITY</div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group/nav relative flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                      isActive
                        ? "bg-primary/10 text-primary border-primary/30 glow-primary"
                        : "text-foreground/80 hover:text-foreground border-border/20 hover:border-primary/20 hover:bg-primary/5",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-colors flex-shrink-0",
                        isActive ? "text-primary" : "text-foreground/60 group-hover/nav:text-primary",
                      )}
                    />
                    <div className="flex-1 min-w-0 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <div className="font-semibold truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/nav:text-primary transition-colors opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 duration-300" />
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full glow-primary" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-28">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between backdrop-blur-xl bg-card/10 border-b border-primary/20 px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-foreground hover:text-primary hover:bg-primary/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Neural Defense Matrix</h1>
              <p className="text-sm text-muted-foreground font-mono">Advanced AI Security Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-mono text-accent">ONLINE</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="relative text-foreground hover:text-primary hover:bg-primary/10"
            >
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse glow-destructive" />
            </Button>
          </div>
        </header>

        <main className="p-8 min-h-[calc(100vh-5rem)]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
