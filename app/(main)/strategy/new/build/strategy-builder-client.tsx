'use client'

import React from "react"

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  Lock,
  Lightbulb,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  type: 'agent' | 'user'
  content: string
  stage?: string
  field?: string
  locked?: boolean
}

interface LockedDecision {
  field: string
  value: string
  reasoning: string
  stage: string
}

const frameworkConfigs = {
  icp: {
    name: 'Ideal Customer Profile',
    description: 'Define the companies that are the best fit',
    stages: [
      {
        id: 'basics',
        label: 'Basics',
        intro: "Let's start with the fundamentals of this ICP.",
        questions: [
          {
            id: 'name',
            question: 'What would you like to call this ICP?',
            field: 'name',
            required: true,
            hint: 'Example: Enterprise SaaS, Mid-market Tech',
          },
          {
            id: 'context',
            question: 'Why are you defining this ICP right now?',
            field: 'context',
            hint: 'New product launch? Market expansion? Refocusing sales?',
          },
        ],
      },
      {
        id: 'firmographics',
        label: 'Firmographics',
        intro: 'Now let\'s get specific about company characteristics.',
        questions: [
          {
            id: 'company-size',
            question: 'What size companies are you targeting?',
            field: 'companySize',
            required: true,
            hint: '1000-5000 employees? $50M-$500M revenue?',
          },
          {
            id: 'industries',
            question: 'Which industries are the best fit?',
            field: 'industries',
            required: true,
            hint: 'List industries and explain why they match.',
          },
        ],
      },
      {
        id: 'qualification',
        label: 'Qualification',
        intro: 'Define what makes someone a fit.',
        questions: [
          {
            id: 'must-haves',
            question: 'What are the must-have characteristics?',
            field: 'mustHaves',
            required: true,
            hint: 'These are your non-negotiables.',
          },
          {
            id: 'disqualifiers',
            question: 'What would disqualify them?',
            field: 'disqualifiers',
            hint: 'What are your deal breakers?',
          },
        ],
      },
    ],
  },
  positioning: {
    name: 'Positioning Canvas',
    description: 'Capture what makes your product different',
    stages: [
      {
        id: 'target',
        label: 'Target',
        intro: 'Let\'s define who you\'re positioned for.',
        questions: [
          {
            id: 'target-audience',
            question: 'Who is your target audience?',
            field: 'targetAudience',
            required: true,
            hint: 'The specific personas or companies.',
          },
          {
            id: 'underserved-needs',
            question: 'What underserved needs do they have?',
            field: 'underservedNeeds',
            required: true,
          },
        ],
      },
      {
        id: 'value',
        label: 'Value',
        intro: 'What\'s your unique value proposition?',
        questions: [
          {
            id: 'value-prop',
            question: 'What\'s your core value proposition?',
            field: 'valueProposition',
            required: true,
            hint: 'How do you solve their problem uniquely?',
          },
          {
            id: 'competitors',
            question: 'Who are your main competitors?',
            field: 'competitors',
            hint: 'What alternatives do they consider?',
          },
        ],
      },
    ],
  },
}

