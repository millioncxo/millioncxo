'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Target, FileSearch, TrendingUp, Wallet, Search, UserCheck, Filter, Mail, Calendar, MessageSquare, Phone, BarChart3, Shield, DollarSign, Check, Sparkles, Users } from 'lucide-react'
import CounterAnimation from '@/components/CounterAnimation'
import FlippingText from '@/components/FlippingText'
import ScrollAnimation from '@/components/ScrollAnimation'
import ProcessStepper from '@/components/ProcessStepper'
import WorldMapImage from '@/components/World Map.png'

export default function Home() {
  return (
    <div className="bg-ivory-silk">
      
      {/* Hero Section - Modern & Conversion Focused */}
      <section className="relative bg-gradient-to-br from-ivory-silk to-muted-jade/10 overflow-hidden">
        <div className="absolute inset-0 bg-luxury-pattern opacity-30"></div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 md:py-8 flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="animate-fade-in">
                <div className="inline-flex items-center bg-golden-opal/10 rounded-full px-4 py-2 mb-6">
                  <svg className="w-4 h-4 text-golden-opal mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-golden-opal font-semibold text-sm">LinkedIn Outreach Excellence - 20X</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-onyx-black leading-tight">
                  Human‑Driven <FlippingText words={['LinkedIn Excellence', 'CXO Connections', 'Sales Growth', 'Pipeline Building']} className="text-golden-opal" />
                </h1>
              </div>
              
              <div className="animate-fade-in-delay">
                <p className="text-xl text-muted-jade leading-relaxed max-w-2xl mb-4">
                  Human‑driven personalised outreach. Every message is researched and written by trained SDRs. On LinkedIn we study each prospect&apos;s posts.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center text-sm text-muted-jade">
                    <svg className="w-4 h-4 text-golden-opal mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    1000+ InMails  per license 
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-jade">
                    <svg className="w-4 h-4 text-golden-opal mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Research‑based, not random spam
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-jade">
                    <svg className="w-4 h-4 text-golden-opal mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Guaranteed responses per license
                  </span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay">
                <Link href="https://calendly.com/millioncxo/loe-20x" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center">
                  <span>Book a Free Demo</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/#linkedin-20x" className="btn-secondary">
                  See how 20X works
                </Link>
              </div>
              
              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-8 animate-fade-in-delay">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
                      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
                    ].map((avatar, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-ivory-silk overflow-hidden shadow-lg hover:scale-110 transition-transform duration-300 relative">
                        <Image 
                          src={avatar} 
                          alt={`Client ${i + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
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
            
            {/* Right Column - World Map Image */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-golden-opal/20">
                <div className="relative w-full h-[350px] lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-ivory-silk to-muted-jade/20">
                  <Image
                    src={WorldMapImage}
                    alt="Global reach - Active in 50+ countries"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx-black/20 via-transparent to-transparent"></div>
                  
                  {/* Floating stats cards */}
                  <div className="absolute top-4 left-4 bg-ivory-silk/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-golden-opal/20">
                    <div className="text-onyx-black font-bold text-lg">
                      <CounterAnimation end={13} suffix="+" />
                    </div>
                    <div className="text-muted-jade text-sm font-medium">Countries</div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-ivory-silk/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-golden-opal/20">
                    <div className="text-onyx-black font-bold text-lg">
                      <CounterAnimation end={28} suffix="+" />
                    </div>
                    <div className="text-muted-jade text-sm font-medium">Clients</div>
                  </div>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-golden-opal/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                    <div className="text-onyx-black font-semibold text-sm text-center">
                      Global Presence
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-muted-jade font-medium">Connecting businesses worldwide</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-golden-opal rounded-full animate-pulse"></div>
                    <span className="text-golden-opal text-sm font-semibold">Live worldwide operations</span>
                    <div className="w-2 h-2 bg-golden-opal rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-golden-opal/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-muted-jade/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-imperial-emerald">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="mb-3">
                
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-golden-opal mb-2">
                <CounterAnimation end={93} suffix="%" />
              </div>
              <div className="text-ivory-silk font-medium">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="mb-3">
                
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-golden-opal mb-2">
                <CounterAnimation end={28} suffix="+" />
              </div>
              <div className="text-ivory-silk font-medium">Clients</div>
            </div>
            <div className="text-center">
              <div className="mb-3">
                
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-golden-opal mb-2">
                <CounterAnimation end={12} suffix="+" />
              </div>
              <div className="text-ivory-silk font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Human-Driven Section */}
      <section className="py-20 bg-ivory-silk">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-onyx-black mb-6">
              We at MillionCXO are <span className="text-gradient">Human‑Driven</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto">
               Human‑driven personalised outreach.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Activity‑based research",
                description: "We study each prospect's posts, comments, and intent before writing.",
                step: "01",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )
              },
              {
                title: "CXO‑first messaging",
                description: "Conversation starters tailored to decision‑makers, not generic scripts.",
                step: "02",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Account Security",
                description: "Automated outreach risks LinkedIn restrictions. Our human-led methodology preserves account integrity.",
                step: "03",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="card-modern group relative overflow-hidden h-full flex flex-col">
                  <div className="absolute top-4 right-4 text-golden-opal/20 font-bold text-2xl">
                    {service.step}
                  </div>
                  
                  <div className="mb-4 p-3 bg-golden-opal/10 rounded-full w-fit group-hover:bg-golden-opal/20 transition-colors">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-onyx-black mb-3 group-hover:text-golden-opal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-jade leading-relaxed flex-grow">
                    {service.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* LinkedIn Outreach Excellence 20X Section */}
      <section id="linkedin-20x" className="py-20 bg-petrol-smoke">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-golden-opal/10 rounded-full px-4 py-2 mb-6">
              <span className="text-golden-opal font-semibold text-sm">20× LinkedIn Efficiency</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-ivory-silk mb-6">
              LinkedIn Outreach <span className="text-golden-opal">Excellence - 20X</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto">
              Research-driven. Conversation-focused. Human-led, not automated.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                value: "1,000", 
                label: "InMails / License / Month", 
                desc: "Delivered by trained SDRs - every message researched.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )
              },
              { 
                value: "≥4", 
                label: "Guaranteed Interested Customers", 
                desc: "Per license per month - or you get a pro-rated refund.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              { 
                value: "10×", 
                label: "Cost Efficiency", 
                desc: "Compared to in-house SDR teams. No additional tool costs. No hidden charges.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              }
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

          {/* Features List */}
          <ScrollAnimation>
            <div className="bg-gradient-to-br from-ivory-silk/15 to-ivory-silk/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-golden-opal/30 shadow-xl mb-12">
              <h3 className="text-2xl font-bold text-ivory-silk mb-8 text-center">What You Get</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "1000 InMails per license per month",
                    text: "We deliver 1,000 InMails per license per month.",
                    icon: Mail
                  },
                  {
                    title: "4 Interested Customers Guaranteed",
                    text: "Per license per month. Pro-rated refund on missed targets.",
                    icon: TrendingUp
                  },
                  {
                    title: "Research-Based Outreach",
                    text: "We analyze each prospect's LinkedIn activity before crafting personalized messages.",
                    icon: FileSearch
                  },
                  {
                    title: "Account Safety Guarantee",
                    text: "100% money-back guarantee if any LinkedIn account gets blocked. We protect your accounts.",
                    icon: Target
                  },
                  {
                    title: "Industry's Lowest Price",
                    text: "Starting at $150/month per license. ",
                    icon: Wallet
                  },
                  {
                    title: "Zero Tool Costs",
                    text: "All tools included. No additional software or platform fees.",
                    icon: Wallet
                  }
                ].map((feature, i) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-golden-opal/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-golden-opal/30 transition-colors">
                        <IconComponent className="w-6 h-6 text-golden-opal" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-ivory-silk font-bold text-lg mb-1 group-hover:text-golden-opal transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-muted-jade text-sm leading-relaxed">
                          {feature.text}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollAnimation>

          {/* CTA */}
          <ScrollAnimation>
            <div className="text-center">
              <div className="bg-gradient-to-r from-golden-opal/10 via-golden-opal/5 to-golden-opal/10 border border-golden-opal/30 rounded-2xl p-10 backdrop-blur-sm">
                <h3 className="text-3xl lg:text-4xl font-bold text-ivory-silk mb-4">
                  Let&apos;s build conversations, not automation.
                </h3>
                <p className="text-muted-jade text-lg mb-8 max-w-2xl mx-auto">
                  Every message crafted, every connection verified - human to human.
                </p>
                <Link
                  href="https://calendly.com/millioncxo/loe-20x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-lg px-10 py-4 inline-flex items-center"
                >
                  Book a Free Demo
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-ivory-silk">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-onyx-black mb-6">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto mb-8">
              No hidden fees. No long-term contracts. Just results.
            </p>
            
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {[
              {
                name: "LinkedIn Followers Boost",
                price: "$499",
                unit: "/month",
                
                tagline: "Build brand authority, one follower at a time.",
                features: [
                  { text: "10,000+ targeted followers per month", icon: Users },
                  { text: "Organic growth strategy", icon: TrendingUp },
                  { text: "Content optimization for your brand", icon: FileSearch },
                  { text: "Engagement boost", icon: Target }
                ],
                promo: undefined,
                footnote: undefined,
                popular: false
              },
              {
                name: "LinkedIn Outreach Excellence 20X",
                price: "$250",
                unit: "/ license/month",
                description: "Discounts available!",
                features: [
                  { text: "1,000 InMails per license per month ", icon: Mail },
                  { text: "4 Guaranteed interested prospects per license per month", icon: Target },
                  { text: "Research-based outreach using LinkedIn activity", icon: FileSearch },
                  { text: "100% garanteed money-back if your account gets blocked", icon: Shield },
                  
                  
                  
                ],
                earlyBird: [
                  "3–5 licenses @10% → $225 / month / license",
                  "6–10 licenses @20% → $200 / month / license",
                  "11–20 licenses @30% → $175 / month / license"
                ],
                popular: true
              }
            ].map((plan, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className={`card-glass relative h-full flex flex-col ${plan.popular ? 'ring-2 ring-golden-opal' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-golden-opal text-onyx-black px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-onyx-black mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-golden-opal">{plan.price}</span>
                      <span className="text-muted-jade ml-2">{plan.unit}</span>
                    </div>
                    {plan.promo && (
                      <p className="text-golden-opal text-sm font-semibold mb-2">{plan.promo}</p>
                    )}
                    {plan.description && (
                      <p className="text-golden-opal text-sm mb-2">{plan.description}</p>
                    )}
                    {'tagline' in plan && plan.tagline && (
                      <p className="text-golden-opal text-sm font-medium">{plan.tagline}</p>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => {
                      const IconComponent = feature.icon
                      return (
                        <li key={featureIndex} className="flex items-center text-onyx-black">
                          <svg className="w-5 h-5 text-golden-opal mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <IconComponent className="w-4 h-4 text-golden-opal mr-2 flex-shrink-0" />
                          {feature.text}
                        </li>
                      )
                    })}
                    {/* {plan.earlyBird && (
                      <li className="mt-6 pt-6 border-t-2 border-golden-opal/30">
                        <div className="early-bird-shimmer bg-golden-opal/10 rounded-lg p-4 border border-golden-opal/30 relative overflow-hidden">
                          <div className="flex items-center gap-2 mb-3 relative z-10">
                            <Sparkles className="w-5 h-5 text-golden-opal animate-pulse" />
                            <p className="text-golden-opal font-bold text-base">Early Bird Pricing</p>
                          </div>
                          <ul className="space-y-2 relative z-10">
                            {plan.earlyBird.map((eb, ebIndex) => (
                              <li key={ebIndex} className="flex items-start">
                                <span className="text-golden-opal mr-2 font-semibold">•</span>
                                <span className="text-ivory-silk text-sm font-medium">{eb}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    )} */}
                  </ul>
                  {plan.footnote && (
                    <p className="text-xs text-muted-jade text-center mb-4">{plan.footnote}</p>
                  )}
                  
                  <div className="mt-auto">
                    <Link href="https://calendly.com/millioncxo/loe-20x" target="_blank" rel="noopener noreferrer" className={plan.popular ? 'btn-primary w-full' : 'btn-outline w-full'}>
                      Book a Free Demo
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Measurable Outcomes - Comparison Table */}
      <section className="py-20 bg-gradient-to-br from-ivory-silk via-ivory-silk/95 to-muted-jade/5 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-golden-opal rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-imperial-emerald rounded-full blur-3xl"></div>
        </div>
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-onyx-black mb-4 sm:mb-6">
              Measurable <span className="text-gradient">Outcomes</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-jade max-w-3xl mx-auto px-4">
              Real results that speak for themselves
            </p>
          </div>
          
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="bg-ivory-silk/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-golden-opal/30 p-1 min-w-full sm:min-w-0">
              <table className="w-full rounded-xl sm:rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-imperial-emerald via-petrol-smoke to-imperial-emerald">
                    <th className="px-2 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 text-left text-ivory-silk font-bold text-xs sm:text-sm lg:text-base">Metric</th>
                    <th className="px-2 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 text-center text-golden-opal font-bold text-xs sm:text-sm lg:text-base">MillionCXO</th>
                    <th className="px-2 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 text-center text-muted-jade/80 font-semibold text-xs sm:text-sm lg:text-base">Generic Agency</th>
                    <th className="px-2 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 text-center text-muted-jade/80 font-semibold text-xs sm:text-sm lg:text-base">In‑House Sales Team</th>
                  </tr>
                </thead>
                <tbody className="bg-ivory-silk divide-y divide-golden-opal/20">
                  {[
                    {
                      metric: "Cost to generate 1 appointment",
                      values: ["< $70", "> $500", "> $800"]
                    },
                    {
                      metric: "Positive replies per license/month",
                      values: ["≥ 4", "0–1", "0–1"]
                    },
                    {
                      metric: "LinkedIn InMails per license/month",
                      values: ["1,000", "< 800", "< 50"]
                    },
                    {
                      metric: "Pricing",
                      values: ["$150", "$350", "$1500"]
                    },
                    {
                      metric: "Account Safety Guarantee",
                      values: ["Yes", "No", "No"]
                    }
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-golden-opal/10 transition-all duration-300 group">
                      <td className="px-2 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 text-onyx-black font-semibold text-xs sm:text-sm lg:text-base group-hover:text-golden-opal transition-colors">{row.metric}</td>
                      <td className="px-2 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 text-center">
                        <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 bg-gradient-to-r from-golden-opal/20 to-golden-opal/30 text-golden-opal rounded-full font-bold text-xs sm:text-sm shadow-md border border-golden-opal/40">
                          {row.values[0]}
                        </span>
                      </td>
                      <td className="px-2 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 text-center text-muted-jade font-medium text-xs sm:text-sm lg:text-base">{row.values[1]}</td>
                      <td className="px-2 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 text-center text-muted-jade font-medium text-xs sm:text-sm lg:text-base">{row.values[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </section>

      {/* Process Section - Outbound the Human Way */}
      <section id="process" className="py-24 bg-gradient-to-br from-petrol-smoke via-imperial-emerald to-petrol-smoke relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory-silk mb-4 sm:mb-6">
              Outbound, the <span className="text-golden-opal">Human Way</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-jade max-w-3xl mx-auto px-4">
              A systematic approach that consistently delivers results
            </p>
          </div>

          <ProcessStepper
            steps={[
              {
                step: "01",
                title: "Data Mining",
                description: "Sales Navigator and public signals to build clean lists.",
                icon: Search
              },
              {
                step: "02",
                title: "Profiling",
                description: "Industry, role, geo, tech stack, revenue fit.",
                icon: UserCheck
              },
              {
                step: "03",
                title: "Cleaning",
                description: "Activity‑based filters from posts, comments, and likes.",
                icon: Filter
              },
              {
                step: "04",
                title: "InMail Outreach",
                description: "1,000+ InMails per license per month, hand‑written.",
                icon: Mail
              },
              {
                step: "05",
                title: "Response → Booking",
                description: "Our team confirms, your team gets calendar holds.",
                icon: Calendar
              },
              {
                step: "06",
                title: "Meeting Conducted",
                description: "Real conversations. Real pipeline.",
                icon: MessageSquare
              }
            ]}
            autoCycleInterval={2500}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-ivory-silk">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-onyx-black mb-6">
              What Our <span className="text-gradient">Clients Say</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "MillionCXO booked 23 qualified meetings in our first month. The quality was incredible.",
                author: "Sarah Chen",
                role: "VP of Sales"
              },
              {
                quote: "Finally, a service that delivers on its promises. 10x ROI in 90 days.",
                author: "Michael Rodriguez",
                role: "Founder"
              },
              {
                quote: "The best investment we made for our sales pipeline. Highly recommend!",
                author: "Jennifer Park",
                role: "Chief Revenue Officer"
              }
            ].map((testimonial, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="card-modern text-center">
                  <div className="mb-4">
                    <svg className="w-12 h-12 text-golden-opal mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  <p className="text-muted-jade italic mb-6 text-lg">
                    {testimonial.quote}
                  </p>
                  <div>
                    <div className="font-semibold text-onyx-black">{testimonial.author}</div>
                    <div className="text-muted-jade">{testimonial.role}</div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-imperial-emerald to-petrol-smoke">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-ivory-silk mb-6">
              Ready to turn LinkedIn into real pipeline?
            </h2>
            <p className="text-xl text-muted-jade mb-8 max-w-2xl mx-auto">
              Speak with a strategist. We&apos;ll map your ICP and messaging in the first call.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://calendly.com/millioncxo/loe-20x" target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-10 py-4">
                Book a Free Demo
              </Link>
              <Link href="/#linkedin-20x" className="btn-outline text-lg px-10 py-4">
                Learn More About 20X
              </Link>
            </div>
            
           
          </div>
        </div>
      </section>
    </div>
  )
} 