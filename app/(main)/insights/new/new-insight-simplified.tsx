"use client"
import {
  Plus,
  Sparkles,
  LinkIcon,
  FileText,
  StickyNote,
  X,
  Loader2,
  TrendingUp,
  TrendingDown,
  Users,
  Rss,
  AlertCircle,
  Target,
} from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { TypewriterPlaceholderTextarea } from "@/components/typewriter-placeholder-textarea"
import { insightPrompts, type InsightType } from "@/lib/insight-prompts"
import { suggestTags } from "@/app/actions/suggest-tags"
import { generateInsightAnalysis } from "@/app/actions/generate-insight-analysis"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const integrations = [
  { name: "LinkedIn", color: "bg-blue-600 hover:bg-blue-700" },
  { name: "Slack", color: "bg-purple-600 hover:bg-purple-700" },
]

const insightTypes = [
  { value: "Customer", label: "Customer", icon: Users, color: "text-blue-600" },
  { value: "Competitive", label: "Competitive", icon: Target, color: "text-orange-600" },
  { value: "Market", label: "Market", icon: TrendingUp, color: "text-green-600" },
]

const priorityLevels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

type DataSourceType =
  | "link"
  | "note"
  | "file"
  | "win-debrief"
  | "loss-debrief"
  | "jtbd-interview"
  | "feed"
  | "market-size"
  | null

interface Competitor {
  id: string
  name: string
  website?: string
  productLine?: string
  productPageUrl?: string
}

interface Customer {
  id: string
  name: string
  company?: string
  title?: string
  email?: string
}

interface Persona {
  id: string
  name: string
  title?: string
  icpId: string
}

interface ICP {
  id: string
  name: string
  region: string
  personas: Persona[]
}

interface DebriefData {
  dealSize?: string
  closeDate?: string
  opportunityName?: string
  primaryReason?: string
  keyLearning?: string
}

interface JTBDData {
  situation?: string
  motivation?: string
  outcome?: string
  functionalJobs?: string
  emotionalJobs?: string
  socialJobs?: string
}

interface MarketData {
  // TAM fields
  tamTotalCustomers?: string
  tamAvgRevenue?: string
  tamTotalRevenue?: string
  tamGrowthRate?: string
  tamSources?: string
  // SAM fields
  samSegments?: string
  samMarketPortion?: string
  samIcpCustomers?: string
  samRevenueOpportunity?: string
  samBarriers?: string
  // SOM fields
  somMarketShare?: string
  somCustomersYear1?: string
  somRevenue?: string
  somConstraints?: string
  somAssumptions?: string
}

interface FeedData {
  url: string
  feedType: "reddit" | "rss" | "blog" | "slack" | "linkedin" | "other"
  checkFrequency: "daily" | "weekly" | "monthly"
  autoApprove: boolean
  filterKeywords?: string
}

