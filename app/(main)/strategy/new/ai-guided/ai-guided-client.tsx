"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, Sparkles, CheckCircle2, Circle, Edit2, RefreshCw, Save, Share2 } from "lucide-react"
import Link from "next/link"

type Stage = "target-audience" | "problem-context" | "positioning" | "messaging" | "gtm-planning"

type Message = {
  id: string
  role: "assistant" | "user"
  content: string
  stage?: Stage
}

type StrategyOutput = {
  audienceDefinition?: string
  positioningStatement?: string
  messagingPillars?: string[]
  gtmSummary?: string
}

const stages: { id: Stage; label: string; description: string }[] = [
  { id: "target-audience", label: "Target Audience", description: "Define who you're serving" },
  { id: "problem-context", label: "Problem & Context", description: "Understand the challenge" },
  { id: "positioning", label: "Positioning", description: "Establish your unique value" },
  { id: "messaging", label: "Messaging", description: "Craft your narrative" },
  { id: "gtm-planning", label: "Go-to-Market", description: "Plan your launch" },
]

const stageQuestions: Record<Stage, string[]> = {
  "target-audience": [
    "Let's start by defining your target audience. Who is the ideal customer for this product or initiative?",
    "What industries or company sizes are you targeting?",
    "Who are the key decision-makers and influencers in the buying process?",
  ],
  "problem-context": [
    "What problem are you solving for your target audience?",
    "What's the current situation or pain point they're experiencing?",
    "Why is this problem important to solve now?",
  ],
  positioning: [
    "How would you describe what makes your solution unique?",
    "Who are your main competitors, and how are you different?",
    "What's the key benefit that matters most to your customers?",
  ],
  messaging: [
    "What's the one thing you want your audience to remember about your product?",
    "What are the 3-4 key value propositions that support your main message?",
    "How would you describe your product in a way that resonates emotionally?",
  ],
  "gtm-planning": [
    "When do you plan to launch or announce this?",
    "What are the primary channels you'll use to reach your audience?",
    "Who are the key stakeholders and what are their roles?",
  ],
}

export default function AIGuidedStrategyClient() {
  const [currentStage, setCurrentStage] = useState<Stage>("target-audience")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Let's start by defining your target audience. Who is the ideal customer for this product or initiative?",
      stage: "target-audience",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [strategyOutput, setStrategyOutput] = useState<StrategyOutput>({})
  const [completedStages, setCompletedStages] = useState<Stage[]>([])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      stage: currentStage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI processing and response
    setTimeout(() => {
      const questions = stageQuestions[currentStage]
      const nextQuestionIndex = currentQuestionIndex + 1

      // Update strategy output based on stage
      updateStrategyOutput(currentStage, inputValue)

      if (nextQuestionIndex < questions.length) {
        // Ask next question in current stage
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: questions[nextQuestionIndex],
          stage: currentStage,
        }
        setMessages((prev) => [...prev, aiMessage])
        setCurrentQuestionIndex(nextQuestionIndex)
      } else {
        // Stage complete, move to next stage
        setCompletedStages((prev) => [...prev, currentStage])
        const currentIndex = stages.findIndex((s) => s.id === currentStage)

        if (currentIndex < stages.length - 1) {
          const nextStage = stages[currentIndex + 1].id
          setCurrentStage(nextStage)
          setCurrentQuestionIndex(0)

          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `Great! Now let's move on to ${stages[currentIndex + 1].label}. ${stageQuestions[nextStage][0]}`,
            stage: nextStage,
          }
          setMessages((prev) => [...prev, aiMessage])
        } else {
          // All stages complete
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "Excellent! We've completed all the stages. Your strategic framework is now ready. You can review, edit, or save it from the output panel.",
          }
          setMessages((prev) => [...prev, aiMessage])
        }
      }
    }, 500)
  }

  const updateStrategyOutput = (stage: Stage, input: string) => {
    // Simulate AI synthesis of inputs into structured outputs
    setStrategyOutput((prev) => {
      switch (stage) {
        case "target-audience":
          return { ...prev, audienceDefinition: (prev.audienceDefinition || "") + " " + input }
        case "positioning":
          return { ...prev, positioningStatement: (prev.positioningStatement || "") + " " + input }
        case "messaging":
          const pillars = prev.messagingPillars || []
          return { ...prev, messagingPillars: [...pillars, input] }
        case "gtm-planning":
          return { ...prev, gtmSummary: (prev.gtmSummary || "") + " " + input }
        default:
          return prev
      }
    })
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/strategy/new">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                AI-Guided Strategy Builder
              </h1>
              <p className="text-sm text-muted-foreground">Answer guided questions to build your strategic framework</p>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <Card className="mb-4 p-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {stages.map((stage, index) => {
              const isCompleted = completedStages.includes(stage.id)
              const isCurrent = currentStage === stage.id

              return (
                <div key={stage.id} className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                      isCompleted
                        ? "bg-green-100 text-green-700"
                        : isCurrent
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                    <span className="text-sm font-medium">{stage.label}</span>
                  </div>
                  {index < stages.length - 1 && <div className="w-8 h-px bg-border" />}
                </div>
              )
            })}
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 border border-border"
                    }`}
                  >
                    {message.stage && message.role === "assistant" && (
                      <Badge variant="outline" className="mb-2">
                        {stages.find((s) => s.id === message.stage)?.label}
                      </Badge>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your answer..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Output Panel */}
      <Card className="w-96 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold flex items-center gap-2">
            Strategy Output
            <Badge variant="secondary" className="ml-auto">
              Live
            </Badge>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Updates as you answer questions</p>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {/* Audience Definition */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Audience Definition</h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>
              {strategyOutput.audienceDefinition ? (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {strategyOutput.audienceDefinition.trim()}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground italic">Will populate as you answer questions...</p>
              )}
            </div>

            <Separator />

            {/* Positioning Statement */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Positioning Statement</h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>
              {strategyOutput.positioningStatement ? (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {strategyOutput.positioningStatement.trim()}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground italic">Will populate as you answer questions...</p>
              )}
            </div>

            <Separator />

            {/* Messaging Pillars */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Messaging Pillars</h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>
              {strategyOutput.messagingPillars && strategyOutput.messagingPillars.length > 0 ? (
                <ul className="space-y-1">
                  {strategyOutput.messagingPillars.map((pillar, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="flex-1">{pillar.trim()}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">Will populate as you answer questions...</p>
              )}
            </div>

            <Separator />

            {/* GTM Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">GTM Summary</h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>
              {strategyOutput.gtmSummary ? (
                <p className="text-sm text-muted-foreground leading-relaxed">{strategyOutput.gtmSummary.trim()}</p>
              ) : (
                <p className="text-xs text-muted-foreground italic">Will populate as you answer questions...</p>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t space-y-2">
          <Button className="w-full" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Framework
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refine
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
