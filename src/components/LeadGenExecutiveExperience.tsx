'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Check,
  FileSearch,
  Mail,
  MessagesSquare,
  ShieldCheck,
  Target,
  UserCheck,
} from 'lucide-react'

const calendlyUrl = 'https://calendly.com/millioncxooutreach/30min'

const trackCalendly = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'conversion', { send_to: 'AW-17718087441' })
  }
}

const heroStats = [
  ['5,000', 'InMails/month'],
  ['30', 'emails/day'],
  ['$1,200', 'per month, quarterly'],
]

const heroMotionPhrases = [
  'ICP research',
  'LinkedIn outreach',
  'personalised email',
  'daily reporting',
]

const problems = [
  ['Full sales teams are expensive', '$8K-15K/month before ICP validation.'],
  ['Training takes 3-6 months', 'Hiring and onboarding consumes founder time.'],
  ['Agencies book weak meetings', 'Volume without context, qualification or accountability.'],
  ['Founders end up doing sales', 'Outreach steals focus from running the business.'],
]

const delivery = [
  {
    title: 'LinkedIn Sales Navigator',
    icon: UserCheck,
    items: [
      'Manages up to 10 Sales Navigator licences',
      'Sends 5,000 InMails per month',
      'Researches posts, comments and engagement signals',
      'Personalises messages based on ICP criteria',
      'Conversation history stays auditable in Sales Nav',
    ],
  },
  {
    title: 'Personalised email outreach',
    icon: Mail,
    items: [
      'Sends 30 researched emails every day',
      'Tailors emails to ICP pain points and role triggers',
      'Uses company news and account-level research',
      'Runs intelligent multi-touch follow-ups',
      'Keeps the email log available for review',
    ],
  },
]

const setup = [
  ['01', 'ICP & target account definition', 'Map titles, company size, geography and decision-maker fit before outreach starts.'],
  ['02', 'Infrastructure setup - free month', 'Set up Sales Navigator workflows, email warm-up, sequences and cadences.'],
  ['03', 'Messaging & outreach playbook', 'Craft LinkedIn and email scripts for the ICP before the executive goes live.'],
  ['04', 'Daily reporting & optimisation', 'Daily reporting, weekly reviews and continuous improvements to targeting and cadence.'],
  ['05', 'Scale when ready', 'Move into full SDR as a Service with revenue targets and Account Executive support.'],
]

const kpis = [
  ['5,000', 'InMails/month target'],
  ['30', 'personalised emails/day'],
  ['16', 'meetings/month minimum guarantee'],
  ['~20', 'typical meetings/month with infrastructure'],
]

const pricingPlans = {
  quarterly: {
    eyebrow: 'Best value',
    price: '$1,200/mo',
    detail: 'Billed quarterly at $3,600/quarter',
  },
  monthly: {
    eyebrow: 'Monthly option',
    price: '$1,499/mo',
    detail: 'Billed monthly',
  },
} as const