export function StrategyBuilderClient() {
  const searchParams = useSearchParams()
  const framework = searchParams.get('framework') || 'icp'
  const config = frameworkConfigs[framework as keyof typeof frameworkConfigs] || frameworkConfigs.icp

  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [lockedDecisions, setLockedDecisions] = useState<LockedDecision[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const currentStage = config.stages[currentStageIndex]
  const currentQuestion = currentStage.questions[currentQuestionIndex]

  useEffect(() => {
    if (messages.length === 0) {
      const introMsg: Message = {
        id: '0',
        type: 'agent',
        content: `Great! Let's build your ${config.name}. ${currentStage.intro}`,
        stage: currentStage.id,
      }
      setMessages([introMsg])
    }
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentStageIndex])

  useEffect(() => {
    if (currentQuestionIndex > 0 || messages.length > 1) {
      const questionMsg: Message = {
        id: `q-${currentStageIndex}-${currentQuestionIndex}`,
        type: 'agent',
        content: currentQuestion.question,
        stage: currentStage.id,
        field: currentQuestion.field,
      }
      setMessages((prev) => [...prev, questionMsg])
    }
  }, [currentQuestionIndex])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    setIsLoading(true)

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: userInput,
      stage: currentStage.id,
      field: currentQuestion.field,
    }

    setMessages((prev) => [...prev, userMsg])

    const locked: LockedDecision = {
      field: currentQuestion.field,
      value: userInput,
      reasoning: `Answered: ${currentQuestion.question}`,
      stage: currentStage.id,
    }
    setLockedDecisions((prev) => [...prev, locked])

    setUserInput('')
    setIsLoading(false)

    // Move to next question or stage
    if (currentQuestionIndex < currentStage.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else if (currentStageIndex < config.stages.length - 1) {
      setCurrentStageIndex((prev) => prev + 1)
      setCurrentQuestionIndex(0)
    } else {
      // Framework complete
      const completeMsg: Message = {
        id: `complete-${Date.now()}`,
        type: 'agent',
        content: `Excellent! You've completed your ${config.name}. Your framework is now locked and ready to use.`,
        stage: currentStage.id,
      }
      setMessages((prev) => [...prev, completeMsg])
    }
  }

  const progressPercent = Math.round(
    ((currentStageIndex * 100) / config.stages.length +
      (currentQuestionIndex * 100) / (currentStage.questions.length * config.stages.length)) *
      100
  ) / 100

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Progress */}
      <div className="hidden lg:flex w-64 flex-col border-r border-border bg-card p-6">
        <Link href="/strategy/new" className="flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mb-6">
          <h2 className="font-semibold text-foreground mb-2">{config.name}</h2>
          <p className="text-xs text-muted-foreground">{config.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-foreground">Progress</span>
            <span className="text-xs text-muted-foreground">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-2 flex-1">
          {config.stages.map((stage, idx) => {
            const stageLocked = lockedDecisions.filter((d) => d.stage === stage.id).length
            const stageTotal = stage.questions.length
            const isActive = idx === currentStageIndex
            const isComplete = stageLocked === stageTotal

            return (
              <div
                key={stage.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  isActive ? 'bg-primary/10 border border-primary' : isComplete ? 'bg-accent/10 border border-accent' : 'bg-muted/5 border border-border'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {isComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  ) : isActive ? (
                    <div className="h-4 w-4 rounded-full bg-primary" />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-muted" />
                  )}
                  <span className="text-sm font-medium text-foreground">{stage.label}</span>
                </div>
                <span className="text-xs text-muted-foreground ml-6">
                  {stageLocked} of {stageTotal} locked
                </span>
              </div>
            )
          })}
        </div>

        {/* Locked Decisions Summary */}
        {lockedDecisions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
              <Lock className="h-3 w-3" />
              Locked Decisions
            </h3>
            <div className="space-y-2">
              {lockedDecisions.slice(-3).map((decision, idx) => (
                <div key={idx} className="text-xs">
                  <div className="font-medium text-foreground truncate">{decision.field}</div>
                  <div className="text-muted-foreground truncate">{decision.value.substring(0, 40)}...</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-foreground">{config.name}</h1>
            <p className="text-sm text-muted-foreground">
              {currentStage.label} • Question {currentQuestionIndex + 1} of {currentStage.questions.length}
            </p>
          </div>
          <Link href="/strategy/new">
            <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  {msg.type === 'agent' && msg.field && (
                    <div className="flex items-start gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                      {msg.content && <p className="text-sm">{msg.content}</p>}
                    </div>
                  )}
                  {msg.type === 'agent' && !msg.field && (
                    <p className="text-sm">{msg.content}</p>
                  )}
                  {msg.type === 'user' && <p className="text-sm">{msg.content}</p>}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-card p-6">
          <div className="max-w-2xl mx-auto">
            {currentQuestionIndex < currentStage.questions.length || currentStageIndex < config.stages.length - 1 ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer..."
                    className="min-h-20 resize-none"
                    disabled={isLoading}
                  />
                  {currentQuestion.hint && (
                    <p className="text-xs text-muted-foreground mt-2">{currentQuestion.hint}</p>
                  )}
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={!userInput.trim() || isLoading}
                    className="gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Locking...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Lock Decision
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <Alert className="border-accent/50 bg-accent/5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <AlertDescription className="ml-2">
                  Framework complete! Your {config.name} is locked and ready to use.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
