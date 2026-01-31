'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  Circle,
  Lock,
  Edit2,
  LockOpen,
  ChevronRight,
  Building2,
  User,
  Target,
  MessageSquare,
  Rocket,
  Megaphone,
  Mic2,
  Loader2,
  AlertCircle,
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
  lockedAt: Date
}

// Framework configurations
const frameworkConfigs = {
  icp: {
    name: 'Ideal Customer Profile',
    icon: Building2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Define the companies that are the best fit',
    stages: [
      {
        id: 'basics',
        label: 'Basics',
        intro:
          "Let's start with the fundamentals. I need to understand who we're talking about and why this matters.",
        questions: [
          {
            id: 'name',
            question:
              'What would you like to call this ICP? Give it a name that helps you recognize it later.',
            field: 'name',
            required: true,
            hint: 'Example: "Enterprise SaaS with 500+ employees"',
          },
          {
            id: 'context',
            question:
              'Before we dive deeper, tell me why you\'re defining this ICP right now. What\'s the business context or goal?',
            field: 'context',
            hint: 'Are you launching a new product, expanding into a new market, or refocusing sales?',
          },
        ],
      },
      {
        id: 'firmographics',
        label: 'Firmographics',
        intro: 'Now let\'s get specific about the characteristics of these companies.',
        questions: [
          {
            id: 'company-size',
            question:
              'What size companies are you targeting? Think about employee count, revenue, or ARR.',
            field: 'companySize',
            required: true,
            hint: 'Be specific: "1000-5000 employees" or "$50M-$500M revenue"',
          },
          {
            id: 'industries',
            question:
              'What industries or verticals are the best fit? Why those specifically?',
            field: 'industries',
            required: true,
            hint: 'List industries and briefly explain why they\'re good matches.',
          },
          {
            id: 'geography',
            question: 'Are there geographic constraints? Where do these companies operate?',
            field: 'geography',
          },
        ],
      },
      {
        id: 'pain-points',
        label: 'Pain Points & Needs',
        intro:
          'Understanding their pain points helps us understand if we\'re truly a fit.',
        questions: [
          {
            id: 'challenges',
            question:
              'What are the 2-3 biggest business challenges these companies face that your product can address?',
            field: 'painPoints',
            required: true,
            hint: 'Go deeper than surface-level. What keeps their CFO/CTO up at night?',
          },
          {
            id: 'needs',
            question: 'What are they trying to achieve? What does success look like for them?',
            field: 'needs',
            required: true,
            hint: 'Frame this in their terms, not your features.',
          },
        ],
      },
      {
        id: 'qualification',
        label: 'Qualification Criteria',
        intro:
          'Now let\'s define what makes someone in this ICP a fit—and what disqualifies them.',
        questions: [
          {
            id: 'must-haves',
            question:
              'What are the must-have characteristics? If they don\'t have these, they\'re not a good fit.',
            field: 'mustHaves',
            required: true,
            hint: 'These are your non-negotiables.',
          },
          {
            id: 'disqualifiers',
            question:
              'What would disqualify a company from being a good fit? What are your deal breakers?',
            field: 'disqualifiers',
            hint: 'Examples: "Already working with a competitor", "No budget for tools"',
          },
        ],
      },
    ],
  },
  persona: {
    name: 'Buyer Persona',
    icon: User,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    description: 'Document the individuals who buy your product',
    stages: [
      {
        id: 'basics',
        label: 'Basics',
        intro: "Let's create a clear picture of this buyer persona.",
        questions: [
          {
            id: 'name',
            question: 'What\'s a name or title for this persona? (e.g., "The Technical Evaluator")',
            field: 'name',
            required: true,
            hint: 'Make it memorable and descriptive.',
          },
          {
            id: 'role',
            question:
              'What\'s their job title and function in the organization? What department?',
            field: 'role',
            required: true,
          },
        ],
      },
      {
        id: 'responsibilities',
        label: 'Role & Responsibilities',
        intro: 'Now I need to understand what they actually do day-to-day.',
        questions: [
          {
            id: 'daily-work',
            question:
              'What does their day-to-day look like? What are their main responsibilities?',
            field: 'dailyWork',
            required: true,
            hint: 'Paint a picture of their typical week.',
          },
          {
            id: 'success-metrics',
            question:
              'How is their success measured? What KPIs or outcomes do they own?',
            field: 'successMetrics',
            required: true,
          },
        ],
      },
      {
        id: 'challenges',
        label: 'Challenges & Goals',
        intro: 'What keeps them from doing their job well? And what are they trying to achieve?',
        questions: [
          {
            id: 'pain-points',
            question: 'What are their biggest professional frustrations or challenges?',
            field: 'painPoints',
            required: true,
          },
          {
            id: 'goals',
            question: 'What are they trying to achieve in the next 6-12 months?',
            field: 'goals',
            required: true,
          },
        ],
      },
      {
        id: 'buying-behavior',
        label: 'Buying Behavior',
        intro: 'Finally, how do they approach purchasing decisions?',
        questions: [
          {
            id: 'decision-role',
            question:
              'What role do they play in purchasing decisions? (decision-maker, influencer, evaluator, user, blocker)',
            field: 'decisionRole',
            required: true,
          },
          {
            id: 'research-habits',
            question:
              'How do they research solutions? Where do they get information?',
            field: 'researchHabits',
          },
          {
            id: 'objections',
            question:
              'What concerns or objections do they typically raise?',
            field: 'objections',
          },
        ],
      },
    ],
  },
  positioning: {
    name: 'Positioning Canvas',
    icon: Target,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    description: 'Define what makes you different and why it matters',
    stages: [
      {
        id: 'basics',
        label: 'The Basics',
        intro: 'Let\'s start with the fundamentals of your positioning.',
        questions: [
          {
            id: 'name',
            question: 'What would you call this positioning canvas?',
            field: 'name',
            required: true,
            hint: 'Something that describes what you\'re positioning (product, solution, feature)',
          },
          {
            id: 'product',
            question: 'Give me a brief description of what you\'re positioning.',
            field: 'product',
            required: true,
          },
        ],
      },
      {
        id: 'alternatives',
        label: 'The Market Context',
        intro:
          'To be different, we need to understand what alternatives exist in your customer\'s mind.',
        questions: [
          {
            id: 'alternatives',
            question:
              'What would customers use if your product didn\'t exist? List competitors, substitutes, and the status quo.',
            field: 'alternatives',
            required: true,
            hint: 'Include non-obvious alternatives like "doing nothing" or manual processes.',
          },
        ],
      },
      {
        id: 'differentiation',
        label: 'Your Differentiation',
        intro: 'Now let\'s lock in what makes you genuinely different.',
        questions: [
          {
            id: 'attributes',
            question:
              'What features, capabilities, or characteristics do you have that alternatives lack?',
            field: 'attributes',
            required: true,
            hint: 'Focus on what\'s genuinely different, not just better.',
          },
          {
            id: 'value',
            question:
              'What business value do these attributes create? What outcomes do they enable?',
            field: 'value',
            required: true,
            hint: 'Translate features into outcomes customers care about.',
          },
          {
            id: 'proof',
            question:
              'What proof do you have? Case studies, metrics, customer testimonials?',
            field: 'proof',
            required: true,
          },
        ],
      },
      {
        id: 'targeting',
        label: 'Target Market',
        intro: 'Who cares most about this differentiation?',
        questions: [
          {
            id: 'target-segment',
            question:
              'Who are the customers most likely to value your differentiation?',
            field: 'targetSegment',
            required: true,
          },
          {
            id: 'category',
            question:
              'What market category or framework should you compete in? This is the context that makes your strengths obvious.',
            field: 'category',
            required: true,
            hint: 'Example: "The AI-native CRM" instead of just "CRM"',
          },
        ],
      },
    ],
  },
}

