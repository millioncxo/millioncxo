'use client'

import Link from 'next/link'

export default function Contact() {
  
  return (
    <main className="min-h-screen bg-luxury-pure-white pt-16">
      {/* Hero Section - True Full Width */}
      <section className="relative py-20 lg:py-32 bg-luxury-pure-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-luxury-pattern opacity-5"></div>
        
        <div className="relative w-full">
          <div className="text-center px-4">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-luxury font-bold text-luxury-deep-black mb-8 leading-tight">
                Get In Touch
              </h1>
              <h2 className="text-lg lg:text-xl font-luxury font-medium text-luxury-gold mb-8">
                Let&apos;s Work Together
              </h2>
            </div>
            
            <div className="animate-fade-in-delay">
              <p className="text-lg lg:text-xl text-luxury-charcoal mb-12 mx-auto font-luxury-sans leading-relaxed max-w-4xl">
                Ready to unlock 20+ Discovery Calls with CXOs every month? Let&apos;s discuss how we can transform your sales pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - True Full Width */}
      <section className="py-24 bg-luxury-cream min-h-screen flex items-center">
        <div className="w-full px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div className="animate-on-scroll">
              <h3 className="text-2xl lg:text-3xl font-luxury font-bold text-luxury-deep-black mb-8">
                Ready to Start Your Journey?
              </h3>
              <p className="text-base lg:text-lg text-luxury-charcoal mb-8 leading-relaxed font-luxury-sans">
                Join successful businesses who&apos;ve transformed their outbound sales with our human-driven approach. 
                                  Let&apos;s discuss your specific needs and create a customized solution for your business.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-luxury-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-luxury-deep-black font-luxury text-lg">Email Us</h4>
                    <a 
                      href="mailto:info@millioncxo.com" 
                      className="text-luxury-charcoal hover:text-luxury-gold transition-colors font-luxury-sans"
                    >
                      info@millioncxo.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-luxury-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-luxury-deep-black font-luxury text-lg">Quick Response</h4>
                    <p className="text-luxury-charcoal font-luxury-sans">We typically respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-luxury-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-luxury-deep-black font-luxury text-lg">Personalized Consultation</h4>
                    <p className="text-luxury-charcoal font-luxury-sans">Custom solutions tailored to your business needs</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-luxury-pure-white rounded-xl shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.08] hover:-translate-y-4  transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
                {/* Card Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <h4 className="font-bold text-luxury-deep-black mb-4 font-luxury text-lg group-hover:text-luxury-gold transition-colors duration-300">What Happens Next?</h4>
                  <ul className="space-y-3 text-luxury-charcoal font-luxury-sans">
                    <li className="flex items-start space-x-3">
                      <span className="text-luxury-gold font-bold text-lg group-hover:scale-125 transition-transform duration-300">1.</span>
                      <span>We&apos;ll review your information and contact you within 24 hours</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-luxury-gold font-bold text-lg group-hover:scale-125 transition-transform duration-300">2.</span>
                      <span>Schedule a discovery call to understand your specific needs</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-luxury-gold font-bold text-lg group-hover:scale-125 transition-transform duration-300">3.</span>
                      <span>Create a customized outreach strategy for your business</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-on-scroll">
              <form 
                className="bg-luxury-pure-white p-8 rounded-2xl shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.05] hover:-translate-y-3  transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group"
                action="mailto:info@millioncxo.com"
                method="GET"
                encType="text/plain"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const firstName = formData.get('firstName');
                  const lastName = formData.get('lastName');
                  const email = formData.get('email');
                  const company = formData.get('company');
                  const message = formData.get('message');
                  
                  const subject = `Contact Form - ${firstName} ${lastName}`;
                  const body = `
Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company}

Message:
${message}

---
Sent from MillionCXO Contact Form
                  `;
                  
                  const mailtoLink = `mailto:info@millioncxo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.location.href = mailtoLink;
                }}
              >
                {/* Card Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl lg:text-2xl font-luxury font-bold text-luxury-deep-black mb-8 text-center group-hover:text-luxury-gold transition-colors duration-300">
                    Contact Us
                  </h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-luxury-deep-black mb-2 font-luxury">
                        First name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-luxury-gold/20 rounded-lg focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all font-luxury-sans"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-luxury-deep-black mb-2 font-luxury">
                        Last name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-luxury-gold/20 rounded-lg focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all font-luxury-sans"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-luxury-deep-black mb-2 font-luxury">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-luxury-gold/20 rounded-lg focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all font-luxury-sans"
                      placeholder="your.email@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-luxury-deep-black mb-2 font-luxury">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-luxury-gold/20 rounded-lg focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all font-luxury-sans"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-luxury-deep-black mb-2 font-luxury">
                      Write a message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-luxury-gold/20 rounded-lg focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all font-luxury-sans resize-none"
                      placeholder="Tell us about your business goals and how we can help you connect with more decision-makers..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-luxury py-4 rounded-lg font-semibold text-lg hover-glow transition-all duration-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - True Full Width */}
      <section className="py-24 bg-luxury-pure-white min-h-screen flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
              Why Partner With Us?
            </h2>
            <p className="text-lg lg:text-xl text-luxury-charcoal mx-auto font-luxury-sans leading-relaxed max-w-4xl">
                              We&apos;re not just another lead generation company. We&apos;re your strategic partner in building meaningful business relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <div className="text-center animate-on-scroll bg-luxury-pure-white p-10 rounded-xl hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.12] hover:-translate-y-6  transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
              {/* Card Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="mb-8 w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto group-hover:scale-125 group- group-hover:shadow-[0_15px_30px_rgba(212,175,55,0.5)] transition-all duration-500">
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black mb-6 group-hover:text-luxury-gold transition-colors duration-300">
                  Hyper-personalized outreach
                </h3>
                <p className="text-luxury-charcoal font-luxury-sans leading-relaxed text-base group-hover:text-luxury-charcoal transition-colors duration-300">
                  Human-driven outreach, no automation, 20+ discovery calls per month
                </p>
              </div>
            </div>

            <div className="text-center animate-on-scroll bg-luxury-pure-white p-10 rounded-xl hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.12] hover:-translate-y-6  transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
              {/* Card Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="mb-8 w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto group-hover:scale-125 group- group-hover:shadow-[0_15px_30px_rgba(212,175,55,0.5)] transition-all duration-500">
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black mb-6 group-hover:text-luxury-gold transition-colors duration-300">
                  Proven Data-Driven Results
                </h3>
                <p className="text-luxury-charcoal font-luxury-sans leading-relaxed text-base group-hover:text-luxury-charcoal transition-colors duration-300">
                  Combining data insights with human touch, we book real conversations, not just leads.
                </p>
              </div>
            </div>

            <div className="text-center animate-on-scroll bg-luxury-pure-white p-10 rounded-xl hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.12] hover:-translate-y-6  transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
              {/* Card Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="mb-8 w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto group-hover:scale-125 group- group-hover:shadow-[0_15px_30px_rgba(212,175,55,0.5)] transition-all duration-500">
                  <svg className="w-10 h-10 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-luxury font-semibold text-luxury-deep-black mb-6 group-hover:text-luxury-gold transition-colors duration-300">
                  Transparent Pricing
                </h3>
                <p className="text-luxury-charcoal font-luxury-sans leading-relaxed text-base group-hover:text-luxury-charcoal transition-colors duration-300">
                  Clear, upfront packages and a pay-per-appointment model for maximum flexibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section - True Full Width */}
      <section className="py-24 bg-luxury-cream min-h-[80vh] flex items-center">
        <div className="w-full px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-deep-black mb-8">
              Success Stories
            </h2>
            <p className="text-lg lg:text-xl text-luxury-charcoal mx-auto font-luxury-sans leading-relaxed max-w-4xl">
              Real results from real businesses who trusted us with their outbound sales.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                quote: "millionCXO helped us triple our discovery calls in just two months. Every meeting was with a relevant decision-maker.",
                author: "Jenifer Cohen",
                role: "CEO",
                company: "TechStart Inc."
              },
              {
                quote: `We've tried multiple outbound solutions, but millionCXO is the first that delivered exactly what they promised.`,
                author: "Maria Goncavales",
                role: "VP Sales",
                company: "Growth Corp"
              },
              {
                quote: "Their 1:1 outreach model gave us a steady flow of qualified CXO meetings with real-time performance tracking.",
                author: "Michael Soveign",
                role: "Director",
                company: "Scale Solutions"
              }
            ].map((testimonial, index) => (
              <div key={index} className="animate-on-scroll bg-luxury-pure-white p-8 rounded-xl hover-lift shadow-2xl shadow-black/25 hover:shadow-[0_25px_50px_rgba(212,175,55,0.6)] hover:scale-[1.08] hover:-translate-y-4  transition-all duration-500 border-2 border-luxury-gold/30 hover:border-luxury-gold/80 relative overflow-hidden group">
                {/* Card Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="text-4xl text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-300">&ldquo;</div>
                  <blockquote className="text-luxury-charcoal font-luxury-sans leading-relaxed mb-8 text-base group-hover:text-luxury-charcoal transition-colors duration-300">
                    {testimonial.quote}
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center mr-4 group-hover:scale-110 group- transition-transform duration-500">
                      <span className="text-luxury-deep-black font-semibold text-base">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-luxury-deep-black font-semibold text-base font-luxury group-hover:text-luxury-gold transition-colors duration-300">
                        {testimonial.author}
                      </div>
                      <div className="text-luxury-charcoal text-sm font-luxury-sans">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Details Footer - True Full Width */}
      <section className="py-24 bg-luxury-deep-black min-h-[60vh] flex items-center">
        <div className="w-full px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-luxury font-bold text-luxury-pure-white mb-8">
                Connect With Us
              </h2>
              <p className="text-lg lg:text-xl text-luxury-cream mb-12 font-luxury-sans mx-auto max-w-4xl">
                Multiple ways to reach out and start your journey to meaningful business conversations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Email */}
              <div className="text-center animate-on-scroll">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-luxury font-semibold text-luxury-pure-white mb-3">
                  Email
                </h3>
                <a 
                  href="mailto:info@millioncxo.com" 
                  className="text-luxury-cream hover:text-luxury-gold transition-colors font-luxury-sans"
                >
                  info@millioncxo.com
                </a>
              </div>

              {/* LinkedIn */}
              <div className="text-center animate-on-scroll">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-luxury-deep-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-luxury font-semibold text-luxury-pure-white mb-3">
                  LinkedIn
                </h3>
                <a 
                  href="https://linkedin.com/company/millioncxo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-luxury-cream hover:text-luxury-gold transition-colors font-luxury-sans"
                >
                  /company/millioncxo
                </a>
              </div>

              {/* Twitter */}
              <div className="text-center animate-on-scroll">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-luxury-deep-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-luxury font-semibold text-luxury-pure-white mb-3">
                  Twitter
                </h3>
                <a 
                  href="https://twitter.com/millioncxo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-luxury-cream hover:text-luxury-gold transition-colors font-luxury-sans"
                >
                  @millioncxo
                </a>
              </div>

              {/* Phone */}
              <div className="text-center animate-on-scroll">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-luxury-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-luxury font-semibold text-luxury-pure-white mb-3">
                  Schedule Call
                </h3>
                <Link 
                  href="/contact"
                  className="text-luxury-cream hover:text-luxury-gold transition-colors font-luxury-sans"
                >
                  Book Discovery Call
                </Link>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-luxury-gold/20 text-center">
              <p className="text-luxury-cream font-luxury-sans">
                © 2024 millionCXO. All rights reserved. | Connecting businesses with decision-makers through human-driven outreach.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 