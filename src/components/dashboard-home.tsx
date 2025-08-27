"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import { stats, mediaResults } from "@/lib/mock-data"
import { Shield, FileVideo, Globe, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

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
  { name: "Real Content", value: 85 },
  { name: "Deepfakes", value: 12 },
  { name: "Suspicious", value: 3 },
]

export function DashboardHome() {
  return (
    <div className="space-y-8 bg-background min-h-screen p-6">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => {
          const icons = [Shield, FileVideo, Globe]
          const glows = ["glow-primary", "glow-accent", "glow-destructive"]
          const Icon = icons[index]

          return (
            <Card key={stat.id} className={`glass relative overflow-hidden ${glows[index]}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className="p-2 rounded-lg bg-card/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 text-accent" />
                  <span>+12% from last month</span>
                </div>
                <Progress value={65 + index * 10} className="mt-3 h-2" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity */}
        <Card className="glass glow-primary">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Weekly Activity</CardTitle>
            <p className="text-sm text-muted-foreground">Verification & detection trends</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#fff" />
                <YAxis tickLine={false} axisLine={false} stroke="#fff" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="verified" fill="#ffffff" radius={[6, 6, 0, 0]} />
                <Bar dataKey="detected" fill="rgba(255,255,255,0.7)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Threat Distribution */}
        <Card className="glass glow-accent">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Content Analysis</CardTitle>
            <p className="text-sm text-muted-foreground">Distribution of analyzed content</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ChartContainer config={{}} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={threatDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {threatDistribution.map((_, index) => (
                      <Cell
                        key={index}
                        fill={index === 0 ? "#fff" : `rgba(255,255,255,${0.6 - index * 0.2})`}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {threatDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        index === 0 ? "#fff" : `rgba(255,255,255,${0.6 - index * 0.2})`,
                    }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Media */}
      <Card className="glass glow-destructive">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Media Checks</CardTitle>
          <p className="text-sm text-muted-foreground">Latest verification results</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mediaResults.slice(0, 4).map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border/40"
              >
                <div className="flex items-center gap-3">
                  {result.status === "Real" ? (
                    <CheckCircle className="h-4 w-4 text-accent glow-accent" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive glow-destructive" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{result.filename}</p>
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
    </div>
  )
}
