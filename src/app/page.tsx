'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Target, Mail, BarChart3, Shield, DollarSign, Check, Users, TrendingUp, Zap, Calendar, Search, Phone } from 'lucide-react'
import CounterAnimation from '@/components/CounterAnimation'
import FlippingText from '@/components/FlippingText'
import ScrollAnimation from '@/components/ScrollAnimation'
import WorldMapImage from '@/components/World Map.png'

export default function Home() {
  const [sdrPlan, setSdrPlan] = useState<'3' | '5'>('5')

  return (
    <div className="bg-ivory-silk">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-ivory-silk to-muted-jade/10 overflow-hidden">
        <div className="absolute inset-0 bg-luxury-pattern opacity-30"></div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 md:py-8 flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left — Hero Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="animate-fade-in">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-onyx-black leading-tight">
                  Your End-to-End{' '}
                  <FlippingText
                    words={['Sales Team', 'Revenue Engine', 'Growth Partner', 'Pipeline Machine']}
                    className="text-golden-opal"
                  />
                </h1>
              </div>

              <div className="animate-fade-in-delay">
                <p className="text-xl text-muted-jade leading-relaxed max-w-2xl mb-4">
                  Revenue-driven sales teams deployed in 30 days. We take quarterly revenue targets — not just meeting quotas.
                </p>
                <div className="flex flex-col gap-2 mb-4">
                  {[
                    '30-day setup, FREE',
                    'Pro-rated refund on missed targets',
                    '7-person specialist team included',
                  ].map((item) => (
                    <span key={item} className="inline-flex items-center text-sm text-muted-jade">
                      <svg className="w-4 h-4 text-golden-opal mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Single CTA */}
              <div className="animate-fade-in-delay">
                <Link
                  href="https://calendly.com/millioncxo/loe-20x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'conversion', { send_to: 'AW-17718087441' })
                    }
                  }}
                >
                  <span>Book a Free Demo</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-4 animate-fade-in-delay">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
                      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
                      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
                    ].map((avatar, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-ivory-silk overflow-hidden shadow-lg relative">
                        <Image src={avatar} alt={`Client ${i + 1}`} fill className="object-cover" unoptimized />
                      </div>
                    ))}
                  </div>
                  <span className="ml-3 text-muted-jade font-medium text-sm sm:text-base">27+ Happy Clients</span>
                </div>
                <div className="flex items-center">
                  <div className="text-golden-opal text-lg sm:text-xl">★★★★★</div>
                  <span className="ml-2 sm:ml-3 text-muted-jade font-medium text-sm sm:text-base">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right — World Map */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-golden-opal/20">
                <div className="relative w-full h-[350px] lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-ivory-silk to-muted-jade/20">
                  <Image src={WorldMapImage} alt="Global reach" fill className="object-cover object-center" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx-black/20 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 bg-ivory-silk/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-golden-opal/20">
                    <div className="text-onyx-black font-bold text-lg"><CounterAnimation end={13} suffix="+" /></div>
                    <div className="text-muted-jade text-sm font-medium">Countries</div>
                  </div>

                  <div className="absolute top-4 right-4 bg-ivory-silk/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-golden-opal/20">
                    <div className="text-onyx-black font-bold text-lg"><CounterAnimation end={28} suffix="+" /></div>
                    <div className="text-muted-jade text-sm font-medium">Clients</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-golden-opal/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-muted-jade/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────── */}
      <section className="py-16 bg-imperial-emerald">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            {[
              { end: 200, suffix: '+', label: 'Qualified Meetings Generated' },
              { end: 28,  suffix: '+', label: 'Clients' },
              { end: 30,  suffix: '',  label: 'Days to First Meeting' },
            ].map(({ end, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-golden-opal mb-2">
                  <CounterAnimation end={end} suffix={suffix} />
                </div>
                <div className="text-ivory-silk font-medium text-sm lg:text-base">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDR AS A SERVICE ─────────────────────────────────────────── */}
      <section id="sdr-section" className="py-20 bg-petrol-smoke">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-ivory-silk mb-4">
              SDR as a <span className="text-golden-opal">Service</span>
            </h2>
            <p className="text-lg text-muted-jade italic max-w-2xl mx-auto">
              We have the best sales engine — our pro-rated refund commitment proves it.
            </p>
          </div>

          {/* 3 Key Metrics */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                value: '$150K',
                label: 'Revenue Target per SDR/Quarter',
                desc: 'We commit to quarterly revenue goals, not just activity numbers.',
                icon: <DollarSign className="w-8 h-8 text-golden-opal" />,
              },
              {
                value: 'Pro-Rated',
                label: 'Refund on Missed Targets',
                desc: 'Tiered guarantee: from 1 free month to 50% cash refund if we miss targets.',
                icon: <Shield className="w-8 h-8 text-golden-opal" />,
              },
              {
                value: '7-Person',
                label: 'Dedicated Specialist Team',
                desc: 'AE, Junior AE, Data Researcher, LinkedIn Specialist, 3 Cold Callers — all included.',
                icon: <Users className="w-8 h-8 text-golden-opal" />,
              },
            ].map((item, idx) => (
              <ScrollAnimation key={idx} delay={idx * 100}>
                <div className="card-glass text-center group">
                  <div className="w-16 h-16 bg-golden-opal/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-golden-opal/30 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-golden-opal mb-3">{item.value}</h3>
                  <p className="text-ivory-silk text-lg font-semibold mb-2">{item.label}</p>
                  <p className="text-muted-jade text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Team Roles */}
          <ScrollAnimation>
            <div className="bg-gradient-to-br from-ivory-silk/15 to-ivory-silk/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-golden-opal/30 shadow-xl">
              <h3 className="text-2xl font-bold text-ivory-silk mb-8 text-center">What&apos;s Included in Your Team</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Main Account Executive',       text: 'Sales leadership, presentations, and pitch delivery.',                           icon: Users },
                  { title: 'Data Researcher',              text: 'Precise targeting, ICP profiling, and data quality management.',                  icon: Search },
                  { title: 'LinkedIn Lead Gen Specialist', text: '800 InMails per Sales Navigator account per month.',                              icon: Mail },
                  { title: 'Cold Callers (×3)',            text: 'Phone qualification, follow-up, and pipeline nurturing.',                         icon: Phone },
                  { title: 'Full Tech Stack Included',     text: 'LinkedIn Navigator, dialer, email warm-up, CRM, analytics — zero extra cost.',    icon: Zap },
                  { title: 'Performance Guarantee',        text: 'Tiered refund if Q1 targets are missed. Your risk is protected.',                 icon: Shield },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-golden-opal/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-golden-opal/30 transition-colors">
                        <Icon className="w-6 h-6 text-golden-opal" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-ivory-silk font-bold text-lg mb-1 group-hover:text-golden-opal transition-colors">{f.title}</h4>
                        <p className="text-muted-jade text-sm leading-relaxed">{f.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-ivory-silk">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold text-onyx-black mb-4">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-2xl mx-auto">
              30-day setup is FREE. No hidden fees. Billed quarterly.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ScrollAnimation>
              <div className="bg-white rounded-2xl shadow-luxury border border-golden-opal/20 p-8 sm:p-10 flex flex-col">

                <h3 className="text-2xl font-bold text-onyx-black mb-1">Choose Your Team Size</h3>
                <p className="text-muted-jade text-sm mb-6">Dedicated SDR team · Billed Quarterly · 30-day setup FREE</p>

                {/* Toggle */}
                <div className="flex items-center gap-1 mb-6 bg-ivory-silk rounded-xl p-1 border border-golden-opal/20">
                  <button
                    onClick={() => setSdrPlan('3')}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                      sdrPlan === '3' ? 'bg-white shadow text-onyx-black' : 'text-muted-jade hover:text-onyx-black'
                    }`}
                  >
                    <span className="block font-semibold">3 SDRs</span>
                    <span className="block text-[11px] font-normal text-imperial-emerald">+1 Bench SDR Free</span>
                  </button>
                  <button
                    onClick={() => setSdrPlan('5')}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all relative ${
                      sdrPlan === '5' ? 'bg-white shadow text-onyx-black' : 'text-muted-jade hover:text-onyx-black'
                    }`}
                  >
                    <span className="block font-semibold">5 SDRs</span>
                    <span className="block text-[11px] font-normal text-imperial-emerald">+2 Bench SDRs Free</span>
                    <span className="absolute -top-2.5 -right-1 bg-golden-opal text-onyx-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      SAVE 6%
                    </span>
                  </button>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-bold text-golden-opal">
                    {sdrPlan === '3' ? '$3,199' : '$2,999'}
                  </span>
                  <span className="text-muted-jade font-medium">/ SDR / month</span>
                </div>
                <p className="text-muted-jade text-xs mb-6">
                  {sdrPlan === '3'
                    ? '$9,597 / quarter total · 36 meetings/quarter · Billing starts Day 31'
                    : '$14,995 / quarter total · 60 meetings/quarter · Billing starts Day 31'}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {sdrPlan === '3' ? (
                    <>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />3 dedicated SDRs + 1 Bench SDR</li>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />30-day setup FREE — billing starts Day 31</li>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />12 qualified meetings per SDR in Q1</li>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />Basic tech stack included</li>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />Weekly performance reviews</li>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />Pro-rated refund guarantee</li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />5 dedicated SDRs + 2 Bench SDRs</li>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />Full 7-person specialist team (AE, AE Jr, Researcher, LinkedIn, 3 Callers)</li>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />Full tech stack included</li>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />Priority support & bi-weekly strategy calls</li>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />60 meetings/quarter target</li>
                      <li className="flex items-center gap-3 text-onyx-black text-sm"><Check className="w-4 h-4 text-imperial-emerald flex-shrink-0" />Pro-rated refund + revenue incentive structure</li>
                    </>
                  )}
                </ul>

                <Link
                  href="https://calendly.com/millioncxo/loe-20x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 px-6 rounded-xl bg-imperial-emerald hover:bg-imperial-emerald/90 text-ivory-silk font-semibold text-center transition-colors"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'conversion', { send_to: 'AW-17718087441' })
                    }
                  }}
                >
                  Book a Free Demo
                </Link>

                <p className="text-center text-xs text-muted-jade mt-4">
                  Looking for LinkedIn-only outreach?{' '}
                  <Link href="/linkedin-outreach" className="text-golden-opal hover:underline font-medium">
                    See LinkedIn Outreach Excellence →
                  </Link>
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────── */}
      <section className="py-20 bg-ivory-silk">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-onyx-black mb-4">
              Measurable <span className="text-gradient">Outcomes</span>
            </h2>
            <p className="text-lg text-muted-jade max-w-2xl mx-auto">
              Real results that speak for themselves
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="bg-white rounded-2xl shadow-luxury border border-golden-opal/20 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-imperial-emerald via-petrol-smoke to-imperial-emerald">
                    <th className="px-6 py-5 text-left text-ivory-silk font-bold text-sm">Metric</th>
                    <th className="px-6 py-5 text-center text-golden-opal font-bold text-sm">MillionCXO</th>
                    <th className="px-6 py-5 text-center text-muted-jade/80 font-semibold text-sm">Generic Agency</th>
                    <th className="px-6 py-5 text-center text-muted-jade/80 font-semibold text-sm">In-House Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-golden-opal/10">
                  {[
                    { metric: 'Setup Time',                     values: ['30 Days',       '60–90 Days',   '3–6 Months'] },
                    { metric: 'Cost per SDR / month',           values: ['$2,999',         '$4,000+',      '$8,000–10,000'] },
                    { metric: 'Revenue Target Accountability',  values: ['Yes',            'No',           'No'] },
                    { metric: 'Refund Guarantee',               values: ['Yes (tiered)',   'No',           'No'] },
                    { metric: 'Specialist Team Included',       values: ['Yes (7 roles)',  'No',           'Separate hires'] },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-golden-opal/5 transition-colors">
                      <td className="px-6 py-4 text-onyx-black font-semibold text-sm">{row.metric}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-golden-opal text-sm">{row.values[0]}</span>
                      </td>
                      <td className="px-6 py-4 text-center text-muted-jade text-sm">{row.values[1]}</td>
                      <td className="px-6 py-4 text-center text-muted-jade text-sm">{row.values[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-20 bg-imperial-emerald">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold text-ivory-silk mb-4">
              What Our <span className="text-golden-opal">Clients Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: 'MillionCXO deployed a full SDR team in under 30 days. We hit 18 qualified meetings in Q1 — exceeded every target.', author: 'Sarah Chen', role: 'VP of Sales' },
              { quote: 'Finally, accountability that matches ours. The pro-rated refund guarantee gave us confidence to commit. 10x ROI in 90 days.', author: 'Michael Rodriguez', role: 'Founder' },
              { quote: '200+ qualified meetings in 12 months. $2M+ pipeline attributed. The specialist team model is unlike anything we\'ve seen.', author: 'Jennifer Park', role: 'Chief Revenue Officer' },
            ].map((t, i) => (
              <ScrollAnimation key={i} delay={i * 100}>
                <div className="bg-ivory-silk/10 border border-ivory-silk/20 rounded-2xl p-8 text-center">
                  <svg className="w-8 h-8 text-golden-opal mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-ivory-silk/90 italic mb-6 leading-relaxed">{t.quote}</p>
                  <div className="font-semibold text-golden-opal">{t.author}</div>
                  <div className="text-muted-jade text-sm mt-1">{t.role}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-ivory-silk to-muted-jade/10">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-onyx-black mb-4">
            Ready to Build Your <span className="text-gradient">Revenue Engine?</span>
          </h2>
          <p className="text-xl text-muted-jade mb-10 max-w-xl mx-auto">
            Deploy 3 or 5 dedicated SDRs in 30 days. Zero hiring risk. Pro-rated refund if we miss targets.
          </p>
          <Link
            href="https://calendly.com/millioncxo/loe-20x"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-10 py-4 inline-flex items-center"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'conversion', { send_to: 'AW-17718087441' })
              }
            }}
          >
            Book a Free Demo
          </Link>
        </div>
      </section>

    </div>
  )
}
