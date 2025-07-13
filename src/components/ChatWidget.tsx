'use client'

import { useState } from 'react'
import ChatMessage from './ChatMessage'
import ChatToggle from './ChatToggle'

interface Message {
  id: string
  text: string
  isBot: boolean
  options?: string[]
  timestamp: Date
}

interface ConversationState {
  currentStep: string
  userSelections: Record<string, string>
  messages: Message[]
  isTyping: boolean
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const [conversation, setConversation] = useState<ConversationState>({
    currentStep: 'initial-prompt',
    userSelections: {},
    messages: [
      {
        id: '1',
        text: "Hello! I'm here to help you find the perfect solution for your B2B sales needs. What brings you here today?",
        isBot: true,
        timestamp: new Date()
      }
    ],
    isTyping: false
  })

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    
    handleUserInput(inputText.trim())
    setInputText('')
  }

  const handleOptionSelect = (option: string) => {
    handleUserInput(option)
  }

  const handleUserInput = (userInput: string) => {
    // Handle redirect for booking CXO meetings
    if (conversation.currentStep === 'welcome' && (userInput.toLowerCase().includes("cxo") || userInput.toLowerCase().includes("meeting"))) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: userInput,
        isBot: false,
        timestamp: new Date()
      };

      const botResponse: Message = {
        id: `bot-${Date.now()}-redirect`,
        text: "Great! Redirecting you to our booking page to schedule your call.",
        isBot: true,
        options: [],
        timestamp: new Date()
      };

      setConversation(prev => ({
        ...prev,
        currentStep: 'redirected-to-booking',
        messages: [...prev.messages, userMessage, botResponse],
        isTyping: false
      }));

      setTimeout(() => {
        window.open('https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled', '_blank');
      }, 1000);

      return;
    }

    // Handle contact form redirect
    if (userInput.includes("contact form")) {
      // Navigate to contact page
      window.location.href = '/contact'
      return
    }

    // Handle free discovery call booking
    if (userInput.includes("Book a free discovery call") || userInput.includes("free discovery call") || userInput.includes("book a free call")) {
      // Navigate to Microsoft Outlook booking site
      window.open('https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled', '_blank')
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userInput,
      isBot: false,
      timestamp: new Date()
    }

    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true
    }))

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = generateBotResponse(userInput, conversation.currentStep)
      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, botResponse],
        isTyping: false,
        currentStep: botResponse.id.split('-').pop() || 'welcome' // Extract step from ID
      }))
    }, 1000)
  }

  const generateBotResponse = (userInput: string, currentStep: string): Message => {
    let response = ""
    let options: string[] = []
    let nextStep = ""

    // Convert input to lowercase for better matching
    const input = userInput.toLowerCase()

    // Handle initial user input
    if (currentStep === "initial-prompt") {
      response = "Thank you for your message! I can help you with our three main services. Which one interests you most?"
      options = [
        "I want to book qualified CXO meetings",
        "I need a dedicated SDR team",
        "I want to set up sales infrastructure",
        "I have general questions"
      ]
      nextStep = "welcome"
    }
    // Handle welcome step - both options and free text
    else if (currentStep === "welcome") {
      if (input.includes("sdr") || input.includes("sales development") || input.includes("outreach") || input.includes("lead")) {
        response = "Perfect! Our SDR as a Service provides a dedicated full-time SDR for $1,999/month. What's your current sales challenge?"
        options = [
          "We don't have time for outreach",
          "We need more qualified leads",
          "We want to scale our sales team"
        ]
        nextStep = "sdr-challenge"
      } 
      else if (input.includes("infrastructure") || input.includes("crm") || input.includes("automation") || input.includes("setup")) {
        response = "Excellent! Our Consultation & Infrastructure Setup includes complete CRM customization and automation. What's your current setup?"
        options = [
          "We're starting from scratch",
          "We have basic tools but need optimization", 
          "We need advanced automation and training"
        ]
        nextStep = "infra-setup"
      }
      else if (input.includes("question") || input.includes("help") || input.includes("info") || input.includes("learn")) {
        response = "I'd be happy to help! What would you like to know about our services?"
        options = [
          "What's included in each service?",
          "How do you ensure meeting quality?",
          "What's your typical ROI?",
          "Can you customize for our industry?"
        ]
        nextStep = "general-info"
      }
      else {
        // Default response for free text that doesn't match any category
        response = "Thank you for your message! I can help you with our three main services. Which one interests you most?"
        options = [
          "I want to book qualified CXO meetings",
          "I need a dedicated SDR team",
          "I want to set up sales infrastructure",
          "I have general questions"
        ]
        nextStep = "welcome"
      }
    }

    // Company size follow-ups for Pilot Program
    else if (currentStep === "pilot-company-size") {
      // Skip this step if user already booked a call
      if (input.includes("book a free discovery call") || input.includes("free discovery call")) {
        return {
          id: `bot-${Date.now()}-redirect`,
          text: "Perfect! The booking page will open in a new tab. Thank you for your interest in our Pilot Program!",
          isBot: true,
          options: [],
          timestamp: new Date()
        }
      }
      
      response = "Perfect! Now let's talk about your budget for qualified meetings. What's your monthly sales budget?"
      options = [
        "Under $5,000",
        "$5,000 - $15,000", 
        "$15,000 - $30,000",
        "$30,000+"
      ]
      nextStep = "budget-qualification"
    }

    // Sales challenge follow-ups for SDR Service  
    else if (currentStep === "sdr-challenge") {
      response = "That's a common challenge. Our SDR service handles 300 emails, 150 calls, and 70 LinkedIn InMails daily. What's your budget range?"
      options = [
        "Under $5,000/month",
        "$5,000 - $15,000/month",
        "$15,000 - $30,000/month", 
        "$30,000+/month"
      ]
      nextStep = "budget-qualification"
    }

    // Infrastructure setup follow-ups
    else if (currentStep === "infra-setup") {
      response = "Great! We'll customize everything for your needs. What's your budget for sales infrastructure setup?"
      options = [
        "Under $10,000",
        "$10,000 - $25,000",
        "$25,000 - $50,000",
        "$50,000+"
      ]
      nextStep = "budget-qualification"
    }

    // Budget qualification to timeline
    else if (currentStep === "budget-qualification") {
      response = "Excellent! When would you like to get started?"
      options = [
        "Immediately (this week)",
        "Within 1 month",
        "Within 3 months", 
        "Just exploring options"
      ]
      nextStep = "timeline-qualification"
    }

    // Timeline to final recommendation
    else if (currentStep === "timeline-qualification") {
      const service = conversation.userSelections.service || "our services"
      response = `Based on your needs and timeline, I believe ${service} would be perfect for you. Let's get you connected with our team to discuss your specific requirements and create a customized proposal.`
      options = [
        "Yes, let's schedule a call",
        "Send me more information first",
        "I need to discuss with my team"
      ]
      nextStep = "final-action"
    }

    // Final action
    else if (currentStep === "final-action") {
      if (input.includes("schedule") || input.includes("call") || input.includes("yes")) {
        response = "Perfect! I'll direct you to our contact form where you can provide your details, and we'll schedule your discovery call immediately."
        options = ["Take me to the contact form"]
        nextStep = "redirect-contact"
      } else if (input.includes("information") || input.includes("details") || input.includes("more")) {
        response = "I'll make sure our team sends you detailed information. Please fill out our contact form so we can send you a customized proposal."
        options = ["Take me to the contact form"]  
        nextStep = "redirect-contact"
      } else {
        response = "No problem! Take your time. When you're ready, we'll be here to help you get started. For now, let me direct you to our contact form."
        options = ["Take me to the contact form"]
        nextStep = "redirect-contact"
      }
    }

    // General info responses
    else if (currentStep === "general-info") {
      if (input.includes("included") || input.includes("what")) {
        response = "Great question! Each service includes different components. Which service interests you most so I can give you specific details?"
        options = [
          "Pilot Program details",
          "SDR Service details", 
          "Infrastructure Setup details"
        ]
        nextStep = "service-details"
      } else {
        response = "That's an excellent question! To give you the most relevant answer, which service are you most interested in?"
        options = [
          "Pilot Program",
          "SDR as a Service",
          "Infrastructure Setup"
        ]
        nextStep = "welcome" // Loop back to service selection
      }
    }

    else {
      // Default fallback
      response = "Thank you for your interest! Let me help you find the right solution."
      options = [
        "I want to book qualified CXO meetings",
        "I need a dedicated SDR team",
        "I want to set up sales infrastructure"
      ]
      nextStep = "welcome"
    }

    // Store user selections for later use
    setConversation(prev => ({
      ...prev,
      userSelections: {
        ...prev.userSelections,
        [currentStep]: userInput
      }
    }))

    return {
      id: `bot-${Date.now()}-${nextStep}`,
      text: response,
      isBot: true,
      options,
      timestamp: new Date()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <ChatToggle isOpen={isOpen} onClick={handleToggle} />

      {/* Chat Widget */}
      {isOpen && (
        <div className="chat-widget-container chat-fade-in fixed bottom-20 right-4 w-96 h-[500px] rounded-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="chat-header p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-onyx-black font-semibold text-sm">MillionCXO Assistant</h3>
              <button
                onClick={handleToggle}
                className="text-onyx-black/60 hover:text-onyx-black transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onOptionSelect={handleOptionSelect}
              />
            ))}
            
            {conversation.isTyping && (
              <div className="typing-indicator flex items-center space-x-2 text-onyx-black/60 message-slide-in">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-golden-opal rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-golden-opal rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-golden-opal rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs font-medium">Typing...</span>
              </div>
                          )}
            </div>

            {/* Input Area */}
            <div className="border-t border-golden-opal/20 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="chat-input flex-1 px-4 py-2 rounded-xl text-onyx-black placeholder-onyx-black/60 focus:outline-none text-sm font-medium"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="chat-send-button px-4 py-2 text-onyx-black rounded-xl font-medium text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  } 