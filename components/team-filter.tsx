"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TeamFilterProps {
  teams: string[]
  selectedTeam: string | null
  onSelectTeam: (team: string | null) => void
}

export function TeamFilter({ teams, selectedTeam, onSelectTeam }: TeamFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button variant="outline" className="flex items-center justify-between w-full" onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedTeam || "All Teams"}</span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              className={cn(
                "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100",
                !selectedTeam && "text-primary font-medium",
              )}
              onClick={() => {
                onSelectTeam(null)
                setIsOpen(false)
              }}
            >
              <span className="flex-grow">All Teams</span>
              {!selectedTeam && <Check className="h-4 w-4" />}
            </button>

            {teams.map((team) => (
              <button
                key={team}
                className={cn(
                  "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100",
                  selectedTeam === team && "text-primary font-medium",
                )}
                onClick={() => {
                  onSelectTeam(team)
                  setIsOpen(false)
                }}
              >
                <span className="flex-grow">{team}</span>
                {selectedTeam === team && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
