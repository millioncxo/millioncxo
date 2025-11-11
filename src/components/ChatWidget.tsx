'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ChatMessage from './ChatMessage'
import ChatToggle from './ChatToggle'

const STEPS = {
  welcome: {
    text: "Hi! 👋 I'm your millionCXO Assistant. What are you looking for today?",
    options: [
      "LinkedIn Outreach Excellence 20X",
      "LinkedIn Followers Boost",
      "SDR as a Service",
      "Just have questions"
    ]
  },
  linkedin_20x: {
    text: `Our **LinkedIn Outreach Excellence 20X** delivers 1,000 InMails per license per month with research-based outreach.\n- $250/month per license (discounts available)\n- 4 Guaranteed interested customers per license per month\n- 100% money-back guarantee if your account gets blocked\n- Zero additional tool costs\n\nWould you like to learn more or book a Free Demo?`,
    options: [
      "Tell me more about 20X",
      "Book a Free Demo",
      "Back to main menu"
    ]
  },
  linkedin_20x_more: {
    text: `**LinkedIn Outreach Excellence 20X Details:**\n- 1,000 InMails per license per month (vs LinkedIn's 50)\n- Research-based outreach using prospect's LinkedIn activity\n- 4 Guaranteed interested customers per license per month\n- Account safety guarantee: 100% refund if account gets blocked\n- Industry's lowest price starting at $250/month per license\n- All tools included, no hidden costs\n\nReady to book a Free Demo?`,
    options: [
      "Book a Free Demo",
      "Back to main menu"
    ]
  },
  followers_boost: {
    text: `Our **LinkedIn Followers Boost** helps you build brand authority with 10,000+ targeted followers per month.\n- $499/month\n- Organic growth strategy\n- Content optimization for your brand\n- Engagement boost\n\nBuild brand authority, one follower at a time. Want to book a Free Demo?`,
    options: [
      "Book a Free Demo",
      "Tell me more",
      "Back to main menu"
    ]
  },
  followers_more: {
    text: `**LinkedIn Followers Boost Details:**\n- 10,000+ targeted followers per month\n- Organic growth strategy (no bots, no automation)\n- Content optimization tailored to your brand\n- Engagement boost to increase visibility\n- Human-driven approach to keep your account secure\n\nReady to grow your LinkedIn presence? Book a Free Demo!`,
    options: [
      "Book a Free Demo",
      "Back to main menu"
    ]
  },
  sdr_service: {
    text: `Our **SDR as a Service** provides a dedicated full-time SDR for your outreach campaigns.\n- $2,000/month\n- 200+ emails/day\n- 150+ cold calls/day\n- 80 ICP profiles researched/day\n- Target: 4+ qualified CXO meetings/month\n\nWant to discuss your specific needs or book a Free Demo?`,
    options: [
      "Book a Free Demo",
      "Tell me more",
      "Back to main menu"
    ]
  },
  sdr_more: {
    text: `**SDR as a Service Details:**\n- Dedicated full-time SDR on your campaigns\n- Daily reporting and CRM integration\n- Trained in your value proposition before outreach\n- Human-driven, no automation\n- Guaranteed qualified meetings (your ICP, your criteria)\n\nWant to see how this works? Book a Free Demo!`,
    options: [
      "Book a Free Demo",
      "Back to main menu"
    ]
  },
  questions: {
    text: "Ask me anything about our LinkedIn Outreach Excellence 20X, LinkedIn Followers Boost, or SDR as a Service - or type your question below. For most questions, I'll suggest a Free Demo to make things easier.",
    options: [
      "What's included in each service?",
      "How do you ensure account safety?",
      "Can you customize for my industry?",
      "Book a Free Demo",
      "Back to main menu"
    ]
  },
  included_services: {
    text: `Each service is customized to your GTM goals:\n\n**LinkedIn Outreach Excellence 20X:** 1,000 InMails/license/month, 4 guaranteed customers/license/month\n\n**LinkedIn Followers Boost:** 10,000+ targeted followers/month, organic growth\n\n**SDR as a Service:** Full-time dedicated SDR, 4+ CXO meetings/month\n\nFor full details and a custom proposal, would you like to book a Free Demo?`,
    options: [
      "Book a Free Demo",
      "Back to main menu"
    ]
  },
  account_safety: {
    text: `We guarantee **100% account safety** with our human-driven approach:\n- Zero automation, no bots\n- Research-based outreach using LinkedIn activity\n- Human-led methodology preserves account integrity\n- 100% money-back guarantee if any LinkedIn account gets blocked\n\nWant to learn more? Book a Free Demo!`,
    options: [
      "Book a Free Demo",
      "Back to main menu"
    ]
  },
  customize: {
    text: `Absolutely! Every engagement is tailored - startup, SaaS, consulting, services. We customize our approach to your industry, ICP, and goals. Book a Free Demo for a custom roadmap?`,
    options: [
      "Book a Free Demo",
      "Back to main menu"
    ]
  },
  book_call: {
    text: `Great! Opening our booking calendar in a new tab. See you soon!`,
    options: []
  }
}

const BOOKING_LINK = "https://calendly.com/millioncxo/loe-20x"

