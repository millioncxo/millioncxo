'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ChatMessage from './ChatMessage'
import ChatToggle from './ChatToggle'

const STEPS = {
  welcome: {
    text: "Hi, I can help you map the right MillionCXO sales team. Where are you stuck right now?",
    options: [
      "Need more meetings",
      "Need to convert meetings",
      "All-Rounder Lead Gen Executive",
      "Plan team size"
    ]
  },
  lead_gen_executive: {
    text: `The **All-Rounder Lead Gen Executive** is your first trained sales hire, done by MillionCXO:\n- 5,000 InMails/month with up to 10 Sales Navigator licences\n- 30 researched personalised emails/day\n- Daily activity reports\n- Minimum 8 conducted meetings/month guaranteed\n- Typical flow around 20 meetings/month with the full setup\n- $1,200/month billed quarterly or $1,499/month billed monthly\n- First month setup is free`,
    options: [
      "Book a strategy call",
      "Need full SDR service",
      "Back to main menu"
    ]
  },
  lead_generation: {
    text: `For meeting generation, the **All-Rounder Lead Gen Executive** package includes:\n- Up to 10 Sales Navigator licences\n- 5,000 InMails/month\n- 30 personalised emails/day\n- Minimum 8 conducted meetings/month guaranteed\n- $1,200/month billed quarterly or $1,499/month billed monthly\n\nNeed cold calling too? A Cold Caller can be added for $300/month.`,
    options: [
      "Need to convert meetings",
      "Book a strategy call",
      "Back to main menu"
    ]
  },
  conversion: {
    text: `For conversion, the **Account Executive** package supports:\n- Client calls, meetings and presentations\n- Pitching and demo delivery\n- BANT qualification\n- End-to-end deal closure\n- Revenue target: about $200K/year per AE\n- $2,800/month quarterly or $3,200/month monthly`,
    options: [
      "Plan team size",
      "Book a strategy call",
      "Back to main menu"
    ]
  },
  team_size: {
    text: `The standard planning math is simple:\n- Each AE carries about $200K/year target\n- 1 Lead Gen Executive supports up to 2 AEs\n- Example: $600K/year target means 3 AEs + 2 Lead Gen Executives\n\nFor exact team sizing, it is best to discuss your revenue goal.`,
    options: [
      "Book a strategy call",
      "Back to main menu"
    ]
  },
  questions: {
    text: "You can ask about lead generation, Account Executives, team sizing, reporting cadence, or the performance guarantee.",
    options: [
      "Need more meetings",
      "Need to convert meetings",
      "Plan team size",
      "Book a strategy call",
      "Back to main menu"
    ]
  },
  book_call: {
    text: `Opening the booking calendar in a new tab.`,
    options: []
  }
}

const BOOKING_LINK = "https://calendly.com/millioncxooutreach/30min"

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

  // Keep chat closed by default on the redesigned pages so it does not interrupt the story.
  useEffect(() => {
    if (pathname === '/landingpage') {
      const timer = setTimeout(() => setIsOpen(true), 20000)
      return () => clearTimeout(timer)
    }
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
        if (userInput.toLowerCase().includes("all-rounder") || userInput.toLowerCase().includes("executive") || userInput.toLowerCase().includes("inmail")) nextStep = "lead_gen_executive"
        else if (userInput.toLowerCase().includes("meeting") || userInput.toLowerCase().includes("lead")) nextStep = "lead_generation"
        else if (userInput.toLowerCase().includes("convert") || userInput.toLowerCase().includes("revenue") || userInput.toLowerCase().includes("ae")) nextStep = "conversion"
        else if (userInput.toLowerCase().includes("team") || userInput.toLowerCase().includes("size") || userInput.toLowerCase().includes("plan")) nextStep = "team_size"
        else if (userInput.toLowerCase().includes("question") || userInput.toLowerCase().includes("help") || userInput.toLowerCase().includes("info")) nextStep = "questions"
        else nextStep = "welcome"
      }
      else if (userInput.toLowerCase().includes("all-rounder") || userInput.toLowerCase().includes("executive") || userInput.toLowerCase().includes("inmail")) nextStep = "lead_gen_executive"
      else if (userInput.toLowerCase().includes("full sdr") || userInput.toLowerCase().includes("sdr service")) nextStep = "lead_generation"
      else if (userInput.toLowerCase().includes("meeting") || userInput.toLowerCase().includes("lead")) nextStep = "lead_generation"
      else if (userInput.toLowerCase().includes("convert") || userInput.toLowerCase().includes("revenue") || userInput.toLowerCase().includes("ae")) nextStep = "conversion"
      else if (userInput.toLowerCase().includes("team") || userInput.toLowerCase().includes("size") || userInput.toLowerCase().includes("plan")) nextStep = "team_size"
      else if ((currentStep === "lead_gen_executive" || currentStep === "lead_generation" || currentStep === "conversion" || currentStep === "team_size" || currentStep === "questions") && userInput.toLowerCase().includes("book")) nextStep = "book_call"
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
          <div className="chat-widget-container overflow-hidden rounded-[1.5rem] w-full h-full flex flex-col">
            {/* Header */}
            <div className="chat-header flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#1f2a1d] flex items-center justify-center">
                  <svg className="w-5 h-5 text-ivory-silk" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1f2a1d]">MillionCXO Assistant</h3>
                  <p className="text-xs text-[#4b5b47]">Sales team planner</p>
                </div>
              </div>
              <button onClick={handleToggle} className="p-2 rounded-full text-[#1f2a1d] hover:bg-[#1f2a1d]/5 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[360px] max-h-[58vh]">
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
                  <svg className="w-5 h-5 text-ivory-silk" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
