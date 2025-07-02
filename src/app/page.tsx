import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark-teal to-primary-medium-teal">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-lime rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-sage rounded-full blur-xl"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-primary-white mb-6 leading-tight">
              Scalable. Reliable.
            </h1>
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-lime mb-8">
              Human-driven outreach for B2B growth.
            </h2>
            <p className="text-xl lg:text-2xl text-primary-white/90 mb-12 max-w-3xl mx-auto">
              Unlock 20+ Discovery Calls with CXOs Every Month. Human-driven, no automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-primary-lime text-primary-dark-teal font-bold text-lg rounded-lg hover:bg-primary-lime/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Now
              </Link>
              <Link 
                href="/services" 
                className="px-8 py-4 border-2 border-primary-white text-primary-white font-bold text-lg rounded-lg hover:bg-primary-white hover:text-primary-dark-teal transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-dark-green">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "20", label: "Qualified Experts" },
              { number: "12", label: "Clients Per Month" },
              { number: "5", label: "Global Business Partners" },
              { number: "10+", label: "Years of Experience" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary-lime mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section className="py-20 bg-primary-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary-dark-green mb-6">
                Strategies for Success
              </h2>
              <p className="text-xl text-primary-medium-teal max-w-3xl mx-auto">
                At millionCXO, we specialize in delivering high-quality, pre-qualified discovery calls with decision-makers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Hyper-personalized outreach",
                  description: "Human-driven outreach, no automation, 20+ discovery calls per month",
                  icon: "👥"
                },
                {
                  title: "Proven Data-Driven Results",
                  description: "Combining data insights with human touch, we book real conversations, not just leads.",
                  icon: "📊"
                },
                {
                  title: "Transparent Pricing",
                  description: "Clear, upfront packages and a pay-per-appointment model for maximum flexibility.",
                  icon: "💎"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-primary-sage/10 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-primary-dark-green mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-primary-medium-teal">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary-dark-green">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary-white mb-6">
                The Simple Method Behind the Success
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discovery", description: "Understand your ICP, goals & offers" },
                { step: "02", title: "Setup", description: "Email, CRM, tools, and caller ID infrastructure" },
                { step: "03", title: "Outreach Execution", description: "Our SDRs engage across all channels" },
                { step: "04", title: "Meeting Bookings", description: "You get 1:1 calls with real decision-makers" }
              ].map((process, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-primary-lime rounded-full flex items-center justify-center text-primary-dark-teal font-bold text-xl mx-auto mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-primary-white mb-3">
                    {process.title}
                  </h3>
                  <p className="text-primary-white/80">
                    {process.description}
                  </p>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-lime/30"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary-dark-green mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-primary-medium-teal max-w-3xl mx-auto">
                We specialize exclusively in B2B outreach to top decision-makers — ensuring every interaction is targeted, relevant, and designed to convert.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "millionCXO helped us triple our discovery calls in just two months. Every meeting was with a relevant decision-maker, and their human-driven outreach made all the difference. This is the closest we've come to a plug-and-play outbound engine.",
                  author: "Jenifer Cohen"
                },
                {
                  quote: "We've tried multiple outbound solutions, but millionCXO is the first that delivered exactly what they promised. Their SDR team felt like an extension of ours—focused, responsive, and consistent. We saw results from week one.",
                  author: "Maria Goncavales"
                },
                {
                  quote: "Predictability was our biggest struggle until we partnered with millionCXO. Their 1:1 outreach model gave us a steady flow of qualified CXO meetings—and their real-time performance tracking kept us in the loop every step of the way.",
                  author: "Michael Soveign"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-primary-sage/10 p-8 rounded-2xl relative">
                  <div className="text-primary-lime text-5xl mb-4">"</div>
                  <p className="text-primary-medium-teal mb-6 italic">
                    {testimonial.quote}
                  </p>
                  <div className="text-primary-dark-green font-bold">
                    — {testimonial.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-medium-teal to-primary-dark-teal">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-white mb-6">
            Ready to Connect with Decision Makers?
          </h2>
          <p className="text-xl text-primary-white/90 mb-8 max-w-2xl mx-auto">
            Join successful businesses who've transformed their outbound sales with our human-driven approach.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-8 py-4 bg-primary-lime text-primary-dark-teal font-bold text-lg rounded-lg hover:bg-primary-lime/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Let's Work Together
          </Link>
        </div>
      </section>
    </main>
  )
} 