"use client"

import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { Upload, Trash2, Eye } from "lucide-react"

interface UploadedLogo {
  id: string
  name: string
  url: string
  type: "svg" | "png"
  heightClass: string
  order?: number
}

const HEIGHT_CLASSES = [
  { value: "h-6 sm:h-7", label: "Small (h-6)" },
  { value: "h-7 sm:h-8", label: "Medium (h-7)" },
  { value: "h-8 sm:h-9", label: "Large (h-8)" },
  { value: "h-9 sm:h-10", label: "Extra Large (h-9)" },
]

export default function AdminLogosPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [logos, setLogos] = useState<UploadedLogo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [companyName, setCompanyName] = useState("")
  const [heightClass, setHeightClass] = useState("h-7 sm:h-8")
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getAuthToken = () => {
    return `Bearer ${password}`
  }

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim()) {
      setIsAuthenticated(true)
      fetchLogos()
    }
  }

  const fetchLogos = async () => {
    try {
      const res = await fetch("/api/logos/list")
      const data = await res.json()
      if (data.ok && Array.isArray(data.logos)) {
        setLogos(data.logos)
      }
    } catch (err) {
      console.error("Failed to fetch logos:", err)
      toast.error("Failed to load logos")
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      await uploadLogo(files[0])
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadLogo(e.target.files[0])
    }
  }

  const uploadLogo = async (file: File) => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name")
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("companyName", companyName)
      formData.append("heightClass", heightClass)

      const res = await fetch("/api/admin/logos/upload", {
        method: "POST",
        headers: {
          Authorization: getAuthToken(),
        },
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Failed to upload logo")
        return
      }

      toast.success(`Logo uploaded: ${companyName}`)
      setCompanyName("")
      setHeightClass("h-7 sm:h-8")

      // Refetch logos
      await fetchLogos()

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (err) {
      console.error("Upload error:", err)
      toast.error("Upload failed")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteLogo = async (logoId: string, logoName: string) => {
    if (!confirm(`Delete logo for ${logoName}?`)) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/logos/delete?id=${logoId}`, {
        method: "DELETE",
        headers: {
          Authorization: getAuthToken(),
        },
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Failed to delete logo")
        return
      }

      toast.success(`Logo deleted: ${logoName}`)
      await fetchLogos()
    } catch (err) {
      console.error("Delete error:", err)
      toast.error("Delete failed")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-soft-peach/30 to-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-electric-blue/20 bg-white p-8 shadow-lg shadow-electric-blue/10 backdrop-blur">
            <h1 className="text-2xl font-bold text-ink mb-2">Admin Panel</h1>
            <p className="text-ink-60 mb-6">Client Logo Management</p>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-ink-60">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-2 w-full rounded-lg border border-ink-08 bg-white px-4 py-2.5 text-ink placeholder-ink-40 focus:border-electric-blue/50 focus:outline-none focus:ring-2 focus:ring-electric-blue/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-electric-blue to-vibrant-purple px-4 py-2.5 font-medium text-white transition-all hover:shadow-lg hover:shadow-electric-blue/30 glow-electric"
              >
                Authenticate
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-soft-peach/30 to-background p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink">Client Logo Management</h1>
          <p className="text-ink-60 mt-2">Upload and manage official company logos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-electric-blue/20 bg-white p-6 shadow-lg shadow-electric-blue/10">
              <h2 className="text-lg font-semibold text-ink mb-4">Upload Logo</h2>

              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <label className="text-sm font-medium text-ink-60">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Acme Corp"
                    className="mt-2 w-full rounded-lg border border-ink-08 bg-white px-4 py-2.5 text-ink placeholder-ink-40 focus:border-electric-blue/50 focus:outline-none focus:ring-2 focus:ring-electric-blue/20"
                  />
                </div>

                {/* Height Class */}
                <div>
                  <label className="text-sm font-medium text-ink-60">
                    Display Size
                  </label>
                  <select
                    value={heightClass}
                    onChange={(e) => setHeightClass(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-ink-08 bg-white px-4 py-2.5 text-ink focus:border-electric-blue/50 focus:outline-none focus:ring-2 focus:ring-electric-blue/20"
                  >
                    {HEIGHT_CLASSES.map((hc) => (
                      <option key={hc.value} value={hc.value}>
                        {hc.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Drop Area */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`rounded-lg border-2 border-dashed p-6 text-center transition-all ${
                    dragActive
                      ? "border-electric-blue/60 bg-electric-blue/5"
                      : "border-ink-08 hover:border-electric-blue/40"
                  }`}
                >
                  <Upload className="size-6 mx-auto text-ink-60 mb-2" />
                  <p className="text-sm text-ink-60 mb-2">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-ink-40">SVG or PNG, max 2MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".svg,.png,image/svg+xml,image/png"
                    onChange={handleFileChange}
                    disabled={isLoading}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="mt-3 rounded-lg bg-electric-blue/10 px-4 py-2 text-sm font-medium text-electric-blue hover:bg-electric-blue/20 disabled:opacity-50"
                  >
                    {isLoading ? "Uploading..." : "Select File"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Logos Grid */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-electric-blue/20 bg-white p-6 shadow-lg shadow-electric-blue/10">
              <h2 className="text-lg font-semibold text-ink mb-4">
                Uploaded Logos ({logos.length})
              </h2>

              {logos.length === 0 ? (
                <div className="text-center py-12">
                  <Eye className="size-12 text-ink-40 mx-auto mb-3 opacity-50" />
                  <p className="text-ink-60">No logos uploaded yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {logos.map((logo) => (
                    <div
                      key={logo.id}
                      className="rounded-lg border border-ink-08 p-4 hover:border-electric-blue/40 hover:bg-electric-blue/5 transition-all"
                    >
                      {/* Logo Preview */}
                      <div className="mb-3 flex h-20 items-center justify-center bg-cream rounded-md overflow-hidden">
                        <img
                          src={logo.url}
                          alt={logo.name}
                          className={logo.heightClass}
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </div>

                      {/* Logo Info */}
                      <p className="text-sm font-medium text-ink truncate">
                        {logo.name}
                      </p>
                      <p className="text-xs text-ink-60 mt-1">
                        {logo.type.toUpperCase()} • {logo.heightClass}
                      </p>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteLogo(logo.id, logo.name)}
                        disabled={isLoading}
                        className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 transition-all"
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
