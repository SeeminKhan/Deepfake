"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import { stats, mediaResults, alerts } from "@/lib/mock-data"
import { Shield, FileVideo, Globe, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const weeklyData = [
  { day: "Mon", verified: 18, detected: 2 },
  { day: "Tue", verified: 22, detected: 4 },
  { day: "Wed", verified: 15, detected: 1 },
  { day: "Thu", verified: 28, detected: 3 },
  { day: "Fri", verified: 25, detected: 2 },
  { day: "Sat", verified: 12, detected: 1 },
  { day: "Sun", verified: 8, detected: 1 },
]

const threatDistribution = [
  { name: "Real Content", value: 85, color: "hsl(var(--chart-2))" },
  { name: "Deepfakes", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Suspicious", value: 3, color: "hsl(var(--chart-5))" },
]

const weeklyChartConfig = {
  verified: {
    label: "Verified",
    color: "hsl(var(--chart-2))",
  },
  detected: {
    label: "Threats Detected",
    color: "hsl(var(--chart-4))",
  },
}

const threatChartConfig = {
  value: {
    label: "Content",
  },
  real: {
    label: "Real Content",
    color: "hsl(var(--chart-2))",
  },
  deepfakes: {
    label: "Deepfakes",
    color: "hsl(var(--chart-4))",
  },
  suspicious: {
    label: "Suspicious",
    color: "hsl(var(--chart-5))",
  },
}

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => {
          const icons = [Shield, FileVideo, Globe]
          const Icon = icons[index]
          const colors = ["text-primary", "text-accent", "text-chart-3"]
          const bgColors = ["bg-primary/10", "bg-accent/10", "bg-chart-3/10"]

          return (
            <Card key={stat.id} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className={`p-2 rounded-lg ${bgColors[index]}`}>
                  <Icon className={`h-4 w-4 ${colors[index]}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 text-accent" />
                  <span>+12% from last month</span>
                </div>
                <Progress value={65 + index * 10} className="mt-3 h-1" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Weekly Activity</CardTitle>
            <p className="text-sm text-muted-foreground">Media verification and threat detection trends</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={weeklyChartConfig} className="h-[300px]">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="verified" fill="var(--color-verified)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="detected" fill="var(--color-detected)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Threat Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Content Analysis</CardTitle>
            <p className="text-sm text-muted-foreground">Distribution of analyzed content</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ChartContainer config={threatChartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={threatDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {threatDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {threatDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Media Checks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Recent Media Checks</CardTitle>
            <p className="text-sm text-muted-foreground">Latest verification results</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mediaResults.slice(0, 4).map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    {result.status === "Real" ? (
                      <CheckCircle className="h-4 w-4 text-accent" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{result.filename}</p>
                      <p className="text-xs text-muted-foreground">Confidence: {result.confidence}</p>
                    </div>
                  </div>
                  <Badge
                    variant={result.status === "Fake" ? "destructive" : "secondary"}
                    className={result.status === "Real" ? "bg-accent text-accent-foreground" : ""}
                  >
                    {result.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">System Status & Alerts</CardTitle>
            <p className="text-sm text-muted-foreground">Real-time monitoring updates</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 p-2 bg-accent/10 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">System Online</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
                <Clock className="h-3 w-3 text-primary" />
                <span className="text-sm font-medium text-foreground">Scanning Active</span>
              </div>
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border/50"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === "high"
                        ? "bg-destructive animate-pulse"
                        : alert.severity === "medium"
                          ? "bg-chart-5"
                          : "bg-accent"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
