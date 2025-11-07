import type { Metadata } from "next"
import PersonaClientPage from "./PersonaClientPage"

export const metadata: Metadata = {
  title: "New Persona",
  description: "Create a new buyer persona.",
}

export default function NewPersonaPage() {
  return <PersonaClientPage />
}
