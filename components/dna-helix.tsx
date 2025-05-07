"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"

export function DnaHelix({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="dna-container">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="dna-pair">
              <div className="dna-left-strand"></div>
              <div className="dna-base-pair"></div>
              <div className="dna-right-strand"></div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .dna-container {
          position: relative;
          width: 100px;
          height: 300px;
          animation: rotate 10s linear infinite;
          transform-style: preserve-3d;
        }
        
        .dna-pair {
          position: absolute;
          width: 100%;
          height: 30px;
          transform-style: preserve-3d;
        }
        
        .dna-pair:nth-child(1) { top: 0px; }
        .dna-pair:nth-child(2) { top: 30px; }
        .dna-pair:nth-child(3) { top: 60px; }
        .dna-pair:nth-child(4) { top: 90px; }
        .dna-pair:nth-child(5) { top: 120px; }
        .dna-pair:nth-child(6) { top: 150px; }
        .dna-pair:nth-child(7) { top: 180px; }
        .dna-pair:nth-child(8) { top: 210px; }
        .dna-pair:nth-child(9) { top: 240px; }
        .dna-pair:nth-child(10) { top: 270px; }
        
        .dna-left-strand {
          position: absolute;
          left: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #3b82f6;
          transform: translateZ(20px);
        }
        
        .dna-right-strand {
          position: absolute;
          right: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #10b981;
          transform: translateZ(-20px);
        }
        
        .dna-base-pair {
          position: absolute;
          left: 20px;
          width: 60px;
          height: 4px;
          background-color: #94a3b8;
        }
        
        .dna-pair:nth-child(odd) .dna-base-pair {
          transform: rotateY(90deg);
        }
        
        .dna-pair:nth-child(even) .dna-base-pair {
          transform: rotateY(-90deg);
        }
        
        @keyframes rotate {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  )
}
