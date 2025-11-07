import { notFound } from "next/navigation"
import { mockGTMFrameworks } from "@/lib/mock-gtm-frameworks"
import TaskEditClient from "./task-edit-client"

export default async function TaskEditPage({
  params,
}: {
  params: Promise<{ id: string; taskId: string }>
}) {
  const { id, taskId } = await params

  const framework = mockGTMFrameworks.find((f) => f.id === id)
  if (!framework) {
    notFound()
  }

  const task = framework.tasks.find((t) => t.id === taskId)
  if (!task) {
    notFound()
  }

  return <TaskEditClient framework={framework} task={task} />
}
