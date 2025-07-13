'use client'

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

export default function ChatMessage({ message, onOptionSelect }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} message-slide-in`}>
      <div className={`max-w-xs px-4 py-2 rounded-2xl ${
        message.isBot 
          ? 'chat-message-bot text-onyx-black' 
          : 'chat-message-user text-onyx-black'
      }`}>
        <p className="text-sm font-medium">{message.text}</p>
        
        {message.options && message.options.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onOptionSelect(option)}
                className="chat-option-button w-full text-left px-3 py-2 text-xs rounded-lg font-medium"
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