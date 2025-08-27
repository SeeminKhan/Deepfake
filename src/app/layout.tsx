import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "DeepGuard - Deepfake Detection Dashboard",
  description: "Professional deepfake detection and media verification platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`{ fontFamily: 'Inter, sans-serif' }`}>{children}</body>
    </html>
  )
}
