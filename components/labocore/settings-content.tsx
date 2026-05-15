'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Shield,
  Palette,
  Building2,
  Key,
  Mail,
  Phone,
  Save,
  FlaskConical,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/labocore/page-header'
import { useAuth } from '@/contexts/auth-context'
import { toast } from 'sonner'

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}

export function SettingsContent() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()

  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    lowStock: true,
    sampleReceived: true,
    qcResults: true,
    reportReady: false,
    weeklyDigest: true,
    emailNotifications: true,
    smsAlerts: false,
  })

  const [profile, setProfile] = useState({
    name: user?.name || 'Dr. Sarah Chen',
    email: user?.email || 'admin@labocore.com',
    phone: '+1 (555) 234-5678',
    department: user?.department || 'Clinical Chemistry',
    role: user?.role || 'admin',
    title: 'Laboratory Director',
  })

  const [lab, setLab] = useState({
    name: 'Central Diagnostic Laboratory',
    accreditation: 'CAP-Accredited',
    address: '100 Medical Center Drive, Suite 400',
    city: 'San Francisco, CA 94143',
    timezone: 'America/Los_Angeles',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
  })

  const handleSaveProfile = () => {
    toast.success('Profile updated', {
      description: 'Your profile information has been saved.',
    })
  }

  const handleSaveLab = () => {
    toast.success('Laboratory settings saved', {
      description: 'Laboratory configuration has been updated.',
    })
  }

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved')
  }

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Settings"
        description="Manage your profile, laboratory configuration, and preferences"
      />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/50 flex-wrap h-auto gap-1">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="laboratory" className="gap-2">
            <Building2 className="h-4 w-4" />
            Laboratory
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div {...fadeIn} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{profile.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{profile.role} &middot; {profile.department}</p>
                    <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={e => setProfile(p => ({ ...p, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-9"
                        value={profile.email}
                        onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-9"
                        value={profile.phone}
                        onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={profile.department}
                      onValueChange={v => setProfile(p => ({ ...p, department: v }))}
                    >
                      <SelectTrigger id="department">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Clinical Chemistry">Clinical Chemistry</SelectItem>
                        <SelectItem value="Hematology">Hematology</SelectItem>
                        <SelectItem value="Microbiology">Microbiology</SelectItem>
                        <SelectItem value="Molecular Biology">Molecular Biology</SelectItem>
                        <SelectItem value="Urinalysis">Urinalysis</SelectItem>
                        <SelectItem value="Immunology">Immunology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted/30">
                      <Badge variant="secondary" className="capitalize">{profile.role}</Badge>
                      <span className="ml-2 text-sm text-muted-foreground">Contact admin to change</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Laboratory Tab */}
        <TabsContent value="laboratory">
          <motion.div {...fadeIn} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Laboratory Configuration</CardTitle>
                <CardDescription>
                  Manage your laboratory&apos;s identity and operational settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <FlaskConical className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">{lab.name}</p>
                    <p className="text-sm text-muted-foreground">{lab.accreditation}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="labName">Laboratory Name</Label>
                    <Input
                      id="labName"
                      value={lab.name}
                      onChange={e => setLab(l => ({ ...l, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accreditation">Accreditation</Label>
                    <Select
                      value={lab.accreditation}
                      onValueChange={v => setLab(l => ({ ...l, accreditation: v }))}
                    >
                      <SelectTrigger id="accreditation">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CAP-Accredited">CAP-Accredited</SelectItem>
                        <SelectItem value="ISO 15189">ISO 15189</SelectItem>
                        <SelectItem value="CLIA-Certified">CLIA-Certified</SelectItem>
                        <SelectItem value="JCI-Accredited">JCI-Accredited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={lab.timezone}
                      onValueChange={v => setLab(l => ({ ...l, timezone: v }))}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="Europe/London">GMT / UTC</SelectItem>
                        <SelectItem value="Europe/Paris">Central European (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={lab.dateFormat}
                      onValueChange={v => setLab(l => ({ ...l, dateFormat: v }))}
                    >
                      <SelectTrigger id="dateFormat">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Interface Language</Label>
                    <Select
                      value={lab.language}
                      onValueChange={v => setLab(l => ({ ...l, language: v }))}
                    >
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveLab} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Laboratory Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div {...fadeIn} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
                <CardDescription>
                  Configure which events trigger notifications and how you receive them.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Lab Operations</p>
                  {[
                    { key: 'criticalAlerts', label: 'Critical Result Alerts', desc: 'Immediate notification for critical or panic values' },
                    { key: 'lowStock', label: 'Low Reagent Stock', desc: 'Alert when inventory falls below minimum threshold' },
                    { key: 'sampleReceived', label: 'Sample Intake Events', desc: 'Notification when new samples are logged in the system' },
                    { key: 'qcResults', label: 'QC Failures', desc: 'Alert when quality control checks fall outside acceptable limits' },
                    { key: 'reportReady', label: 'Report Ready', desc: 'Notify when a generated report is available for review' },
                  ].map(item => (
                    <div key={item.key} className="flex items-start justify-between gap-4 py-3 border-b border-border/50 last:border-0">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={val =>
                          setNotifications(n => ({ ...n, [item.key]: val }))
                        }
                      />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Delivery Channels</p>
                  {[
                    { key: 'weeklyDigest', label: 'Weekly Performance Digest', desc: 'Summary email every Monday morning' },
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive alerts via email' },
                    { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive critical alerts via SMS (requires phone number)' },
                  ].map(item => (
                    <div key={item.key} className="flex items-start justify-between gap-4 py-3 border-b border-border/50 last:border-0">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={val =>
                          setNotifications(n => ({ ...n, [item.key]: val }))
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <motion.div {...fadeIn} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the visual theme of your LABOCORE interface.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Color Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['light', 'dark', 'system'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-all hover:border-primary/50 ${
                          theme === t ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <div className={`h-12 w-full rounded-lg ${
                          t === 'light' ? 'bg-white border border-slate-200' :
                          t === 'dark' ? 'bg-slate-900 border border-slate-700' :
                          'bg-gradient-to-r from-white to-slate-900 border border-slate-200'
                        }`} />
                        <span className="capitalize">{t}</span>
                        {theme === t && (
                          <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Display Density</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['compact', 'default', 'comfortable'] as const).map(d => (
                      <button
                        key={d}
                        className="flex flex-col items-center gap-2 rounded-xl border-2 border-border p-4 text-sm font-medium transition-all hover:border-primary/50 first:border-primary first:bg-primary/5"
                      >
                        <div className="w-full space-y-1">
                          {[...Array(d === 'compact' ? 4 : d === 'default' ? 3 : 2)].map((_, i) => (
                            <div key={i} className="h-1.5 rounded bg-muted-foreground/30 w-full" />
                          ))}
                        </div>
                        <span className="capitalize">{d}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div {...fadeIn} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Authentication</CardTitle>
                <CardDescription>
                  Manage your account security and access credentials.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-pw">Current Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="current-pw" type="password" className="pl-9" placeholder="••••••••" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-pw">New Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="new-pw" type="password" className="pl-9" placeholder="Min. 8 characters" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-pw">Confirm New Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="confirm-pw" type="password" className="pl-9" placeholder="Repeat new password" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => toast.success('Password updated successfully')}
                    className="gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Devices currently signed in to your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { device: 'MacBook Pro — Chrome', location: 'San Francisco, CA', time: 'Active now', current: true },
                  { device: 'iPhone 15 — Safari', location: 'San Francisco, CA', time: '2 hours ago', current: false },
                  { device: 'Windows PC — Firefox', location: 'Oakland, CA', time: 'Yesterday', current: false },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <p className="text-sm font-medium flex items-center gap-2">
                        {session.device}
                        {session.current && (
                          <Badge variant="secondary" className="text-xs bg-success/10 text-success border-success/20">Current</Badge>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{session.location} &middot; {session.time}</p>
                    </div>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive h-7 text-xs"
                        onClick={() => toast.success('Session revoked')}
                      >
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
