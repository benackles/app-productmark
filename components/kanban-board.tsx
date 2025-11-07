"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, GripVertical } from "lucide-react"
import Link from "next/link"
import type { GTMTask } from "@/lib/mock-gtm-frameworks"

interface KanbanBoardProps {
  tasks: GTMTask[]
  frameworkId: string
}

type TaskStatus = "backlog" | "todo" | "in-progress" | "review" | "done"

const statusColumns: { id: TaskStatus; label: string; bgColor: string; borderColor: string }[] = [
  { id: "backlog", label: "Backlog", bgColor: "bg-gray-50", borderColor: "border-gray-200" },
  { id: "todo", label: "To Do", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  { id: "in-progress", label: "In Progress", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
  { id: "review", label: "Review", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  { id: "done", label: "Done", bgColor: "bg-green-50", borderColor: "border-green-200" },
]

const priorityOrder = { high: 0, medium: 1, low: 2 }

export function KanbanBoard({ tasks, frameworkId }: KanbanBoardProps) {
  const [localTasks, setLocalTasks] = useState(tasks)
  const [draggedTask, setDraggedTask] = useState<GTMTask | null>(null)
  const [draggedOverStatus, setDraggedOverStatus] = useState<TaskStatus | null>(null)
  const [dropPosition, setDropPosition] = useState<{ taskId: string; position: "above" | "below" } | null>(null)
  const [visibleColumns, setVisibleColumns] = useState<Set<TaskStatus>>(new Set(["todo", "in-progress", "review"]))

  const toggleColumn = (columnId: TaskStatus) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(columnId)) {
        newSet.delete(columnId)
      } else {
        newSet.add(columnId)
      }
      return newSet
    })
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return localTasks
      .filter((task) => task.status === status)
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  }

  const handleDragStart = (task: GTMTask) => {
    setDraggedTask(task)
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
    setDraggedOverStatus(null)
    setDropPosition(null)
  }

  const determinePriorityFromPosition = (
    targetTask: GTMTask,
    position: "above" | "below",
    columnTasks: GTMTask[],
  ): "high" | "medium" | "low" => {
    const targetIndex = columnTasks.findIndex((t) => t.id === targetTask.id)

    if (position === "above") {
      // Dropping above target
      if (targetIndex === 0) {
        // Target is first item, take its priority
        return targetTask.priority
      }
      // Check task above target
      const taskAbove = columnTasks[targetIndex - 1]
      if (taskAbove.priority === targetTask.priority) {
        return targetTask.priority
      }
      // Between different priorities
      if (taskAbove.priority === "high" && targetTask.priority === "medium") return "high"
      if (taskAbove.priority === "high" && targetTask.priority === "low") return "medium"
      if (taskAbove.priority === "medium" && targetTask.priority === "low") return "medium"
      return targetTask.priority
    } else {
      // Dropping below target
      if (targetIndex === columnTasks.length - 1) {
        // Target is last item, take its priority
        return targetTask.priority
      }
      // Check task below target
      const taskBelow = columnTasks[targetIndex + 1]
      if (taskBelow.priority === targetTask.priority) {
        return targetTask.priority
      }
      // Between different priorities
      if (targetTask.priority === "high" && taskBelow.priority === "medium") return "medium"
      if (targetTask.priority === "high" && taskBelow.priority === "low") return "medium"
      if (targetTask.priority === "medium" && taskBelow.priority === "low") return "medium"
      return targetTask.priority
    }
  }

  const handleDrop = (targetStatus: TaskStatus, targetTask?: GTMTask, position?: "above" | "below") => {
    if (!draggedTask) return

    const isSameColumn = draggedTask.status === targetStatus

    let newPriority = draggedTask.priority

    if (isSameColumn && targetTask && position) {
      // Reordering within same column - adjust priority
      const columnTasks = getTasksByStatus(targetStatus)
      newPriority = determinePriorityFromPosition(targetTask, position, columnTasks)
    }

    setLocalTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status: targetStatus, priority: newPriority } : task,
      ),
    )

    setDraggedTask(null)
    setDraggedOverStatus(null)
    setDropPosition(null)
  }

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault()
    if (draggedTask && draggedTask.status !== status) {
      setDraggedOverStatus(status)
    }
  }

  const handleDragLeave = () => {
    setDraggedOverStatus(null)
  }

  const handleTaskDragOver = (e: React.DragEvent, task: GTMTask) => {
    e.preventDefault()
    e.stopPropagation()

    if (!draggedTask || draggedTask.id === task.id) return

    const rect = e.currentTarget.getBoundingClientRect()
    const midpoint = rect.top + rect.height / 2
    const position = e.clientY < midpoint ? "above" : "below"

    setDropPosition({ taskId: task.id, position })
  }

  const handleTaskDrop = (e: React.DragEvent, targetTask: GTMTask, position: "above" | "below") => {
    e.preventDefault()
    e.stopPropagation()
    handleDrop(targetTask.status, targetTask, position)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityBorderColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500"
      case "medium":
        return "border-yellow-500"
      case "low":
        return "border-blue-500"
      default:
        return "border-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {statusColumns.map((column) => {
          const taskCount = getTasksByStatus(column.id).length
          return (
            <Button
              key={column.id}
              variant={visibleColumns.has(column.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleColumn(column.id)}
              className="text-xs gap-2"
            >
              {visibleColumns.has(column.id) ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              {column.label}
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {taskCount}
              </Badge>
            </Button>
          )
        })}
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {statusColumns
          .filter((column) => visibleColumns.has(column.id))
          .map((column) => {
            const columnTasks = getTasksByStatus(column.id)
            const isBeingDraggedOver = draggedOverStatus === column.id && draggedTask?.status !== column.id

            return (
              <div
                key={column.id}
                className="flex-shrink-0 w-96"
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(column.id)}
              >
                <div
                  className={`rounded-xl border-2 ${column.borderColor} ${column.bgColor} h-full min-h-[500px] flex flex-col transition-all ${
                    isBeingDraggedOver ? "ring-2 ring-blue-400 shadow-lg" : ""
                  }`}
                >
                  <div className={`font-semibold p-5 border-b-2 ${column.borderColor} flex-shrink-0`}>
                    <div className="flex items-center justify-between">
                      <span>{column.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        {columnTasks.length}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {columnTasks.length === 0 && isBeingDraggedOver && (
                      <div className="text-sm text-muted-foreground text-center py-12 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50">
                        Drop task here
                      </div>
                    )}
                    {columnTasks.length === 0 && !isBeingDraggedOver && (
                      <div className="text-sm text-muted-foreground text-center py-12">No tasks</div>
                    )}
                    {columnTasks.map((task) => (
                      <div key={task.id} className="relative">
                        {dropPosition?.taskId === task.id && dropPosition.position === "above" && (
                          <div className="absolute -top-1.5 left-0 right-0 h-0.5 bg-blue-500 rounded-full z-10" />
                        )}
                        <div
                          draggable
                          onDragStart={() => handleDragStart(task)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) => handleTaskDragOver(e, task)}
                          onDrop={(e) => {
                            if (dropPosition?.taskId === task.id) {
                              handleTaskDrop(e, task, dropPosition.position)
                            }
                          }}
                          className={`group relative ${draggedTask?.id === task.id ? "opacity-50" : ""}`}
                        >
                          <Link href={`/strategy/${frameworkId}/task/${task.id}`}>
                            <div
                              className={`p-4 bg-white rounded-lg border-l-4 ${getPriorityBorderColor(
                                task.priority,
                              )} shadow-sm hover:shadow-md transition-all cursor-move hover:border-l-[6px]`}
                            >
                              <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div className="pl-4">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                  <h4 className="font-medium text-sm leading-tight flex-1">{task.name}</h4>
                                  <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                  </Badge>
                                </div>
                                {task.description && (
                                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                                )}
                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                                  <span>{task.estimatedHours}h</span>
                                  {task.assignee && <span>{task.assignee.role}</span>}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                        {dropPosition?.taskId === task.id && dropPosition.position === "below" && (
                          <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-500 rounded-full z-10" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
