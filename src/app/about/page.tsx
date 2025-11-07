import Link from 'next/link'
import CounterAnimation from '@/components/CounterAnimation'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function About() {
  return (
    <div className="bg-ivory-silk">
      {/* Hero Section */}
      <section className="relative pb-12 lg:pb-20 bg-gradient-to-br from-imperial-emerald to-petrol-smoke overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-luxury-pattern opacity-30"></div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-4 sm:py-6 md:py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Story Content */}
            <div className="text-left">
              <div className="animate-fade-in">
                <div className="inline-flex items-center bg-golden-opal/10 rounded-full px-4 py-2 mb-6">
                  <span className="text-golden-opal font-semibold text-sm">Proudly Human‑Driven • Human‑Driven Personalised Outreach</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-ivory-silk mb-8 leading-tight">
                  Where <span className="text-golden-opal">Relationships</span> Begin
                </h1>
              </div>
              
              <div className="animate-fade-in-delay">
                <p className="text-xl text-muted-jade mb-6 leading-relaxed">
                  We help B2B companies book qualified meetings with real decision‑makers, not just leads. The future of outbound isn&apos;t automation; it&apos;s verified conversations backed by intelligence, process, and people.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-golden-opal rounded-full mt-3"></div>
                    <p className="text-lg text-muted-jade">
                      <span className="font-semibold text-ivory-silk">2012:</span> Started with a simple belief - every business deserves authentic connections
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-golden-opal rounded-full mt-3"></div>
                    <p className="text-lg text-muted-jade">
                      <span className="font-semibold text-ivory-silk">Today:</span> We&apos;re the trusted partner for 27+ companies worldwide
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-golden-opal rounded-full mt-3"></div>
                    <p className="text-lg text-muted-jade">
                      <span className="font-semibold text-ivory-silk">Mission:</span> Turn cold prospects into warm partnerships through human intelligence
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/services" className="btn-primary text-lg px-8 py-4">
                    See How We Work
                  </Link>
                  <Link href="/contact" className="btn-outline text-lg px-8 py-4">
                    Start Your Story
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Analytics & Insights */}
            <div className="relative">
              <div className="animate-fade-in-delay">
                {/* Analytics Container */}
                <div className="relative bg-ivory-silk/10 backdrop-blur-sm rounded-2xl p-8 border border-golden-opal/20">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-ivory-silk mb-2">Our Impact</h3>
                    <p className="text-muted-jade text-sm">Data-driven results across the globe</p>
                  </div>

                  {/* Pie Charts Grid */}
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    {/* Client Satisfaction Pie Chart */}
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#668b77" strokeWidth="2" opacity="0.3"/>
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#c4b75b" strokeWidth="2" 
                                  strokeDasharray="93, 7" strokeLinecap="round"
                                  className="animate-pulse"/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-golden-opal font-bold text-sm">93%</span>
                        </div>
                      </div>
                      <div className="text-ivory-silk text-xs font-medium">Client Satisfaction</div>
                    </div>

                    {/* Success Rate Pie Chart */}
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#668b77" strokeWidth="2" opacity="0.3"/>
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#c4b75b" strokeWidth="2" 
                                  strokeDasharray="94, 6" strokeLinecap="round"
                                  className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-golden-opal font-bold text-sm">94%</span>
                        </div>
                      </div>
                      <div className="text-ivory-silk text-xs font-medium">Meeting Success</div>
                    </div>

                    {/* Global Reach Pie Chart */}
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#668b77" strokeWidth="2" opacity="0.3"/>
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#c4b75b" strokeWidth="2" 
                                  strokeDasharray="13, 87" strokeLinecap="round"
                                  className="animate-pulse" style={{animationDelay: '1s'}}/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-golden-opal font-bold text-xs">13+</span>
                        </div>
                      </div>
                      <div className="text-ivory-silk text-xs font-medium">Countries</div>
                    </div>

                    {/* Retention Rate Pie Chart */}
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#668b77" strokeWidth="2" opacity="0.3"/>
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#c4b75b" strokeWidth="2" 
                                  strokeDasharray="89, 11" strokeLinecap="round"
                                  className="animate-pulse" style={{animationDelay: '1.5s'}}/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-golden-opal font-bold text-sm">89%</span>
                        </div>
                      </div>
                      <div className="text-ivory-silk text-xs font-medium">Client Retention</div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center bg-golden-opal/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-golden-opal mb-1">
                        <CounterAnimation end={118} duration={1200} suffix="K+" />
                      </div>
                      <div className="text-ivory-silk text-xs">Conversations Started</div>
                    </div>
                    <div className="text-center bg-golden-opal/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-golden-opal mb-1">
                        <CounterAnimation end={12} duration={1200} suffix="+" />
                      </div>
                      <div className="text-ivory-silk text-xs">Years Excellence</div>
                    </div>
                  </div>
                </div>

                {/* Floating Achievements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-golden-opal/30 to-muted-jade/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-golden-opal font-bold text-sm">27+</div>
                    <div className="text-ivory-silk text-xs">Clients</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-muted-jade/30 to-golden-opal/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-muted-jade font-bold text-sm">70+</div>
                    <div className="text-ivory-silk text-xs">Team</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-ivory-silk">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-onyx-black mb-8">
                  Our <span className="text-gradient">Story</span>
                </h2>
                <p className="text-lg text-muted-jade leading-relaxed mb-6">
                  At millionCXO, we believe that every business deserves access to high-quality, meaningful conversations with decision-makers. 
                  Our journey began with a simple observation: too many companies struggle with inconsistent lead generation and low-quality prospects.
                </p>
                <p className="text-lg text-muted-jade leading-relaxed mb-6">
                  We set out to change that by focusing exclusively on human-driven personalised outreach. Human‑led — not automated. To keep your LinkedIn accounts secure. Just strategic, personalized conversations that open doors to real business opportunities.
                </p>
                <p className="text-lg text-muted-jade leading-relaxed">
                  Today, we&apos;re proud to help businesses across the globe connect with the CXOs and decision-makers who can transform their growth trajectory.
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <div className="card-modern">
                <h3 className="text-xl lg:text-2xl font-bold text-onyx-black mb-6">Our Mission</h3>
                <p className="text-lg text-muted-jade leading-relaxed mb-8">
                  To bridge the gap between innovative businesses and the decision-makers who need their solutions, 
                  creating valuable connections that drive mutual success.
                </p>
                
                <h3 className="text-xl lg:text-2xl font-bold text-onyx-black mb-6">Our Vision</h3>
                <p className="text-lg text-muted-jade leading-relaxed">
                  To be the global leader in human-driven B2B appointment setting, known for delivering quality over quantity 
                  and building lasting business relationships.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-petrol-smoke">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-ivory-silk mb-6">
              What Sets Us <span className="text-golden-opal">Apart</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto">
              Our approach combines deep market knowledge with personalized outreach strategies to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Market Insights",
                description: "We leverage deep industry knowledge and market intelligence to identify the right prospects and craft compelling messaging that resonates.Try us before you buy from us. Get your pilot plan to explore your actual potential in the market",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Human-Driven Outreach",
                description: "Every interaction is personalized and authentic. Our team takes the time to understand each prospect's unique challenges and opportunities.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Quality Focus",
                description: "We prioritize meaningful conversations over volume metrics, ensuring every meeting we book has genuine potential for business impact.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="card-glass text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-golden-opal/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-golden-opal/30 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-ivory-silk mb-4 group-hover:text-golden-opal transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-jade leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-imperial-emerald">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-ivory-silk mb-6">
              Mastering Metrics, Delivering <span className="text-golden-opal">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 70, label: "Expert Professionals", suffix: "+" },
              { number: 28, label: "Clients Served", suffix: "+" },
              { number: 13, label: "Countries Reached", suffix: "+" },
              { number: 12, label: "Years of Experience", suffix: "+" }
            ].map((stat, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-golden-opal mb-2">
                    <CounterAnimation
                      end={stat.number}
                      duration={1200}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-ivory-silk font-medium">
                    {stat.label}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section className="py-20 bg-ivory-silk">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-onyx-black mb-6">
              Our Core <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto">
              The principles that guide everything we do and drive our success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                value: "Quality First",
                description: "We prioritize meaningful conversations over volume metrics, ensuring every interaction has genuine potential for business.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                value: "Human-Driven",
                description: "Human‑driven personalised outreach. Zero automation. No bots, no mass‑blasts. 100% accountable humans. Human‑led — not automated. To keep your LinkedIn accounts secure.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                value: "Results-Focused",
                description: "We measure success by the qualified meetings we deliver and the opportunities we create for our clients' businesses.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              }
            ].map((value, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="card-modern text-center">
                  <div className="w-16 h-16 bg-golden-opal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-onyx-black mb-4">{value.value}</h3>
                  <p className="text-muted-jade leading-relaxed">{value.description}</p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-ivory-silk mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-muted-jade mb-8 max-w-2xl mx-auto">
              Let us help you build meaningful connections with the decision-makers who can transform your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-10 py-4">
                Start Your Journey
              </Link>
              <Link href="/services" className="btn-outline text-lg px-10 py-4">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 