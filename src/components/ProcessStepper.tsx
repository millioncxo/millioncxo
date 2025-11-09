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
      {/* Mobile: Vertical Layout */}
      <div className="block md:hidden">
        <div className="space-y-6 relative">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isNotLastStep = index < totalSteps - 1
            const status = currentStep === index ? 'active' : currentStep > index ? 'complete' : 'inactive'

            return (
              <div key={index} className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => handleStepHover(index)}
                    className="cursor-pointer flex-shrink-0"
                  >
                    <StepIndicator
                      step={stepNumber}
                      status={status}
                      icon={step.icon}
                    />
                  </div>
                  {isNotLastStep && (
                    <div className="relative w-0.5 h-6 mt-2 bg-golden-opal/20">
                      <motion.div
                        className="absolute top-0 left-0 w-full bg-golden-opal"
                        initial={false}
                        animate={{ height: status === 'complete' || status === 'active' ? '100%' : '0%' }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1 pt-1 pb-6">
                  <h3 className="text-base font-bold text-ivory-silk mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-jade leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Desktop: Horizontal Layout */}
      <div className="hidden md:block">
        {/* Step Indicators */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center">
            {steps.map((step, index) => {
              const stepNumber = index + 1
              const isNotLastStep = index < totalSteps - 1
              const status = currentStep === index ? 'active' : currentStep > index ? 'complete' : 'inactive'

              return (
                <div key={index} className="flex items-center">
                  <div
                    onMouseEnter={() => handleStepHover(index)}
                    onMouseLeave={handleStepLeave}
                    onClick={() => handleStepHover(index)}
                    className="cursor-pointer"
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
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#21514e', borderColor: 'rgba(196, 183, 91, 0.3)' },
          active: { scale: 1.15, backgroundColor: '#c4b75b', borderColor: '#c4b75b' },
          complete: { scale: 1, backgroundColor: '#c4b75b', borderColor: '#c4b75b' }
        }}
        transition={{ duration: 0.4 }}
        className="flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 font-semibold shadow-[0_0_30px_rgba(196,183,91,0.4)]"
      >
        {status === 'complete' ? (
          <motion.svg
            className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-onyx-black"
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
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-onyx-black" />
        ) : (
          <span className="text-golden-opal text-xs sm:text-sm font-bold">{step}</span>
        )}
      </motion.div>
      
      {/* Active step glow ring */}
      {status === 'active' && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 sm:border-4 border-golden-opal"
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
    <div className="relative mx-2 sm:mx-3 lg:mx-4 h-1 w-8 sm:w-12 lg:w-24 overflow-hidden rounded bg-golden-opal/20">
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