export default function LeadGenExecutiveExperience() {
  const [billingPlan, setBillingPlan] = useState<keyof typeof pricingPlans>('quarterly')

  return (
    <div className="bg-ivory-silk text-onyx-black">
      <section className="relative min-h-[calc(100vh-3rem)] overflow-hidden bg-[#f2efe7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_26%,rgba(196,183,91,0.22),transparent_26%),linear-gradient(180deg,rgba(247,245,242,0.96),rgba(247,245,242,0.72)_60%,rgba(33,81,78,0.18))]" />
        <div className="absolute left-1/2 top-[55%] hidden h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-golden-opal/25 md:block story-orbit" />
        <div className="absolute left-1/2 top-[55%] hidden h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-muted-jade/25 md:block story-orbit-reverse" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-jade sm:mb-6 sm:text-xs sm:tracking-[0.34em]">
              All-Rounder Lead Gen Executive
            </p>
            <h1 className="text-[2.7rem] font-normal leading-[0.92] tracking-[-0.055em] text-[#214132] min-[390px]:text-[3.15rem] sm:text-6xl lg:text-[5.8rem]">
              Your first sales hire, done right.
            </h1>
            <div className="mt-7 flex max-w-2xl flex-col gap-3 border-y border-[#1f2a1d]/10 py-4 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-jade">
                Built for
              </span>
              <div className="lead-gen-word-reel h-9 overflow-hidden text-2xl font-semibold tracking-[-0.04em] text-[#214132] sm:h-10 sm:text-3xl">
                <div className="lead-gen-word-track">
                  {[...heroMotionPhrases, heroMotionPhrases[0]].map((phrase, index) => (
                    <div key={`${phrase}-${index}`} className="h-9 sm:h-10">
                      {phrase}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#4b5b47] sm:text-lg">
              One trained Lead Gen Executive, fully prepared by MillionCXO, handling LinkedIn and
              email outreach end-to-end from Day 1.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackCalendly}
                className="w-fit rounded-full bg-[#1f2a1d] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a3827] sm:px-7"
              >
                Book a discovery call
              </Link>
              <a href="#pricing" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2d3a2a]">
                See pricing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-6 rounded-full bg-golden-opal/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-[#1f2a1d]/10 bg-ivory-silk/86 p-5 shadow-[0_30px_90px_rgba(33,65,50,0.18)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-imperial-emerald p-5 text-ivory-silk">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ivory-silk/55">
                  <span>Day 1 ready</span>
                  <span>MillionCXO</span>
                </div>
                <div className="mt-8 grid gap-3">
                  {[
                    ['One executive', 'Pre-trained on ICP research and outreach'],
                    ['Two channels', 'LinkedIn Sales Navigator + email'],
                    ['Daily reporting', 'Activity summary sent by end of day'],
                    ['Guaranteed floor', 'Minimum 16 meetings/month'],
                  ].map(([title, detail], index) => (
                    <div key={title} className="sales-flow-row" style={{ animationDelay: `${index * 350}ms` }}>
                      <div className="h-2 w-2 rounded-full bg-golden-opal" />
                      <div>
                        <div className="text-sm font-semibold">{title}</div>
                        <div className="mt-1 text-xs text-ivory-silk/58">{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {heroStats.map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-white/75 p-4">
                    <div className="text-xl font-semibold tracking-[-0.03em] text-[#214132]">{value}</div>
                    <div className="mt-1 text-[11px] leading-4 text-[#4b5b47]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-jade">
              Built for early-stage founders
            </p>
            <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
              Start outreach without hiring, training or managing a sales team.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {problems.map(([title, detail]) => (
              <div key={title} className="rounded-[2rem] border border-[#1f2a1d]/10 bg-white/70 p-7">
                <h3 className="text-2xl font-normal tracking-[-0.03em] text-[#214132]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#4b5b47]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef1e9] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-jade">
              What your executive does
            </p>
            <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
              Research, message, follow up and report across LinkedIn and email.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {delivery.map((group) => {
              const Icon = group.icon
              return (
                <div key={group.title} className="rounded-[2rem] bg-ivory-silk p-7 shadow-luxury sm:p-9">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-imperial-emerald text-golden-opal">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-3xl font-normal tracking-[-0.04em] text-[#214132]">{group.title}</h3>
                  <ul className="mt-6 grid gap-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-[#4b5b47]">
                        <Check className="mt-1 h-4 w-4 flex-none text-golden-opal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-jade">
              Sales engine setup
            </p>
            <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
              MillionCXO sets up the operating layer before the executive goes live.
            </h2>
          </div>

          <div className="grid gap-4">
            {setup.map(([step, title, detail]) => (
              <div key={step} className="grid gap-4 rounded-2xl border border-[#1f2a1d]/10 bg-white/70 p-5 sm:grid-cols-[5rem_1fr]">
                <div className="text-3xl font-semibold tracking-[-0.04em] text-golden-opal">{step}</div>
                <div>
                  <h3 className="text-xl font-normal tracking-[-0.03em] text-[#214132]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4b5b47]">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-imperial-emerald py-24 text-ivory-silk sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-golden-opal">
              KPIs & accountability
            </p>
            <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
              The minimum meeting floor is guaranteed.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ivory-silk/72">
              If MillionCXO falls short of 16 conducted meetings in a month, a pro-rata refund is
              applied with 10 Sales Navigator licences.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {kpis.map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-ivory-silk/10 bg-ivory-silk/[0.06] p-5">
                <div className="text-5xl font-semibold tracking-[-0.05em] text-golden-opal">{value}</div>
                <div className="mt-2 text-sm leading-5 text-ivory-silk/70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#eef1e9] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-jade">
              Pricing & what is included
            </p>
            <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
              One trained executive, first month setup included.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2rem] bg-ivory-silk p-7 shadow-luxury sm:p-9">
              <div className="mb-5 grid grid-cols-2 rounded-full bg-[#eef1e9] p-1">
                {(['quarterly', 'monthly'] as const).map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setBillingPlan(plan)}
                    aria-pressed={billingPlan === plan}
                    className={`rounded-full px-4 py-3 text-sm font-semibold transition-all ${
                      billingPlan === plan
                        ? 'bg-imperial-emerald text-ivory-silk shadow-sm'
                        : 'text-[#4b5b47] hover:text-[#214132]'
                    }`}
                  >
                    {plan === 'quarterly' ? 'Quarterly' : 'Monthly'}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl bg-imperial-emerald p-6 text-ivory-silk transition-all duration-300">
                <div className="text-sm font-semibold text-golden-opal">{pricingPlans[billingPlan].eyebrow}</div>
                <div className="mt-4 text-5xl font-semibold tracking-[-0.05em]">{pricingPlans[billingPlan].price}</div>
                <div className="mt-2 text-sm text-ivory-silk/70">{pricingPlans[billingPlan].detail}</div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#1f2a1d]/10 bg-white/70 p-5 text-sm leading-6 text-[#4b5b47]">
                First month setup is included before the executive goes live.
              </div>
            </div>

            <div className="rounded-[2rem] bg-ivory-silk p-7 shadow-luxury sm:p-9">
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-golden-opal" />
                <h3 className="text-2xl font-normal tracking-[-0.03em] text-[#214132]">Everything included</h3>
              </div>
              <ul className="grid gap-3">
                {[
                  '1 fully trained, pre-onboarded Lead Gen Executive',
                  '5,000 LinkedIn InMails/month with 10 Sales Nav licences',
                  '30 personalised, research-backed emails every day',
                  'Daily activity reports direct to your inbox',
                  'Minimum 16 meetings/month guaranteed',
                  'Free sales engine consulting for ICP, messaging and sequences',
                  'No lock-in - scale up or upgrade when ready',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#4b5b47]">
                    <Check className="mt-1 h-4 w-4 flex-none text-golden-opal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-imperial-emerald px-4 py-24 text-center text-ivory-silk sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-golden-opal">
            Ready to build your sales engine?
          </p>
          <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] sm:text-6xl">
            Get your Lead Gen Executive deployed in 30 days.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-ivory-silk/72">
            Book a 15-minute discovery call, align the ICP, complete the free setup month, then go
            live with a trained executive.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCalendly}
              className="rounded-full bg-golden-opal px-7 py-3 text-sm font-semibold text-onyx-black transition-colors hover:bg-[#d7cb6c]"
            >
              Book a discovery call
            </Link>
            <Link href="/" className="rounded-full border border-ivory-silk/25 px-7 py-3 text-sm font-semibold text-ivory-silk transition-colors hover:bg-ivory-silk hover:text-onyx-black">
              View SDR as a Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
