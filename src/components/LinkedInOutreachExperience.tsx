'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, FileSearch, Mail, ShieldCheck, SlidersHorizontal, UserCheck } from 'lucide-react'

const calendlyUrl = 'https://calendly.com/millioncxo/loe-20x'

const trackCalendly = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'conversion', { send_to: 'AW-17718087441' })
  }
}

const proofPoints = [
  ['800', 'InMails per license/month'],
  ['$299', 'per license/month'],
  ['100%', 'account safety guarantee'],
]

const process = [
  {
    title: 'Profile the ICP',
    detail: 'Define the segments, titles, geographies and company fit before outreach begins.',
    icon: UserCheck,
  },
  {
    title: 'Read prospect activity',
    detail: 'Posts, comments and LinkedIn signals guide the angle of the first message.',
    icon: FileSearch,
  },
  {
    title: 'Send human-written InMails',
    detail: 'Every message is researched and sent by trained SDRs, not automation.',
    icon: Mail,
  },
  {
    title: 'Protect account safety',
    detail: 'The service includes a money-back guarantee if an account is blocked due to outreach.',
    icon: ShieldCheck,
  },
]

export default function LinkedInOutreachExperience() {
  const [licenses, setLicenses] = useState(3)

  const plan = useMemo(() => {
    return {
      inmails: licenses * 800,
      monthly: licenses * 299,
    }
  }, [licenses])

  return (
    <div className="bg-ivory-silk text-onyx-black">
      <section className="relative min-h-[calc(100vh-3rem)] overflow-hidden bg-[#f2efe7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_26%,rgba(196,183,91,0.22),transparent_26%),linear-gradient(180deg,rgba(247,245,242,0.96),rgba(247,245,242,0.72)_60%,rgba(33,81,78,0.18))]" />
        <div className="absolute left-1/2 top-[55%] hidden h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-golden-opal/25 md:block story-orbit" />
        <div className="absolute left-1/2 top-[55%] hidden h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-muted-jade/25 md:block story-orbit-reverse" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-jade sm:mb-6 sm:text-xs sm:tracking-[0.34em]">
              LinkedIn Outreach Excellence 16X
            </p>
            <h1 className="text-[2.7rem] font-normal leading-[0.92] tracking-[-0.055em] text-[#214132] min-[390px]:text-[3.15rem] sm:text-6xl lg:text-[5.8rem]">
              Turn Sales Navigator into a human-led outreach engine.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#4b5b47] sm:text-lg">
              MillionCXO runs research-based LinkedIn outreach for your Sales Navigator licenses,
              delivering 800 InMails per license per month with account safety protection.
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
              <Link href="/" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2d3a2a]">
                Explore SDR as a Service
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-6 rounded-full bg-golden-opal/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-[#1f2a1d]/10 bg-ivory-silk/86 p-5 shadow-[0_30px_90px_rgba(33,65,50,0.18)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-imperial-emerald p-5 text-ivory-silk">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ivory-silk/55">
                  <span>Monthly delivery</span>
                  <span>16X</span>
                </div>
                <div className="mt-8 grid gap-3">
                  {[
                    ['License capacity', '800 InMails per license/month'],
                    ['Message quality', 'Research-based outreach'],
                    ['Method', 'Human-led, not automated'],
                    ['Protection', 'Account safety guarantee'],
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
                {proofPoints.map(([value, label]) => (
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
              What changes
            </p>
            <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] text-[#214132] sm:text-5xl">
              Outreach becomes researched, managed and scale-safe.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#4b5b47]">
              The service is built for teams that want LinkedIn conversations without hiring,
              training or managing the execution layer themselves.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {process.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-[2rem] border border-[#1f2a1d]/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#214132] text-golden-opal">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-6 text-2xl font-normal tracking-[-0.03em] text-[#214132]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#4b5b47]">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#eef1e9] py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="rounded-[2rem] bg-ivory-silk p-7 shadow-luxury sm:p-9">
            <div className="mb-5 flex items-center gap-3">
              <SlidersHorizontal className="h-5 w-5 text-golden-opal" />
              <p className="text-sm font-semibold text-[#214132]">License planner</p>
            </div>
            <div className="text-5xl font-semibold tracking-[-0.05em] text-[#214132]">
              {licenses} {licenses === 1 ? 'license' : 'licenses'}
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={licenses}
              onChange={(event) => setLicenses(Number(event.target.value))}
              className="mt-8 w-full accent-[#214132]"
            />
            <div className="mt-4 flex justify-between text-xs text-[#4b5b47]">
              <span>1 license</span>
              <span>10 licenses</span>
            </div>
            <p className="mt-8 text-sm leading-7 text-[#4b5b47]">
              Planning view based on $299 per license per month and 800 InMails per license per month.
            </p>
          </div>

          <div className="rounded-[2rem] bg-imperial-emerald p-6 text-ivory-silk shadow-luxury sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-ivory-silk/10 bg-ivory-silk/[0.06] p-5">
                <div className="text-4xl font-semibold tracking-[-0.05em] text-golden-opal">
                  {plan.inmails.toLocaleString()}+
                </div>
                <div className="mt-2 text-sm leading-5 text-ivory-silk/70">InMails per month</div>
              </div>
              <div className="rounded-2xl border border-ivory-silk/10 bg-ivory-silk/[0.06] p-5">
                <div className="text-4xl font-semibold tracking-[-0.05em] text-golden-opal">
                  ${plan.monthly.toLocaleString()}
                </div>
                <div className="mt-2 text-sm leading-5 text-ivory-silk/70">monthly investment</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-ivory-silk p-5 text-[#214132]">
              <h3 className="text-2xl font-normal tracking-[-0.03em]">What is included</h3>
              <ul className="mt-5 grid gap-3">
                {[
                  '800 InMails per license per month',
                  'Research-based personalised outreach',
                  'Human-led execution, not automation',
                  'Account safety guarantee',
                  'Zero additional tool costs',
                  'No lock-in, monthly billing',
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
            LinkedIn-only or full sales team
          </p>
          <h2 className="text-4xl font-normal leading-tight tracking-[-0.04em] sm:text-6xl">
            Start with LinkedIn outreach. Add SDR-as-a-Service when you need conversion coverage.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-ivory-silk/72">
            LinkedIn Outreach Excellence focuses on conversations. SDR-as-a-Service adds the lead
            generation and Account Executive layers for meetings and revenue.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCalendly}
              className="rounded-full bg-golden-opal px-7 py-3 text-sm font-semibold text-onyx-black transition-colors hover:bg-[#d7cb6c]"
            >
              Book a strategy call
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
