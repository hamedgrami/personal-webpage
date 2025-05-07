"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function DnaAnimation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // DNA animation parameters
    const dna = {
      baseWidth: 10,
      baseSpacing: 4,
      basePairs: 20,
      rotationSpeed: 0.02,
      verticalSpeed: 0.5,
      color1: "#3b82f6", // Primary color
      color2: "#10b981", // Secondary color
      backboneColor: "#94a3b8",
      backboneWidth: 2,
    }

    let rotation = 0
    let yOffset = 0

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update animation variables
      rotation += dna.rotationSpeed
      yOffset += dna.verticalSpeed
      if (yOffset > dna.baseSpacing * 2) {
        yOffset = 0
      }

      // Calculate center of canvas
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw DNA
      const totalHeight = dna.basePairs * dna.baseSpacing * 2
      const startY = centerY - totalHeight / 2

      for (let i = 0; i < dna.basePairs; i++) {
        const y = startY + i * dna.baseSpacing * 2 + yOffset

        // Skip if outside canvas
        if (y < -dna.baseSpacing * 2 || y > canvas.height + dna.baseSpacing * 2) continue

        // Calculate positions for the base pair
        const angle = rotation + i * 0.2
        const x1 = centerX + Math.cos(angle) * 50
        const x2 = centerX - Math.cos(angle) * 50

        // Draw backbone
        ctx.beginPath()
        ctx.moveTo(centerX - 50, y)
        ctx.lineTo(centerX + 50, y)
        ctx.strokeStyle = dna.backboneColor
        ctx.lineWidth = dna.backboneWidth
        ctx.stroke()

        // Draw base pairs
        ctx.beginPath()
        ctx.arc(x1, y, dna.baseWidth, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? dna.color1 : dna.color2
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x2, y, dna.baseWidth, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? dna.color2 : dna.color1
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    // Start animation
    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className={cn("w-full h-full", className)} />
}
