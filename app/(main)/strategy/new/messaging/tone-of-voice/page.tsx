import type { Metadata } from "next"
import ToneOfVoiceClient from "./tone-of-voice-client"

export const metadata: Metadata = {
  title: "Tone of Voice Guide",
  description: "Define your brand's unique communication style and personality.",
}

export default function ToneOfVoicePage() {
  return <ToneOfVoiceClient />
}
