'use client'

import { useState } from 'react'

export default function WorldMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      >
        {/* Background */}
        <rect width="100%" height="100%" fill="var(--luxury-pure-white)" />
        
        {/* Grid lines for reference */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--luxury-dark-sage)" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* World Map - More accurate continent shapes */}
        <g>
          {/* North America */}
          <path
            d="M 50 120 Q 80 100 120 110 Q 180 100 220 120 Q 240 130 250 150 Q 260 170 250 190 Q 240 210 220 220 Q 200 230 180 225 Q 160 220 140 210 Q 120 200 100 190 Q 80 180 70 160 Q 60 140 50 120 Z"
            fill="var(--luxury-dark-sage)"
            opacity="0.8"
            className="hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('North America')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* South America */}
          <path
            d="M 180 280 Q 200 270 220 280 Q 230 300 235 320 Q 240 340 235 360 Q 230 380 220 400 Q 210 420 200 435 Q 190 450 180 460 Q 170 470 160 465 Q 150 460 145 445 Q 140 430 138 410 Q 136 390 140 370 Q 144 350 150 330 Q 156 310 165 295 Q 172 285 180 280 Z"
            fill="var(--luxury-dark-sage)"
            opacity="0.8"
            className="hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('South America')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Europe */}
          <path
            d="M 420 130 Q 440 120 460 125 Q 480 130 495 140 Q 510 150 520 165 Q 525 180 520 195 Q 515 210 505 220 Q 495 230 480 235 Q 465 240 450 235 Q 435 230 425 220 Q 415 210 410 195 Q 405 180 408 165 Q 411 150 420 130 Z"
            fill="var(--luxury-dark-sage)"
            opacity="0.8"
            className="hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('Europe')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Africa */}
          <path
            d="M 440 250 Q 460 240 480 250 Q 500 260 515 280 Q 530 300 535 320 Q 540 340 535 360 Q 530 380 520 400 Q 510 420 495 435 Q 480 450 465 460 Q 450 470 435 465 Q 420 460 410 445 Q 400 430 395 410 Q 390 390 392 370 Q 394 350 400 330 Q 406 310 415 295 Q 424 280 435 265 Q 438 255 440 250 Z"
            fill="var(--luxury-dark-sage)"
            opacity="0.8"
            className="hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('Africa')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Asia */}
          <path
            d="M 550 120 Q 580 100 620 110 Q 660 120 700 130 Q 740 140 780 150 Q 820 160 840 180 Q 860 200 865 220 Q 870 240 860 260 Q 850 280 830 290 Q 810 300 790 295 Q 770 290 750 280 Q 730 270 710 255 Q 690 240 670 220 Q 650 200 630 180 Q 610 160 590 145 Q 570 130 550 120 Z"
            fill="var(--luxury-dark-sage)"
            opacity="0.8"
            className="hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('Asia')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Australia */}
          <path
            d="M 720 380 Q 750 370 780 380 Q 810 390 830 410 Q 840 430 835 450 Q 830 470 815 480 Q 800 490 785 485 Q 770 480 755 470 Q 740 460 730 445 Q 720 430 718 410 Q 716 390 720 380 Z"
            fill="var(--luxury-dark-sage)"
            opacity="0.8"
            className="hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('Australia')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Greenland */}
          <path
            d="M 320 80 Q 340 70 360 80 Q 380 90 385 110 Q 390 130 385 150 Q 380 170 365 180 Q 350 190 335 185 Q 320 180 310 165 Q 300 150 305 135 Q 310 120 315 105 Q 317 90 320 80 Z"
            fill="var(--luxury-dark-sage)"
            opacity="0.8"
            className="hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('Greenland')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
        </g>
        
        {/* Interactive dots for major cities */}
        <g>
          {[
            { name: 'New York', x: 180, y: 160 },
            { name: 'London', x: 460, y: 150 },
            { name: 'Tokyo', x: 850, y: 180 },
            { name: 'Sydney', x: 800, y: 420 },
            { name: 'São Paulo', x: 200, y: 350 },
            { name: 'Dubai', x: 550, y: 210 },
            { name: 'Singapore', x: 750, y: 280 },
            { name: 'Mumbai', x: 650, y: 250 },
            { name: 'Lagos', x: 440, y: 280 },
            { name: 'Toronto', x: 160, y: 140 },
          ].map((city, index) => (
            <g key={city.name}>
              <circle
                cx={city.x}
                cy={city.y}
                r="3"
                fill="var(--luxury-gold)"
                className="hover:r-5 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredCountry(city.name)}
                onMouseLeave={() => setHoveredCountry(null)}
              />
              <circle
                cx={city.x}
                cy={city.y}
                r="8"
                fill="none"
                stroke="var(--luxury-gold)"
                strokeWidth="1"
                opacity="0.3"
                className="animate-ping"
                style={{ 
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            </g>
          ))}
        </g>
        
        {/* Connection lines between major cities */}
        <g opacity="0.2">
          <path
            d="M 180 160 Q 320 120 460 150"
            stroke="var(--luxury-gold)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3,3"
            className="animate-pulse"
          />
          <path
            d="M 460 150 Q 650 130 850 180"
            stroke="var(--luxury-gold)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3,3"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <path
            d="M 550 210 Q 650 240 750 280"
            stroke="var(--luxury-gold)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3,3"
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <path
            d="M 200 350 Q 320 290 440 280"
            stroke="var(--luxury-gold)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3,3"
            className="animate-pulse"
            style={{ animationDelay: '1.5s' }}
          />
        </g>
      </svg>
      
      {/* Hover tooltip */}
      {hoveredCountry && (
        <div className="absolute top-4 left-4 bg-luxury-dark-sage text-luxury-pure-white px-3 py-2 rounded-lg font-luxury-sans text-sm shadow-lg z-10 animate-fade-in">
          {hoveredCountry}
        </div>
      )}
      
      {/* Stats overlay */}
      <div className="absolute bottom-4 right-4 bg-luxury-pure-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="text-luxury-deep-black font-luxury font-semibold text-sm mb-2">
          Global Reach
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="text-center">
            <div className="text-luxury-gold font-bold">13+</div>
            <div className="text-luxury-charcoal">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-luxury-gold font-bold">28+</div>
            <div className="text-luxury-charcoal">Clients</div>
          </div>
        </div>
      </div>
    </div>
  )
} 