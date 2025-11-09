'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

interface ProcessStep {
  step: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface ProcessStepperProps {
  steps: ProcessStep[]
  autoCycleInterval?: number
}

export default function ProcessStepper({ steps, autoCycleInterval = 2000 }: ProcessStepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [direction, setDirection] = useState<number>(1)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === steps.length - 1) {
          setDirection(-1)
          return 0
        } else {
          setDirection(1)
          return prev + 1
        }
      })
    }, autoCycleInterval)

    return () => clearInterval(interval)
  }, [steps.length, autoCycleInterval, isPaused])

  const handleStepHover = (stepIndex: number) => {
    setIsPaused(true)
    setDirection(stepIndex > currentStep ? 1 : -1)
    setCurrentStep(stepIndex)
  }

  const handleStepLeave = () => {
    setIsPaused(false)
  }

  const totalSteps = steps.length

  return (
    <div className="w-full">
      {/* Step Indicators */}
      <div className="flex items-center justify-center mb-12">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isNotLastStep = index < totalSteps - 1
          const status = currentStep === index ? 'active' : currentStep > index ? 'complete' : 'inactive'

          return (
            <div key={index} className="flex items-center">
              <div
                onMouseEnter={() => handleStepHover(index)}
                onMouseLeave={handleStepLeave}
              >
                <StepIndicator
                  step={stepNumber}
                  status={status}
                  icon={step.icon}
                />
              </div>
              {isNotLastStep && <StepConnector isComplete={currentStep > index} />}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <div className="relative min-h-[200px]">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div className="bg-ivory-silk/10 backdrop-blur-sm border border-golden-opal/30 rounded-2xl p-8 text-center">
              <div className="w-24 h-24 bg-golden-opal rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(196,183,91,0.5)]">
                {(() => {
                  const IconComponent = steps[currentStep].icon
                  return <IconComponent className="w-12 h-12 text-onyx-black" />
                })()}
              </div>
              <h3 className="text-2xl font-bold text-ivory-silk mb-4">{steps[currentStep].title}</h3>
              <p className="text-muted-jade text-lg leading-relaxed max-w-2xl mx-auto">
                {steps[currentStep].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

interface StepIndicatorProps {
  step: number
  status: 'active' | 'complete' | 'inactive'
  icon: React.ComponentType<{ className?: string }>
}

function StepIndicator({ step, status, icon: Icon }: StepIndicatorProps) {
  return (
    <motion.div
      className="relative cursor-pointer"
      animate={status}
      initial={false}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#21514e', borderColor: 'rgba(196, 183, 91, 0.3)' },
          active: { scale: 1.15, backgroundColor: '#c4b75b', borderColor: '#c4b75b' },
          complete: { scale: 1, backgroundColor: '#c4b75b', borderColor: '#c4b75b' }
        }}
        transition={{ duration: 0.4 }}
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 font-semibold shadow-[0_0_30px_rgba(196,183,91,0.4)]"
      >
        {status === 'complete' ? (
          <motion.svg
            className="h-6 w-6 text-onyx-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        ) : status === 'active' ? (
          <Icon className="h-8 w-8 text-onyx-black" />
        ) : (
          <span className="text-golden-opal text-sm font-bold">{step}</span>
        )}
      </motion.div>
      
      {/* Active step glow ring */}
      {status === 'active' && (
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-golden-opal"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}

interface StepConnectorProps {
  isComplete: boolean
}

function StepConnector({ isComplete }: StepConnectorProps) {
  return (
    <div className="relative mx-4 h-1 w-24 overflow-hidden rounded bg-golden-opal/20">
      <motion.div
        className="absolute left-0 top-0 h-full bg-golden-opal"
        initial={false}
        animate={{ width: isComplete ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  )
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? 100 : -100,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -100 : 100,
    opacity: 0,
    scale: 0.9
  })
}

