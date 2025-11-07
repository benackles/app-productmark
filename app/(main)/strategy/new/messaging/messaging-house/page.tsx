import type { Metadata } from "next"
import MessagingHouseClient from "./messaging-house-client"

export const metadata: Metadata = {
  title: "Campaign Messaging House",
  description: "Create a Messaging House using the Value-Benefit-Feature hierarchy.",
}

export default function MessagingHousePage() {
  return <MessagingHouseClient />
}
