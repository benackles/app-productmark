import type { Metadata } from "next"
import NewInsightSimplified from "./new-insight-simplified"

export const metadata: Metadata = {
  title: "New Insight | ProductMark",
  description: "Add a new customer, competitive, or market insight",
}

export default function NewInsightPage() {
  return <NewInsightSimplified />
}
