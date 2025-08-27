"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bell,
  AlertTriangle,
  Shield,
  Activity,
  Eye,
  Server,
  Wifi,
  Database,
  Clock,
  CheckCircle,
  Pause,
  Play,
} from "lucide-react"

interface Alert {
  id: string
  message: string
  severity: "critical" | "high" | "medium" | "low"
  timestamp: string
  source: string
  status: "active" | "acknowledged" | "resolved"
}

interface SystemMetric {
  name: string
  value: number
  status: "healthy" | "warning" | "critical"
  icon: React.ComponentType<{ className?: string }>
}

export function Monitoring() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      message: "Deepfake detected in live stream from source: social-media-feed-1",
      severity: "critical",
      timestamp: "2 minutes ago",
      source: "Media Scanner",
      status: "active",
    },
    {
      id: "2",
      message: "Suspicious URL blocked: phishing-attempt.malicious-site.com",
      severity: "high",
      timestamp: "5 minutes ago",
      source: "Secure Browser",
      status: "active",
    },
    {
      id: "3",
      message: "High confidence fake audio detected in uploaded file",
      severity: "high",
      timestamp: "12 minutes ago",
      source: "Media Verification",
      status: "acknowledged",
    },
    {
      id: "4",
      message: "System scan completed - 247 files processed",
      severity: "low",
      timestamp: "1 hour ago",
      source: "System Scanner",
      status: "resolved",
    },
  ])

  const [isMonitoring, setIsMonitoring] = useState(true)
  const [systemMetrics] = useState<SystemMetric[]>([
    { name: "CPU Usage", value: 45, status: "healthy", icon: Server },
    { name: "Memory", value: 67, status: "warning", icon: Database },
    { name: "Network", value: 23, status: "healthy", icon: Wifi },
    { name: "Active Scans", value: 12, status: "healthy", icon: Eye },
  ])

  // Simulate real-time alerts
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      const shouldAddAlert = Math.random() > 0.7
      if (shouldAddAlert) {
        const newAlert: Alert = {
          id: Math.random().toString(36).substr(2, 9),
          message: [
            "New deepfake pattern detected in media stream",
            "Suspicious domain accessed via secure browser",
            "Anomalous behavior detected in user session",
            "Potential threat identified in uploaded content",
          ][Math.floor(Math.random() * 4)],
          severity: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)] as Alert["severity"],
          timestamp: "Just now",
          source: ["Media Scanner", "Secure Browser", "System Monitor", "Threat Detection"][
            Math.floor(Math.random() * 4)
          ],
          status: "active",
        }

        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)])
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "acknowledged" } : alert)))
  }

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-chart-4 text-white"
      case "medium":
        return "bg-chart-5 text-white"
      case "low":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4" />
      case "acknowledged":
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getMetricStatus = (status: string, value: number) => {
    switch (status) {
      case "healthy":
        return "text-accent"
      case "warning":
        return "text-chart-5"
      case "critical":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const activeAlerts = alerts.filter((alert) => alert.status === "active").length
  const criticalAlerts = alerts.filter((alert) => alert.severity === "critical" && alert.status === "active").length

  return (
    <div className="space-y-6">
      {/* Monitoring Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground">Real-Time Monitoring</CardTitle>
              <p className="text-sm text-muted-foreground">Live threat detection and system monitoring dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="monitoring-toggle" className="text-sm font-medium">
                  Live Monitoring
                </Label>
                <Switch
                  id="monitoring-toggle"
                  checked={isMonitoring}
                  onCheckedChange={setIsMonitoring}
                  className="data-[state=checked]:bg-accent"
                />
              </div>
              <div className="flex items-center gap-2">
                {isMonitoring ? (
                  <>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-accent">Active</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    <span className="text-sm font-medium text-muted-foreground">Paused</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Alert Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-foreground">{criticalAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-5/10 rounded-lg">
                <Bell className="h-5 w-5 text-chart-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-foreground">{activeAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Threats Blocked</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">System Health</p>
                <p className="text-2xl font-bold text-accent">Good</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Live Alerts</CardTitle>
              <div className="flex items-center gap-2">
                {isMonitoring ? (
                  <Play className="h-4 w-4 text-accent" />
                ) : (
                  <Pause className="h-4 w-4 text-muted-foreground" />
                )}
                <Badge variant="outline" className="text-xs">
                  {alerts.length} total
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border/50"
                >
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(alert.status)}
                    <div
                      className={`w-2 h-2 rounded-full ${
                        alert.severity === "critical"
                          ? "bg-destructive animate-pulse"
                          : alert.severity === "high"
                            ? "bg-chart-4"
                            : alert.severity === "medium"
                              ? "bg-chart-5"
                              : "bg-accent"
                      }`}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground leading-relaxed">{alert.message}</p>
                      <Badge className={`${getSeverityColor(alert.severity)} text-xs`}>{alert.severity}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{alert.source}</span>
                        <span>•</span>
                        <span>{alert.timestamp}</span>
                      </div>

                      {alert.status === "active" && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAcknowledgeAlert(alert.id)}
                            className="h-6 px-2 text-xs"
                          >
                            Acknowledge
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResolveAlert(alert.id)}
                            className="h-6 px-2 text-xs"
                          >
                            Resolve
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">System Metrics</CardTitle>
            <p className="text-sm text-muted-foreground">Real-time system performance monitoring</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {systemMetrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${getMetricStatus(metric.status, metric.value)}`} />
                        <span className="text-sm font-medium text-foreground">{metric.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{metric.value}%</span>
                        <Badge
                          variant="outline"
                          className={
                            metric.status === "healthy"
                              ? "border-accent text-accent"
                              : metric.status === "warning"
                                ? "border-chart-5 text-chart-5"
                                : "border-destructive text-destructive"
                          }
                        >
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                    <Progress
                      value={metric.value}
                      className={`h-2 ${
                        metric.status === "critical"
                          ? "[&>div]:bg-destructive"
                          : metric.status === "warning"
                            ? "[&>div]:bg-chart-5"
                            : "[&>div]:bg-accent"
                      }`}
                    />
                  </div>
                )
              })}

              {/* Additional Status Indicators */}
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-2 bg-accent/10 rounded">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Scanner Status</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-primary/10 rounded">
                    <Activity className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Uptime</p>
                      <p className="text-xs text-muted-foreground">99.9%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
