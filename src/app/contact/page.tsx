'use client'

import { useState } from 'react'
import Link from 'next/link'
import ScrollAnimation from '@/components/ScrollAnimation'
import Footer from '@/components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // TODO: Implement MongoDB integration
      console.log('Form submitted:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
        timeline: ''
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-ivory-silk pt-16">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-imperial-emerald to-petrol-smoke overflow-hidden">
        <div className="absolute inset-0 bg-luxury-pattern opacity-30"></div>
        
        <div className="relative container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <div className="animate-fade-in">
                <div className="inline-flex items-center bg-golden-opal/10 rounded-full px-4 py-2 mb-6">
                  <span className="text-golden-opal font-semibold text-sm">Ready to Get Started?</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-ivory-silk mb-8 leading-tight">
                  Let&apos;s <span className="text-golden-opal">Talk</span>
                </h1>
              </div>
              
              <div className="animate-fade-in-delay">
                <p className="text-xl text-muted-jade mb-8 leading-relaxed">
                  Ready to transform your outreach? Get your custom strategy session and start connecting with decision-makers today.
                </p>
                
                <div className="space-y-4 text-muted-jade">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-golden-opal/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Free strategy consultation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-golden-opal/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Custom package recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-golden-opal/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Quick response within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="relative">
              <div className="animate-fade-in-delay">
                <div className="bg-ivory-silk/10 backdrop-blur-sm rounded-2xl p-8 border border-golden-opal/20">
                  <h3 className="text-2xl font-bold text-ivory-silk mb-6">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-golden-opal/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-ivory-silk font-semibold">Email</div>
                        <div className="text-muted-jade">info@millioncxo.com</div>
                      </div>
                    </div>
                    

                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-golden-opal/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-ivory-silk font-semibold">Response Time</div>
                        <div className="text-muted-jade">Within 24 hours</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-golden-opal/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-ivory-silk font-semibold">Global Reach</div>
                        <div className="text-muted-jade">13+ countries served</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-ivory-silk">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-onyx-black mb-6">
                Start Your <span className="text-gradient">Growth Journey</span>
              </h2>
              <p className="text-xl text-muted-jade">
                Tell us about your business and we&apos;ll create a custom strategy to connect you with decision-makers
              </p>
            </div>

            <ScrollAnimation>
              <form onSubmit={handleSubmit} className="card-modern">
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-800 font-semibold">Success! We&apos;ll be in touch within 24 hours.</span>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-red-800 font-semibold">Something went wrong. Please try again.</span>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-onyx-black font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-modern"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-onyx-black font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-modern"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-onyx-black font-semibold mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="input-modern"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-onyx-black font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-modern"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-onyx-black font-semibold mb-2">
                      Service Interest *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="input-modern"
                    >
                      <option value="">Select a service</option>
                      <option value="starter">Starter Package ($99/meeting)</option>
                      <option value="professional">Professional Package ($1,999/month)</option>
                      <option value="enterprise">Enterprise Solutions (Custom)</option>
                      <option value="consultation">Free Consultation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-onyx-black font-semibold mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="input-modern"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000/month</option>
                      <option value="5k-15k">$5,000 - $15,000/month</option>
                      <option value="15k-30k">$15,000 - $30,000/month</option>
                      <option value="30k-plus">$30,000+/month</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-onyx-black font-semibold mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="input-modern"
                  >
                    <option value="">When do you want to start?</option>
                    <option value="immediate">Immediately</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="6-months">Within 6 months</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block text-onyx-black font-semibold mb-2">
                    Tell us about your goals
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-modern"
                    placeholder="What are your main challenges with lead generation? What results are you hoping to achieve?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary text-lg py-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Your Custom Strategy'}
                </button>
              </form>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
} 