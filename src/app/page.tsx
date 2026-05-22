'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  CircleDollarSign,
  Mail,
  ShieldCheck,
  Target,
} from 'lucide-react'

const calendlyUrl = 'https://calendly.com/millioncxo/loe-20x'

const trackCalendly = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'conversion', { send_to: 'AW-17718087441' })
  }
}

const bottlenecks = {
  meetings: {
    label: 'Need meetings',
    title: 'Opt for Lead Generation when the pipeline is dry.',
    copy:
      'The All-Rounder Lead Gen Executive focuses on ICP research, LinkedIn, InMails, personalised email and meeting generation.',
    price: '$1,200/mo',
    billing: 'quarterly · $1,500/mo monthly',
    target: '16+ conducted meetings/month',
    items: [
      'Up to 10 Sales Navigator licences',
      'Up to 5,000+ InMails per month',
      '30+ personalised emails/day',
      'Cold Caller add-on at $300/mo',
      'Pro-rata refund if missed',
    ],
  },
  revenue: {
    label: 'Need conversion',
    title: 'Opt for Account Executives when meetings are not becoming revenue.',
    copy:
      'The AE layer qualifies, pitches, presents, follows up and drives deal closure against a revenue target.',
    price: '$2,800/mo',
    billing: 'quarterly · $3,200/mo monthly',
    target: '$200K/year revenue target per AE',
    items: [
      '$200K/year revenue target per Account Executive',
      '4 BANT-qualified meetings/month per AE',
      'Client calls, meetings and presentations',
      'Full pitching and demo delivery',
      'End-to-end deal closure',
      'Pro-rata refund if target is missed',
    ],
  },
} as const

const timeline = [
  {
    title: 'Setup & Training',
    time: '30 days',
    note: 'Complimentary',
    items: ['Hiring and onboarding', 'Infrastructure setup', 'Product training', 'Messaging development', 'CRM configuration'],
  },
  {
    title: 'Q1: Zero to One',
    time: '3 months',
    note: 'Pipeline build',
    items: ['48 meetings/quarter per Lead Gen Exec', '12 BANT meetings/quarter per AE', 'Weekly reviews', 'Performance tracking'],
  },
  {
    title: 'Q2-Q4: Scale',
    time: '9 months',
    note: 'Revenue targets',
    items: ['Q2: 33% target', 'Q3: 66% cumulative', 'Q4: 100% full year', '3-7% incentive on achievement'],
  },
]

const guarantees = [
  ['80-100%', 'Continue to Q2-Q4', 'Revenue targets activate'],
  ['60-79%', '+1 month free/pro-rated refund', 'Service credit applied'],
  ['40-59%', '+2 months free/pro-rated refund', 'Extended service credit'],
]

const reporting = [
  ['Daily', 'Activity summaries, meetings booked, pipeline updates'],
  ['Weekly', 'Conversion metrics, pipeline health, quality assessment'],
  ['Bi-weekly', 'Messaging optimisation, market feedback, strategy calls'],
  ['Monthly', 'Executive summary, ROI analysis, next month planning'],
]

const investmentOptions = [
  {
    name: 'Starter Package',
    price: '$4,000/mo',
    team: '1 Lead Gen Executive + 1 Account Executive',
    payment: '$12,000 quarterly payment',
    annualInvestment: '$48,000 annual investment',
    target: '$200K revenue target/year',
    returnLabel: '1:4 target return',
  },
  {
    name: 'Optimal Package',
    price: '$6,800/mo',
    team: '1 Lead Gen Executive + 2 Account Executives',
    payment: '$20,400 quarterly payment',
    annualInvestment: '$81,600 annual investment',
    target: '$400K combined target/year',
    returnLabel: '1:5 target return',
  },
]

const clientLogos = [
  { name: 'Spectrum Talent Management', src: '/client-logos/spectrum.png', href: 'https://www.stmpl.co.in/' },
  { name: 'Tessell', src: '/client-logos/tessell.webp', href: 'https://www.tessell.com/', darkTile: true },
  { name: 'TEC Canada', src: '/client-logos/tec-canada.svg', href: 'https://tec-canada.com/', darkTile: true },
  { name: 'Modern', src: '/client-logos/modern.png', href: 'https://modernis.com/' },
  { name: 'ECOR Global', src: '/client-logos/ecor.svg', href: 'https://ecorglobal.com/', darkTile: true },
]

