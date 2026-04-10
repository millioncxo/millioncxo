import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, FileSearch, Target, Wallet, Shield } from 'lucide-react'
import ScrollAnimation from '@/components/ScrollAnimation'

export const metadata: Metadata = {
  title: 'LinkedIn Outreach Excellence 16X | MillionCXO',
  description: 'Get 800 InMails per Sales Navigator license per month. Research-based, human-led LinkedIn outreach with 100% account safety guarantee. Starting at $299/month.',
}

export default function LinkedInOutreachPage() {
  return (
    <div className="bg-ivory-silk">

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-imperial-emerald to-petrol-smoke py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block border border-golden-opal text-golden-opal text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            LinkedIn Outreach Excellence
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory-silk mb-6">
            16X Your LinkedIn <span className="text-golden-opal">Outreach</span>
          </h1>
          <p className="text-xl text-muted-jade mb-8">
            Research-driven. Conversation-focused. Human-led, not automated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://calendly.com/millioncxo/loe-20x"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Book a Free Demo
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/#pricing" className="btn-outline text-lg px-8 py-4">
              View SDR Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── KEY METRICS ──────────────────────────────────────────────── */}
      <section className="py-20 bg-petrol-smoke">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                value: '800',
                label: 'InMails / License / Month',
                desc: 'Delivered by trained SDRs — every message researched before sending.',
                icon: <Mail className="w-8 h-8 text-golden-opal" />,
              },
              {
                value: '10×',
                label: 'Cost Efficiency',
                desc: 'Compared to in-house SDR teams. No additional tool costs. No hidden charges.',
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
              {
                value: '100%',
                label: 'Account Safety Guarantee',
                desc: 'Money-back if your LinkedIn account gets blocked due to our outreach. Zero risk.',
                icon: <Shield className="w-8 h-8 text-golden-opal" />,
              },
            ].map((item, idx) => (
              <ScrollAnimation key={idx} delay={idx * 100}>
                <div className="card-glass text-center group">
                  <div className="w-16 h-16 bg-golden-opal/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-golden-opal/30 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-5xl font-bold text-golden-opal mb-3 group-hover:scale-105 transition-transform duration-300">
                    {item.value}
                  </h3>
                  <p className="text-ivory-silk text-lg font-semibold mb-2">{item.label}</p>
                  <p className="text-muted-jade text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────────────────── */}
      <section className="py-20 bg-ivory-silk">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-onyx-black mb-4">
              What You <span className="text-gradient">Get</span>
            </h2>
            <p className="text-lg text-muted-jade max-w-2xl mx-auto">
              Every licence comes fully managed — no tools, no training, no setup required.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-golden-opal/20 p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: '800 InMails per licence per month',   text: 'We max every Sales Navigator licence. Hand-written, hand-sent.',                          icon: Mail },
                { title: 'Research-Based Outreach',             text: 'We analyse each prospect\'s LinkedIn activity before crafting personalised messages.',    icon: FileSearch },
                { title: 'Account Safety Guarantee',            text: '100% money-back if any LinkedIn account gets blocked due to our outreach.',               icon: Shield },
                { title: "Industry's Lowest Price",             text: 'Starting at $299/month per licence. No lock-in. Cancel anytime with 15-day notice.',     icon: Wallet },
                { title: 'Zero Tool Costs',                     text: 'Sales Navigator, messaging tools, and reporting all included. No extra software fees.',   icon: Target },
                { title: 'Human-Led, Not Automated',            text: 'Every connection request and InMail is written and sent by a trained SDR — no bots.',     icon: Mail },
              ].map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-golden-opal/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-golden-opal/20 transition-colors">
                      <Icon className="w-6 h-6 text-golden-opal" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-onyx-black font-bold text-lg mb-1 group-hover:text-golden-opal transition-colors">{f.title}</h4>
                      <p className="text-muted-jade text-sm leading-relaxed">{f.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-imperial-emerald">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-ivory-silk mb-4">
            Simple <span className="text-golden-opal">Pricing</span>
          </h2>
          <p className="text-muted-jade mb-10">Per Sales Navigator licence. No lock-in. Cancel anytime.</p>

          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-golden-opal/40">
            <h3 className="text-2xl font-bold text-onyx-black mb-1">LinkedIn Outreach Excellence 16X</h3>
            <p className="text-muted-jade text-sm mb-6">800 InMails/month · Human-led · No Lock In</p>
            <div className="flex items-baseline justify-center gap-2 mb-6">
              <span className="text-5xl font-bold text-golden-opal">$299</span>
              <span className="text-muted-jade font-medium">/ licence / month</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              {[
                '800 InMails per licence per month',
                'Research-based personalised outreach',
                '100% money-back if account blocked',
                'No automation — fully human-led',
                'Zero tool costs included',
                'Cancel with 15-day notice',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-onyx-black text-sm">
                  <svg className="w-4 h-4 text-golden-opal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="https://calendly.com/millioncxo/loe-20x"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 rounded-xl bg-golden-opal hover:bg-golden-opal/90 text-onyx-black font-semibold text-center transition-colors"
            >
              Book a Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── CROSS-LINK TO SDR ────────────────────────────────────────── */}
      <section className="py-16 bg-ivory-silk">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-muted-jade text-lg mb-2">Looking for a full end-to-end sales team?</p>
          <h3 className="text-2xl font-bold text-onyx-black mb-6">
            Check out our <span className="text-golden-opal">SDR as a Service</span>
          </h3>
          <Link href="/" className="btn-primary inline-flex items-center px-8 py-4">
            View SDR as a Service
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  )
}
