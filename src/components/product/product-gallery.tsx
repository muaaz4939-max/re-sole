"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ZoomInIcon } from "lucide-react"

export function ProductGallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-square overflow-hidden rounded-3xl bg-muted shadow-lg">
        <Image
          src={images[selectedIndex]}
          alt="Product image"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex size-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
            <ZoomInIcon className="size-5 text-white" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-xl bg-black/40 px-3 py-1.5 text-center text-xs text-white backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "relative size-20 overflow-hidden rounded-xl border-2 transition-all duration-200",
                selectedIndex === idx
                  ? "border-primary shadow-md shadow-primary/20 scale-105"
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-muted-foreground/30"
              )}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