export function StrategyBuilderClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const framework = (searchParams.get('framework') || 'icp') as keyof typeof frameworkConfigs
  const config = frameworkConfigs[framework]
  const Icon = config.icon

  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      type: 'agent',
      content: `Let's build a ${config.name}. ${config.stages[0].intro}`,
      stage: config.stages[0].id,
    },
  ])
  const [input, setInput] = useState('')
  const [lockedDecisions, setLockedDecisions] = useState<LockedDecision[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const currentStage = config.stages[currentStageIndex]
  const currentQuestion = currentStage.questions[currentQuestionIndex]
  const totalQuestions = config.stages.reduce((acc, stage) => acc + stage.questions.length, 0)
  const answeredQuestions = lockedDecisions.length

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmitAnswer = async () => {
    if (!input.trim()) return

    setIsLoading(true)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      stage: currentStage.id,
      field: currentQuestion.field,
    }
    setMessages((prev) => [...prev, userMessage])

    // Lock this decision
    const decision: LockedDecision = {
      field: currentQuestion.field,
      value: input,
      reasoning: input,
      stage: currentStage.id,
      lockedAt: new Date(),
    }
    setLockedDecisions((prev) => [...prev, decision])

    // Clear input
    setInput('')

    // Simulate agent processing
    setTimeout(() => {
      const isLastQuestionInStage =
        currentQuestionIndex === currentStage.questions.length - 1
      const isLastStage = currentStageIndex === config.stages.length - 1

      let responseContent = ''
      let nextStage = currentStage
      let nextQuestion = currentQuestion

      if (isLastQuestionInStage && !isLastStage) {
        // Move to next stage
        const nextStageIdx = currentStageIndex + 1
        nextStage = config.stages[nextStageIdx]
        responseContent = `Great! We've nailed down the ${currentStage.label}. ${nextStage.intro}`
        setCurrentStageIndex(nextStageIdx)
        setCurrentQuestionIndex(0)
      } else if (!isLastQuestionInStage) {
        // Move to next question in stage
        const nextQIdx = currentQuestionIndex + 1
        nextQuestion = currentStage.questions[nextQIdx]
        responseContent = `Got it. ${nextQuestion.question}`
        setCurrentQuestionIndex(nextQIdx)
      } else if (isLastQuestionInStage && isLastStage) {
        // Framework complete
        responseContent = `Perfect! Your ${config.name} is complete and locked in. All decisions are captured with your reasoning.`
      }

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: responseContent,
        stage: nextStage.id,
        locked: true,
      }

      setMessages((prev) => [...prev, agentMessage])
      setIsLoading(false)
    }, 600)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Progress & Decisions */}
      <div className="w-80 border-r bg-muted/30 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <Link href="/strategy/new" className="flex items-center gap-2 text-sm font-medium hover:opacity-75">
            <ArrowLeft className="h-4 w-4" />
            Back to Frameworks
          </Link>
        </div>

        {/* Framework Info */}
        <div className="p-4 border-b">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <Icon className={`h-5 w-5 ${config.color}`} />
            </div>
            <div>
              <h2 className="font-semibold text-sm">{config.name}</h2>
              <p className="text-xs text-muted-foreground">{config.description}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="p-4 border-b">
          <div className="text-xs font-medium mb-3">
            Progress: {answeredQuestions}/{totalQuestions} locked
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Stage Progress */}
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-4">
            {config.stages.map((stage, idx) => {
              const stageAnswered = lockedDecisions.filter((d) => d.stage === stage.id).length
              const isCurrentStage = idx === currentStageIndex
              const isCompleted = stageAnswered === stage.questions.length

              return (
                <div key={stage.id} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : isCurrentStage ? (
                        <Circle className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{stage.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {stageAnswered}/{stage.questions.length} answers
                      </p>
                    </div>
                  </div>

                  {/* Question list for current stage */}
                  {isCurrentStage && (
                    <div className="ml-7 space-y-1">
                      {stage.questions.map((q, qIdx) => {
                        const isAnswered = lockedDecisions.some((d) => d.field === q.field)
                        return (
                          <div
                            key={q.id}
                            className={`text-xs p-2 rounded ${
                              isAnswered
                                ? 'bg-green-50 text-green-700'
                                : qIdx === currentQuestionIndex
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-muted-foreground'
                            }`}
                          >
                            {isAnswered && <Lock className="h-3 w-3 inline mr-1" />}
                            {q.question.substring(0, 40)}...
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Save */}
        <div className="p-4 border-t">
          <Button className="w-full" disabled={answeredQuestions === 0}>
            Save & Create Framework
          </Button>
        </div>
      </div>

      {/* Main Content - Conversation */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-3xl">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'agent' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-lg ${
                    msg.type === 'agent'
                      ? 'bg-muted/50 border rounded-lg'
                      : 'bg-primary text-primary-foreground rounded-lg'
                  } p-4`}
                >
                  {msg.type === 'agent' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-4 w-4 ${config.color}`} />
                      <span className="text-xs font-medium">{config.name}</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.locked && (
                    <div className="flex items-center gap-1 mt-2 text-xs opacity-75">
                      <Lock className="h-3 w-3" />
                      <span>Decision locked</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-6 bg-muted/30">
          {currentQuestion && (
            <div className="mb-4">
              <div className="flex items-start gap-2 mb-3">
                <div className="text-xs font-medium text-muted-foreground">
                  {currentStage.label} • Question {currentQuestionIndex + 1}
                </div>
                {currentQuestion.required && (
                  <Badge variant="secondary" className="text-xs">
                    Required
                  </Badge>
                )}
              </div>
              <p className="text-sm font-medium mb-2">{currentQuestion.question}</p>
              {currentQuestion.hint && (
                <Alert className="mb-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">{currentQuestion.hint}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Textarea
              placeholder="Type your answer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey && input.trim()) {
                  handleSubmitAnswer()
                }
              }}
              disabled={isLoading}
              className="min-h-20 resize-none"
            />
            <Button
              onClick={handleSubmitAnswer}
              disabled={!input.trim() || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Lock Answer</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Ctrl+Enter to submit • Each answer locks your reasoning in place
          </p>
        </div>
      </div>
    </div>
  )
}
