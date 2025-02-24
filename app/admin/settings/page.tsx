"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FeatureFlags {
  enableSale: boolean
  showOutOfStock: boolean
  enableMarquee: boolean
}

interface SiteSettings {
  siteName: string
  contactEmail: string
  phoneNumber: string
  address: string
  freeDeliveryThreshold: number
}

interface HomepageSettings {
  bannerImage: string
  bannerText: string
  marqueeText: string[]
}

interface Announcement {
  message: string
  active: boolean
  expiresAt?: string
}

interface AdminSettings {
  featureFlags: FeatureFlags
  siteSettings: SiteSettings
  homepageSettings: HomepageSettings
  announcements: Announcement[]
}

const defaultSettings: AdminSettings = {
  featureFlags: {
    enableSale: false,
    showOutOfStock: true,
    enableMarquee: true,
  },
  siteSettings: {
    siteName: "My E-Commerce Store",
    contactEmail: "support@store.com",
    phoneNumber: "+1-234-567-890",
    address: "123 Main Street, City, Country",
    freeDeliveryThreshold: 1000,
  },
  homepageSettings: {
    bannerImage: "",
    bannerText: "",
    marqueeText: [],
  },
  announcements: [],
}

export default function AdminSettingsForm() {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings")
        const data = await res.json()
        setSettings(data.settings || defaultSettings)
      } catch (error) {
        console.error("Error fetching settings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleImageUpload = (result: any) => {
    const uploadedImageUrl = result?.info?.secure_url
    if (uploadedImageUrl) {
      setSettings((prev) => ({
        ...prev,
        homepageSettings: {
          ...prev.homepageSettings,
          bannerImage: uploadedImageUrl,
        },
      }))
    }
  }

  const handleFeatureFlagChange = (flag: keyof FeatureFlags) => {
    setSettings((prev) => ({
      ...prev,
      featureFlags: {
        ...prev.featureFlags,
        [flag]: !prev.featureFlags[flag],
      },
    }))
  }

  const handleSiteSettingsChange = (field: keyof SiteSettings, value: string | number) => {
    setSettings((prev) => ({
      ...prev,
      siteSettings: {
        ...prev.siteSettings,
        [field]: value,
      },
    }))
  }

  const handleHomepageSettingsChange = (field: keyof HomepageSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      homepageSettings: {
        ...prev.homepageSettings,
        [field]: value,
      },
    }))
  }

  const handleAddMarqueeText = () => {
    setSettings((prev) => ({
      ...prev,
      homepageSettings: {
        ...prev.homepageSettings,
        marqueeText: [...prev.homepageSettings.marqueeText, ""],
      },
    }));
  };

  const handleRemoveMarqueeText = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      homepageSettings: {
        ...prev.homepageSettings,
        marqueeText: prev.homepageSettings.marqueeText.filter((_, i) => i !== index),
      },
    }));
  };


  const handleAddAnnouncement = () => {
    setSettings((prev) => ({
      ...prev,
      announcements: [
        ...prev.announcements,
        {
          message: "",
          active: true,
          expiresAt: new Date().toISOString().split("T")[0],
        },
      ],
    }))
  }

  const handleAnnouncementChange = (index: number, field: keyof Announcement, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      announcements: prev.announcements.map((announcement, i) =>
        i === index ? { ...announcement, [field]: value } : announcement,
      ),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (!response.ok) throw new Error("Failed to update settings")

      alert("Settings updated successfully!")
    } catch (error) {
      console.error("Error updating settings:", error)
      alert("Failed to update settings")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature Flags Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Feature Flags</h2>
          <div className="space-y-4">
            {[
              { id: "enableSale", label: "Enable Sale" },
              { id: "showOutOfStock", label: "Show Out of Stock Items" },
              { id: "enableMarquee", label: "Enable Marquee" },
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center justify-between">
                <Label htmlFor={id}>{label}</Label>
                <Switch
                  id={id}
                  checked={settings.featureFlags[id as keyof FeatureFlags]}
                  onCheckedChange={() => handleFeatureFlagChange(id as keyof FeatureFlags)}
                />

              </div>
            ))}
          </div>
        </Card>

        {/* Site Settings Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Site Settings</h2>
          <div className="space-y-4">
            {[
              { id: "siteName", label: "Site Name", type: "text" },
              { id: "contactEmail", label: "Contact Email", type: "email" },
              { id: "phoneNumber", label: "Phone Number", type: "text" },
              { id: "address", label: "Address", type: "text" },
              { id: "freeDeliveryThreshold", label: "Free Delivery Threshold", type: "number" },
            ].map(({ id, label, type }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  type={type}
                  value={settings.siteSettings[id as keyof SiteSettings]}
                  onChange={(e) =>
                    handleSiteSettingsChange(
                      id as keyof SiteSettings,
                      type === "number" ? Number(e.target.value) : e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Homepage Settings Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Homepage Settings</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Banner Image</Label>
              {settings.homepageSettings.bannerImage && (
                <div className="relative w-full h-[200px] mb-4">
                  <Image
                    src={settings.homepageSettings.bannerImage || "/placeholder.svg"}
                    alt="Banner"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <CldUploadButton
                onSuccess={handleImageUpload}
                uploadPreset="mmmgkp-news"
                className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors"
              />
            </div>

            {/* Marquee Text List */}
            <div className="space-y-2">
              <Label>Marquee Text</Label>
              {settings.homepageSettings.marqueeText.map((text, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={text}
                    onChange={(e) => {
                      const newMarqueeText = [...settings.homepageSettings.marqueeText];
                      newMarqueeText[index] = e.target.value;
                      setSettings((prev) => ({
                        ...prev,
                        homepageSettings: {
                          ...prev.homepageSettings,
                          marqueeText: newMarqueeText,
                        },
                      }));
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveMarqueeText(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddMarqueeText}>
                Add Marquee Text
              </Button>
            </div>

            {[
              { id: "bannerText", label: "Banner Text" },
            ].map(({ id, label }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  value={settings.homepageSettings[id as keyof HomepageSettings]}
                  onChange={(e) =>
                    handleHomepageSettingsChange(id as keyof HomepageSettings, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Announcements Section */}
        {/* <Card className="p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Announcements</h2>
            <Button type="button" onClick={handleAddAnnouncement}>
              Add Announcement
            </Button>
          </div>
          <div className="space-y-4">
            {settings.announcements.map((announcement, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-md">
                <div className="space-y-2">
                  <Label htmlFor={`announcement-${index}`}>Message</Label>
                  <Input
                    id={`announcement-${index}`}
                    value={announcement.message}
                    onChange={(e) => handleAnnouncementChange(index, "message", e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`announcement-active-${index}`}>Active</Label>
                  <Switch
                    id={`announcement-active-${index}`}
                    checked={announcement.active}
                    onCheckedChange={(checked) => handleAnnouncementChange(index, "active", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`announcement-expires-${index}`}>Expires At</Label>
                  <Input
                    id={`announcement-expires-${index}`}
                    type="date"
                    value={announcement.expiresAt?.split("T")[0]}
                    onChange={(e) => handleAnnouncementChange(index, "expiresAt", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card> */}
      </div >

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form >
  )
}
