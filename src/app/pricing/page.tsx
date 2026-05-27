"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: '$0',
    priceAnnual: '$0',
    validity: 'Always',
    features: ['Access to community', '3 courses', 'Basic progress tracking']
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: '$9',
    priceAnnual: '$90',
    validity: 'Billed monthly or annually',
    features: ['Unlimited courses', 'Priority support', 'Team sharing', 'Advanced analytics']
  },
  {
    id: 'team',
    name: 'Team',
    priceMonthly: '$29',
    priceAnnual: '$290',
    validity: 'Billed monthly or annually',
    features: ['Everything in Pro', 'Team seats', 'SSO & admin controls']
  }
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="inline-block rounded-full bg-white/6 px-3 py-1 text-xs text-white/80">PLANS & PRICING</p>
          <h1 className="mt-4 text-4xl font-extrabold text-white">Choose the <span className="text-violet-400">perfect</span> plan for you</h1>
          <p className="mt-2 text-white/70">Upgrade your learning experience with advanced features and unlimited access.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-full bg-white/6 p-1">
            <button onClick={() => setAnnual(false)} className={`px-3 py-1 rounded-full text-sm ${!annual ? 'bg-black/30 text-white' : 'text-white/70'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-3 py-1 rounded-full text-sm ${annual ? 'bg-black/30 text-white' : 'text-white/70'}`}>Yearly <span className="ml-2 inline-block rounded-full bg-rose-500 px-2 py-0.5 text-xs">Save 20%</span></button>
          </div>
        </div>
      </div>

      <section className="grid gap-6 sm:grid-cols-3 pricing-grid-mobile">
        {/* Left - Free */}
        <div className="rounded-2xl border border-white/8 panel-gradient panel-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Free</h3>
              <p className="text-sm text-white/60">Get started with basic access</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{annual ? '$0' : '$0'}</div>
              <div className="text-xs text-white/60">/month</div>
            </div>
          </div>

          <div className="mt-6 rounded-md border border-white/6 p-4 text-center text-sm text-white/60">Current Plan</div>

          <ul className="mt-6 space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-400" /> Access to free courses</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-400" /> Basic learning materials</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-400" /> Community support</li>
            <li className="flex items-center gap-3 text-white/40">Certificates</li>
          </ul>
        </div>

        {/* Center - Premium */}
        <div className="relative rounded-2xl border border-violet-400/40 panel-gradient panel-glass p-8 shadow-[0_20px_60px_rgba(124,58,237,0.12)] premium-glow">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-white">MOST POPULAR</div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Premium</h2>
              <p className="text-sm text-white/60">Unlock unlimited learning</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-extrabold text-white">{annual ? '$90' : '$9'}</div>
              <div className="text-sm text-white/60">{annual ? '$90/yr' : '$9/mo'}</div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={async () => {
                try {
                  (window as any).__pricingLoading = true;
                } catch {}
                const res = await fetch('/api/checkout/subscribe', {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({ plan: 'premium', interval: annual ? 'annual' : 'monthly' })
                });
                const json = await res.json();
                if (json?.success) {
                  alert('Subscription started — check your email or the console for next steps (demo)');
                } else {
                  alert('Failed to start subscription: ' + (json?.error || 'unknown'));
                }
                try {
                  (window as any).__pricingLoading = false;
                } catch {}
              }}
              className="pricing-cta w-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 text-sm text-white"
            >
              Upgrade to Premium
            </button>
          </div>

          <ul className="mt-6 grid gap-3 text-sm text-white/80">
            {['Unlimited access to all courses', 'Downloadable resources', 'Certificates of completion', 'Priority support', 'Exclusive content & workshops', 'Early access to new courses'].map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20 text-white"><Check className="h-3 w-3 text-violet-300" /></span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Pro */}
        <div className="rounded-2xl border border-white/8 panel-gradient panel-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Pro</h3>
              <p className="text-sm text-white/60">For professionals & teams</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{annual ? '$290' : '$29'}</div>
              <div className="text-xs text-white/60">/month</div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={async () => {
                const res = await fetch('/api/checkout/subscribe', {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({ plan: 'pro', interval: annual ? 'annual' : 'monthly' })
                });
                const json = await res.json();
                if (json?.success) alert('Pro subscription started (demo)');
                else alert('Failed: ' + (json?.error || 'unknown'));
              }}
              className="w-full rounded-full border border-white/8 px-3 py-2 text-sm text-white/80 hover:bg-white/[0.02]"
            >
              Upgrade to Pro
            </button>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-400" /> Everything in Premium</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-400" /> Team access</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-400" /> Advanced analytics</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/8 panel-gradient panel-glass p-6">
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-white/6 grid place-items-center">🔒</div>
            <div>
              <div className="text-sm font-medium text-white">Secure Payments</div>
              <div className="text-xs text-white/60">SSL encrypted</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-white/6 grid place-items-center">⏱️</div>
            <div>
              <div className="text-sm font-medium text-white">Cancel Anytime</div>
              <div className="text-xs text-white/60">No hidden charges</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-white/6 grid place-items-center">📜</div>
            <div>
              <div className="text-sm font-medium text-white">Certified Courses</div>
              <div className="text-xs text-white/60">Industry recognized</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-white/6 grid place-items-center">🎧</div>
            <div>
              <div className="text-sm font-medium text-white">24/7 Support</div>
              <div className="text-xs text-white/60">We&apos;re here to help</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
