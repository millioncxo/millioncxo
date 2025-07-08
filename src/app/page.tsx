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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              <div className="animate-fade-in">
                <div className="inline-flex items-center bg-golden-opal/10 rounded-full px-4 py-2 mb-6">
                  <span className="text-golden-opal font-semibold text-sm">118K+ Discovery Calls Delivered</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-onyx-black leading-tight">
                  Get 
                  <span className="block text-gradient">
                    <FlippingText 
                      words={['10+ Meetings', 'Qualified Leads', 'CXO Calls', 'Sales Opportunities']}
                      className="text-gradient"
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
                <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
                  <span>Get Your First 5 Meetings</span>
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
                  <span className="ml-3 text-muted-jade font-medium">28+ Happy Clients</span>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-golden-opal mb-2">
                <CounterAnimation end={118} suffix="K+" />
              </div>
              <div className="text-ivory-silk font-medium">Discovery Calls</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-golden-opal mb-2">
                <CounterAnimation end={93} suffix="%" />
              </div>
              <div className="text-ivory-silk font-medium">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-golden-opal mb-2">
                <CounterAnimation end={28} suffix="+" />
              </div>
              <div className="text-ivory-silk font-medium">Clients</div>
            </div>
            <div className="text-center">
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
                step: "01"
              },
              {
                title: "Prospect Identification",
                description: "Find decision-makers with budget, authority, and need",
                step: "02"
              },
              {
                title: "Strategic Outreach",
                description: "Personalized, human-crafted messages that get responses",
                step: "03"
              },
              {
                title: "Meeting Coordination",
                description: "Schedule qualified discovery calls with interested prospects",
                step: "04"
              },
              {
                title: "Performance Tracking",
                description: "Real-time analytics and optimization for maximum ROI",
                step: "05"
              },
              {
                title: "Scale & Optimize",
                description: "Expand successful campaigns across multiple channels",
                step: "06"
              }
            ].map((service, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="card-modern group relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-golden-opal/20 font-bold text-2xl">
                    {service.step}
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
                name: "Starter",
                price: "$99",
                unit: "per meeting",
                description: "Perfect for testing our service",
                features: [
                  "5 qualified meetings",
                  "Basic targeting",
                  "Email outreach",
                  "Weekly reporting",
                  "CRM integration",
                  "Email support"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$1,999",
                unit: "per month",
                description: "Our most popular package",
                features: [
                  "15-25 qualified meetings",
                  "Advanced targeting",
                  "Multi-channel outreach",
                  "Dedicated SDR",
                  "Real-time dashboard",
                  "Monthly strategy calls"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                unit: "pricing",
                description: "For scaling organizations",
                features: [
                  "50+ qualified meetings",
                  "Multiple SDRs",
                  "Custom integrations",
                  "Priority support",
                  "Custom reporting",
                  "Dedicated success manager"
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Link href="/contact" className={plan.popular ? 'btn-primary w-full' : 'btn-outline w-full'}>
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
                  <div className="text-golden-opal text-4xl mb-4">&quot;</div>
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
              Join 28+ companies who trust us to generate high-quality leads and book meetings with decision-makers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-10 py-4">
                Book Your Strategy Call
              </Link>
              <Link href="/services" className="btn-outline text-lg px-10 py-4">
                See Case Studies
              </Link>
            </div>
            
            <div className="mt-8 text-muted-jade">
              <p>No setup fees • No long-term contracts • Money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 