export const stats = [
  { id: 1, label: "Media Verified", value: 128 },
  { id: 2, label: "Deepfakes Detected", value: 14 },
  { id: 3, label: "Links Opened Safely", value: 52 },
]

export const mediaResults = [
  { id: 1, filename: "video1.mp4", status: "Fake", confidence: "92%" },
  { id: 2, filename: "image1.png", status: "Real", confidence: "87%" },
  { id: 3, filename: "audio1.wav", status: "Real", confidence: "94%" },
  { id: 4, filename: "video2.mp4", status: "Fake", confidence: "78%" },
]

export const reports = [
  { id: 1, type: "Video", verdict: "Fake", date: "2025-08-25", filename: "suspicious_video.mp4" },
  { id: 2, type: "Image", verdict: "Real", date: "2025-08-26", filename: "profile_photo.jpg" },
  { id: 3, type: "Audio", verdict: "Fake", date: "2025-08-27", filename: "voice_message.wav" },
  { id: 4, type: "Video", verdict: "Real", date: "2025-08-27", filename: "news_clip.mp4" },
]

export const alerts = [
  { id: 1, message: "Deepfake detected in media stream", severity: "high", timestamp: "2 minutes ago" },
  { id: 2, message: "Suspicious link blocked", severity: "medium", timestamp: "15 minutes ago" },
  { id: 3, message: "Media verification completed", severity: "low", timestamp: "1 hour ago" },
  { id: 4, message: "System scan finished", severity: "low", timestamp: "2 hours ago" },
]
