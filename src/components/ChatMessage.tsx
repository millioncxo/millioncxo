'use client'

import React from 'react'

interface Message {
  id: string
  text: string
  isBot: boolean
  options?: string[]
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
  onOptionSelect: (option: string) => void
}

function renderMarkdown(text: string) {
  // Bold: **text**
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Italic: *text*
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  // Line breaks: \n
  html = html.replace(/\n/g, '<br/>')
  return html
}

export default function ChatMessage({ message, onOptionSelect }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} message-slide-in`}>
      <div className={`max-w-xs px-5 py-3 rounded-2xl shadow-sm ${
        message.isBot 
          ? 'chat-message-bot text-onyx-black bg-ivory-silk/90' 
          : 'chat-message-user text-onyx-black bg-golden-opal/90'
      }`}>
        {message.isBot ? (
          <div className="text-base font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: renderMarkdown(message.text) }} />
        ) : (
          <p className="text-base font-semibold">{message.text}</p>
        )}
        {message.options && message.options.length > 0 && (
          <div className="mt-4 space-y-2">
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onOptionSelect(option)}
                className="chat-option-button w-full text-left px-3 py-2 text-sm rounded-lg font-semibold bg-golden-opal/20 hover:bg-golden-opal/40 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 