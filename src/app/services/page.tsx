import Link from 'next/link'
import CounterAnimation from '@/components/CounterAnimation'

export default function Services() {
  return (
    <main className="min-h-screen bg-luxury-pure-white pt-16">
      {/* Hero Section - True Full Width */}
      <section className="relative py-20 lg:py-32 bg-luxury-pure-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-luxury-pattern opacity-5"></div>
        
        <div className="relative w-full">
          <div className="text-center px-4">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-luxury font-bold text-luxury-deep-black mb-8 leading-tight">
                Our Services
              </h1>
            </div>
            
            <div className="animate-fade-in-delay">
              <p className="text-lg lg:text-xl text-luxury-charcoal mb-12 mx-auto font-luxury-sans leading-relaxed max-w-4xl">
                We are a fully managed outbound engine that delivers high-value CXO meetings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages Section - True Full Width */}
      <section className="py-24 bg-luxury-cream min-h-screen flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
              Choose Your Growth Package
            </h2>
            <p className="text-lg lg:text-xl text-luxury-charcoal mx-auto font-luxury-sans leading-relaxed max-w-4xl">
              Transparent pricing designed to scale with your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto items-stretch">
            {/* Starter Package */}
            <div className="bg-luxury-pure-white p-8 rounded-2xl hover-lift animate-on-scroll hover:border-luxury-gold border-2 border-luxury-gold/30 transition-all duration-500 flex flex-col shadow-2xl shadow-black/25 hover:shadow-[0_30px_60px_rgba(212,175,55,0.7)] hover:scale-110 hover:-translate-y-8 relative overflow-hidden group h-full">
              {/* Card Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-xl lg:text-2xl font-luxury font-semibold text-luxury-deep-black mb-2">
                    Starter Package
                  </h3>
                  <p className="text-luxury-gold font-medium font-luxury-sans">(Pilot)</p>
                </div>
                
                <div className="mb-8 flex-grow">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-luxury-gold mb-2">$99</div>
                    <div className="text-luxury-charcoal font-luxury-sans">per meeting</div>
                    <div className="text-sm text-luxury-charcoal mt-2 font-luxury-sans">($1,188 over 3 months)</div>
                  </div>
                  
                  <div className="border-t border-luxury-gold/20 pt-6">
                    <h4 className="font-semibold text-luxury-deep-black mb-3 font-luxury">Deliverable:</h4>
                    <p className="text-luxury-charcoal mb-4 font-luxury-sans">
                      12 Qualified CXO meetings
                    </p>
                    <p className="text-luxury-charcoal font-luxury-sans">
                      Perfect for pilot programs
                    </p>
                  </div>
                </div>
                
                <Link
                  href="/contact"
                  className="w-full btn-luxury text-center py-3 rounded-lg font-semibold block hover-glow transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* SDR as a Service */}
            <div className="bg-luxury-pure-white p-8 rounded-2xl hover-lift animate-on-scroll relative border-2 border-luxury-gold/30 hover:border-luxury-gold flex flex-col shadow-2xl shadow-black/25 hover:shadow-[0_35px_70px_rgba(212,175,55,0.8)] hover:scale-[1.15] hover:-translate-y-10 transition-all duration-500 overflow-hidden group h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-luxury-gold text-luxury-deep-black px-4 py-1 rounded-full text-sm font-semibold z-20">
                Most Popular
              </div>
              
              {/* Card Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-xl lg:text-2xl font-luxury font-semibold text-luxury-deep-black mb-2">
                    SDR as a Service
                  </h3>
                </div>
                
                <div className="mb-8 flex-grow">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-luxury-gold mb-2">$1,999</div>
                    <div className="text-luxury-charcoal font-luxury-sans">per month</div>
                    <div className="text-sm text-luxury-charcoal mt-2 font-luxury-sans">(quarterly contract)</div>
                  </div>
                  
                  <div className="border-t border-luxury-gold/20 pt-6">
                    <h4 className="font-semibold text-luxury-deep-black mb-3 font-luxury">Deliverable:</h4>
                    <p className="text-luxury-charcoal mb-4 font-luxury-sans">
                      Dedicated full-time SDR
                    </p>
                    <p className="text-luxury-charcoal font-luxury-sans">
                      Complete outbound engine
                    </p>
                  </div>
                </div>
                
                <Link
                  href="/contact"
                  className="w-full btn-luxury text-center py-3 rounded-lg font-semibold block hover-glow transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Consultation & Infrastructure */}
            <div className="bg-luxury-pure-white p-8 rounded-2xl hover-lift animate-on-scroll hover:border-luxury-gold border-2 border-luxury-gold/30 transition-all duration-500 flex flex-col shadow-2xl shadow-black/25 hover:shadow-[0_30px_60px_rgba(212,175,55,0.7)] hover:scale-110 hover:-translate-y-8 relative overflow-hidden group h-full">
              {/* Card Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-xl lg:text-2xl font-luxury font-semibold text-luxury-deep-black mb-2">
                    Consultation & Infrastructure Setup
                  </h3>
                </div>
                
                <div className="mb-8 flex-grow">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-luxury-gold mb-2">Custom</div>
                    <div className="text-luxury-charcoal font-luxury-sans">pricing</div>
                  </div>
                  
                  <div className="border-t border-luxury-gold/20 pt-6">
                    <h4 className="font-semibold text-luxury-deep-black mb-3 font-luxury">Deliverable:</h4>
                    <p className="text-luxury-charcoal mb-4 font-luxury-sans">
                      Complete sales infrastructure
                    </p>
                    <p className="text-luxury-charcoal font-luxury-sans">
                      Custom strategy design
                    </p>
                  </div>
                </div>
                
                <Link
                  href="/contact"
                  className="w-full btn-luxury text-center py-3 rounded-lg font-semibold block hover-glow transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver Section - True Full Width */}
      <section className="py-24 bg-luxury-pure-white min-h-screen flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
              What We Deliver
            </h2>
            <p className="text-lg lg:text-xl text-luxury-charcoal mx-auto font-luxury-sans leading-relaxed max-w-4xl">
              Complete B2B lead generation solutions designed to maximize your ROI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: "B2B Appointment Setting",
                description: "Our experienced B2B Appointment Setting experts comprehend the triggers that produce quality leads and meetings that your sales team will acknowledge and close.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Lead Nurturing",
                description: "In B2B Lead Generation, we understand that quantity and quality are essential. However, quality is always the priority. Less time is taken to nurture unproductive leads, ensuring a higher conversion rate.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: "Sales as a Service",
                description: "millionCXO helps you create lead lists, launch campaigns to attract potential clients, set appointments, close deals, and facilitate the onboarding process for new clients.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0V4a2 2 0 00-2-2H10a2 2 0 00-2 2v2m0 12V10a2 2 0 012-2h4a2 2 0 012 2v8a2 2 0 01-2 2h-4a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Digital Marketing",
                description: "As a top digital marketing firm, millionCXO gives your B2B company a competitive edge by helping you gain new leads, strengthen your online presence, and drive ROI.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Research as a Service",
                description: "We provide a blend of B2B lead generation, consultative meetings with research analysts, leveraging internal and external data sources, and a pay-for-use model.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Account Based Marketing",
                description: "Targeted marketing approach that focuses on specific high-value accounts to drive engagement and conversion rates through personalized campaigns.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <div key={index} className="text-center animate-on-scroll bg-luxury-pure-white p-8 rounded-xl hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.12] hover:-translate-y-6 transition-all duration-500 relative overflow-hidden group border-2 border-luxury-gold/30 hover:border-luxury-gold/80">
                {/* Card Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="mb-8 w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto group-hover:scale-125 group-hover:shadow-[0_15px_30px_rgba(212,175,55,0.5)] transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black mb-6 group-hover:text-luxury-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-luxury-charcoal font-luxury-sans leading-relaxed text-base group-hover:text-luxury-charcoal transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section - True Full Width */}
      <section className="py-24 bg-luxury-cream min-h-screen flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
              Simple Steps, Powerful Outcomes
            </h2>
            <p className="text-lg lg:text-xl text-luxury-charcoal mx-auto font-luxury-sans leading-relaxed max-w-4xl">
              From understanding your unique needs to delivering certified outcomes - our 4-step process ensures every meeting counts and every campaign delivers real impact.
            </p>
          </div>

          {/* Premium Milestone Timeline */}
          <div className="max-w-7xl mx-auto relative">
            {/* Premium Timeline Base */}
            <div className="hidden lg:block absolute top-20 left-0 w-full h-2 bg-gradient-to-r from-luxury-gold/20 via-luxury-gold/40 to-luxury-gold/20 rounded-full">
              <div className="h-full bg-gradient-to-r from-luxury-gold via-luxury-gold to-luxury-gold/80 rounded-full animate-timeline-progress shadow-lg"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: "01",
                  title: "Discovery & Strategy",
                  description: "We analyze your business, target market, and goals to create a customized outreach strategy.",
                  icon: "🎯"
                },
                {
                  step: "02", 
                  title: "Research & Planning",
                  description: "Our team conducts deep research to identify and qualify the right decision-makers for your business.",
                  icon: "🔍"
                },
                {
                  step: "03",
                  title: "Outreach Execution",
                  description: "We execute personalized, human-driven outreach campaigns to connect with your ideal prospects.",
                  icon: "🚀"
                },
                {
                  step: "04",
                  title: "Meeting Delivery",
                  description: "We schedule and deliver qualified meetings with decision-makers ready to engage with your solutions.",
                  icon: "🎉"
                }
              ].map((process, index) => (
                <div key={index} className="text-center animate-on-scroll group relative">
                  {/* Premium Milestone Marker */}
                  <div className="mb-8 relative">
                    {/* Outer Ring */}
                    <div className="w-20 h-20 bg-gradient-to-br from-luxury-gold to-luxury-gold/80 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-[0_20px_40px_rgba(212,175,55,0.6)] transition-all duration-500 animate-milestone-glow group-hover:scale-125">
                      {/* Inner Circle */}
                      <div className="w-16 h-16 bg-luxury-deep-black rounded-full flex items-center justify-center relative overflow-hidden">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        {/* Step Number */}
                        <span className="text-xl font-bold text-luxury-gold font-luxury relative z-10">
                          {process.step}
                        </span>
                      </div>
                    </div>
                    

                  </div>
                  
                  {/* Premium Content Card */}
                  <div className="bg-luxury-pure-white rounded-xl p-6 shadow-2xl shadow-black/25 group-hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] transition-all duration-500 border-2 border-luxury-gold/30 group-hover:border-luxury-gold/80 group-hover:scale-[1.08] group-hover:-translate-y-4 relative overflow-hidden">
                    {/* Card Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                        {process.title}
                      </h3>
                      <p className="text-luxury-charcoal/80 font-luxury-sans leading-relaxed text-sm lg:text-base group-hover:text-luxury-charcoal transition-colors duration-300">
                        {process.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Premium Step Label */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-luxury-gold to-luxury-gold/80 text-luxury-deep-black px-3 py-1 rounded-full text-xs font-bold font-luxury shadow-lg">
                    STEP {process.step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - True Full Width */}
      <section className="py-24 bg-luxury-deep-black min-h-[60vh] flex items-center">
        <div className="w-full px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-pure-white mb-8">
            Ready to Transform Your Outreach?
          </h2>
          <p className="text-lg lg:text-xl text-luxury-cream mb-12 font-luxury-sans mx-auto max-w-4xl">
            Choose the perfect package for your business needs and start connecting with decision-makers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/contact" 
              className="btn-luxury px-10 py-3 text-lg font-semibold rounded-lg hover-glow transition-all duration-300"
            >
              Get Started Today
            </Link>
            <Link 
              href="/contact" 
              className="btn-outline-luxury px-10 py-3 text-lg font-semibold rounded-lg hover-glow transition-all duration-300"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
} 