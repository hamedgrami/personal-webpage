"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function GrapheneAnimation({ className }: { className?: string }) {
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

    // Animation parameters
    const graphene = {
      hexSize: 12,
      bulkColor: "#555555",
      slabColor: "#777777",
      electronColor: "#4f46e5",
      electronSize: 6,
      bulkRows: 8,
      slabRows: 4,
      gap: 40,
    }

    // Electron animation parameters
    let electronX = 0
    let electronY = 0
    let electronDirection = 1 // 1: slab to bulk, -1: bulk to slab
    let electronProgress = 0
    const electronSpeed = 0.005
    let electronPath: { x: number; y: number }[] = []

    // Calculate positions
    const calculatePositions = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Calculate total height of both structures
      const totalHeight = (graphene.bulkRows + graphene.slabRows) * graphene.hexSize * 1.5 + graphene.gap

      // Calculate starting Y positions
      const bulkStartY = centerY - totalHeight / 2
      const slabStartY = bulkStartY + graphene.bulkRows * graphene.hexSize * 1.5 + graphene.gap

      // Generate electron path
      electronPath = [
        { x: centerX, y: slabStartY + graphene.slabRows * graphene.hexSize * 0.75 }, // Start at slab
        { x: centerX, y: bulkStartY + graphene.bulkRows * graphene.hexSize * 0.75 }, // End at bulk
      ]

      return { centerX, bulkStartY, slabStartY }
    }

    // Draw hexagon
    const drawHexagon = (x: number, y: number, size: number, color: string) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(hx, hy)
        } else {
          ctx.lineTo(hx, hy)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    // Draw graphene structure (bulk or slab)
    const drawGrapheneStructure = (startY: number, rows: number, color: string) => {
      const centerX = canvas.width / 2
      const hexWidth = graphene.hexSize * Math.sqrt(3)
      const hexHeight = graphene.hexSize * 2

      for (let row = 0; row < rows; row++) {
        const y = startY + row * (hexHeight * 0.75)
        const cols = Math.floor(canvas.width / hexWidth) + 2
        const startX = centerX - (cols * hexWidth) / 2

        for (let col = 0; col < cols; col++) {
          const offset = (row % 2) * (hexWidth / 2)
          const x = startX + col * hexWidth + offset
          drawHexagon(x, y, graphene.hexSize, color)
        }
      }
    }

    // Draw electron
    const drawElectron = (x: number, y: number) => {
      ctx.beginPath()
      ctx.arc(x, y, graphene.electronSize, 0, Math.PI * 2)
      ctx.fillStyle = graphene.electronColor
      ctx.fill()

      // Add glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, graphene.electronSize * 2)
      gradient.addColorStop(0, "rgba(79, 70, 229, 0.6)")
      gradient.addColorStop(1, "rgba(79, 70, 229, 0)")

      ctx.beginPath()
      ctx.arc(x, y, graphene.electronSize * 2, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate positions
      const { bulkStartY, slabStartY } = calculatePositions()

      // Draw bulk graphene
      drawGrapheneStructure(bulkStartY, graphene.bulkRows, graphene.bulkColor)

      // Draw slab graphene
      drawGrapheneStructure(slabStartY, graphene.slabRows, graphene.slabColor)

      // Update electron position
      electronProgress += electronSpeed * electronDirection

      if (electronProgress >= 1) {
        electronDirection = -1 // Change direction to bulk to slab
        electronProgress = 1
      } else if (electronProgress <= 0) {
        electronDirection = 1 // Change direction to slab to bulk
        electronProgress = 0
      }

      // Calculate electron position along the path
      const startPoint = electronPath[0]
      const endPoint = electronPath[1]
      electronX = startPoint.x + (endPoint.x - startPoint.x) * electronProgress
      electronY = startPoint.y + (endPoint.y - startPoint.y) * electronProgress

      // Draw electron
      drawElectron(electronX, electronY)

      // Draw path line (optional, commented out for cleaner look)
      // ctx.beginPath()
      // ctx.moveTo(electronPath[0].x, electronPath[0].y)
      // ctx.lineTo(electronPath[1].x, electronPath[1].y)
      // ctx.strokeStyle = "rgba(79, 70, 229, 0.2)"
      // ctx.lineWidth = 1
      // ctx.stroke()

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
