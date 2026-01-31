"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Volume2, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface Principle {
  id: string
  name: string
  description: string
  doExample: string
  dontExample: string
}

interface ToneContext {
  id: string
  context: string
  tone: string
  example: string
}

interface VocabularyTerm {
  id: string
  term: string
  usage: string
}

export default function ToneOfVoiceClient() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [purposeStatement, setPurposeStatement] = useState("")
  const [brandPersonality, setBrandPersonality] = useState("")
  const [personalityDescription, setPersonalityDescription] = useState("")
  const [positioningConnection, setPositioningConnection] = useState("")

  // Core Principles
  const [principles, setPrinciples] = useState<Principle[]>([
    { id: "1", name: "", description: "", doExample: "", dontExample: "" },
  ])

  // Writing Style
  const [voice, setVoice] = useState("")
  const [sentenceLength, setSentenceLength] = useState("")
  const [wordChoice, setWordChoice] = useState("")
  const [grammarPreferences, setGrammarPreferences] = useState("")
  const [formattingGuidelines, setFormattingGuidelines] = useState("")

  // Tone by Context
  const [contexts, setContexts] = useState<ToneContext[]>([{ id: "1", context: "", tone: "", example: "" }])

  // Brand Vocabulary
  const [signaturePhrases, setSignaturePhrases] = useState("")
  const [preferredTerms, setPreferredTerms] = useState<VocabularyTerm[]>([{ id: "1", term: "", usage: "" }])
  const [termsToAvoid, setTermsToAvoid] = useState("")
  const [capitalizationRules, setCapitalizationRules] = useState("")

  // Examples in Action
  const [websiteHero, setWebsiteHero] = useState("")
  const [emailIntro, setEmailIntro] = useState("")
  const [productUpdate, setProductUpdate] = useState("")
  const [salesSlide, setSalesSlide] = useState("")

  const addPrinciple = () => {
    setPrinciples([
      ...principles,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        doExample: "",
        dontExample: "",
      },
    ])
  }

  const removePrinciple = (id: string) => {
    if (principles.length > 1) {
      setPrinciples(principles.filter((p) => p.id !== id))
    }
  }

  const updatePrinciple = (id: string, field: keyof Principle, value: string) => {
    setPrinciples(principles.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addContext = () => {
    setContexts([
      ...contexts,
      {
        id: Date.now().toString(),
        context: "",
        tone: "",
        example: "",
      },
    ])
  }

  const removeContext = (id: string) => {
    if (contexts.length > 1) {
      setContexts(contexts.filter((c) => c.id !== id))
    }
  }

  const updateContext = (id: string, field: keyof ToneContext, value: string) => {
    setContexts(contexts.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  const addVocabularyTerm = () => {
    setPreferredTerms([
      ...preferredTerms,
      {
        id: Date.now().toString(),
        term: "",
        usage: "",
      },
    ])
  }

  const removeVocabularyTerm = (id: string) => {
    if (preferredTerms.length > 1) {
      setPreferredTerms(preferredTerms.filter((t) => t.id !== id))
    }
  }

  const updateVocabularyTerm = (id: string, field: keyof VocabularyTerm, value: string) => {
    setPreferredTerms(preferredTerms.map((t) => (t.id === id ? { ...t, [field]: value } : t)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Tone of Voice Guide Data:", {
      name,
      description,
      purposeStatement,
      brandPersonality,
      personalityDescription,
      positioningConnection,
      principles,
      writingStyle: { voice, sentenceLength, wordChoice, grammarPreferences, formattingGuidelines },
      contexts,
      vocabulary: { signaturePhrases, preferredTerms, termsToAvoid, capitalizationRules },
      examples: { websiteHero, emailIntro, productUpdate, salesSlide },
    })
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary/10">
            <Volume2 className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tone of Voice Guide</h1>
            <p className="text-muted-foreground">Define your brand's personality and communication style</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Name and describe this tone of voice guide</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Guide Name *</Label>
              <Input
                id="name"
                placeholder="e.g., ProductMark Brand Voice"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief overview of this tone guide..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>1. Overview</CardTitle>
            <CardDescription>Define your brand personality and why tone matters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="purposeStatement">Purpose Statement</Label>
              <Textarea
                id="purposeStatement"
                placeholder="Why tone of voice matters to your brand..."
                value={purposeStatement}
                onChange={(e) => setPurposeStatement(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brandPersonality">Brand Personality (3-5 adjectives)</Label>
              <Input
                id="brandPersonality"
                placeholder="e.g., Warm, Smart, Confident, Human"
                value={brandPersonality}
                onChange={(e) => setBrandPersonality(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="personalityDescription">Personality Description</Label>
              <Textarea
                id="personalityDescription"
                placeholder="Bring those traits to life with a short description..."
                value={personalityDescription}
                onChange={(e) => setPersonalityDescription(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Example: "We speak like a trusted peer — knowledgeable but never condescending."
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="positioningConnection">Connection to Positioning</Label>
              <Textarea
                id="positioningConnection"
                placeholder="How your tone reinforces your brand promise or category position..."
                value={positioningConnection}
                onChange={(e) => setPositioningConnection(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Core Principles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">2. Core Principles</h3>
              <p className="text-sm text-muted-foreground">Define the "rules" that guide how you speak and write</p>
            </div>
            <Button type="button" onClick={addPrinciple} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Principle
            </Button>
          </div>

          {principles.map((principle, index) => (
            <Card key={principle.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Principle {index + 1}</CardTitle>
                  {principles.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePrinciple(principle.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`principle-name-${principle.id}`}>Principle Name</Label>
                  <Input
                    id={`principle-name-${principle.id}`}
                    placeholder="e.g., Clear, not corporate"
                    value={principle.name}
                    onChange={(e) => updatePrinciple(principle.id, "name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`principle-desc-${principle.id}`}>Description</Label>
                  <Textarea
                    id={`principle-desc-${principle.id}`}
                    placeholder="Why this principle matters..."
                    value={principle.description}
                    onChange={(e) => updatePrinciple(principle.id, "description", e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`principle-do-${principle.id}`}>Do Example ✓</Label>
                    <Textarea
                      id={`principle-do-${principle.id}`}
                      placeholder="Good example..."
                      value={principle.doExample}
                      onChange={(e) => updatePrinciple(principle.id, "doExample", e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`principle-dont-${principle.id}`}>Don't Example ✗</Label>
                    <Textarea
                      id={`principle-dont-${principle.id}`}
                      placeholder="Bad example..."
                      value={principle.dontExample}
                      onChange={(e) => updatePrinciple(principle.id, "dontExample", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Writing Style */}
        <Card>
          <CardHeader>
            <CardTitle>3. Writing Style</CardTitle>
            <CardDescription>Ground rules for structure, grammar, and rhythm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voice">Voice</Label>
              <Input
                id="voice"
                placeholder='e.g., 1st person plural ("we"), 2nd person ("you")'
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sentenceLength">Sentence Length</Label>
              <Input
                id="sentenceLength"
                placeholder="e.g., Short, conversational sentences"
                value={sentenceLength}
                onChange={(e) => setSentenceLength(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wordChoice">Word Choice</Label>
              <Input
                id="wordChoice"
                placeholder="e.g., Prefer plain words over jargon"
                value={wordChoice}
                onChange={(e) => setWordChoice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grammarPreferences">Grammar Preferences</Label>
              <Textarea
                id="grammarPreferences"
                placeholder="e.g., Use Oxford commas, avoid excessive em dashes, use contractions..."
                value={grammarPreferences}
                onChange={(e) => setGrammarPreferences(e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="formattingGuidelines">Formatting Guidelines</Label>
              <Textarea
                id="formattingGuidelines"
                placeholder="Guidelines for headings, bullets, bolding, and white space..."
                value={formattingGuidelines}
                onChange={(e) => setFormattingGuidelines(e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tone by Context */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">4. Tone by Context</h3>
              <p className="text-sm text-muted-foreground">
                How your tone flexes across different channels or situations
              </p>
            </div>
            <Button type="button" onClick={addContext} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Context
            </Button>
          </div>

          {contexts.map((context, index) => (
            <Card key={context.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Context {index + 1}</CardTitle>
                  {contexts.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeContext(context.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`context-name-${context.id}`}>Context</Label>
                  <Input
                    id={`context-name-${context.id}`}
                    placeholder="e.g., Marketing website, Product interface, Support content"
                    value={context.context}
                    onChange={(e) => updateContext(context.id, "context", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`context-tone-${context.id}`}>Tone</Label>
                  <Input
                    id={`context-tone-${context.id}`}
                    placeholder="e.g., Bold, confident"
                    value={context.tone}
                    onChange={(e) => updateContext(context.id, "tone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`context-example-${context.id}`}>Example</Label>
                  <Textarea
                    id={`context-example-${context.id}`}
                    placeholder="Example copy for this context..."
                    value={context.example}
                    onChange={(e) => updateContext(context.id, "example", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Brand Vocabulary */}
        <Card>
          <CardHeader>
            <CardTitle>5. Brand Vocabulary</CardTitle>
            <CardDescription>Key terms and phrases that are uniquely yours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="signaturePhrases">Signature Phrases or Taglines</Label>
              <Textarea
                id="signaturePhrases"
                placeholder="Your signature phrases, one per line..."
                value={signaturePhrases}
                onChange={(e) => setSignaturePhrases(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Preferred Terms</Label>
                <Button type="button" onClick={addVocabularyTerm} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Term
                </Button>
              </div>
              {preferredTerms.map((term, index) => (
                <div key={term.id} className="flex gap-2">
                  <Input
                    placeholder="Term"
                    value={term.term}
                    onChange={(e) => updateVocabularyTerm(term.id, "term", e.target.value)}
                  />
                  <Input
                    placeholder="Usage note"
                    value={term.usage}
                    onChange={(e) => updateVocabularyTerm(term.id, "usage", e.target.value)}
                  />
                  {preferredTerms.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeVocabularyTerm(term.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="termsToAvoid">Terms to Avoid</Label>
              <Textarea
                id="termsToAvoid"
                placeholder="Words or phrases to avoid, one per line..."
                value={termsToAvoid}
                onChange={(e) => setTermsToAvoid(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capitalizationRules">Capitalization and Style Rules</Label>
              <Textarea
                id="capitalizationRules"
                placeholder='e.g., "ProductMark," not "Productmark"'
                value={capitalizationRules}
                onChange={(e) => setCapitalizationRules(e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Examples in Action */}
        <Card>
          <CardHeader>
            <CardTitle>6. Examples in Action</CardTitle>
            <CardDescription>Real or sample content that demonstrates your tone</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="websiteHero">Website Hero</Label>
              <Textarea
                id="websiteHero"
                placeholder="Example website hero copy..."
                value={websiteHero}
                onChange={(e) => setWebsiteHero(e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailIntro">Email Intro</Label>
              <Textarea
                id="emailIntro"
                placeholder="Example email opening..."
                value={emailIntro}
                onChange={(e) => setEmailIntro(e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productUpdate">Product Update</Label>
              <Textarea
                id="productUpdate"
                placeholder="Example product announcement..."
                value={productUpdate}
                onChange={(e) => setProductUpdate(e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salesSlide">Sales Slide Headline</Label>
              <Textarea
                id="salesSlide"
                placeholder="Example sales presentation headline..."
                value={salesSlide}
                onChange={(e) => setSalesSlide(e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/strategy/new/messaging">Cancel</Link>
          </Button>
          <Button type="submit" size="lg">
            Create Guide
          </Button>
        </div>
      </form>
    </div>
  )
}
