import Link from 'next/link'
import CounterAnimation from '@/components/CounterAnimation'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function Services() {
  return (
    <div className="min-h-screen bg-ivory-silk pt-4">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-20 lg:py-32 bg-gradient-to-br from-imperial-emerald to-petrol-smoke overflow-hidden">
        <div className="absolute inset-0 bg-luxury-pattern opacity-30"></div>
        
        <div className="relative container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <div className="animate-fade-in">
                <div className="inline-flex items-center bg-golden-opal/10 rounded-full px-4 py-2 mb-6">
                  <span className="text-golden-opal font-semibold text-sm">Fully Managed Outbound Engine</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-ivory-silk mb-8 leading-tight">
                  Our <span className="text-golden-opal">Services</span>
                </h1>
              </div>
              
              <div className="animate-fade-in-delay">
                <p className="text-xl text-muted-jade mb-8 leading-relaxed">
                  We are a fully managed outbound engine that delivers high-value CXO meetings. 
                  Choose the package that fits your growth stage and scale as needed.
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
                        <CounterAnimation end={118} duration={1200} suffix="K+" />
                      </div>
                      <div className="text-ivory-silk text-sm">Discovery Calls</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-golden-opal mb-2">
                        <CounterAnimation end={30} duration={1200} suffix="" />
                      </div>
                      <div className="text-ivory-silk text-sm">Days to 1st Meeting</div>
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
              Transparent pricing designed to scale with your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pilot Program */}
            <ScrollAnimation>
              <div className="card-modern relative h-full flex flex-col" id="pilot">
                <div className="text-center mb-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-onyx-black mb-2">
                    Pilot Program
                  </h3>
                  <p className="text-golden-opal font-medium">Test Our Capabilities</p>
                </div>
                
                <div className="mb-8 flex-grow">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-golden-opal mb-2">$99</div>
                    <div className="text-muted-jade">per qualified meeting</div>
                    <div className="text-sm text-muted-jade mt-2">Total: $396 upfront</div>
                  </div>
              
                  <div className="border-t border-golden-opal/20 pt-6">
                    <h4 className="font-semibold text-onyx-black mb-3">Deliverable:</h4>
                    <p className="text-muted-jade mb-4">
                      4 Qualified CXO Meetings over 30 days.
                    </p>

                    <h4 className="font-semibold text-onyx-black mb-3 mt-4">Purpose:</h4>
                    <p className="text-muted-jade mb-4">
                      Allows clients to test our capabilities with minimum risk.
                    </p>
                    
                    <h4 className="font-semibold text-onyx-black mb-3 mt-4">Client Responsibilities:</h4>
                    <ul className="text-muted-jade text-sm space-y-2">
                      <li>• Provide business email address (or cost of purchase)</li>
                      <li>• Provide access to LinkedIn Sales Navigator (or subscription cost)</li>
                      <li>• Provide caller ID/virtual dialler (or cover the cost)</li>
                      <li>• Provide CRM or allow us to use our own CRM</li>
                    </ul>

                    <h4 className="font-semibold text-onyx-black mb-3 mt-6">Terms and Conditions:</h4>
                    <ul className="text-muted-jade text-xs space-y-2">
                        <li>• No charges for no-shows.</li>
                        <li>• Refund for any un-booked meetings.</li>
                        <li>• First 15 days for research & audience understanding.</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" className="btn-outline w-full mt-auto">
                  Start Pilot Program
                </Link>
              </div>
            </ScrollAnimation>

            {/* SDR as a Service */}
            <ScrollAnimation delay={200}>
              <div className="card-modern relative h-full flex flex-col ring-2 ring-golden-opal" id="sdr">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-golden-opal text-onyx-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-onyx-black mb-2">
                    SDR as a Service
                  </h3>
                  <p className="text-golden-opal font-medium">Dedicated Full-Time SDR</p>
                </div>
                
                <div className="mb-8 flex-grow">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-golden-opal mb-2">$1,999</div>
                    <div className="text-muted-jade">/month/SDR (quarterly)</div>
                    <div className="text-sm text-muted-jade mt-2">$2,250/month/SDR (monthly)</div>
                  </div>
                  
                  <div className="border-t border-golden-opal/20 pt-6">
                    <h4 className="font-semibold text-onyx-black mb-3">Daily Activity Targets/SDR/day:</h4>
                    <ul className="text-muted-jade text-sm space-y-2 mb-4">
                      <li>• 300 Emails</li>
                      <li>• 150 Cold Calls</li>
                      <li>• 70 In-Mails (via LinkedIn Sales Navigator)</li>
                      <li>• 80 Account & Contact Profiling</li>
                    </ul>
                    
                    <h4 className="font-semibold text-onyx-black mb-2">Meeting KPI:</h4>
                    <p className="text-muted-jade text-sm">
                      5 Qualified, Conducted CXO Meetings per month
                    </p>
                  </div>
                </div>
                
                <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" className="btn-primary w-full mt-auto">
                  Get Started
                </Link>
              </div>
            </ScrollAnimation>

            {/* Consultation & Infrastructure */}
            <ScrollAnimation delay={400}>
              <div className="card-modern relative h-full flex flex-col" id="consultation">
                <div className="text-center mb-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-onyx-black mb-2">
                    Consultation & Infrastructure
                  </h3>
                  <p className="text-golden-opal font-medium">Complete Setup</p>
                </div>
                
                <div className="mb-8 flex-grow">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-golden-opal mb-2">Custom</div>
                    <div className="text-muted-jade">pricing</div>
                  </div>
                  
                  <div className="border-t border-golden-opal/20 pt-6">
                    <h4 className="font-semibold text-onyx-black mb-3">Includes:</h4>
                    <ul className="text-muted-jade text-sm space-y-2">
                      <li>• CRM Setup & Customization (HubSpot, Zoho, etc.)</li>
                      <li>• Email Domain Warm-Up & Deliverability</li>
                      <li>• Email + LinkedIn Outreach Automation</li>
                      <li>• Sales Script Creation (Email, LinkedIn, Calling)</li>
                      <li>• Inbox Management & Lead Routing</li>
                      <li>• SDR SOPs, Cadence Design, Lead Scoring</li>
                      <li>• Tech Stack Implementation (Apollo, Salesloft, etc.)</li>
                      <li>• Weekly Reporting Dashboards & KPI Framework</li>
                      <li>• ChatGPT-Integrated Personalization</li>
                      <li>• ICP & TAM Research Framework</li>
                      <li>• Calendar & Meeting Booking Automation</li>
                      <li>• LinkedIn Profile & Company Page Branding</li>
                      <li>• Data Sources Setup (Apollo, ZoomInfo, Clay, etc.)</li>
                      <li>• Tools Training for Client’s Team</li>
                      <li>• Hiring and Training of Sales Team</li>
                      <li>• Sales SOPs and Policies</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" className="btn-outline w-full mt-auto">
                  Get Custom Quote
                </Link>
              </div>
            </ScrollAnimation>
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
                <div className="card-glass group">
                  <div className="w-16 h-16 bg-golden-opal/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-golden-opal/30 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-ivory-silk mb-4 group-hover:text-golden-opal transition-colors">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 93, label: "Success Rate", suffix: "%" },
              { number: 23, label: "Avg Meetings/Month", suffix: "" },
              { number: 118, label: "Discovery Calls Delivered", suffix: "K+" },
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