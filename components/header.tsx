"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onHireTalentClick: () => void
}

export function Header({ onHireTalentClick }: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            <Image
              src="https://cdn.hyperverge.co/wp-content/uploads/2025/02/hyperverge-logo.webp"
              alt="HyperVerge Identity Verification Platform"
              width={136}
              height={25}
              priority
            />
          </Link>
        </div>

        <Button onClick={onHireTalentClick} className="bg-primary hover:bg-primary/90 text-white">
          Hire Talent
        </Button>
      </div>
    </header>
  )
}
