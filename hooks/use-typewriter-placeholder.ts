"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export function useTypewriterPlaceholder(placeholders: string[], typingSpeed = 50, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const animationFrameRef = useRef<number>()

  const updateText = useCallback(() => {
    if (placeholders.length === 0) return

    const currentPlaceholder = placeholders[currentIndex]

    if (isTyping) {
      if (displayText.length < currentPlaceholder.length) {
        // Use requestAnimationFrame for smoother updates
        animationFrameRef.current = requestAnimationFrame(() => {
          setDisplayText(currentPlaceholder.slice(0, displayText.length + 1))
        })
      } else {
        // Finished typing, pause before erasing
        setIsTyping(false)
        timeoutRef.current = setTimeout(() => {
          setIsTyping(true)
          setCurrentIndex((prev) => (prev + 1) % placeholders.length)
          setDisplayText("")
        }, pauseDuration)
      }
    }
  }, [placeholders, currentIndex, displayText, isTyping, pauseDuration])

  useEffect(() => {
    const timer = setTimeout(updateText, typingSpeed)

    return () => {
      clearTimeout(timer)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [updateText, typingSpeed])

  return { displayText, isTyping: isTyping && displayText.length < placeholders[currentIndex]?.length }
}
