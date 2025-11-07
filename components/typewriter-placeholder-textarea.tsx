"use client"

import type React from "react"
import { useState, memo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useTypewriterPlaceholder } from "@/hooks/use-typewriter-placeholder"

interface TypewriterPlaceholderTextareaProps extends React.ComponentPropsWithoutRef<typeof Textarea> {
  placeholders: string[]
  typingSpeed?: number
  pauseDuration?: number
}

export const TypewriterPlaceholderTextarea = memo(function TypewriterPlaceholderTextarea({
  placeholders,
  typingSpeed = 50,
  pauseDuration = 2000,
  className,
  value,
  onFocus,
  onBlur,
  ...props
}: TypewriterPlaceholderTextareaProps) {
  const { displayText, isTyping } = useTypewriterPlaceholder(placeholders, typingSpeed, pauseDuration)
  const [isFocused, setIsFocused] = useState(false)

  const hasValue = value && value.toString().length > 0

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  return (
    <div className="relative">
      {!hasValue && !isFocused && (
        <div className="pointer-events-none absolute inset-0 z-0 flex items-start px-3 py-2">
          <span className="text-base text-muted-foreground/60">
            {displayText}
            {isTyping && <span className="animate-pulse ml-0.5">|</span>}
          </span>
        </div>
      )}
      <Textarea
        className={cn("relative z-10 bg-transparent", className)}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  )
})
