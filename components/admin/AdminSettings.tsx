import React, { useEffect, useState } from "react"
import {
  Settings,
  Save,
  ShieldAlert,
  Globe,
  CheckCircle2,
} from "lucide-react"
import { User, PlatformSettings } from "../../types"
import { authApi } from "../../lib/api"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { useToast } from "../ui/Toast"

interface AdminSettingsProps {
  currentUser: User
}

export const AdminSettings: React.FC<AdminSettingsProps> = () => {
  const [settings, setSettings] = useState<PlatformSettings>({
    platformName: "CapitalsFargoFX",
    supportEmail: "",
    telegramChannel: "",
    updatedAt: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const { success, info } = useToast()

  useEffect(() => {
    void authApi.adminSettings().then((loaded) => {
      if (loaded) setSettings(loaded as unknown as PlatformSettings)
    }).catch(() => undefined)
  }, [])

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    void authApi
      .saveAdminSettings(settings as unknown as Record<string, unknown>)
      .then((saved) => {
        setSettings(saved as unknown as PlatformSettings)
        success("Settings Saved", "Platform parameters and public display metrics updated.")
      })
      .catch((error) => info("Settings Error", error instanceof Error ? error.message : "Unable to save settings."))
      .finally(() => setIsSaving(false))
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-white">
            <Settings className="h-6 w-6 text-amber-400" />
            Platform & Governance Settings
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Global public metrics, institutional communication channels, and
            environment parameters.
          </p>
        </div>

      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* Public Identity & Contacts */}
        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <Globe className="h-5 w-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">
              Public Brand & Investor Contact Channels
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Platform Name"
              value={settings.platformName}
              onChange={(e) =>
                setSettings({ ...settings, platformName: e.target.value })
              }
              required
            />

            <Input
              label="Support Desk Email"
              value={settings.supportEmail}
              onChange={(e) =>
                setSettings({ ...settings, supportEmail: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Telegram VIP Broadcast Channel"
              value={settings.telegramChannel}
              onChange={(e) =>
                setSettings({ ...settings, telegramChannel: e.target.value })
              }
              required
            />

            <Input
              label="Institutional Address"
              value={settings.companyAddress}
              onChange={(e) =>
                setSettings({ ...settings, companyAddress: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Public Landing Metrics Customizer */}
        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              Landing Page Showcase Metrics
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="Active Investors Display"
              value={settings.statsActiveInvestors}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  statsActiveInvestors: e.target.value,
                })
              }
              required
            />

            <Input
              label="Total Deposits Display"
              value={settings.statsTotalDeposited}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  statsTotalDeposited: e.target.value,
                })
              }
              required
            />

            <Input
              label="Total Paid Out Display"
              value={settings.statsTotalWithdrawn}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  statsTotalWithdrawn: e.target.value,
                })
              }
              required
            />

            <Input
              label="Countries Display"
              value={settings.statsCountriesSupported}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  statsCountriesSupported: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        {/* Operational Guardrails */}
        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Operational Modes
            </h3>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex cursor-pointer items-center gap-2.5 text-xs font-bold text-slate-300">
              <input
                type="checkbox"
                checked={settings.isMaintenanceMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    isMaintenanceMode: e.target.checked,
                  })
                }
                className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
              />
              <span>Platform Maintenance Mode (Suspend New User Deposits)</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSaving}
            leftIcon={<Save className="h-4 w-4" />}
            className="bg-amber-500 font-black text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-600"
          >
            Save All Platform Settings
          </Button>
        </div>
      </form>
    </div>
  )
}
