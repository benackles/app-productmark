"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  Circle,
  Lock,
  Edit2,
  Save,
  Building2,
  User,
  Target,
  MessageSquare,
  Rocket,
  Megaphone,
  Mic2,
  Loader2,
} from "lucide-react"
import Link from "next/link"

// Framework definitions with their conversation stages
const frameworkConfigs = {
  icp: {
    name: "Ideal Customer Profile",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    stages: [
      {
        id: "basics",
        label: "Basics",
        questions: [
          {
            id: "name",
            question: "What would you like to call this ICP? Give it a name that helps you recognize it later.",
            field: "name",
            required: true,
          },
          {
            id: "context",
            question:
              "Before we dive in, tell me a bit about why you're defining this ICP now. What's the context or goal?",
            field: "context",
          },
        ],
      },
      {
        id: "firmographics",
        label: "Firmographics",
        questions: [
          {
            id: "company-size",
            question:
              "What size companies are you targeting? Think about employee count, revenue, or other size indicators that matter.",
            field: "companySize",
          },
          {
            id: "industries",
            question:
              "What industries or verticals are the best fit? Be specific about which ones and why they're a good match.",
            field: "industries",
          },
          {
            id: "geography",
            question: "Are there geographic constraints? Where are these companies located?",
            field: "geography",
          },
        ],
      },
      {
        id: "characteristics",
        label: "Characteristics",
        questions: [
          {
            id: "business-model",
            question:
              "What business model do these companies typically have? (e.g., B2B, B2C, SaaS, services, etc.)",
            field: "businessModel",
          },
          {
            id: "tech-stack",
            question:
              "What technologies or platforms do they typically use? What's their technical environment like?",
            field: "techStack",
          },
          {
            id: "maturity",
            question: "What stage are these companies at? (e.g., startup, growth, enterprise, etc.)",
            field: "maturity",
          },
        ],
      },
      {
        id: "pain-points",
        label: "Pain Points",
        questions: [
          {
            id: "challenges",
            question:
              "What are the key challenges or pain points these companies face that your product addresses?",
            field: "painPoints",
          },
          {
            id: "needs",
            question: "What are they trying to achieve? What does success look like for them?",
            field: "needs",
          },
        ],
      },
      {
        id: "qualification",
        label: "Qualification",
        questions: [
          {
            id: "disqualifiers",
            question:
              "What would disqualify a company from being a good fit? What are the red flags or deal breakers?",
            field: "disqualifiers",
          },
          {
            id: "ideal-signals",
            question:
              "What signals indicate a company is a great fit? What makes you excited when you see it?",
            field: "idealSignals",
          },
        ],
      },
    ],
  },
  persona: {
    name: "Buyer Persona",
    icon: User,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    stages: [
      {
        id: "basics",
        label: "Basics",
        questions: [
          {
            id: "name",
            question: "What's the name or title for this persona? (e.g., 'The Technical Evaluator')",
            field: "name",
            required: true,
          },
          {
            id: "role",
            question: "What's their job title and department? Where do they sit in the organization?",
            field: "role",
          },
        ],
      },
      {
        id: "responsibilities",
        label: "Responsibilities",
        questions: [
          {
            id: "daily-work",
            question: "What does their day-to-day work look like? What are they responsible for?",
            field: "dailyWork",
          },
          {
            id: "success-metrics",
            question: "How is their success measured? What KPIs or outcomes do they care about?",
            field: "successMetrics",
          },
        ],
      },
      {
        id: "challenges",
        label: "Challenges",
        questions: [
          {
            id: "pain-points",
            question: "What are their biggest professional frustrations or challenges?",
            field: "painPoints",
          },
          {
            id: "obstacles",
            question: "What obstacles prevent them from achieving their goals?",
            field: "obstacles",
          },
        ],
      },
      {
        id: "buying-behavior",
        label: "Buying Behavior",
        questions: [
          {
            id: "decision-role",
            question:
              "What role do they play in purchasing decisions? (decision-maker, influencer, evaluator, user)",
            field: "decisionRole",
          },
          {
            id: "research-habits",
            question: "How do they research solutions? Where do they go for information?",
            field: "researchHabits",
          },
          {
            id: "objections",
            question: "What objections or concerns do they typically raise during the buying process?",
            field: "objections",
          },
        ],
      },
    ],
  },
  positioning: {
    name: "Positioning Canvas",
    icon: Target,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    stages: [
      {
        id: "basics",
        label: "Basics",
        questions: [
          {
            id: "name",
            question: "What would you like to call this positioning canvas?",
            field: "name",
            required: true,
          },
          {
            id: "product",
            question: "What product or solution are we positioning? Give me a brief description.",
            field: "product",
          },
        ],
      },
      {
        id: "alternatives",
        label: "Alternatives",
        questions: [
          {
            id: "competitive-alternatives",
            question:
              "What would customers use if your product didn't exist? Include competitors, substitutes, and the status quo.",
            field: "competitiveAlternatives",
          },
        ],
      },
      {
        id: "differentiation",
        label: "Differentiation",
        questions: [
          {
            id: "unique-attributes",
            question:
              "What features or capabilities do you have that alternatives lack? What makes you genuinely different?",
            field: "uniqueAttributes",
          },
          {
            id: "value",
            question:
              "What value do those unique attributes create for customers? What business outcomes do they enable?",
            field: "value",
          },
          {
            id: "proof",
            question:
              "What proof do you have? Think case studies, metrics, testimonials, or other evidence.",
            field: "proof",
          },
        ],
      },
      {
        id: "market",
        label: "Market",
        questions: [
          {
            id: "target-market",
            question: "Who cares most about this value? Describe the customers who find your differentiation most compelling.",
            field: "targetMarket",
          },
          {
            id: "market-category",
            question:
              "What market category should you compete in? The context that makes your strengths obvious.",
            field: "marketCategory",
          },
          {
            id: "trends",
            question:
              "What market trends make your product timely? What shifts make your solution more relevant now?",
            field: "trends",
          },
        ],
      },
    ],
  },
  "messaging-house": {
    name: "Messaging House",
    icon: MessageSquare,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    stages: [
      {
        id: "basics",
        label: "Basics",
        questions: [
          {
            id: "name",
            question: "What's the name of this messaging house? (e.g., 'Q1 2024 Product Launch Messaging')",
            field: "name",
            required: true,
          },
          {
            id: "audience",
            question: "Who is the primary audience for this messaging?",
            field: "audience",
          },
        ],
      },
      {
        id: "core-message",
        label: "Core Message",
        questions: [
          {
            id: "overarching",
            question:
              "What's the overarching message? The single most important thing you want your audience to understand.",
            field: "overarchingMessage",
          },
        ],
      },
      {
        id: "pillar-1",
        label: "Pillar 1",
        questions: [
          {
            id: "pillar1-value",
            question: "For your first messaging pillar, what's the VALUE? (The business outcome or result)",
            field: "pillar1Value",
          },
          {
            id: "pillar1-benefit",
            question: "What's the BENEFIT? (How it improves their day-to-day work)",
            field: "pillar1Benefit",
          },
          {
            id: "pillar1-feature",
            question: "What's the FEATURE? (The specific capability that makes it possible)",
            field: "pillar1Feature",
          },
        ],
      },
      {
        id: "pillar-2",
        label: "Pillar 2",
        questions: [
          {
            id: "pillar2-value",
            question: "For your second messaging pillar, what's the VALUE?",
            field: "pillar2Value",
          },
          {
            id: "pillar2-benefit",
            question: "What's the BENEFIT?",
            field: "pillar2Benefit",
          },
          {
            id: "pillar2-feature",
            question: "What's the FEATURE?",
            field: "pillar2Feature",
          },
        ],
      },
      {
        id: "pillar-3",
        label: "Pillar 3",
        questions: [
          {
            id: "pillar3-value",
            question: "For your third messaging pillar, what's the VALUE?",
            field: "pillar3Value",
          },
          {
            id: "pillar3-benefit",
            question: "What's the BENEFIT?",
            field: "pillar3Benefit",
          },
          {
            id: "pillar3-feature",
            question: "What's the FEATURE?",
            field: "pillar3Feature",
          },
        ],
      },
    ],
  },
  "sales-pitch": {
    name: "Sales Pitch Narrative",
    icon: Mic2,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    stages: [
      {
        id: "basics",
        label: "Basics",
        questions: [
          {
            id: "name",
            question: "What's the name for this sales pitch?",
            field: "name",
            required: true,
          },
          {
            id: "target",
            question: "Who is this pitch designed for? What persona or audience?",
            field: "targetAudience",
          },
        ],
      },
      {
        id: "hook",
        label: "Hook",
        questions: [
          {
            id: "opening",
            question:
              "What's the opening hook? How do you grab attention in the first 30 seconds?",
            field: "openingHook",
          },
          {
            id: "problem",
            question: "What problem are you highlighting? What's the pain your audience feels?",
            field: "problemStatement",
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        questions: [
          {
            id: "solution",
            question: "How do you present your solution? What's the transformation you offer?",
            field: "solution",
          },
          {
            id: "differentiation",
            question: "Why you? What makes your approach different or better?",
            field: "differentiation",
          },
        ],
      },
      {
        id: "proof",
        label: "Proof",
        questions: [
          {
            id: "evidence",
            question: "What proof points or stories demonstrate your value? Give specific examples.",
            field: "proofPoints",
          },
        ],
      },
      {
        id: "close",
        label: "Close",
        questions: [
          {
            id: "cta",
            question: "What's the call to action? What do you want them to do next?",
            field: "callToAction",
          },
        ],
      },
    ],
  },
  launch: {
    name: "Launch Framework",
    icon: Rocket,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    stages: [
      {
        id: "basics",
        label: "Basics",
        questions: [
          {
            id: "name",
            question: "What's the name of this launch?",
            field: "name",
            required: true,
          },
          {
            id: "launch-date",
            question: "When are you planning to launch? What's the target date?",
            field: "launchDate",
          },
          {
            id: "what",
            question: "What exactly are you launching? Describe the product, feature, or update.",
            field: "launchItem",
          },
        ],
      },
      {
        id: "goals",
        label: "Goals",
        questions: [
          {
            id: "objectives",
            question: "What are the primary objectives for this launch? What does success look like?",
            field: "objectives",
          },
          {
            id: "metrics",
            question: "How will you measure success? What metrics matter most?",
            field: "successMetrics",
          },
        ],
      },
      {
        id: "audience",
        label: "Audience",
        questions: [
          {
            id: "target-audience",
            question: "Who is the primary audience for this launch?",
            field: "targetAudience",
          },
          {
            id: "messaging",
            question: "What's the core message you want to communicate?",
            field: "coreMessage",
          },
        ],
      },
      {
        id: "channels",
        label: "Channels",
        questions: [
          {
            id: "channels",
            question: "What channels will you use to announce and promote the launch?",
            field: "channels",
          },
          {
            id: "content",
            question: "What content or assets do you need to create?",
            field: "contentNeeds",
          },
        ],
      },
      {
        id: "stakeholders",
        label: "Stakeholders",
        questions: [
          {
            id: "stakeholders",
            question: "Who are the key stakeholders? Who needs to be involved or informed?",
            field: "stakeholders",
          },
          {
            id: "risks",
            question: "What are the biggest risks or dependencies? What could go wrong?",
            field: "risks",
          },
        ],
      },
    ],
  },
  campaign: {
    name: "Campaign Plan",
    icon: Megaphone,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    stages: [
      {
        id: "basics",
        label: "Basics",
        questions: [
          {
            id: "name",
            question: "What's the name of this campaign?",
            field: "name",
            required: true,
          },
          {
            id: "duration",
            question: "What's the campaign timeframe? When does it start and end?",
            field: "duration",
          },
        ],
      },
      {
        id: "strategy",
        label: "Strategy",
        questions: [
          {
            id: "goal",
            question: "What's the primary goal of this campaign?",
            field: "goal",
          },
          {
            id: "target",
            question: "Who is the target audience?",
            field: "targetAudience",
          },
          {
            id: "message",
            question: "What's the core campaign message or theme?",
            field: "coreMessage",
          },
        ],
      },
      {
        id: "tactics",
        label: "Tactics",
        questions: [
          {
            id: "channels",
            question: "What channels will you activate? (email, social, paid, events, etc.)",
            field: "channels",
          },
          {
            id: "content",
            question: "What content will you create? List the key assets.",
            field: "contentPlan",
          },
        ],
      },
      {
        id: "measurement",
        label: "Measurement",
        questions: [
          {
            id: "kpis",
            question: "What KPIs will you track? How will you measure success?",
            field: "kpis",
          },
          {
            id: "budget",
            question: "What's the budget? Any constraints to be aware of?",
            field: "budget",
          },
        ],
      },
    ],
  },
}

type FrameworkKey = keyof typeof frameworkConfigs

type Message = {
  id: string
  role: "assistant" | "user"
  content: string
  stage?: string
  field?: string
}

type LockedDecision = {
  field: string
  value: string
  stage: string
  locked: boolean
}

export function StrategyBuilderClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const frameworkKey = (searchParams.get("framework") || "icp") as FrameworkKey
  const framework = frameworkConfigs[frameworkKey]

  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [decisions, setDecisions] = useState<Record<string, LockedDecision>>({})
  const [completedStages, setCompletedStages] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentStage = framework?.stages[currentStageIndex]
  const currentQuestion = currentStage?.questions[currentQuestionIndex]
  const Icon = framework?.icon || Building2

  // Initialize with first question
  useEffect(() => {
    if (framework && messages.length === 0) {
      const firstStage = framework.stages[0]
      const firstQuestion = firstStage.questions[0]
      setMessages([
        {
          id: "intro",
          role: "assistant",
          content: `Let's build your ${framework.name}. I'll guide you through a series of questions to capture your thinking and lock in clear decisions. You can always go back and edit later.\n\nLet's start with the basics.`,
        },
        {
          id: "q1",
          role: "assistant",
          content: firstQuestion.question,
          stage: firstStage.id,
          field: firstQuestion.field,
        },
      ])
    }
  }, [framework, messages.length])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!framework) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-muted-foreground">Framework not found</p>
        <Button asChild>
          <Link href="/strategy/new">Choose a framework</Link>
        </Button>
      </div>
    )
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || !currentQuestion || isProcessing) return

    setIsProcessing(true)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      stage: currentStage.id,
      field: currentQuestion.field,
    }

    setMessages((prev) => [...prev, userMessage])

    // Lock the decision
    setDecisions((prev) => ({
      ...prev,
      [currentQuestion.field]: {
        field: currentQuestion.field,
        value: inputValue,
        stage: currentStage.id,
        locked: true,
      },
    }))

    setInputValue("")

    // Determine next question
    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1

      if (nextQuestionIndex < currentStage.questions.length) {
        // More questions in current stage
        const nextQuestion = currentStage.questions[nextQuestionIndex]
        setCurrentQuestionIndex(nextQuestionIndex)

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: nextQuestion.question,
          stage: currentStage.id,
          field: nextQuestion.field,
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        // Stage complete
        setCompletedStages((prev) => [...prev, currentStage.id])

        const nextStageIndex = currentStageIndex + 1

        if (nextStageIndex < framework.stages.length) {
          // Move to next stage
          const nextStage = framework.stages[nextStageIndex]
          const nextQuestion = nextStage.questions[0]

          setCurrentStageIndex(nextStageIndex)
          setCurrentQuestionIndex(0)

          const transitionMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `Great, that's ${currentStage.label} locked in. Let's move on to ${nextStage.label}.`,
            stage: nextStage.id,
          }

          const questionMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content: nextQuestion.question,
            stage: nextStage.id,
            field: nextQuestion.field,
          }

          setMessages((prev) => [...prev, transitionMessage, questionMessage])
        } else {
          // All done
          const completionMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `Excellent! Your ${framework.name} is complete. Review your decisions in the panel on the right, then save when you're ready.`,
          }
          setMessages((prev) => [...prev, completionMessage])
        }
      }

      setIsProcessing(false)
    }, 300)
  }

  const handleEditDecision = (field: string) => {
    setEditingField(field)
  }

  const handleSaveEdit = (field: string, newValue: string) => {
    setDecisions((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: newValue,
      },
    }))
    setEditingField(null)
  }

  const handleSaveFramework = () => {
    console.log("Saving framework:", {
      type: frameworkKey,
      name: framework.name,
      decisions,
    })
    router.push("/strategy")
  }

  const isComplete = completedStages.length === framework.stages.length

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Link href="/strategy/new">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${framework.bgColor}`}>
              <Icon className={`h-5 w-5 ${framework.color}`} />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{framework.name}</h1>
              <p className="text-sm text-muted-foreground">Answer questions to build your framework</p>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <Card className="mb-4 p-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {framework.stages.map((stage, index) => {
              const isCompleted = completedStages.includes(stage.id)
              const isCurrent = currentStageIndex === index && !isComplete

              return (
                <div key={stage.id} className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                      isCompleted
                        ? "bg-emerald-100 text-emerald-700"
                        : isCurrent
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <Lock className="h-3.5 w-3.5" />
                    ) : isCurrent ? (
                      <Circle className="h-3.5 w-3.5" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 opacity-50" />
                    )}
                    <span className="font-medium">{stage.label}</span>
                  </div>
                  {index < framework.stages.length - 1 && (
                    <div className={`w-6 h-px ${isCompleted ? "bg-emerald-300" : "bg-border"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 border border-border text-foreground"
                    }`}
                  >
                    {message.stage && message.role === "assistant" && (
                      <Badge variant="outline" className="mb-2 text-xs">
                        {framework.stages.find((s) => s.id === message.stage)?.label}
                      </Badge>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          {!isComplete && (
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your answer..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="min-h-[60px] resize-none"
                  rows={2}
                />
                <Button onClick={handleSendMessage} size="icon" className="h-[60px] w-[60px]" disabled={isProcessing}>
                  {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
            </div>
          )}
        </Card>
      </div>

      {/* Decisions Panel */}
      <Card className="w-80 flex flex-col flex-shrink-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Decisions</h2>
            {isComplete && (
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Complete</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Your locked-in answers</p>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {framework.stages.map((stage) => {
              const stageDecisions = stage.questions
                .map((q) => ({ ...q, decision: decisions[q.field] }))
                .filter((q) => q.decision)

              if (stageDecisions.length === 0) return null

              return (
                <div key={stage.id}>
                  <div className="flex items-center gap-2 mb-2">
                    {completedStages.includes(stage.id) ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{stage.label}</span>
                  </div>
                  <div className="space-y-3 ml-6">
                    {stageDecisions.map(({ field, decision }) => (
                      <div key={field} className="group">
                        {editingField === field ? (
                          <div className="space-y-2">
                            <Textarea
                              defaultValue={decision?.value}
                              className="text-sm"
                              rows={3}
                              id={`edit-${field}`}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingField(null)}
                                className="bg-transparent"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => {
                                  const textarea = document.getElementById(`edit-${field}`) as HTMLTextAreaElement
                                  handleSaveEdit(field, textarea.value)
                                }}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2">
                            <p className="text-sm text-muted-foreground flex-1 line-clamp-3">
                              {decision?.value}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleEditDecision(field)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Separator className="mt-4" />
                </div>
              )
            })}

            {Object.keys(decisions).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Decisions will appear here as you answer questions
              </p>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <Button className="w-full" onClick={handleSaveFramework} disabled={!decisions.name}>
            <Save className="h-4 w-4 mr-2" />
            Save Framework
          </Button>
        </div>
      </Card>
    </div>
  )
}