export default function Home() {
  const [activePath, setActivePath] = useState<keyof typeof bottlenecks>('meetings')
  const [revenueGoal, setRevenueGoal] = useState(600)

  const plan = useMemo(() => {
    const aes = Math.ceil(revenueGoal / 200)
    const leadGen = Math.ceil(aes / 2)
    const monthly = leadGen * 1200 + aes * 2800
    return {
      aes,
      leadGen,
      monthly,
      quarterly: monthly * 3,
      meetings: leadGen * 16,
      bant: aes * 4,
    }
  }, [revenueGoal])

  const active = bottlenecks[activePath]

  return (
    <div className="bg-ivory-silk text-onyx-black">
      <section className="relative min-h-[calc(100vh-3rem)] overflow-hidden bg-[#f2efe7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(196,183,91,0.22),transparent_24%),linear-gradient(180deg,rgba(247,245,242,0.95),rgba(247,245,242,0.7)_58%,rgba(11,46,43,0.18))]" />

        <div className="absolute left-1/2 top-[54%] hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-golden-opal/25 md:block story-orbit" />
        <div className="absolute left-1/2 top-[54%] hidden h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-muted-jade/25 md:block story-orbit-reverse" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-jade sm:mb-6 sm:text-xs sm:tracking-[0.34em]">
              SDR as a Service
            </p>
            <h1 className="text-[2.7rem] font-normal leading-[0.92] tracking-[-0.055em] text-[#214132] min-[390px]:text-[3.15rem] sm:text-6xl lg:text-[5.9rem]">
              From meetings to revenue, without building the team in-house.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#4b5b47] sm:text-lg">
              MillionCXO gives you an all-rounder lead gen engine for meeting generation and
              Account Executives for conversion, with quarterly targets and a tiered performance
              guarantee.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackCalendly}
                className="w-fit rounded-full bg-[#1f2a1d] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a3827] sm:px-7"
              >
                Book a strategy call
              </Link>
              <a href="#planner" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2d3a2a]">
                Plan the team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-6 rounded-full bg-golden-opal/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-[#1f2a1d]/10 bg-ivory-silk/82 p-5 shadow-[0_30px_90px_rgba(33,65,50,0.18)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-imperial-emerald p-5 text-ivory-silk">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ivory-silk/55">
                  <span>Sales flow</span>
                  <span>MillionCXO</span>
                </div>
                <div className="mt-8 grid gap-3">
                  {[
                    ['ICP Research', 'Target accounts and lists'],
                    ['Lead Generation', '16+ meetings/month per Lead Gen Exec'],
                    ['AE Conversion', '$200K/year target per AE'],
                    ['Performance Check', 'Pro-rata refund structure'],
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
                {[
                  ['30', 'setup days'],
                  ['16+', 'meetings/mo'],
                  ['$200K', 'per AE/yr'],
                ].map(([value, label]) => (
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

      <section id="model" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-jade">
                Choose your bottleneck
              </p>
              <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
                The offer changes depending on where your sales cycle is stuck.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#4b5b47]">
                Start with the part of the sales cycle that needs support: generating qualified
                meetings or converting those meetings into revenue.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#1f2a1d]/10 bg-white/70 p-4 shadow-luxury">
              <div className="grid grid-cols-2 gap-2 rounded-full bg-[#eef1e9] p-1">
                {(Object.keys(bottlenecks) as Array<keyof typeof bottlenecks>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivePath(key)}
                    className={`rounded-full px-4 py-3 text-sm font-semibold transition-all ${
                      activePath === key
                        ? 'bg-imperial-emerald text-ivory-silk shadow-sm'
                        : 'text-[#4b5b47] hover:text-[#214132]'
                    }`}
                  >
                    {bottlenecks[key].label}
                  </button>
                ))}
              </div>

              <div className="grid gap-8 p-4 pt-8 md:grid-cols-[0.9fr_1.1fr] sm:p-7">
                <div>
                  <p className="text-sm font-semibold text-golden-opal">{active.label}</p>
                  <h3 className="mt-3 text-3xl font-normal leading-tight tracking-[-0.035em] text-[#214132]">
                    {active.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-[#4b5b47]">{active.copy}</p>
                  <div className="mt-8 border-y border-[#1f2a1d]/10 py-6">
                    <div className="text-4xl font-semibold tracking-[-0.04em] text-[#214132]">
                      {active.price}
                    </div>
                    <div className="mt-1 text-sm text-[#4b5b47]">{active.billing}</div>
                    <div className="mt-4 rounded-2xl bg-[#eef1e9] p-4 text-sm font-semibold text-[#214132]">
                      Target: {active.target}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-imperial-emerald p-5 text-ivory-silk">
                  <div className="mb-5 flex items-center gap-3">
                    {activePath === 'meetings' ? <Mail className="h-5 w-5 text-golden-opal" /> : <CircleDollarSign className="h-5 w-5 text-golden-opal" />}
                    <span className="text-sm font-semibold">What you get</span>
                  </div>
                  <ul className="grid gap-4">
                    {active.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-ivory-silk/78">
                        <Check className="mt-1 h-4 w-4 flex-none text-golden-opal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="planner" className="bg-[#eef1e9] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-jade">
              The team math
            </p>
            <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
              Put in a revenue goal. The team shape becomes obvious.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#4b5b47]">
              Each AE carries a $200K/year revenue target, and one Lead Gen Executive supports up
              to two AEs.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2rem] bg-ivory-silk p-7 shadow-luxury sm:p-9">
              <label htmlFor="revenue-goal" className="text-sm font-semibold text-[#214132]">
                Annual revenue goal
              </label>
              <div className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-[#214132]">
                ${revenueGoal}K
              </div>
              <input
                id="revenue-goal"
                type="range"
                min="200"
                max="1000"
                step="200"
                value={revenueGoal}
                onChange={(event) => setRevenueGoal(Number(event.target.value))}
                className="mt-8 w-full accent-[#214132]"
              />
              <div className="mt-4 flex justify-between text-xs text-[#4b5b47]">
                <span>$200K</span>
                <span>$1M</span>
              </div>
              <p className="mt-8 text-sm leading-7 text-[#4b5b47]">
                This is a planning view based on the standard team ratio, not a custom quote.
              </p>
            </div>

            <div className="rounded-[2rem] bg-imperial-emerald p-6 text-ivory-silk shadow-luxury sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  [String(plan.aes), 'Account Executives'],
                  [String(plan.leadGen), 'Lead Gen Execs'],
                  [`${plan.meetings}+`, 'meetings/month capacity'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-ivory-silk/10 bg-ivory-silk/[0.06] p-5">
                    <div className="text-4xl font-semibold tracking-[-0.05em] text-golden-opal">
                      {value}
                    </div>
                    <div className="mt-2 text-sm leading-5 text-ivory-silk/70">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-ivory-silk p-5 text-[#214132]">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm text-[#4b5b47]">Estimated monthly investment</div>
                    <div className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
                      ${plan.monthly.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#4b5b47]">Quarterly payment</div>
                    <div className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
                      ${plan.quarterly.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-jade">
              Setup to scale
            </p>
            <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
              The first month is for setup. The first quarter is for pipeline.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {timeline.map((phase, index) => (
              <div key={phase.title} className="group rounded-[2rem] border border-[#1f2a1d]/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-golden-opal">{phase.time}</div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef1e9] text-[#214132]">
                    {index === 0 ? <CalendarDays className="h-4 w-4" /> : index === 1 ? <Target className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
                  </div>
                </div>
                <h3 className="mt-5 text-2xl font-normal tracking-[-0.03em] text-[#214132]">{phase.title}</h3>
                <div className="mt-2 text-sm font-semibold text-muted-jade">{phase.note}</div>
                <ul className="mt-6 grid gap-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[#4b5b47]">
                      <Check className="mt-1 h-4 w-4 flex-none text-golden-opal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="guarantee" className="bg-imperial-emerald py-24 text-ivory-silk sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-golden-opal">
              Performance guarantee
            </p>
            <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
              The guarantee is tiered because performance is measurable.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ivory-silk/72">
              Clear ranges define what happens when targets are achieved, partially achieved, or
              missed.
            </p>
          </div>

          <div className="grid gap-3">
            {guarantees.map(([range, title, detail]) => (
              <div key={range} className="grid gap-4 rounded-2xl border border-ivory-silk/12 bg-ivory-silk/[0.06] p-5 transition-colors hover:bg-ivory-silk/[0.1] sm:grid-cols-[7rem_1fr]">
                <div className="text-2xl font-semibold tracking-[-0.04em] text-golden-opal">{range}</div>
                <div>
                  <div className="font-semibold">{title}</div>
                  <div className="mt-1 text-sm text-ivory-silk/65">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-jade">
                Transparency
              </p>
              <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
                Reporting cadence is part of the service.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#4b5b47]">
                Daily updates, weekly reports, bi-weekly strategy calls, monthly leadership reviews
                and 24/7 dashboard access are part of the operating model.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-[#1f2a1d]/10 bg-[#1f2a1d]/10">
              {reporting.map(([label, detail]) => (
                <div key={label} className="grid gap-3 bg-ivory-silk p-6 sm:grid-cols-[8rem_1fr]">
                  <div className="text-xl font-normal tracking-[-0.03em] text-[#214132]">{label}</div>
                  <div className="text-sm leading-6 text-[#4b5b47]">{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#eef1e9] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-jade">
              Investment options
            </p>
            <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
              How much investment and return looks like.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#4b5b47]">
              The model ties monthly team investment to the annual revenue target carried by the
              Account Executive layer.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {investmentOptions.map((option) => (
              <div key={option.name} className="rounded-[2rem] bg-ivory-silk p-7 shadow-luxury sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-muted-jade">{option.name}</div>
                  <div className="rounded-full bg-[#1f2a1d] px-4 py-2 text-xs font-semibold text-ivory-silk">
                    {option.returnLabel}
                  </div>
                </div>
                <h3 className="mt-4 text-3xl font-normal tracking-[-0.04em] text-[#214132]">{option.team}</h3>
                <div className="mt-10 border-y border-[#1f2a1d]/10 py-6">
                  <span className="text-5xl font-semibold tracking-[-0.05em] text-[#214132]">{option.price}</span>
                  <div className="mt-2 text-sm text-[#4b5b47]">{option.payment}</div>
                </div>
                <div className="mt-6 grid gap-3 text-sm font-semibold text-[#214132]">
                  <div className="flex items-center gap-3">
                    <CircleDollarSign className="h-4 w-4 text-golden-opal" />
                    {option.annualInvestment}
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-golden-opal" />
                    {option.target}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-jade">
                Client proof
              </p>
              <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
                100+ clients and still counting.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#4b5b47]">
                MillionCXO has served global teams across B2B tech, SaaS, HR, AI and professional
                services.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[#1f2a1d]/10 bg-white/60 py-6 shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ivory-silk to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ivory-silk to-transparent" />
              <div className="client-logo-marquee flex w-max items-center gap-4">
                {[...clientLogos, ...clientLogos].map((client, index) => (
                  <a
                    key={`${client.name}-${index}`}
                    href={client.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={client.name}
                    className={`flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl border p-5 transition-transform duration-300 hover:-translate-y-1 ${
                      client.darkTile
                        ? 'border-[#1f2a1d]/10 bg-imperial-emerald shadow-[0_16px_40px_rgba(11,46,43,0.16)]'
                        : 'border-[#1f2a1d]/10 bg-white shadow-sm'
                    }`}
                  >
                    <img
                      src={client.src}
                      alt={client.name}
                      className="max-h-12 max-w-[9rem] object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-imperial-emerald px-4 py-24 text-center text-ivory-silk sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-golden-opal">
            Your path to pipeline acceleration
          </p>
          <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] sm:text-6xl">
            Finalise the team size. Then setup begins.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-ivory-silk/72">
            Finalise team size, execute the agreement, complete the 30-day setup period, then
            launch the pilot.
          </p>
          <Link
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackCalendly}
            className="mt-10 inline-flex rounded-full bg-golden-opal px-7 py-3 text-sm font-semibold text-onyx-black transition-colors hover:bg-[#d7cb6c]"
          >
            Book a strategy call
          </Link>
        </div>
      </section>
    </div>
  )
}
