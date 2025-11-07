import { notFound } from "next/navigation"
import { mockGTMFrameworks } from "@/lib/mock-gtm-frameworks"
import TaskDetailClient from "./task-detail-client"

export default async function TaskDetailPage({
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

  return <TaskDetailClient framework={framework} task={task} />
}
