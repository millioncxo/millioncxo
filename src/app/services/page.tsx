import Link from 'next/link'
import CounterAnimation from '@/components/CounterAnimation'
import ScrollAnimation from '@/components/ScrollAnimation'
import { Mail, Phone, BarChart3, Calendar, Target, FileSearch, Shield, DollarSign, Check, Users, TrendingUp } from 'lucide-react'

export default function Services() {
  return (
    <div className="bg-ivory-silk">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pb-20 lg:pb-32 bg-gradient-to-br from-imperial-emerald to-petrol-smoke overflow-hidden">
        <div className="absolute inset-0 bg-luxury-pattern opacity-30"></div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <div className="animate-fade-in">
                <div className="inline-flex items-center bg-golden-opal/10 rounded-full px-4 py-2 mb-6">
                  <span className="text-golden-opal font-semibold text-sm">Proudly Human‑Driven • Human‑Driven Personalised Outreach</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-ivory-silk mb-8 leading-tight">
                  LinkedIn Outreach <span className="text-golden-opal">Services</span>
                </h1>
              </div>
              
              <div className="animate-fade-in-delay">
                <p className="text-xl text-muted-jade mb-8 leading-relaxed">
                  Human‑led LinkedIn outreach that delivers real CXO conversations. 
                  Research‑based, not random spam. Choose the package that fits your growth stage.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                    Get Your Custom Quote
                  </Link>
                  <Link href="/about" className="btn-outline text-lg px-8 py-4">
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Visuals */}
            <div className="relative">
              <div className="animate-fade-in-delay">
                {/* Main Visual Container */}
                <div className="relative bg-ivory-silk/10 backdrop-blur-sm rounded-2xl p-8 border border-golden-opal/20">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-golden-opal mb-2">
                        <CounterAnimation end={93} duration={1200} suffix="%" />
                      </div>
                      <div className="text-ivory-silk text-sm">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-golden-opal mb-2">
                        <CounterAnimation end={23} duration={1200} suffix="" />
                      </div>
                      <div className="text-ivory-silk text-sm">Avg Meetings/Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-golden-opal mb-2">
                        <CounterAnimation end={30} duration={1200} suffix="" />
                      </div>
                      <div className="text-ivory-silk text-sm">Days to 1st Meeting</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-golden-opal mb-2">
                        <CounterAnimation end={28} duration={1200} suffix="+" />
                      </div>
                      <div className="text-ivory-silk text-sm">Clients</div>
                    </div>
                  </div>

                  {/* Service Process Visual */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-golden-opal rounded-full flex items-center justify-center">
                        <span className="text-onyx-black font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-golden-opal/30 rounded-full">
                          <div className="h-2 bg-golden-opal rounded-full w-full animate-pulse"></div>
                        </div>
                      </div>
                      <span className="text-ivory-silk text-sm">Strategy</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-golden-opal rounded-full flex items-center justify-center">
                        <span className="text-onyx-black font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-golden-opal/30 rounded-full">
                          <div className="h-2 bg-golden-opal rounded-full w-4/5 animate-pulse"></div>
                        </div>
                      </div>
                      <span className="text-ivory-silk text-sm">Research</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-golden-opal rounded-full flex items-center justify-center">
                        <span className="text-onyx-black font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-golden-opal/30 rounded-full">
                          <div className="h-2 bg-golden-opal rounded-full w-3/5 animate-pulse"></div>
                        </div>
                      </div>
                      <span className="text-ivory-silk text-sm">Outreach</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-golden-opal rounded-full flex items-center justify-center">
                        <span className="text-onyx-black font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-golden-opal/30 rounded-full">
                          <div className="h-2 bg-golden-opal rounded-full w-2/5 animate-pulse"></div>
                        </div>
                      </div>
                      <span className="text-ivory-silk text-sm">Meetings</span>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-golden-opal/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-10 h-10 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-muted-jade/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-8 h-8 text-muted-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages Section */}
      <section className="py-20 bg-ivory-silk">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-onyx-black mb-6">
              Choose Your <span className="text-gradient">Growth Package</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto">
              Simple, transparent pricing for every growth stage
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* LinkedIn Followers Boost */}
            <div className="bg-ivory-silk/90 border border-golden-opal/20 rounded-2xl shadow-lg flex flex-col items-center text-center p-8 h-full">
              <span className="text-golden-opal font-bold text-lg mb-2">LINKEDIN FOLLOWERS BOOST</span>
              <div className="text-3xl font-bold text-onyx-black mb-2">$499<span className="text-base font-medium text-muted-jade">/month</span></div>
              <div className="text-muted-jade mb-4 text-sm">Build brand authority, one follower at a time</div>
              <ul className="mb-6 space-y-2 text-left w-full max-w-xs mx-auto flex-grow">
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> 10,000+ targeted followers per month</li>
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> Organic growth strategy</li>
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> Content optimization for your brand</li>
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> Engagement boost</li>
              </ul>
              <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className="btn-outline w-full">Book a Demo call!</Link>
            </div>
            
            {/* LinkedIn Outreach Excellence 20X - CENTER */}
            <div className="bg-ivory-silk/90 border-2 border-golden-opal rounded-2xl shadow-xl flex flex-col items-center text-center p-8 relative h-full">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-golden-opal text-onyx-black px-4 py-1 rounded-full text-xs font-bold shadow">Most Popular</span>
              <span className="text-golden-opal font-bold text-lg mb-2">LINKEDIN OUTREACH EXCELLENCE 20X</span>
              <div className="text-3xl font-bold text-onyx-black mb-2">$250<span className="text-base font-medium text-muted-jade">/license</span></div>
              <div className="text-muted-jade mb-4 text-sm">License-based LinkedIn scaling</div>
              <ul className="mb-6 space-y-2 text-left w-full max-w-xs mx-auto flex-grow">
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> 1,000 InMails per license per month</li>
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> 4 guaranteed prospects per license per month</li>
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> Research-based outreach using LinkedIn activity </li>
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> 100% money-back guaranteed if your account gets blocked</li>
                
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> Zero additional tool costs</li>
              </ul>
              <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className="btn-primary w-full">Book a Demo call!</Link>
            </div>
            
            {/* SDR as a Service */}
            <div className="bg-ivory-silk/90 border border-golden-opal/20 rounded-2xl shadow-lg flex flex-col items-center text-center p-8 h-full">
              <span className="text-golden-opal font-bold text-lg mb-2">SDR AS A SERVICE</span>
              <div className="text-3xl font-bold text-onyx-black mb-2">$2,000<span className="text-base font-medium text-muted-jade">/month</span></div>
              <div className="text-muted-jade mb-4 text-sm">Full-time SDR, 4+ CXO meetings/month</div>
              <ul className="mb-6 space-y-2 text-left w-full max-w-xs mx-auto flex-grow">
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> 200+ emails/day</li>
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> 150+ cold calls/day</li>
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> 80 ICP profiles researched/day</li>
                <li className="flex items-start text-muted-jade text-sm"><span className="mt-1 mr-2 text-golden-opal">•</span> Target: 4 qualified CXO meetings/month</li>
              </ul>
              <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className="btn-outline w-full">Book a Demo call!</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver Section */}
      <section className="py-20 bg-petrol-smoke">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-ivory-silk mb-6">
              What We <span className="text-golden-opal">Deliver</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto">
              Complete B2B lead generation solutions designed to maximize your ROI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "B2B Appointment Setting",
                description: "Our experienced B2B Appointment Setting experts comprehend the triggers that produce quality leads and meetings that your sales team will acknowledge and close.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Lead Nurturing",
                description: "In B2B Lead Generation, we understand that quantity and quality are essential. However, quality is always the priority. Less time is taken to nurture unproductive leads, ensuring a higher conversion rate.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: "Sales as a Service",
                description: "millionCXO helps you create lead lists, launch campaigns to attract potential clients, set appointments, close deals, and facilitate the onboarding process for new clients.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Market Research",
                description: "Deep market analysis and competitor research to identify the best opportunities and positioning strategies for your outreach campaigns.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "Campaign Optimization",
                description: "Continuous monitoring and optimization of your outreach campaigns based on real-time performance data and market feedback.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                )
              },
              {
                title: "CRM Integration",
                description: "Seamless integration with your existing CRM and sales tools to ensure smooth lead handoff and complete tracking visibility.",
                icon: (
                  <svg className="w-8 h-8 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="card-glass group h-full flex flex-col">
                  <div className="w-16 h-16 bg-golden-opal/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-golden-opal/30 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-ivory-silk mb-4 group-hover:text-golden-opal transition-colors">
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

      {/* Process Section */}
      <section className="py-20 bg-imperial-emerald">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-ivory-silk mb-6">
              Our Proven <span className="text-golden-opal">Process</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto">
              A systematic approach that consistently delivers results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                description: "We analyze your business, ideal customer profile, and market positioning to create a tailored outreach strategy."
              },
              {
                step: "02",
                title: "Prospect Research",
                description: "Our team identifies and researches high-value prospects who match your ideal customer criteria."
              },
              {
                step: "03",
                title: "Personalized Outreach",
                description: "We craft and execute personalized campaigns across multiple channels to engage your prospects."
              },
              {
                step: "04",
                title: "Meeting Coordination",
                description: "We qualify interested prospects and coordinate meetings directly with your sales team."
              }
            ].map((process, index) => (
              <ScrollAnimation key={index} delay={index * 150}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-golden-opal rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-onyx-black font-bold text-lg">{process.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-ivory-silk mb-4">{process.title}</h3>
                  <p className="text-muted-jade leading-relaxed">{process.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-ivory-silk">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-onyx-black mb-6">
              Success <span className="text-gradient">Metrics</span>
            </h2>
            <p className="text-xl text-muted-jade max-w-3xl mx-auto">
              Real results that drive business growth
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { number: 93, label: "Success Rate", suffix: "%" },
              { number: 23, label: "Avg Meetings/Month", suffix: "" },
              { number: 30, label: "Days to First Meeting", suffix: "" }
            ].map((metric, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-golden-opal mb-2">
                    <CounterAnimation
                      end={metric.number}
                      duration={1200}
                      suffix={metric.suffix}
                    />
                  </div>
                  <div className="text-muted-jade font-medium">
                    {metric.label}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-petrol-smoke">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-ivory-silk mb-6">
              Frequently Asked <span className="text-golden-opal">Questions</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Which package is right for my business?",
                answer: "The Pilot Program is perfect for testing our service. Most growing businesses choose SDR as a Service for dedicated support, while enterprises opt for custom consultation and infrastructure setup."
              },
              {
                question: "How do you ensure meeting quality?",
                answer: "We use a rigorous qualification process, focusing on decision-makers with budget, authority, need, and timeline (BANT) before scheduling any meetings."
              },
              {
                question: "What industries do you serve?",
                answer: "We work across all B2B industries including SaaS, consulting, manufacturing, financial services, healthcare, and technology."
              },
              {
                question: "Can I upgrade or downgrade my package?",
                answer: "Yes, you can adjust your package at any time based on your business needs and growth stage."
              },
              {
                question: "What's included in the setup process?",
                answer: "We handle everything: strategy development, prospect research, messaging creation, campaign setup, and CRM integration."
              },
              {
                question: "How do you measure success?",
                answer: "Success is measured by qualified meetings booked, meeting attendance rates, and ultimately the sales opportunities generated from our efforts."
              }
            ].map((faq, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="card-glass">
                  <h3 className="text-lg font-semibold text-ivory-silk mb-3">{faq.question}</h3>
                  <p className="text-muted-jade">{faq.answer}</p>
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
              Ready to Start Generating Qualified Meetings?
            </h2>
            <p className="text-xl text-muted-jade mb-8 max-w-2xl mx-auto">
              Choose your package and start connecting with decision-makers who need your solution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-10 py-4">
                Get Your Custom Quote
              </Link>
              <Link href="/about" className="btn-outline text-lg px-10 py-4">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 