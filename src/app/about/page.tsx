import Link from 'next/link'
import CounterAnimation from '@/components/CounterAnimation'

export default function About() {
  return (
    <main className="min-h-screen bg-luxury-pure-white pt-16">
      {/* Hero Section - True Full Width */}
      <section className="relative py-20 lg:py-32 bg-luxury-pure-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-luxury-pattern opacity-5"></div>
        
        <div className="relative w-full">
          <div className="text-center px-4">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-luxury font-bold text-luxury-deep-black mb-8 leading-tight">
                The Journey to 
                <span className="text-luxury-gradient block mt-4">
                  millionCXOs
                </span>
              </h1>
            </div>
            
            <div className="animate-fade-in-delay">
              <p className="text-lg lg:text-xl text-luxury-gold mb-8 font-luxury font-medium">
                Empowering you to connect with decision makers
              </p>
              <p className="text-lg lg:text-xl text-luxury-charcoal mb-8 mx-auto font-luxury-sans leading-relaxed max-w-4xl">
                Through a combination of market insights, human-driven outreach, and relentless focus on quality conversations, 
                we help you build a predictable and scalable pipeline of new business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - True Full Width */}
      <section className="py-24 bg-luxury-cream min-h-screen flex items-center">
        <div className="w-full px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
                Our Story
              </h2>
              <p className="text-base lg:text-lg text-luxury-charcoal leading-relaxed mb-6 font-luxury-sans">
                At millionCXO, we believe that every business deserves access to high-quality, meaningful conversations with decision-makers. 
                Our journey began with a simple observation: too many companies struggle with inconsistent lead generation and low-quality prospects.
              </p>
              <p className="text-base lg:text-lg text-luxury-charcoal leading-relaxed mb-6 font-luxury-sans">
                We set out to change that by focusing exclusively on human-driven outreach. No automation, no mass emails, no generic approaches. 
                Just strategic, personalized conversations that open doors to real business opportunities.
              </p>
              <p className="text-base lg:text-lg text-luxury-charcoal leading-relaxed font-luxury-sans">
                Today, we&apos;re proud to help businesses across the globe connect with the CXOs and decision-makers who can transform their growth trajectory.
              </p>
            </div>
            
            <div className="animate-on-scroll">
              <div className="bg-luxury-pure-white p-8 rounded-2xl shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.08] hover:-translate-y-4  transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
                {/* Card Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl lg:text-2xl font-luxury font-bold text-luxury-deep-black mb-6 group-hover:text-luxury-gold transition-colors duration-300">Our Mission</h3>
                  <p className="text-base lg:text-lg text-luxury-charcoal leading-relaxed mb-8 font-luxury-sans">
                    To bridge the gap between innovative businesses and the decision-makers who need their solutions, 
                    creating valuable connections that drive mutual success.
                  </p>
                  <h3 className="text-xl lg:text-2xl font-luxury font-bold text-luxury-deep-black mb-6 group-hover:text-luxury-gold transition-colors duration-300">Our Vision</h3>
                  <p className="text-base lg:text-lg text-luxury-charcoal leading-relaxed font-luxury-sans">
                    To be the global leader in human-driven B2B appointment setting, known for delivering quality over quantity 
                    and building lasting business relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart - True Full Width */}
      <section className="py-24 bg-luxury-pure-white min-h-screen flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
              What Sets Us Apart
            </h2>
            <p className="text-lg lg:text-xl text-luxury-charcoal mx-auto font-luxury-sans leading-relaxed max-w-4xl">
              Our approach combines deep market knowledge with personalized outreach strategies to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: "Market Insights",
                description: "We leverage deep industry knowledge and market intelligence to identify the right prospects and craft compelling messaging that resonates.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Human-Driven Outreach",
                description: "Every interaction is personalized and authentic. Our team takes the time to understand each prospect&apos;s unique challenges and opportunities.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Quality Focus",
                description: "We prioritize meaningful conversations over volume metrics, ensuring every meeting we book has genuine potential for business impact.",
                icon: (
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="text-center animate-on-scroll bg-luxury-pure-white p-10 rounded-xl hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.12] hover:-translate-y-6  transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
                {/* Card Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="mb-8 w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto group-hover:scale-125 group- group-hover:shadow-[0_15px_30px_rgba(212,175,55,0.5)] transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black mb-6 group-hover:text-luxury-gold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-luxury-charcoal font-luxury-sans leading-relaxed text-base group-hover:text-luxury-charcoal transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - True Full Width */}
      <section className="py-24 bg-luxury-deep-black min-h-[80vh] flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-pure-white mb-8">
              Mastering Metrics, Delivering Values
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {[
              { number: 20, label: "Qualified Experts", suffix: "+" },
              { number: 12, label: "Clients Per Month", suffix: "+" },
              { number: 5, label: "Global Business Partners", suffix: "+" },
              { number: 13, label: "Years of Experience", suffix: "+" }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <CounterAnimation
                  end={stat.number}
                  duration={1200}
                  className="text-3xl lg:text-4xl font-display font-black text-luxury-gradient block mb-3"
                  suffix={stat.suffix}
                />
                <div className="text-luxury-cream font-luxury-sans text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - True Full Width */}
      <section className="py-24 bg-luxury-cream min-h-[60vh] flex items-center">
        <div className="w-full px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg lg:text-xl text-luxury-charcoal mb-12 font-luxury-sans mx-auto max-w-4xl">
            Let us help you build meaningful connections with the decision-makers who can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/contact" 
              className="btn-luxury px-10 py-3 text-lg font-semibold rounded-lg hover-glow transition-all duration-300"
            >
              Start Your Journey
            </Link>
            <Link 
              href="/services" 
              className="btn-outline-luxury px-10 py-3 text-lg font-semibold rounded-lg hover-glow transition-all duration-300"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
} 