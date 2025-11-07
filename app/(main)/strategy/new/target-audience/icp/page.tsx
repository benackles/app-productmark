import type { Metadata } from "next"
import ICPClientPage from "./icp-client"

export const metadata: Metadata = {
  title: "New ICP",
  description: "Create a new Ideal Customer Profile.",
}

export default function NewICPPage() {
  return <ICPClientPage />
}
