"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';

const tabs = ['Profile', 'Security', 'Preferences', 'Appearance', 'Billing', 'Privacy'] as const;
const accents = ['violet', 'blue', 'green', 'amber', 'pink'] as const;

export default function SettingsPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>('Profile');
  const [displayName, setDisplayName] = useState('Ayush Singh');
  const [username, setUsername] = useState('ayush');
  const [email, setEmail] = useState('ayush@example.com');
  const [twoFA, setTwoFA] = useState(true);
  const [language, setLanguage] = useState('English');
  const [accent, setAccent] = useState<(typeof accents)[number]>('violet');

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.24em] text-white/45">Account settings</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Settings</h1>
        <p className="max-w-2xl text-sm text-white/60">Review your profile, security, preferences, appearance, billing, and privacy options.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="rounded-2xl border border-white/8 panel-gradient panel-glass p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${active === tab ? 'bg-violet-500/10 ring-1 ring-violet-400/20' : 'hover:bg-white/[0.03]'}`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.05] text-xs text-white/80">{tab[0]}</span>
                  <span>
                    <span className="block font-medium text-white">{tab}</span>
                    <span className="block text-xs text-white/45">
                      {tab === 'Profile' ? 'Manage your personal info' : tab === 'Security' ? 'Passwords and 2FA' : tab === 'Preferences' ? 'Learning defaults' : tab === 'Appearance' ? 'Visual theme controls' : tab === 'Billing' ? 'Plan and payments' : 'Data and privacy controls'}
                    </span>
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-6 rounded-2xl border border-white/8 panel-gradient panel-glass p-4">
              <div className="text-sm text-white/70">Upgrade to Premium</div>
              <div className="mt-3 text-sm text-white/60">Unlock unlimited courses, exclusive content, and priority support.</div>
              <div className="mt-4">
                <Link href="/pricing" className="inline-block w-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-center text-sm font-medium text-white">
                  Upgrade Now →
                </Link>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/8 panel-gradient panel-glass p-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">A</div>
              <div>
                <div className="text-sm font-medium text-white">Ayush Singh</div>
                <div className="text-xs text-white/60">ayush@example.com</div>
              </div>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-9 space-y-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="rounded-2xl border border-white/8 panel-gradient panel-glass p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-5">
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl font-bold text-white shadow-[0_20px_50px_rgba(139,92,246,0.22)]">A</div>
                  <button className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.04]">Change photo</button>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                      <p className="text-sm text-white/60">Update your personal information and how others see you.</p>
                    </div>
                    <Button variant="primary">Save Changes</Button>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm">
                      <span className="text-white/70">Full Name</span>
                      <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="rounded-xl border border-white/8 bg-transparent px-4 py-3 text-white outline-none placeholder:text-white/35" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm">
                      <span className="text-white/70">Username</span>
                      <input value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-xl border border-white/8 bg-transparent px-4 py-3 text-white outline-none placeholder:text-white/35" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm md:col-span-2">
                      <span className="text-white/70">Email</span>
                      <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-transparent px-4 py-3">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/35" />
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Verified</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 panel-gradient panel-glass p-6">
              <h3 className="text-lg font-semibold text-white">Account Security</h3>
              <p className="mt-1 text-sm text-white/60">Keep your account safe and secure.</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <div>
                    <div className="text-sm text-white">Password</div>
                    <div className="text-xs text-white/50">Last changed: 2026-01-12</div>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <div>
                    <div className="text-sm text-white">Two-Factor Authentication</div>
                    <div className="text-xs text-white/50">Add an extra layer of security to your account.</div>
                  </div>
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} />
                    <span className="text-sm text-white/80">Enabled</span>
                  </label>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <div>
                    <div className="text-sm text-white">Active Sessions</div>
                    <div className="text-xs text-white/50">Manage your active sessions across devices.</div>
                  </div>
                  <Button variant="ghost">Manage</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-white/8 panel-gradient panel-glass p-6">
              <h3 className="text-lg font-semibold text-white">Preferences</h3>
              <p className="mt-1 text-sm text-white/60">Customize your learning experience.</p>

              <div className="mt-6 space-y-4">
                <label className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <div>
                    <div className="text-sm text-white">Language</div>
                    <div className="text-xs text-white/50">Choose your preferred language</div>
                  </div>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-lg border border-white/8 bg-transparent px-3 py-2 text-white outline-none">
                    <option>English</option>
                    <option>Spanish</option>
                  </select>
                </label>

                <label className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <div>
                    <div className="text-sm text-white">Content Type</div>
                    <div className="text-xs text-white/50">Choose what content you prefer</div>
                  </div>
                  <select className="rounded-lg border border-white/8 bg-transparent px-3 py-2 text-white outline-none">
                    <option>All Content</option>
                    <option>Video Only</option>
                  </select>
                </label>

                <label className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <div>
                    <div className="text-sm text-white">Auto-play Videos</div>
                    <div className="text-xs text-white/50">Automatically play next video</div>
                  </div>
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm text-white/80">On</span>
                  </label>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 panel-gradient panel-glass p-6">
              <h3 className="text-lg font-semibold text-white">Appearance</h3>
              <p className="mt-1 text-sm text-white/60">Customize how the platform looks for you.</p>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="text-sm text-white">Theme</div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button className="rounded-full border border-white/8 px-4 py-2 text-sm text-white/80">Light</button>
                    <button className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-white ring-1 ring-violet-400/40">Dark</button>
                    <button className="rounded-full border border-white/8 px-4 py-2 text-sm text-white/80">System</button>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-white">Accent Color</div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {accents.map((item) => (
                      <button
                        key={item}
                        onClick={() => setAccent(item)}
                        className={`h-10 w-10 rounded-full border ${accent === item ? 'border-white ring-2 ring-violet-400/60' : 'border-white/10'} ${item === 'violet' ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500' : item === 'blue' ? 'bg-gradient-to-br from-cyan-400 to-blue-400' : item === 'green' ? 'bg-gradient-to-br from-emerald-400 to-green-500' : item === 'amber' ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-pink-400 to-rose-500'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
            <div className="rounded-2xl border border-white/8 panel-gradient panel-glass p-6">
              <h3 className="text-lg font-semibold text-white">Billing</h3>
              <p className="mt-1 text-sm text-white/60">Manage your subscription and payment methods.</p>

              <div className="mt-6 flex flex-col gap-4 rounded-xl border border-white/6 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm text-white">Current plan</div>
                  <div className="font-medium text-white/80">
                    Pro — valid until <span className="font-semibold text-white">2026-06-30</span>
                  </div>
                  <div className="text-xs text-white/50">Billing interval: Monthly</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/pricing" className="rounded-full border border-white/8 px-3 py-2 text-sm text-white/70 hover:bg-white/[0.03]">
                    Change plan
                  </Link>
                  <Button variant="outline">Manage payment</Button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 panel-gradient panel-glass p-6">
              <h3 className="text-lg font-semibold text-white">Privacy</h3>
              <p className="mt-1 text-sm text-white/60">Privacy & data settings</p>
              <div className="mt-6 flex flex-col gap-3">
                <Button variant="ghost">View privacy settings</Button>
                <Button variant="ghost">Delete account</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
