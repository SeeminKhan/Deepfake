"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mediaResults } from "@/lib/mock-data"
import {
  Upload,
  FileVideo,
  FileImage,
  FileAudio,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  Filter,
} from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  type: string
  size: string
  status: "uploading" | "analyzing" | "completed"
  result?: "Real" | "Fake"
  confidence?: string
}

export function MediaVerification() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)

    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.startsWith("video") ? "video" : file.type.startsWith("image") ? "image" : "audio",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: "uploading",
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Mock upload and analysis process
      setTimeout(() => {
        setUploadedFiles((prev) => prev.map((f) => (f.id === newFile.id ? { ...f, status: "analyzing" } : f)))
      }, 1000)

      setTimeout(() => {
        const mockResult = Math.random() > 0.3 ? "Real" : "Fake"
        const mockConfidence = `${Math.floor(Math.random() * 20 + 80)}%`

        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === newFile.id
              ? {
                  ...f,
                  status: "completed",
                  result: mockResult,
                  confidence: mockConfidence,
                }
              : f,
          ),
        )
      }, 3000)
    })

    setTimeout(() => setIsUploading(false), 1000)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return <FileVideo className="h-4 w-4" />
      case "image":
        return <FileImage className="h-4 w-4" />
      case "audio":
        return <FileAudio className="h-4 w-4" />
      default:
        return <FileImage className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string, result?: string) => {
    switch (status) {
      case "uploading":
      case "analyzing":
        return <Clock className="h-4 w-4 text-chart-5 animate-spin" />
      case "completed":
        return result === "Real" ? (
          <CheckCircle className="h-4 w-4 text-accent" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-destructive" />
        )
      default:
        return null
    }
  }

  const filteredResults = mediaResults.filter((result) =>
    result.filename.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="gradient-mesh space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Upload Media for Verification</CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload videos or images to detect deepfakes and manipulated content
          </p>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <Label htmlFor="file-upload" className="text-lg font-medium text-foreground cursor-pointer">
                Drop files here or click to upload
              </Label>
              <p className="text-sm text-muted-foreground">Supports MP4, AVI, JPG, PNG, WAV, MP3 files up to 100MB</p>
            </div>
            <Input
              id="file-upload"
              type="file"
              multiple
              accept="video/*,image/*,audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              className="mt-4"
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Select Files"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Upload Progress */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Current Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border/50"
                >
                  <div className="flex items-center gap-2">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    {file.status === "uploading" && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Uploading...</p>
                        <Progress value={75} className="h-1" />
                      </div>
                    )}
                    {file.status === "analyzing" && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Analyzing for deepfakes...</p>
                        <Progress value={45} className="h-1" />
                      </div>
                    )}
                    {file.status === "completed" && <p className="text-xs text-muted-foreground">Analysis complete</p>}
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusIcon(file.status, file.result)}
                    {file.status === "completed" && (
                      <div className="text-right">
                        <Badge
                          variant={file.result === "Fake" ? "destructive" : "secondary"}
                          className={file.result === "Real" ? "bg-accent text-accent-foreground" : ""}
                        >
                          {file.result}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{file.confidence}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">Verification History</CardTitle>
              <p className="text-sm text-muted-foreground">Previous media analysis results</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getFileIcon(
                        result.filename.includes(".mp4")
                          ? "video"
                          : result.filename.includes(".wav")
                            ? "audio"
                            : "image",
                      )}
                      <span className="font-medium">{result.filename}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {result.filename.includes(".mp4") ? "Video" : result.filename.includes(".wav") ? "Audio" : "Image"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {result.status === "Real" ? (
                        <CheckCircle className="h-4 w-4 text-accent" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                      <Badge
                        variant={result.status === "Fake" ? "destructive" : "secondary"}
                        className={result.status === "Real" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {result.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{result.confidence}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date().toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
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