export default function NewInsightSimplified() {
  const router = useRouter()
  const { toast } = useToast()
  const [insightType, setInsightType] = useState<InsightType>("Customer")
  const [observation, setObservation] = useState("")
  const [dataSourceType, setDataSourceType] = useState<DataSourceType>(null)
  const [dataSourceValue, setDataSourceValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false)
  const [aiAssistEnabled, setAiAssistEnabled] = useState(true)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [showTagInput, setShowTagInput] = useState(false)
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)

  const [priority, setPriority] = useState("medium")
  const [customTag, setCustomTag] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const [debriefData, setDebriefData] = useState<DebriefData>({})

  const [jtbdAttachmentType, setJtbdAttachmentType] = useState<"link" | "note" | "file" | null>(null)
  const [jtbdData, setJtbdData] = useState<JTBDData>({})

  const [marketData, setMarketData] = useState<MarketData>({})

  const [feedData, setFeedData] = useState<FeedData>({
    url: "",
    feedType: "reddit",
    checkFrequency: "daily",
    autoApprove: false,
  })

  const [competitors, setCompetitors] = useState<Competitor[]>([
    { id: "status-quo", name: "Status Quo" },
    {
      id: "adobe",
      name: "Adobe",
      website: "https://www.adobe.com/",
      productLine: "Adobe Experience Manager",
      productPageUrl: "https://business.adobe.com/products/experience-manager/adobe-experience-manager.html",
    },
    {
      id: "optimizely",
      name: "Optimizely",
      website: "https://www.optimizely.com/",
      productLine: "Optimizely Content Management System",
      productPageUrl: "https://www.optimizely.com/products/content-management/",
    },
    {
      id: "sitecore",
      name: "Sitecore",
      website: "https://www.sitecore.com/",
      productLine: "Sitecore XM Cloud",
      productPageUrl: "https://www.sitecore.com/products/xm-cloud",
    },
    {
      id: "contentful",
      name: "Contentful",
      website: "https://www.contentful.com/",
    },
    {
      id: "contentstack",
      name: "Contentstack",
      website: "https://www.contentstack.com/",
    },
    {
      id: "sanity",
      name: "Sanity",
      website: "https://www.sanity.io/",
    },
  ])
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>("status-quo")
  const [isAddingCompetitor, setIsAddingCompetitor] = useState(false)
  const [isEditingCompetitor, setIsEditingCompetitor] = useState(false)
  const [editingCompetitorId, setEditingCompetitorId] = useState<string>("")

  const [customers, setCustomers] = useState<Customer[]>([
    { id: "unassigned", name: "Unassigned" },
    { id: "sarah-chen", name: "Sarah Chen", company: "Acme Corp", title: "VP of Marketing", email: "sarah@acme.com" },
    {
      id: "john-smith",
      name: "John Smith",
      company: "TechStart Inc",
      title: "Product Manager",
      email: "john@techstart.com",
    },
    {
      id: "maria-garcia",
      name: "Maria Garcia",
      company: "Enterprise Solutions",
      title: "Director of Sales",
      email: "maria@enterprise.com",
    },
  ])
  const [selectedCustomer, setSelectedCustomer] = useState<string>("unassigned")
  const [isAddingCustomer, setIsAddingCustomer] = useState(false)
  const [isEditingCustomer, setIsEditingCustomer] = useState(false)
  const [editingCustomerId, setEditingCustomerId] = useState<string>("")

  const [icps] = useState<ICP[]>([
    {
      id: "amer-b2b-saas",
      name: "B2B SaaS companies",
      region: "AMER",
      personas: [
        {
          id: "amer-pmm",
          name: "Product Marketing Manager",
          title: "Product Marketing Manager",
          icpId: "amer-b2b-saas",
        },
        {
          id: "amer-gtm-manager",
          name: "GTM Team Manager",
          title: "Go-to-Market Team Manager",
          icpId: "amer-b2b-saas",
        },
      ],
    },
    {
      id: "emea-b2b-saas",
      name: "B2B SaaS companies",
      region: "EMEA",
      personas: [
        {
          id: "emea-pmm",
          name: "Product Marketing Manager",
          title: "Product Marketing Manager",
          icpId: "emea-b2b-saas",
        },
        {
          id: "emea-gtm-manager",
          name: "GTM Team Manager",
          title: "Go-to-Market Team Manager",
          icpId: "emea-b2b-saas",
        },
      ],
    },
  ])
  const [selectedPersona, setSelectedPersona] = useState<string>("unassigned")

  const [competitorName, setCompetitorName] = useState("")
  const [competitorWebsite, setCompetitorWebsite] = useState("")
  const [competitorProductLine, setCompetitorProductLine] = useState("")
  const [competitorProductPageUrl, setCompetitorProductPageUrl] = useState("")

  const [customerName, setCustomerName] = useState("")
  const [customerCompany, setCustomerCompany] = useState("")
  const [customerTitle, setCustomerTitle] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")

  const detectFeedType = (url: string): FeedData["feedType"] => {
    const lowerUrl = url.toLowerCase()

    if (lowerUrl.includes("reddit.com")) {
      return "reddit"
    } else if (lowerUrl.includes("slack.com")) {
      return "slack"
    } else if (lowerUrl.includes("linkedin.com/groups")) {
      return "linkedin"
    } else if (lowerUrl.includes("/feed") || lowerUrl.includes("/rss") || lowerUrl.includes(".xml")) {
      return "rss"
    } else if (lowerUrl.includes("blog") || lowerUrl.includes("medium.com") || lowerUrl.includes("substack.com")) {
      return "blog"
    }

    return "other"
  }

  const getFeedPlaceholder = (feedType: FeedData["feedType"]): string => {
    switch (feedType) {
      case "reddit":
        return "https://www.reddit.com/r/ProductMarketing/"
      case "slack":
        return "https://yourworkspace.slack.com/archives/C1234567890"
      case "linkedin":
        return "https://www.linkedin.com/groups/48316/"
      case "rss":
        return "https://example.com/feed.xml"
      case "blog":
        return "https://blog.example.com"
      case "other":
        return "https://example.com/forum"
      default:
        return "https://www.reddit.com/r/ProductMarketing/"
    }
  }

  const fetchTagSuggestions = useCallback(
    async (text: string) => {
      if (!aiAssistEnabled || text.trim().length < 20) {
        setSuggestedTags([])
        return
      }

      setIsLoadingSuggestions(true)
      try {
        const result = await suggestTags({
          observation: text,
          insightType,
          existingTags: tags,
        })

        if (result.success && result.tags.length > 0) {
          setSuggestedTags(result.tags)
        } else {
          setSuggestedTags([])
        }
      } catch (error) {
        console.error("Failed to fetch tag suggestions:", error)
        setSuggestedTags([])
      } finally {
        setIsLoadingSuggestions(false)
      }
    },
    [aiAssistEnabled, insightType, tags],
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      if (observation.trim().length >= 20) {
        fetchTagSuggestions(observation)
      } else {
        setSuggestedTags([])
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [observation, fetchTagSuggestions])

  useEffect(() => {
    if (observation.trim().length >= 20) {
      fetchTagSuggestions(observation)
    }
  }, [insightType, fetchTagSuggestions, observation])

  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.stopImmediatePropagation()
        return false
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  const handleObservationChange = async (value: string) => {
    setObservation(value)

    if (value.length > 50 && insightType) {
      try {
        const result = await suggestTags({ observation: value, insightType: insightType as any, existingTags: tags })
        const suggestedTags = result.tags

        const newTags = suggestedTags.filter((tag) => !tags.includes(tag))
        if (newTags.length > 0) {
          setTags((prev) => [...prev, ...newTags.slice(0, 3)])
        }
      } catch (error) {
        console.error("Failed to suggest tags:", error)
      }
    }
  }

  const handleAddCustomTag = () => {
    if (customTag && !tags.includes(customTag.trim().toLowerCase())) {
      setTags([...tags, customTag.trim().toLowerCase()])
      setCustomTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleGenerateAnalysis = async () => {
    if (!observation || !insightType) {
      setError("Please provide both an observation and select an insight type before generating analysis")
      return
    }

    setIsGenerating(true)
    setError("")

    try {
      const competitor =
        insightType === "Competitive" && selectedCompetitor !== "status-quo"
          ? competitors.find((c) => c.id === selectedCompetitor)
          : undefined

      const analysisResult = await generateInsightAnalysis({
        observation,
        insightType: insightType.toLowerCase() as "customer" | "competitive" | "market",
        dataSource: dataSourceValue || undefined,
        tags,
        competitor: competitor
          ? {
              name: competitor.name,
              website: competitor.website,
            }
          : undefined,
      })

      if (analysisResult.success) {
        toast({
          title: "Insight analyzed",
          description: "AI analysis has been generated and associated with your insight.",
        })
        router.push("/insights")
      } else {
        toast({
          title: "AI Analysis Failed",
          description: "There was an error generating the AI analysis.",
          variant: "destructive",
        })
        setError("Failed to generate analysis. Please try again.")
      }
    } catch (error) {
      console.error("Failed to generate analysis:", error)
      setError("Failed to generate analysis. Please try again.")
      toast({
        title: "Error",
        description: "An unexpected error occurred during AI analysis.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (dataSourceType === "feed") {
      if (!feedData.url.trim()) {
        toast({
          title: "Feed URL required",
          description: "Please enter a valid feed URL to subscribe.",
          variant: "destructive",
        })
        return
      }
    } else if (!observation.trim()) {
      setError("Please provide an observation.")
      return
    }

    setIsSaving(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (dataSourceType === "feed") {
        toast({
          title: "Feed subscription created",
          description: `AI will now monitor ${feedData.url} and suggest insights for your approval.`,
        })
      } else {
        if (aiAssistEnabled) {
          setIsGeneratingAnalysis(true)

          const competitor =
            insightType === "Competitive" && selectedCompetitor !== "status-quo"
              ? competitors.find((c) => c.id === selectedCompetitor)
              : undefined

          const analysisResult = await generateInsightAnalysis({
            observation,
            insightType: insightType.toLowerCase() as "customer" | "competitive" | "market",
            dataSource: dataSourceValue || undefined,
            tags,
            competitor: competitor
              ? {
                  name: competitor.name,
                  website: competitor.website,
                }
              : undefined,
          })

          if (analysisResult.success) {
            toast({
              title: "Insight saved with AI analysis",
              description: "Your insight has been analyzed and saved successfully.",
            })
          } else {
            toast({
              title: "Insight saved",
              description: "Your insight was saved, but AI analysis failed. You can generate it later.",
            })
          }
        } else {
          toast({
            title: "Insight saved",
            description: "Your insight has been saved successfully.",
          })
        }
      }

      router.push("/insights")
    } catch (error) {
      console.error("Error saving insight:", error)
      setError("Failed to save insight. Please try again.")
      toast({
        title: "Error",
        description: "Failed to save insight. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
      setIsGeneratingAnalysis(false)
    }
  }

  const handleDataSourceSelect = (type: DataSourceType) => {
    let updatedTags = [...tags]

    if (dataSourceType === "win-debrief") {
      updatedTags = updatedTags.filter((tag) => tag !== "win")
    } else if (dataSourceType === "loss-debrief") {
      updatedTags = updatedTags.filter((tag) => tag !== "loss")
    } else if (dataSourceType === "jtbd-interview") {
      updatedTags = updatedTags.filter((tag) => tag !== "jtbd")
    } else if (dataSourceType === "market-size") {
      updatedTags = updatedTags.filter((tag) => tag !== "market-size")
    }

    setDataSourceType(type)
    setDataSourceValue("")

    if (type === "win-debrief") {
      setInsightType("Competitive")
      updatedTags = updatedTags.filter((tag) => tag !== "loss")
      if (!updatedTags.includes("win")) {
        updatedTags.push("win")
      }
      setSelectedCompetitor("status-quo")
    } else if (type === "loss-debrief") {
      setInsightType("Competitive")
      updatedTags = updatedTags.filter((tag) => tag !== "win")
      if (!updatedTags.includes("loss")) {
        updatedTags.push("loss")
      }
      setSelectedCompetitor("status-quo")
    } else if (type === "jtbd-interview") {
      setInsightType("Customer")
      if (!updatedTags.includes("jtbd")) {
        updatedTags.push("jtbd")
      }
    } else if (type === "market-size") {
      setInsightType("Market")
      if (!updatedTags.includes("market-size")) {
        updatedTags.push("market-size")
      }
    } else if (type === "feed") {
      setFeedData({
        url: "",
        feedType: "reddit",
        checkFrequency: "daily",
        autoApprove: false,
      })
    }

    setTags(updatedTags)
  }

  const handleClearDataSource = () => {
    let updatedTags = [...tags]

    if (dataSourceType === "win-debrief") {
      updatedTags = updatedTags.filter((tag) => tag !== "win")
    } else if (dataSourceType === "loss-debrief") {
      updatedTags = updatedTags.filter((tag) => tag !== "loss")
    } else if (dataSourceType === "jtbd-interview") {
      updatedTags = updatedTags.filter((tag) => tag !== "jtbd")
    } else if (dataSourceType === "market-size") {
      updatedTags = updatedTags.filter((tag) => tag !== "market-size")
    }

    setTags(updatedTags)
    setDataSourceType(null)
    setDataSourceValue("")
    setDebriefData({})
    setJtbdData({})
    setJtbdAttachmentType(null)
    setFeedData({
      url: "",
      feedType: "reddit",
      checkFrequency: "daily",
      autoApprove: false,
    })
  }

  const handleFeedUrlChange = (url: string) => {
    const detectedType = detectFeedType(url)
    setFeedData({
      ...feedData,
      url,
      feedType: detectedType,
    })
  }

  const handleCompetitorChange = (value: string) => {
    if (value === "add-new") {
      setIsAddingCompetitor(true)
      setIsEditingCompetitor(false)
      setSelectedCompetitor("")
      clearCompetitorForm()
    } else if (value === "edit-current") {
      const competitor = competitors.find((c) => c.id === selectedCompetitor)
      if (competitor) {
        setIsEditingCompetitor(true)
        setIsAddingCompetitor(false)
        setEditingCompetitorId(competitor.id)
        setCompetitorName(competitor.name)
        setCompetitorWebsite(competitor.website || "")
        setCompetitorProductLine(competitor.productLine || "")
        setCompetitorProductPageUrl(competitor.productPageUrl || "")
      }
    } else {
      setSelectedCompetitor(value)
      setIsAddingCompetitor(false)
      setIsEditingCompetitor(false)
    }
  }

  const clearCompetitorForm = () => {
    setCompetitorName("")
    setCompetitorWebsite("")
    setCompetitorProductLine("")
    setCompetitorProductPageUrl("")
  }

  const handleAddCompetitor = () => {
    if (competitorName.trim()) {
      const newId = `competitor-${Date.now()}`
      const newCompetitor: Competitor = {
        id: newId,
        name: competitorName.trim(),
      }
      if (competitorWebsite.trim()) {
        newCompetitor.website = competitorWebsite.trim()
      }
      if (competitorProductLine.trim()) {
        newCompetitor.productLine = competitorProductLine.trim()
      }
      if (competitorProductPageUrl.trim()) {
        newCompetitor.productPageUrl = competitorProductPageUrl.trim()
      }
      setCompetitors([...competitors, newCompetitor])
      setSelectedCompetitor(newId)
      clearCompetitorForm()
      setIsAddingCompetitor(false)
    }
  }

  const handleEditCompetitor = () => {
    if (competitorName.trim() && editingCompetitorId) {
      const updatedCompetitors = competitors.map((comp) => {
        if (comp.id === editingCompetitorId) {
          return {
            id: comp.id,
            name: competitorName.trim(),
            website: competitorWebsite.trim() || undefined,
            productLine: competitorProductLine.trim() || undefined,
            productPageUrl: competitorProductPageUrl.trim() || undefined,
          }
        }
        return comp
      })
      setCompetitors(updatedCompetitors)
      clearCompetitorForm()
      setIsEditingCompetitor(false)
      setEditingCompetitorId("")
    }
  }

  const handleCancelCompetitorForm = () => {
    setIsAddingCompetitor(false)
    setIsEditingCompetitor(false)
    setEditingCompetitorId("")
    clearCompetitorForm()
  }

  const handleCustomerChange = (value: string) => {
    if (value === "add-new") {
      setIsAddingCustomer(true)
      setIsEditingCustomer(false)
      setSelectedCustomer("")
      clearCustomerForm()
    } else if (value === "edit-current") {
      const customer = customers.find((c) => c.id === selectedCustomer)
      if (customer) {
        setIsEditingCustomer(true)
        setIsAddingCustomer(false)
        setEditingCustomerId(customer.id)
        setCustomerName(customer.name)
        setCustomerCompany(customer.company || "")
        setCustomerTitle(customer.title || "")
        setCustomerEmail(customer.email || "")
      }
    } else {
      setSelectedCustomer(value)
      setIsAddingCustomer(false)
      setIsEditingCustomer(false)
    }
  }

  const clearCustomerForm = () => {
    setCustomerName("")
    setCustomerCompany("")
    setCustomerTitle("")
    setCustomerEmail("")
  }

  const handleAddCustomer = () => {
    if (customerName.trim()) {
      const newId = `customer-${Date.now()}`
      const newCustomer: Customer = {
        id: newId,
        name: customerName.trim(),
      }
      if (customerCompany.trim()) {
        newCustomer.company = customerCompany.trim()
      }
      if (customerTitle.trim()) {
        newCustomer.title = customerTitle.trim()
      }
      if (customerEmail.trim()) {
        newCustomer.email = customerEmail.trim()
      }
      setCustomers([...customers, newCustomer])
      setSelectedCustomer(newId)
      clearCustomerForm()
      setIsAddingCustomer(false)
    }
  }

  const handleEditCustomer = () => {
    if (customerName.trim() && editingCustomerId) {
      const updatedCustomers = customers.map((cust) => {
        if (cust.id === editingCustomerId) {
          return {
            id: cust.id,
            name: customerName.trim(),
            company: customerCompany.trim() || undefined,
            title: customerTitle.trim() || undefined,
            email: customerEmail.trim() || undefined,
          }
        }
        return cust
      })
      setCustomers(updatedCustomers)
      clearCustomerForm()
      setIsEditingCustomer(false)
      setEditingCustomerId("")
    }
  }

  const handleCancelCustomerForm = () => {
    setIsAddingCustomer(false)
    setIsEditingCustomer(false)
    setEditingCustomerId("")
    clearCustomerForm()
  }

  const handleAddTag = (tag?: string) => {
    const tagToAdd = tag || tagInput
    if (tagToAdd.trim() && !tags.includes(tagToAdd.trim().toLowerCase())) {
      setTags([...tags, tagToAdd.trim().toLowerCase()])
      setTagInput("")
      setSuggestedTags(suggestedTags.filter((t) => t !== tagToAdd.trim().toLowerCase()))
    }
  }

  const handleAddSuggestedTag = (tag: string) => {
    handleAddTag(tag)
  }

  const isSubmitDisabled =
    dataSourceType === "feed"
      ? !feedData.url.trim() || isSubmitting
      : !observation.trim() || isSubmitting || isGeneratingAnalysis

  const selectedCompetitorName = competitors.find((c) => c.id === selectedCompetitor)?.name || "Select competitor"

  const selectedCustomerName = customers.find((c) => c.id === selectedCustomer)?.name || "Select customer"

  const selectedPersonaData =
    selectedPersona === "unassigned"
      ? { id: "unassigned", name: "Unassigned", icpId: "unassigned" }
      : icps.flatMap((icp) => icp.personas).find((persona) => persona.id === selectedPersona)

  const isDebriefMode = dataSourceType === "win-debrief" || dataSourceType === "loss-debrief"
  const isJTBDMode = dataSourceType === "jtbd-interview"
  const isFeedMode = dataSourceType === "feed"
  // isMarketMode to check if Market insight type is selected - removed in updates

  return (
    <>
      {/* Header */}
      <h1 className="font-bold tracking-tight mb-2 text-2xl sm:text-3xl">Add Insight</h1>
      <p className="sm:text-lg text-muted-foreground mb-6 sm:mb-8 text-sm">
        Customer quote, competitor move, market trend — jot it fast, keep it sharp.
      </p>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
      >
        <div className="relative rounded-2xl sm:rounded-3xl border-2 border-border bg-card p-4 sm:p-6 shadow-soft-lg">
          {/* Feed Mode: Different UI */}
          {isFeedMode ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50">
                <Rss className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Subscribe to an insight feed</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    AI will monitor this feed and automatically suggest insights for your approval.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClearDataSource}
                  className="h-6 w-6 rounded-full flex-shrink-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-4 p-3 sm:p-4 border rounded-xl bg-muted/30">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feed URL *</label>
                  <Input
                    type="url"
                    placeholder={getFeedPlaceholder(feedData.feedType)}
                    value={feedData.url}
                    onChange={(e) => handleFeedUrlChange(e.target.value)}
                    className="text-sm"
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground">
                    Examples: Reddit subreddit, RSS feed, blog URL, LinkedIn group, Slack channel
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Feed Type</label>
                    <Select
                      value={feedData.feedType}
                      onValueChange={(value) => setFeedData({ ...feedData, feedType: value as FeedData["feedType"] })}
                    >
                      <SelectTrigger className="text-sm bg-background border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reddit">Reddit</SelectItem>
                        <SelectItem value="slack">Slack</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="rss">RSS Feed</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {(feedData.feedType === "slack" || feedData.feedType === "linkedin") && (
                      <p className="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-1.5">
                        <span className="mt-0.5">⚠️</span>
                        <span>
                          {feedData.feedType === "slack"
                            ? "Connect to Slack with channel permissions"
                            : "Connect to LinkedIn with group permissions"}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Check Frequency</label>
                    <Select
                      value={feedData.checkFrequency}
                      onValueChange={(value) =>
                        setFeedData({ ...feedData, checkFrequency: value as FeedData["checkFrequency"] })
                      }
                    >
                      <SelectTrigger className="text-sm bg-background border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Filter Keywords <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <Input
                    placeholder="e.g., pricing, features, comparison"
                    value={feedData.filterKeywords || ""}
                    onChange={(e) => setFeedData({ ...feedData, filterKeywords: e.target.value })}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">Comma-separated keywords to filter feed content</p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/50">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Switch
                      id="auto-approve"
                      checked={feedData.autoApprove}
                      onCheckedChange={(checked) => setFeedData({ ...feedData, autoApprove: checked })}
                    />
                    <div className="space-y-0.5 min-w-0">
                      <Label htmlFor="auto-approve" className="text-sm font-medium cursor-pointer">
                        Auto-approve insights
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically add AI-generated insights without manual approval
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Regular Insight Mode: Textarea */}
              <TypewriterPlaceholderTextarea
                value={observation}
                onChange={(e) => handleObservationChange(e.target.value)}
                placeholders={insightPrompts[insightType]}
                typingSpeed={30}
                pauseDuration={2500}
                className="min-h-[160px] text-lg resize-none border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent w-full"
                autoFocus
              />

              {/* Win/Loss Debrief Form */}
              {(dataSourceType === "win-debrief" || dataSourceType === "loss-debrief") && (
                <div className="mt-4 space-y-4 p-4 border-2 rounded-xl bg-muted/30">
                  <div className="flex items-start gap-3">
                    {dataSourceType === "win-debrief" ? (
                      <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {dataSourceType === "win-debrief" ? "Win Debrief" : "Loss Debrief"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {dataSourceType === "win-debrief"
                          ? "Capture details about why we won this deal"
                          : "Capture details about why we lost this deal"}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleClearDataSource}
                      className="h-6 w-6 rounded-full flex-shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Deal Size</label>
                        <Input
                          placeholder="e.g., $50,000"
                          value={debriefData.dealSize || ""}
                          onChange={(e) => setDebriefData({ ...debriefData, dealSize: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Close Date</label>
                        <Input
                          type="date"
                          value={debriefData.closeDate || ""}
                          onChange={(e) => setDebriefData({ ...debriefData, closeDate: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Opportunity Name</label>
                      <Input
                        placeholder="e.g., Acme Corp - Enterprise Plan"
                        value={debriefData.opportunityName || ""}
                        onChange={(e) => setDebriefData({ ...debriefData, opportunityName: e.target.value })}
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">
                        Primary Reason for {dataSourceType === "win-debrief" ? "Win" : "Loss"}
                      </label>
                      <Input
                        placeholder={
                          dataSourceType === "win-debrief"
                            ? "e.g., Better pricing, superior features"
                            : "e.g., Price too high, missing key feature"
                        }
                        value={debriefData.primaryReason || ""}
                        onChange={(e) => setDebriefData({ ...debriefData, primaryReason: e.target.value })}
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Key Learning</label>
                      <textarea
                        placeholder="What did we learn from this deal?"
                        value={debriefData.keyLearning || ""}
                        onChange={(e) => setDebriefData({ ...debriefData, keyLearning: e.target.value })}
                        className="w-full min-h-[80px] text-sm p-3 rounded-lg border-2 border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* JTBD Interview Form */}
              {dataSourceType === "jtbd-interview" && (
                <div className="mt-4 space-y-4 p-4 border-2 rounded-xl bg-muted/30">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-sm font-medium">Jobs to Be Done Interview</p>
                      <p className="text-xs text-muted-foreground">
                        Capture customer jobs, motivations, and desired outcomes
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleClearDataSource}
                      className="h-6 w-6 rounded-full flex-shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Situation</label>
                      <textarea
                        placeholder="What was the customer's situation when they looked for a solution?"
                        value={jtbdData.situation || ""}
                        onChange={(e) => setJtbdData({ ...jtbdData, situation: e.target.value })}
                        className="w-full min-h-[60px] text-sm p-3 rounded-lg border-2 border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Motivation</label>
                      <textarea
                        placeholder="What motivated them to seek a solution?"
                        value={jtbdData.motivation || ""}
                        onChange={(e) => setJtbdData({ ...jtbdData, motivation: e.target.value })}
                        className="w-full min-h-[60px] text-sm p-3 rounded-lg border-2 border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Desired Outcome</label>
                      <textarea
                        placeholder="What outcome were they hoping to achieve?"
                        value={jtbdData.outcome || ""}
                        onChange={(e) => setJtbdData({ ...jtbdData, outcome: e.target.value })}
                        className="w-full min-h-[60px] text-sm p-3 rounded-lg border-2 border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Functional Jobs</label>
                        <Input
                          placeholder="Tasks to complete"
                          value={jtbdData.functionalJobs || ""}
                          onChange={(e) => setJtbdData({ ...jtbdData, functionalJobs: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Emotional Jobs</label>
                        <Input
                          placeholder="How they want to feel"
                          value={jtbdData.emotionalJobs || ""}
                          onChange={(e) => setJtbdData({ ...jtbdData, emotionalJobs: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Social Jobs</label>
                        <Input
                          placeholder="How they want to be seen"
                          value={jtbdData.socialJobs || ""}
                          onChange={(e) => setJtbdData({ ...jtbdData, socialJobs: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Market Size Context Form */}
              {dataSourceType === "market-size" && (
                <div className="mt-4 space-y-4 p-4 border-2 rounded-xl bg-muted/30">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-sm font-medium">Market Size</p>
                      <p className="text-xs text-muted-foreground">TAM, SAM, SOM</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleClearDataSource}
                      className="h-6 w-6 rounded-full flex-shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>

                  <Tabs defaultValue="tam" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="tam">TAM</TabsTrigger>
                      <TabsTrigger value="sam">SAM</TabsTrigger>
                      <TabsTrigger value="som">SOM</TabsTrigger>
                    </TabsList>

                    {/* TAM Tab */}
                    <TabsContent value="tam" className="space-y-3 mt-4">
                      <div className="space-y-1 mb-3">
                        <p className="text-sm font-medium">Total Addressable Market</p>
                        <p className="text-xs text-muted-foreground">Top-down view of full market potential</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What is the total number of potential customers globally?
                        </label>
                        <Input
                          placeholder="e.g., 50,000 companies or 2.5M users"
                          value={marketData.tamTotalCustomers || ""}
                          onChange={(e) => setMarketData({ ...marketData, tamTotalCustomers: e.target.value })}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What is the average annual revenue or spend per customer?
                        </label>
                        <Input
                          placeholder="e.g., $50,000 or $120/year"
                          value={marketData.tamAvgRevenue || ""}
                          onChange={(e) => setMarketData({ ...marketData, tamAvgRevenue: e.target.value })}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What is the total market revenue if all customers used a similar product?
                        </label>
                        <Input
                          placeholder="e.g., $2.5B or $300M"
                          value={marketData.tamTotalRevenue || ""}
                          onChange={(e) => setMarketData({ ...marketData, tamTotalRevenue: e.target.value })}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What is the overall market growth rate (CAGR)?
                        </label>
                        <Input
                          placeholder="e.g., 15% or 8.5% CAGR"
                          value={marketData.tamGrowthRate || ""}
                          onChange={(e) => setMarketData({ ...marketData, tamGrowthRate: e.target.value })}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What sources or reports validate this total market size?
                        </label>
                        <textarea
                          placeholder="e.g., Gartner report, industry analysis, market research"
                          value={marketData.tamSources || ""}
                          onChange={(e) => setMarketData({ ...marketData, tamSources: e.target.value })}
                          className="w-full min-h-[60px] text-sm p-3 rounded-lg border-2 border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </div>
                    </TabsContent>

                    {/* SAM Tab */}
                    <TabsContent value="sam" className="space-y-3 mt-4">
                      <div className="space-y-1 mb-3">
                        <p className="text-sm font-medium">Serviceable Available Market</p>
                        <p className="text-xs text-muted-foreground">Focused view of the market you can serve</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          Which customer segments or regions fall within your target scope?
                        </label>
                        <textarea
                          placeholder="e.g., Enterprise B2B SaaS companies in North America"
                          value={marketData.samSegments || ""}
                          onChange={(e) => setMarketData({ ...marketData, samSegments: e.target.value })}
                          className="w-full min-h-[60px] text-sm p-3 rounded-lg border-2 border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What portion of the total market aligns with your product's capabilities and business model?
                        </label>
                        <Input
                          placeholder="e.g., 30% of TAM or $750M"
                          value={marketData.samMarketPortion || ""}
                          onChange={(e) => setMarketData({ ...marketData, samMarketPortion: e.target.value })}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          How many potential customers fit your ICP?
                        </label>
                        <Input
                          placeholder="e.g., 15,000 companies"
                          value={marketData.samIcpCustomers || ""}
                          onChange={(e) => setMarketData({ ...marketData, samIcpCustomers: e.target.value })}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What's the estimated annual revenue opportunity for those segments?
                        </label>
                        <Input
                          placeholder="e.g., $225M annually"
                          value={marketData.samRevenueOpportunity || ""}
                          onChange={(e) => setMarketData({ ...marketData, samRevenueOpportunity: e.target.value })}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What are the main barriers (geographic, regulatory, technical) that limit reach?
                        </label>
                        <textarea
                          placeholder="e.g., GDPR compliance, language support, regional partnerships"
                          value={marketData.samBarriers || ""}
                          onChange={(e) => setMarketData({ ...marketData, samBarriers: e.target.value })}
                          className="w-full min-h-[60px] text-sm p-3 rounded-lg border-2 border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </div>
                    </TabsContent>

                    {/* SOM Tab */}
                    <TabsContent value="som" className="space-y-3 mt-4">
                      <div className="space-y-1 mb-3">
                        <p className="text-sm font-medium">Serviceable Obtainable Market</p>
                        <p className="text-xs text-muted-foreground">Realistic view of what you can capture</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What is your realistic market share target in Year 1? Year 3?
                        </label>
                        <Input
                          placeholder="e.g., Year 1: 2%, Year 3: 8%"
                          value={marketData.somMarketShare || ""}
                          onChange={(e) => setMarketData({ ...marketData, somMarketShare: e.target.value })}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          How many customers can you realistically acquire in the first 12 months?
                        </label>
                        <Input
                          placeholder="e.g., 300 customers"
                          value={marketData.somCustomersYear1 || ""}
                          onChange={(e) => setMarketData({ ...marketData, somCustomersYear1: e.target.value })}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What is the expected revenue from those customers?
                        </label>
                        <Input
                          placeholder="e.g., $4.5M in Year 1"
                          value={marketData.somRevenue || ""}
                          onChange={(e) => setMarketData({ ...marketData, somRevenue: e.target.value })}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What are your key go-to-market constraints (sales capacity, budget, competition)?
                        </label>
                        <textarea
                          placeholder="e.g., Limited sales team (5 AEs), $2M marketing budget, strong incumbent competition"
                          value={marketData.somConstraints || ""}
                          onChange={(e) => setMarketData({ ...marketData, somConstraints: e.target.value })}
                          className="w-full min-h-[60px] text-sm p-3 rounded-lg border-2 border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">
                          What assumptions underpin your SOM estimate?
                        </label>
                        <textarea
                          placeholder="e.g., 20% conversion rate, 6-month sales cycle, $15K ACV"
                          value={marketData.somAssumptions || ""}
                          onChange={(e) => setMarketData({ ...marketData, somAssumptions: e.target.value })}
                          className="w-full min-h-[60px] text-sm p-3 rounded-lg border-2 border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {/* Link Form */}
              {dataSourceType === "link" && (
                <div className="mt-4 space-y-3 p-4 border-2 rounded-xl bg-muted/30">
                  <div className="flex items-start gap-3">
                    <LinkIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-sm font-medium">Add Link</p>
                      <p className="text-xs text-muted-foreground">Reference a URL related to this insight</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleClearDataSource}
                      className="h-6 w-6 rounded-full flex-shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <Input
                    type="url"
                    placeholder="https://example.com/article"
                    value={dataSourceValue}
                    onChange={(e) => setDataSourceValue(e.target.value)}
                    className="text-sm"
                    autoFocus
                  />
                </div>
              )}

              {/* Note Form */}
              {dataSourceType === "note" && (
                <div className="mt-4 space-y-3 p-4 border-2 rounded-xl bg-muted/30">
                  <div className="flex items-start gap-3">
                    <StickyNote className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-sm font-medium">Add Note</p>
                      <p className="text-xs text-muted-foreground">Add additional context or notes</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleClearDataSource}
                      className="h-6 w-6 rounded-full flex-shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <textarea
                    placeholder="Add your notes here..."
                    value={dataSourceValue}
                    onChange={(e) => setDataSourceValue(e.target.value)}
                    className="w-full min-h-[100px] text-sm p-3 rounded-lg border-2 border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    autoFocus
                  />
                </div>
              )}

              {/* File Upload Form */}
              {dataSourceType === "file" && (
                <div className="mt-4 space-y-3 p-4 border-2 rounded-xl bg-muted/30">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-sm font-medium">Attach File</p>
                      <p className="text-xs text-muted-foreground">Upload a document related to this insight</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleClearDataSource}
                      className="h-6 w-6 rounded-full flex-shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, TXT (max 10MB)</p>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setDataSourceValue(file.name)
                        }
                      }}
                    />
                  </div>
                  {dataSourceValue && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                      <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm flex-1 truncate">{dataSourceValue}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setDataSourceValue("")}
                        className="h-6 w-6 rounded-full flex-shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Tags Section */}
              <div className="mt-3">
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-primary/70">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {aiAssistEnabled && suggestedTags.length > 0 && (
                  <div className="space-y-1.5 mb-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3" />
                      <span>Suggested tags</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setCustomTag(tag)
                            handleAddCustomTag()
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/20"
                        >
                          <Plus className="h-3 w-3" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Competitor Form for adding/editing competitors */}
              {!isFeedMode && insightType === "Competitive" && (isAddingCompetitor || isEditingCompetitor) && (
                <div className="w-full space-y-3 p-4 border-2 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">
                      {isEditingCompetitor ? "Edit Competitor" : "Add New Competitor"}
                    </h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleCancelCompetitorForm}
                      className="h-6 w-6 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Competitor name *"
                      value={competitorName}
                      onChange={(e) => setCompetitorName(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Website (optional)"
                      value={competitorWebsite}
                      onChange={(e) => setCompetitorWebsite(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Product line (optional)"
                      value={competitorProductLine}
                      onChange={(e) => setCompetitorProductLine(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Product page URL (optional)"
                      value={competitorProductPageUrl}
                      onChange={(e) => setCompetitorProductPageUrl(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={isEditingCompetitor ? handleEditCompetitor : handleAddCompetitor}
                      disabled={!competitorName.trim()}
                      size="sm"
                      className="flex-1"
                    >
                      {isEditingCompetitor ? "Save Changes" : "Add Competitor"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelCompetitorForm}
                      size="sm"
                      className="bg-transparent"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {!isFeedMode && insightType === "Customer" && (isAddingCustomer || isEditingCustomer) && (
                <div className="w-full space-y-3 p-4 border-2 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">
                      {isEditingCustomer ? "Edit Customer" : "Add New Customer"}
                    </h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleCancelCustomerForm}
                      className="h-6 w-6 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Customer name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Company (optional)"
                      value={customerCompany}
                      onChange={(e) => setCustomerCompany(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Title (optional)"
                      value={customerTitle}
                      onChange={(e) => setCustomerTitle(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Email (optional)"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={isEditingCustomer ? handleEditCustomer : handleAddCustomer}
                      disabled={!customerName.trim()}
                      size="sm"
                      className="flex-1"
                    >
                      {isEditingCustomer ? "Save Changes" : "Add Customer"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelCustomerForm}
                      size="sm"
                      className="bg-transparent"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Bottom Controls */}
          <div className="flex flex-col gap-4 mt-6 pt-6 border-t">
            {/* Left: Add Source and Selectors */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground font-medium px-1 opacity-0 pointer-events-none">
                  Context
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="rounded-full h-10 px-3 text-muted-foreground hover:text-foreground hover:bg-primary/10 shrink-0"
                      title="Add data source"
                      aria-label="Add data source"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="text-sm font-medium ml-1.5">Add context</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem onClick={() => handleDataSourceSelect("win-debrief")} className="cursor-pointer">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-600 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">Win Debrief</span>
                        <span className="text-xs text-muted-foreground truncate">Capture why we won</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDataSourceSelect("loss-debrief")} className="cursor-pointer">
                      <TrendingDown className="h-4 w-4 mr-2 text-red-600 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">Loss Debrief</span>
                        <span className="text-xs text-muted-foreground truncate">Capture why we lost</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDataSourceSelect("jtbd-interview")}
                      className="cursor-pointer"
                    >
                      <Users className="h-4 w-4 mr-2 text-blue-600 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">JTBD Interview</span>
                        <span className="text-xs text-muted-foreground truncate">Job to be done</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDataSourceSelect("market-size")} className="cursor-pointer">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-600 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">Market Size</span>
                        <span className="text-xs text-muted-foreground truncate">Define opportunity</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDataSourceSelect("link")} className="cursor-pointer">
                      <LinkIcon className="h-4 w-4 mr-2 text-primary shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">Add Link</span>
                        <span className="text-xs text-muted-foreground truncate">Reference a URL</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDataSourceSelect("feed")} className="cursor-pointer">
                      <Rss className="h-4 w-4 mr-2 text-primary shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">Add Feed</span>
                        <span className="text-xs text-muted-foreground truncate">Subscribe to a feed</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDataSourceSelect("note")} className="cursor-pointer">
                      <StickyNote className="h-4 w-4 mr-2 text-primary shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">Add Note</span>
                        <span className="text-xs text-muted-foreground truncate">Add context</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDataSourceSelect("file")} className="cursor-pointer">
                      <FileText className="h-4 w-4 mr-2 text-primary shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">Attach File</span>
                        <span className="text-xs text-muted-foreground truncate">Upload a document</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Insight Type Selector */}
              {!isFeedMode && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground font-medium px-1">Type</label>
                  <Select
                    value={insightType}
                    onValueChange={(value) => {
                      setInsightType(value as InsightType)
                      if (error) setError("")
                    }}
                    disabled={isDebriefMode || isJTBDMode || dataSourceType === "market-size"}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full sm:w-[160px] border-2 rounded-xl min-h-[44px] h-auto py-2",
                        (isDebriefMode || isJTBDMode || dataSourceType === "market-size") &&
                          "opacity-60 cursor-not-allowed",
                      )}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {insightTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className={`h-4 w-4 shrink-0 ${type.color}`} />
                            <span className="truncate">{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Competitor Selection UI for Competitive insights */}
              {!isFeedMode && insightType === "Competitive" && !isAddingCompetitor && !isEditingCompetitor && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground font-medium px-1">Competitor</label>
                  <div className="flex items-center gap-2">
                    <Select value={selectedCompetitor} onValueChange={handleCompetitorChange}>
                      <SelectTrigger className="w-full sm:w-[200px] border-2 rounded-xl min-h-[44px] h-auto py-2">
                        <SelectValue placeholder="Select competitor">
                          <div className="flex items-center gap-2">
                            <span className="truncate">{selectedCompetitorName}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {competitors.map((competitor) => (
                          <SelectItem key={competitor.id} value={competitor.id}>
                            {competitor.name}
                          </SelectItem>
                        ))}
                        <DropdownMenuSeparator />
                        <SelectItem value="add-new">
                          <div className="flex items-center gap-2 text-primary">
                            <Plus className="h-4 w-4 shrink-0" />
                            <span>Add New Competitor</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedCompetitor && selectedCompetitor !== "status-quo" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCompetitorChange("edit-current")}
                        className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
                        title="Edit competitor"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {!isFeedMode && insightType === "Customer" && !isAddingCustomer && !isEditingCustomer && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground font-medium px-1">Customer</label>
                  <div className="flex items-center gap-2">
                    <Select value={selectedCustomer} onValueChange={handleCustomerChange}>
                      <SelectTrigger className="w-full sm:w-[200px] border-2 rounded-xl min-h-[44px] h-auto py-2">
                        <SelectValue placeholder="Select customer">
                          <div className="flex items-center gap-2">
                            <span className="truncate">{selectedCustomerName}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                        <DropdownMenuSeparator />
                        <SelectItem value="add-new">
                          <div className="flex items-center gap-2 text-primary">
                            <Plus className="h-4 w-4 shrink-0" />
                            <span>Add New Customer</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedCustomer && selectedCustomer !== "unassigned" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCustomerChange("edit-current")}
                        className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
                        title="Edit customer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Tag Input Section */}
              {!isFeedMode && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground font-medium px-1 opacity-0 pointer-events-none">
                    Tags
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddCustomTag()
                        }
                      }}
                      className="text-sm bg-background border-2 flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddCustomTag}
                      className="text-sm bg-transparent w-full sm:w-auto"
                    >
                      Add tag
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: AI Assist Toggle and Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {!isFeedMode && (
                <div className="flex items-center gap-2">
                  <Switch id="ai-assist" checked={aiAssistEnabled} onCheckedChange={setAiAssistEnabled} />
                  <Label htmlFor="ai-assist" className="text-sm font-medium cursor-pointer flex items-center gap-1.5">
                    <Sparkles
                      className={cn("h-4 w-4 shrink-0", aiAssistEnabled ? "text-primary" : "text-muted-foreground")}
                    />
                    <span className={cn(aiAssistEnabled ? "text-foreground" : "text-muted-foreground")}>AI assist</span>
                  </Label>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
                {!isFeedMode && !isGenerating && !isSaving && (
                  <Button
                    onClick={handleSave}
                    disabled={isSaving || !observation || !insightType}
                    className="w-full sm:w-auto"
                  >
                    {isSaving ? "Saving..." : "Save Insight"}
                  </Button>
                )}

                {isFeedMode && (
                  <Button type="submit" disabled={isSubmitting || !feedData.url.trim()} className="w-full sm:w-auto">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe to feed"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Integration Options */}
      <div className="mt-6 sm:mt-8 text-center sm:text-left">
        <span className="text-sm text-muted-foreground block mb-4">or integrate with</span>
        <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
          {integrations.map((integration) => (
            <Button
              key={integration.name}
              variant="outline"
              size="sm"
              className={cn("rounded-full px-4 text-white border-0", integration.color)}
            >
              {integration.name}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="rounded-full px-3 bg-transparent">
            <span className="text-lg">...</span>
          </Button>
        </div>
      </div>
    </>
  )
}