type StepKey = keyof typeof STEPS;

export default function ChatWidget() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState([
    { id: '1', text: STEPS.welcome.text, isBot: true, options: STEPS.welcome.options, timestamp: new Date() }
  ])
  const [currentStep, setCurrentStep] = useState<StepKey>('welcome')
  const [isTyping, setIsTyping] = useState(false)

  // Auto-open chat on page visit
  // 20 seconds delay for landing page, 1 second for other pages
  useEffect(() => {
    const isLandingPage = pathname === '/landingpage'
    const delay = isLandingPage ? 20000 : 1000 // 20 seconds for landing page, 1 second for others
    
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [pathname])

  const handleToggle = () => setIsOpen(!isOpen)

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    handleUserInput(inputText.trim())
    setInputText('')
  }

  const handleOptionSelect = (option: string) => handleUserInput(option)

  function handleUserInput(userInput: string) {
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text: userInput, isBot: false, options: [], timestamp: new Date() }
    ])
    setIsTyping(true)

    setTimeout(() => {
      let nextStep: StepKey = currentStep

      // Top-level routing
      if (currentStep === "welcome") {
        if (userInput.toLowerCase().includes("20x") || userInput.toLowerCase().includes("linkedin outreach") || userInput.toLowerCase().includes("excellence")) nextStep = "linkedin_20x"
        else if (userInput.toLowerCase().includes("followers") || userInput.toLowerCase().includes("boost")) nextStep = "followers_boost"
        else if (userInput.toLowerCase().includes("sdr")) nextStep = "sdr_service"
        else if (userInput.toLowerCase().includes("question") || userInput.toLowerCase().includes("help") || userInput.toLowerCase().includes("info")) nextStep = "questions"
        else nextStep = "welcome"
      }
      else if (currentStep === "linkedin_20x" && (userInput.toLowerCase().includes("tell") || userInput.toLowerCase().includes("more"))) nextStep = "linkedin_20x_more"
      else if (currentStep === "followers_boost" && (userInput.toLowerCase().includes("tell") || userInput.toLowerCase().includes("more"))) nextStep = "followers_more"
      else if (currentStep === "sdr_service" && (userInput.toLowerCase().includes("tell") || userInput.toLowerCase().includes("more"))) nextStep = "sdr_more"
      else if ((currentStep === "linkedin_20x" || currentStep === "linkedin_20x_more" || currentStep === "followers_boost" || currentStep === "followers_more" || currentStep === "sdr_service" || currentStep === "sdr_more" || currentStep === "included_services" || currentStep === "account_safety" || currentStep === "customize" || currentStep === "questions") && userInput.toLowerCase().includes("book")) nextStep = "book_call"
      else if (currentStep === "questions" && userInput.toLowerCase().includes("included")) nextStep = "included_services"
      else if (currentStep === "questions" && (userInput.toLowerCase().includes("safety") || userInput.toLowerCase().includes("account"))) nextStep = "account_safety"
      else if (currentStep === "questions" && userInput.toLowerCase().includes("customize")) nextStep = "customize"
      else if (userInput.toLowerCase().includes("back")) nextStep = "welcome"

      // Booking link step
      if (nextStep === "book_call") {
        setMessages(prev => [
          ...prev,
          { id: `bot-${Date.now()}`, text: STEPS.book_call.text, isBot: true, options: [], timestamp: new Date() }
        ])
        setIsTyping(false)
        setCurrentStep("book_call")
        
        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17718087441'
          });
        }
        
        window.open(BOOKING_LINK, '_blank')
        return
      }

      // Normal flow
      const step = STEPS[nextStep as StepKey]
      setMessages(prev => [
        ...prev,
        { id: `bot-${Date.now()}`, text: step.text, isBot: true, options: step.options || [], timestamp: new Date() }
      ])
      setCurrentStep(nextStep)
      setIsTyping(false)
    }, 650)
  }

  return (
    <>
      <div className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${isOpen ? 'w-[calc(100%-40px)] max-w-md' : 'w-auto h-auto'}`}>
        {isOpen ? (
          <div className="bg-ivory-silk/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-golden-opal/20 overflow-hidden w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-golden-opal/20 bg-gradient-to-r from-imperial-emerald to-petrol-smoke">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-golden-opal flex items-center justify-center">
                  <svg className="w-6 h-6 text-onyx-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ivory-silk">millionCXO Assistant</h3>
                  <p className="text-xs text-muted-jade">Typically replies instantly</p>
                </div>
              </div>
              <button onClick={handleToggle} className="p-2 rounded-full text-ivory-silk hover:bg-golden-opal/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[60vh]">
              {messages.map(msg => (
                <ChatMessage 
                  key={msg.id} 
                  message={msg} 
                  onOptionSelect={handleOptionSelect} 
                />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-golden-opal rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-golden-opal rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-golden-opal rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-golden-opal/20">
              <div className="flex items-center space-x-2">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="chat-input flex-1"
                />
                <button onClick={handleSendMessage} className="chat-send-button">
                  <svg className="w-5 h-5 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <ChatToggle isOpen={isOpen} onClick={handleToggle} />
        )}
      </div>
    </>
  )
}
