"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Globe, Shield, Lock, AlertTriangle, CheckCircle, ExternalLink, Clock, RefreshCw, X } from "lucide-react"

interface SandboxSession {
  id: string
  url: string
  status: "loading" | "active" | "completed" | "blocked"
  startTime: string
  duration?: string
  threats?: number
  isSecure: boolean
}

const browsedHistory = [
  {
    id: 1,
    url: "https://suspicious-site.com",
    status: "blocked",
    threats: 3,
    timestamp: "2 hours ago",
    reason: "Malicious content detected",
  },
  {
    id: 2,
    url: "https://news-website.com",
    status: "safe",
    threats: 0,
    timestamp: "3 hours ago",
    reason: "Clean - No threats found",
  },
  {
    id: 3,
    url: "https://social-media.com",
    status: "safe",
    threats: 0,
    timestamp: "5 hours ago",
    reason: "Clean - No threats found",
  },
  {
    id: 4,
    url: "https://phishing-attempt.net",
    status: "blocked",
    threats: 5,
    timestamp: "1 day ago",
    reason: "Phishing attempt blocked",
  },
]

export function SecureBrowser() {
  const [url, setUrl] = useState("")
  const [activeSessions, setActiveSessions] = useState<SandboxSession[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenInSandbox = () => {
    if (!url.trim()) return

    setIsLoading(true)
    const newSession: SandboxSession = {
      id: Math.random().toString(36).substr(2, 9),
      url: url.trim(),
      status: "loading",
      startTime: new Date().toLocaleTimeString(),
      isSecure: Math.random() > 0.3, // Mock security check
    }

    setActiveSessions((prev) => [...prev, newSession])

    // Mock loading process
    setTimeout(() => {
      setActiveSessions((prev) =>
        prev.map((session) =>
          session.id === newSession.id
            ? {
                ...session,
                status: newSession.isSecure ? "active" : "blocked",
                threats: newSession.isSecure ? 0 : Math.floor(Math.random() * 5) + 1,
              }
            : session,
        ),
      )
      setIsLoading(false)
    }, 2000)

    setUrl("")
  }

  const handleCloseSession = (sessionId: string) => {
    setActiveSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              status: "completed",
              duration: `${Math.floor(Math.random() * 30) + 5} min`,
            }
          : session,
      ),
    )

    // Remove completed session after a delay
    setTimeout(() => {
      setActiveSessions((prev) => prev.filter((session) => session.id !== sessionId))
    }, 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "loading":
        return <RefreshCw className="h-4 w-4 text-chart-5 animate-spin" />
      case "active":
        return <CheckCircle className="h-4 w-4 text-accent" />
      case "blocked":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "completed":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "safe":
        return (
          <Badge className="bg-accent text-accent-foreground">
            <CheckCircle className="h-3 w-3 mr-1" />
            Safe
          </Badge>
        )
      case "blocked":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Blocked
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="gradient-mesh space-y-6">
      {/* URL Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Secure Browser Sandbox</CardTitle>
          <p className="text-sm text-muted-foreground">
            Browse suspicious websites safely in an isolated environment with real-time threat detection
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <Shield className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-foreground">
                All browsing sessions are isolated and monitored for threats
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url-input" className="text-sm font-medium text-foreground">
                Enter URL to browse safely
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="url-input"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10"
                    onKeyDown={(e) => e.key === "Enter" && handleOpenInSandbox()}
                  />
                </div>
                <Button onClick={handleOpenInSandbox} disabled={!url.trim() || isLoading} className="px-6">
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Opening...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Sandbox
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Active Sandbox Sessions</CardTitle>
            <p className="text-sm text-muted-foreground">Currently running isolated browsing sessions</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border/50"
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(session.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{session.url}</p>
                      <p className="text-xs text-muted-foreground">Started: {session.startTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {session.status === "loading" && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-chart-5 rounded-full animate-pulse" />
                        <span className="text-sm text-muted-foreground">Initializing sandbox...</span>
                      </div>
                    )}

                    {session.status === "active" && (
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 p-2 bg-accent/10 rounded">
                          <Lock className="h-3 w-3 text-accent" />
                          <span className="text-xs font-medium text-foreground">Secure</span>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">Running</Badge>
                      </div>
                    )}

                    {session.status === "blocked" && (
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded">
                          <AlertTriangle className="h-3 w-3 text-destructive" />
                          <span className="text-xs font-medium text-foreground">{session.threats} threats</span>
                        </div>
                        <Badge variant="destructive">Blocked</Badge>
                      </div>
                    )}

                    {session.status === "completed" && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Duration: {session.duration}</span>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    )}

                    {(session.status === "active" || session.status === "blocked") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCloseSession(session.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Safe Sessions</p>
                <p className="text-2xl font-bold text-foreground">47</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Threats Blocked</p>
                <p className="text-2xl font-bold text-foreground">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Active Sessions</p>
                <p className="text-2xl font-bold text-foreground">
                  {activeSessions.filter((s) => s.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Browsing History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Recent Browsing History</CardTitle>
          <p className="text-sm text-muted-foreground">Previously accessed URLs and security assessments</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Threats</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {browsedHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.url}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <span className={item.threats > 0 ? "text-destructive font-medium" : "text-muted-foreground"}>
                      {item.threats}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.timestamp}</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{item.reason}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
