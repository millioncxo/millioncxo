import Link from 'next/link'
import Image from 'next/image'
import CounterAnimation from '@/components/CounterAnimation'
import FlippingText from '@/components/FlippingText'
import Navigation from '@/components/Navigation'
import ScrollAnimation from '@/components/ScrollAnimation'
import WorldMapImage from '@/components/World Map.png'
import LogoComponent from '@/components/LogoComponent'

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory-silk">
      <Navigation />
      
      {/* Hero Section - Modern & Conversion Focused */}
      <section className="relative bg-gradient-to-br from-ivory-silk to-muted-jade/10 overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-luxury-pattern opacity-30"></div>
        
        <div className="relative container mx-auto px-6 py-12 lg:py-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="animate-fade-in">
                <div className="inline-flex items-center bg-golden-opal/10 rounded-full px-4 py-2 mb-6">
                  <svg className="w-4 h-4 text-golden-opal mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-golden-opal font-semibold text-sm">118K+ Discovery Calls Delivered</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-onyx-black leading-tight">
                  Get 
                  <span className="block text-golden-opal">
                    <FlippingText 
                      words={['10+ Meetings', 'Qualified Leads', 'CXO Calls', 'Sales Opportunities']}
                      className="text-golden-opal"
                    />
                  </span>
                  Every Month
                </h1>
              </div>
              
              <div className="animate-fade-in-delay">
                <p className="text-xl text-muted-jade leading-relaxed max-w-2xl">
                  We connect you with decision-makers who need your solution. No cold emails, no automated sequences—just strategic, human-driven outreach that works.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay">
                <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" className="btn-primary inline-flex items-center justify-center">
                  <span>Book a free call !</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/services" className="btn-secondary">
                  See Our Process
                </Link>
              </div>
              
              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-8 animate-fade-in-delay">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
                      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
                    ].map((avatar, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-ivory-silk overflow-hidden shadow-lg hover:scale-110 transition-transform duration-300">
                        <img 
                          src={avatar} 
                          alt={`Client ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="ml-3 text-muted-jade font-medium">27+ Happy Clients</span>
                </div>
                <div className="flex items-center">
                  <div className="text-golden-opal text-xl">★★★★★</div>
                  <span className="ml-2 text-muted-jade font-medium">4.9/5 Rating</span>
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
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="mb-3">
                
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-golden-opal mb-2">
                <CounterAnimation end={119} suffix="K+" />
              </div>
              <div className="text-ivory-silk font-medium">Discovery Calls</div>
            </div>
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

      {/* Services Section */}
      <section className="py-20 bg-ivory-silk">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-onyx-black mb-6">
              How We <span className="text-gradient">Generate Leads</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto">
              Our proven 6-step process turns cold prospects into warm conversations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Market Research",
                description: "Deep dive into your ideal customer profile and industry dynamics",
                step: "01",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )
              },
              {
                title: "Prospect Identification",
                description: "Find decision-makers with budget, authority, and need",
                step: "02",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Strategic Outreach",
                description: "Personalized, human-crafted messages that get responses",
                step: "03",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                )
              },
              {
                title: "Meeting Coordination",
                description: "Schedule qualified discovery calls with interested prospects",
                step: "04",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Performance Tracking",
                description: "Real-time analytics and optimization for maximum ROI",
                step: "05",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Scale & Optimize",
                description: "Expand successful campaigns across multiple channels",
                step: "06",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="card-modern group relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-golden-opal/20 font-bold text-2xl">
                    {service.step}
                  </div>
                  
                  <div className="mb-4 p-3 bg-golden-opal/10 rounded-full w-fit group-hover:bg-golden-opal/20 transition-colors">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-onyx-black mb-3 group-hover:text-golden-opal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-jade leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-petrol-smoke">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-ivory-silk mb-6">
              Simple, Transparent <span className="text-golden-opal">Pricing</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto">
              No hidden fees. No long-term contracts. Just results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {[
              {
                name: "Pilot",
                price: "$99",
                unit: "per meeting",
                description: "Perfect for testing our service",
                features: [
                  { text: "4 qualified CXO meetings", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>) },
                  { text: "30 days program", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>) },
                  { text: "Email outreach", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>) },
                  { text: "Basic reporting", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>) },
                  { text: "CRM integration", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>) },
                  { text: "Email support", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>) }
                ],
                popular: false
              },
              {
                name: "SDR as a Service",
                price: "$1,999",
                unit: "per month",
                description: "Dedicated full-time SDR",
                features: [
                  { text: "5 qualified meetings/month", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>) },
                  { text: "300 emails daily", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>) },
                  { text: "150 cold calls daily", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>) },
                  { text: "70 LinkedIn InMails daily", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>) },
                  { text: "80 account profiles daily", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>) },
                  { text: "Quarterly contract", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>) }
                ],
                popular: true
              },
              {
                name: "Consultation & Infrastructure",
                price: "Custom",
                unit: "pricing",
                description: "Complete setup & training",
                features: [
                  { text: "CRM setup & customization", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>) },
                  { text: "Email domain warm-up", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>) },
                  { text: "Outreach automation", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>) },
                  { text: "Sales scripts creation", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>) },
                  { text: "Weekly dashboards", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>) },
                  { text: "Team training included", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>) }
                ],
                popular: false
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
                    <h3 className="text-2xl font-bold text-ivory-silk mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-golden-opal">{plan.price}</span>
                      <span className="text-muted-jade ml-2">{plan.unit}</span>
                    </div>
                    <p className="text-muted-jade">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-ivory-silk">
                        <svg className="w-5 h-5 text-golden-opal mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="mr-2 text-golden-opal">{feature.icon}</span>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" className={plan.popular ? 'btn-primary w-full' : 'btn-outline w-full'}>
                      Get Started
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-ivory-silk">
        <div className="container mx-auto px-6">
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
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-ivory-silk mb-6">
              Ready to Fill Your Pipeline?
            </h2>
            <p className="text-xl text-muted-jade mb-8 max-w-2xl mx-auto">
              Join 27+ companies who trust us to generate high-quality leads and book meetings with decision-makers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" className="btn-primary text-lg px-10 py-4">
                Book Your Strategy Call
              </Link>
              <Link href="/services" className="btn-outline text-lg px-10 py-4">
                See Case Studies
              </Link>
            </div>
            
           
          </div>
        </div>
      </section>
    </div>
  )
} 