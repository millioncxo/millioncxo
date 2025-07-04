import Link from 'next/link'
import CounterAnimation from '@/components/CounterAnimation'

export default function Home() {
  return (
    <main className="min-h-screen bg-luxury-pure-white pt-16">
      {/* Hero Section - True Full Width */}
      <section className="relative py-20 lg:py-32 bg-luxury-pure-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-luxury-pattern opacity-5"></div>
        
        <div className="relative w-full">
          <div className="text-center px-4">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-luxury font-bold text-luxury-deep-black mb-8 leading-tight">
                Scalable. Reliable. 
                <span className="text-luxury-gradient block mt-4">
                  Human-driven outreach for B2B growth.
                </span>
              </h1>
            </div>
            
            <div className="animate-fade-in-delay">
              <p className="text-lg lg:text-xl text-luxury-charcoal mb-12 mx-auto font-luxury-sans leading-relaxed max-w-4xl">
                We offer a comprehensive suite of solutions for B2B outreach and lead generation. 
                This includes customized outreach strategies, dedicated SDR services, and high-impact 
                discovery calls to connect you with decision-makers.
              </p>
            </div>
            
            <div className="animate-fade-in-delay flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <Link 
                href="/contact" 
                className="btn-luxury px-10 py-3 text-lg font-semibold rounded-lg hover-glow transition-all duration-300"
              >
                Request Demo
              </Link>
              <Link 
                href="/contact" 
                className="btn-outline-luxury px-10 py-3 text-lg font-semibold rounded-lg hover-glow transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - True Full Width */}
      <section className="py-20 bg-luxury-cream min-h-[40vh] flex items-center">
        <div className="w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 px-8">
            {[
              { number: 20, label: "Qualified Experts", suffix: "+" },
              { number: 12, label: "Clients Per Month", suffix: "+" },
              { number: 5, label: "Global Partners", suffix: "+" },
              { number: 10, label: "Years Experience", suffix: "+" }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <CounterAnimation
                  end={stat.number}
                  duration={1200}
                  className="text-4xl lg:text-5xl font-display font-black text-luxury-gradient block mb-4"
                  suffix={stat.suffix}
                />
                <div className="text-luxury-charcoal font-luxury-sans text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section - True Full Width */}
      <section className="py-24 bg-luxury-pure-white min-h-screen flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
              Our Services
            </h2>
            <p className="text-lg lg:text-xl text-luxury-charcoal mx-auto font-luxury-sans leading-relaxed max-w-4xl">
              Helping businesses and professionals connect with C-level executives. 
              Empowering organizations with scalable outbound solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Outreach Services */}
            <div className="animate-on-scroll flex flex-col">
              <div className="mb-12">
                <h3 className="text-xl lg:text-2xl font-luxury font-bold text-luxury-deep-black mb-6">
                  Outreach Services
                </h3>
                <p className="text-luxury-charcoal font-luxury-sans mb-8 text-base lg:text-lg">
                  We provide outbound programs that connect you with high-value prospects.
                </p>
              </div>

              <div className="space-y-8 flex-1">
                <div className="bg-luxury-pure-white p-8 rounded-lg hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-110 hover:-translate-y-6 transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
                  {/* Card Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <h4 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black mb-4 group-hover:text-luxury-gold transition-colors duration-300">
                      Starter Package
                    </h4>
                    <ul className="text-luxury-charcoal font-luxury-sans text-base space-y-3 mb-6">
                      <li>• 12 Qualified CXO meetings over 3 months</li>
                      <li>• $99 per meeting</li>
                      <li>• Perfect for pilot programs</li>
                    </ul>
                    <p className="text-sm text-luxury-charcoal font-luxury-sans">
                      Offered to: Startups, SMEs, Growth Companies
                    </p>
                  </div>
                </div>

                <div className="bg-luxury-pure-white p-8 rounded-lg hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_30px_60px_rgba(212,175,55,0.7)] hover:scale-[1.12] hover:-translate-y-8 transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold relative overflow-hidden group">
                  {/* Card Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black group-hover:text-luxury-gold transition-colors duration-300">
                        SDR as a Service
                      </h4>
                      <span className="text-sm bg-luxury-gold text-luxury-deep-black px-4 py-2 rounded-full font-semibold">
                        Most Popular
                      </span>
                    </div>
                    <ul className="text-luxury-charcoal font-luxury-sans text-base space-y-3 mb-6">
                      <li>• Dedicated full-time SDR</li>
                      <li>• $1,999-$2,250 per month</li>
                      <li>• Complete outbound engine</li>
                    </ul>
                    <p className="text-sm text-luxury-charcoal font-luxury-sans">
                      Offered to: Scale-ups, Enterprise Companies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Services */}
            <div className="animate-on-scroll flex flex-col">
              <div className="mb-12">
                <h3 className="text-xl lg:text-2xl font-luxury font-bold text-luxury-deep-black mb-6">
                  Consultation Services
                </h3>
                <p className="text-luxury-charcoal font-luxury-sans mb-8 text-base lg:text-lg">
                  Access our expertise through custom consultation and strategy design.
                </p>
              </div>

              <div className="space-y-8 flex-1">
                <div className="bg-luxury-pure-white p-8 rounded-lg hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-110 hover:-translate-y-6 transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
                  {/* Card Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <h4 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black mb-4 group-hover:text-luxury-gold transition-colors duration-300">
                      Strategy Design
                    </h4>
                    <ul className="text-luxury-charcoal font-luxury-sans text-base space-y-3 mb-6">
                      <li>• Complete lead generation strategy</li>
                      <li>• Sales infrastructure design</li>
                      <li>• Custom outreach playbooks</li>
                    </ul>
                    <p className="text-sm text-luxury-charcoal font-luxury-sans">
                      Offered to: Enterprise, Fortune 500 Companies
                    </p>
                  </div>
                </div>

                <div className="bg-luxury-pure-white p-8 rounded-lg hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-110 hover:-translate-y-6 transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
                  {/* Card Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <h4 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black mb-4 group-hover:text-luxury-gold transition-colors duration-300">
                      Team Training
                    </h4>
                    <ul className="text-luxury-charcoal font-luxury-sans text-base space-y-3 mb-6">
                      <li>• SDR team training programs</li>
                      <li>• Outbound best practices</li>
                      <li>• Performance optimization</li>
                    </ul>
                    <p className="text-sm text-luxury-charcoal font-luxury-sans">
                      Offered to: Sales Teams, Growing Companies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions for Every Stage - True Full Width */}
      <section className="py-24 bg-luxury-cream min-h-screen flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
              Solutions for Every Stage of Growth
            </h2>
            <p className="text-lg lg:text-xl text-luxury-charcoal mx-auto font-luxury-sans leading-relaxed max-w-4xl">
              We work with startups, scale-ups, and enterprises to identify prospects, 
              connect with decision-makers, and accelerate business growth.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: "Startups & SMEs",
                description: "Pilot programs and discovery call packages to validate your market and connect with early customers.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: "Scale-ups & Growth Companies",
                description: "Dedicated SDR services and full outbound engines to systematically grow your pipeline.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                )
              },
              {
                title: "Enterprise & Fortune 500",
                description: "Custom consultation and team training to optimize your existing sales infrastructure.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              }
            ].map((solution, index) => (
              <div key={index} className="text-center animate-on-scroll bg-luxury-pure-white p-10 rounded-lg hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.12] hover:-translate-y-6  transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
                {/* Card Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="mb-8 w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto group-hover:scale-125 group-hover:shadow-[0_15px_30px_rgba(212,175,55,0.5)] transition-all duration-500">
                    {solution.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black mb-6 group-hover:text-luxury-gold transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-luxury-charcoal font-luxury-sans leading-relaxed text-base group-hover:text-luxury-charcoal transition-colors duration-300">
                    {solution.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Results - True Full Width */}
      <section className="py-24 bg-luxury-pure-white min-h-[80vh] flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
              Proven Results That Matter
            </h2>
            <p className="text-lg lg:text-xl text-luxury-charcoal mx-auto font-luxury-sans leading-relaxed max-w-4xl">
              We&apos;ve connected businesses with decision-makers through trusted outreach and human-driven strategies.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="animate-on-scroll">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <CounterAnimation
                    end={1.9}
                    duration={1000}
                    className="text-3xl lg:text-4xl font-display font-black text-luxury-gradient block mb-3"
                    suffix="M+"
                    decimals={1}
                  />
                  <div className="text-luxury-charcoal font-luxury-sans text-base">
                    Discovery Calls Delivered
                  </div>
                </div>
                <div className="text-center">
                  <CounterAnimation
                    end={600}
                    duration={1000}
                    className="text-3xl lg:text-4xl font-display font-black text-luxury-gradient block mb-3"
                    suffix="+"
                  />
                  <div className="text-luxury-charcoal font-luxury-sans text-base">
                    Clients Served
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <CounterAnimation
                    end={13}
                    duration={1000}
                    className="text-3xl lg:text-4xl font-display font-black text-luxury-gradient block mb-3"
                    suffix="+"
                  />
                  <div className="text-luxury-charcoal font-luxury-sans text-base">
                    Years of Excellence
                  </div>
                </div>
                <div className="text-center">
                  <CounterAnimation
                    end={70}
                    duration={1000}
                    className="text-3xl lg:text-4xl font-display font-black text-luxury-gradient block mb-3"
                    suffix="+"
                  />
                  <div className="text-luxury-charcoal font-luxury-sans text-base">
                    Expert Team Members
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - True Full Width */}
      <section className="py-24 bg-luxury-cream min-h-screen flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
              You&apos;re in Good Company
            </h2>
            <p className="text-lg lg:text-xl text-luxury-charcoal mx-auto font-luxury-sans leading-relaxed max-w-4xl">
                              Trusted by businesses across sectors. Here&apos;s what they have to say.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                quote: "millionCXO helped us triple our discovery calls in just two months. Every meeting was with a relevant decision-maker.",
                author: "Jenifer Cohen",
                role: "CEO"
              },
              {
                quote: `We've tried multiple outbound solutions, but millionCXO is the first that delivered exactly what they promised.`,
                author: "Maria Goncavales",
                role: "VP Sales"
              },
              {
                quote: "Their 1:1 outreach model gave us a steady flow of qualified CXO meetings with real-time performance tracking.",
                author: "Michael Soveign",
                role: "Director"
              }
            ].map((testimonial, index) => (
              <div key={index} className="animate-on-scroll bg-luxury-pure-white p-8 rounded-lg hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.08] hover:-translate-y-4 transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
                {/* Card Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="text-4xl text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-300">&ldquo;</div>
                  <blockquote className="text-luxury-charcoal font-luxury-sans leading-relaxed mb-8 text-base group-hover:text-luxury-charcoal transition-colors duration-300">
                    {testimonial.quote}
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-luxury-deep-black font-semibold text-base">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-luxury-deep-black font-semibold text-base group-hover:text-luxury-gold transition-colors duration-300">
                        {testimonial.author}
                      </div>
                      <div className="text-luxury-charcoal text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            Take the next step with human-driven outreach that delivers results. 
            Launch your journey with our proven B2B solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/contact" 
              className="btn-luxury px-10 py-3 text-lg font-semibold rounded-lg hover-glow transition-all duration-300"
            >
              Get Started
            </Link>
            <a 
              href="mailto:info@millioncxo.com"
              className="btn-outline-luxury px-10 py-3 text-lg font-semibold rounded-lg hover-glow transition-all duration-300"
            >
              info@millioncxo.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
} 