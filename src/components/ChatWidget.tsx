'use client'

import { useState } from 'react'
import ChatMessage from './ChatMessage'
import ChatToggle from './ChatToggle'

const STEPS = {
  welcome: {
    text: "Hi! 👋 I’m your millionCXO Assistant. What are you looking for today?",
    options: [
      "Book qualified CXO meetings",
      "Hire a dedicated SDR",
      "Set up sales infrastructure",
      "Just have questions"
    ]
  },
  book_cxo: {
    text: `Our **Pilot Program** gets you 4 guaranteed, qualified CXO meetings in 30 days ($99/meeting, total $396, pay only for meetings delivered). Would you like to see the detailed terms or go straight to booking a discovery call?`,
    options: [
      "Show me the detailed terms",
      "Book my discovery call"
    ]
  },
  book_cxo_terms: {
    text: `**Pilot Program Terms:**\n- 4 Qualified CXO Meetings in 30 days\n- $99 per meeting (total $396, upfront)\n- No charge for prospect no-shows\n- Refund for any unbooked meetings\n- 15 days for prospect research before delivery starts\n\nReady to book a discovery call and see if you qualify?`,
    options: [
      "Yes, book my call",
      "Back to main menu"
    ]
  },
  sdr_service: {
    text: `Our **SDR as a Service** provides a dedicated full-time SDR, handling 300 emails, 150 calls, and 70 LinkedIn InMails every day.\n- $2,250/month (monthly), $1,999/month (quarterly)\n- 5 Qualified CXO Meetings/month as KPI\nWant to discuss your specific needs or book a call?`,
    options: [
      "Book my discovery call",
      "Tell me more",
      "Back to main menu"
    ]
  },
  sdr_more: {
    text: `You'll get a trained SDR on your campaigns, plus daily reporting and CRM integration. Want to see case studies or book a call?`,
    options: [
      "Show case studies",
      "Book my discovery call",
      "Back to main menu"
    ]
  },
  setup_infra: {
    text: `We set up CRM (HubSpot/Zoho), automate your email & LinkedIn outreach, write custom sales scripts, warm up domains, implement lead routing, and design reporting dashboards. Want to discuss your stack or book a call?`,
    options: [
      "Book my discovery call",
      "Discuss tech stack",
      "Back to main menu"
    ]
  },
  infra_stack: {
    text: `We work with all major tools: Apollo, Lemlist, Salesloft, Aircall, Clay, and more. Want a call to map your workflow?`,
    options: [
      "Book my discovery call",
      "Back to main menu"
    ]
  },
  questions: {
    text: "Ask me anything about our Pilot, SDR, or Infrastructure services—or type your question below. For most questions, I’ll suggest a discovery call to make things easier.",
    options: [
      "What’s included in each service?",
      "How do you ensure meeting quality?",
      "Can you customize for my industry?",
      "Book my discovery call",
      "Back to main menu"
    ]
  },
  included_services: {
    text: `Each service is customized to your GTM goals. For full details and a custom proposal, would you like to book a discovery call?`,
    options: [
      "Book my discovery call",
      "Back to main menu"
    ]
  },
  quality: {
    text: `We only charge for *qualified meetings* (your ICP, your criteria). If a prospect no-shows, you aren’t charged. SDRs are trained in your value prop before outreach. Want to talk process?`,
    options: [
      "Book my discovery call",
      "Back to main menu"
    ]
  },
  customize: {
    text: `Absolutely! Every engagement is tailored—startup, SaaS, consulting, services. Book a call for a custom roadmap?`,
    options: [
      "Book my discovery call",
      "Back to main menu"
    ]
  },
  book_call: {
    text: `Great! Opening our booking calendar in a new tab. See you soon!`,
    options: []
  }
}

const BOOKING_LINK = "https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled"

type StepKey = keyof typeof STEPS;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState([
    { id: '1', text: STEPS.welcome.text, isBot: true, options: STEPS.welcome.options, timestamp: new Date() }
  ])
  const [currentStep, setCurrentStep] = useState<StepKey>('welcome')
  const [isTyping, setIsTyping] = useState(false)

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
        if (userInput.toLowerCase().includes("cxo") || userInput.toLowerCase().includes("meeting")) nextStep = "book_cxo"
        else if (userInput.toLowerCase().includes("sdr")) nextStep = "sdr_service"
        else if (userInput.toLowerCase().includes("infra") || userInput.toLowerCase().includes("crm") || userInput.toLowerCase().includes("setup")) nextStep = "setup_infra"
        else if (userInput.toLowerCase().includes("question") || userInput.toLowerCase().includes("help") || userInput.toLowerCase().includes("info")) nextStep = "questions"
        else nextStep = "welcome"
      }
      else if (currentStep === "book_cxo" && userInput.includes("term")) nextStep = "book_cxo_terms"
      else if ((currentStep === "book_cxo" || currentStep === "book_cxo_terms" || currentStep === "sdr_service" || currentStep === "sdr_more" || currentStep === "setup_infra" || currentStep === "infra_stack" || currentStep === "included_services" || currentStep === "quality" || currentStep === "customize" || currentStep === "questions") && userInput.toLowerCase().includes("book")) nextStep = "book_call"
      else if (currentStep === "sdr_service" && userInput.toLowerCase().includes("tell")) nextStep = "sdr_more"
      else if (currentStep === "sdr_more" && userInput.toLowerCase().includes("case")) nextStep = "included_services"
      else if (currentStep === "setup_infra" && userInput.toLowerCase().includes("stack")) nextStep = "infra_stack"
      else if (currentStep === "questions" && userInput.toLowerCase().includes("included")) nextStep = "included_services"
      else if (currentStep === "questions" && userInput.toLowerCase().includes("quality")) nextStep = "quality"
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
