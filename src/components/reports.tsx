"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Download,
  FileText,
  FileVideo,
  FileImage,
  FileAudio,
  CheckCircle,
  AlertTriangle,
  Eye,
  BarChart3,
} from "lucide-react"
import { format } from "date-fns"

interface ExtendedReport {
  id: number
  type: string
  verdict: string
  date: string
  filename: string
  confidence: string
  processingTime: string
  fileSize: string
  source: string
}

const extendedReports: ExtendedReport[] = [
  {
    id: 1,
    type: "Video",
    verdict: "Fake",
    date: "2025-08-25",
    filename: "suspicious_video.mp4",
    confidence: "92%",
    processingTime: "2.3s",
    fileSize: "15.2 MB",
    source: "Upload",
  },
  {
    id: 2,
    type: "Image",
    verdict: "Real",
    date: "2025-08-26",
    filename: "profile_photo.jpg",
    confidence: "87%",
    processingTime: "0.8s",
    fileSize: "2.1 MB",
    source: "Upload",
  },
  {
    id: 3,
    type: "Video",
    verdict: "Real",
    date: "2025-08-27",
    filename: "news_clip.mp4",
    confidence: "89%",
    processingTime: "3.1s",
    fileSize: "28.4 MB",
    source: "Upload",
  },
  {
    id: 4,
    type: "Image",
    verdict: "Fake",
    date: "2025-08-27",
    filename: "manipulated_image.png",
    confidence: "96%",
    processingTime: "1.2s",
    fileSize: "4.3 MB",
    source: "Browser",
  },
]

export function Reports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [verdictFilter, setVerdictFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [selectedReport, setSelectedReport] = useState<ExtendedReport | null>(null)

  const filteredReports = extendedReports.filter((report) => {
    const matchesSearch = report.filename.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || report.type.toLowerCase() === typeFilter
    const matchesVerdict = verdictFilter === "all" || report.verdict.toLowerCase() === verdictFilter
    const matchesSource = sourceFilter === "all" || report.source.toLowerCase() === sourceFilter

    return matchesSearch && matchesType && matchesVerdict && matchesSource
  })

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <FileVideo className="h-4 w-4 text-primary" />
      case "image":
        return <FileImage className="h-4 w-4 text-accent" />
      case "audio":
        return <FileAudio className="h-4 w-4 text-chart-3" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getVerdictBadge = (verdict: string) => {
    return verdict === "Real" ? (
      <Badge className="bg-accent text-accent-foreground">
        <CheckCircle className="h-3 w-3 mr-1" />
        Real
      </Badge>
    ) : (
      <Badge variant="destructive">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Fake
      </Badge>
    )
  }

  const handleExportReports = () => {
    // Mock export functionality
    const csvContent = [
      "Filename,Type,Verdict,Confidence,Date,Processing Time,File Size,Source",
      ...filteredReports.map(
        (report) =>
          `${report.filename},${report.type},${report.verdict},${report.confidence},${report.date},${report.processingTime},${report.fileSize},${report.source}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "deepguard-reports.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Calculate summary statistics
  const totalReports = filteredReports.length
  const fakeCount = filteredReports.filter((r) => r.verdict === "Fake").length
  const realCount = filteredReports.filter((r) => r.verdict === "Real").length
  const avgConfidence =
    filteredReports.reduce((sum, r) => sum + Number.parseInt(r.confidence), 0) / filteredReports.length || 0

  return (
    <div className=" gradient-mesh space-y-6">
      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-foreground">{totalReports}</p>
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
                <p className="text-sm font-medium text-foreground">Fake Content</p>
                <p className="text-2xl font-bold text-foreground">{fakeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Real Content</p>
                <p className="text-2xl font-bold text-foreground">{realCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-3/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Avg Confidence</p>
                <p className="text-2xl font-bold text-foreground">{avgConfidence.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground">Verification Reports</CardTitle>
              <p className="text-sm text-muted-foreground">Comprehensive history of all media analysis results</p>
            </div>
            <Button onClick={handleExportReports} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <Label htmlFor="search" className="text-sm font-medium text-foreground">
                Search Files
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by filename..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="min-w-32">
              <Label className="text-sm font-medium text-foreground">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Verdict Filter */}
            <div className="min-w-32">
              <Label className="text-sm font-medium text-foreground">Verdict</Label>
              <Select value={verdictFilter} onValueChange={setVerdictFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="real">Real</SelectItem>
                  <SelectItem value="fake">Fake</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source Filter */}
            <div className="min-w-32">
              <Label className="text-sm font-medium text-foreground">Source</Label>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="upload">Upload</SelectItem>
                  <SelectItem value="stream">Stream</SelectItem>
                  <SelectItem value="browser">Browser</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reports Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Verdict</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Processing</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getFileIcon(report.type)}
                        <div>
                          <p className="font-medium text-foreground">{report.filename}</p>
                          <p className="text-xs text-muted-foreground">{report.fileSize}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {report.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{getVerdictBadge(report.verdict)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{report.confidence}</span>
                        <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              Number.parseInt(report.confidence) >= 90
                                ? "bg-accent"
                                : Number.parseInt(report.confidence) >= 70
                                  ? "bg-chart-5"
                                  : "bg-destructive"
                            }`}
                            style={{ width: report.confidence }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(report.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{report.processingTime}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {report.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedReport(report)} className="gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground">No reports found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Detail Modal */}
      {selectedReport && (
        <Card className="fixed inset-4 z-50 bg-background border shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Report Details</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Filename</Label>
                  <p className="text-sm font-medium text-foreground">{selectedReport.filename}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                  <p className="text-sm font-medium text-foreground">{selectedReport.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Verdict</Label>
                  <div className="mt-1">{getVerdictBadge(selectedReport.verdict)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Confidence Score</Label>
                  <p className="text-sm font-medium text-foreground">{selectedReport.confidence}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Processing Time</Label>
                  <p className="text-sm font-medium text-foreground">{selectedReport.processingTime}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">File Size</Label>
                  <p className="text-sm font-medium text-foreground">{selectedReport.fileSize}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Source</Label>
                  <p className="text-sm font-medium text-foreground">{selectedReport.source}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Analysis Date</Label>
                  <p className="text-sm font-medium text-foreground">
                    {format(new Date(selectedReport.date), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
