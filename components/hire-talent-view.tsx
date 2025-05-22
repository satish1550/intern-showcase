"use client"

import { useState, useMemo } from "react"
import type { Intern } from "@/types/intern"
import { InternGrid } from "@/components/intern-grid"
import { TeamFilter } from "@/components/team-filter"
import { SearchFilter } from "@/components/search-filter"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HireTalentViewProps {
  interns: Intern[]
  onClose: () => void
}

export function HireTalentView({ interns, onClose }: HireTalentViewProps) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Extract unique teams
  const teams = useMemo(() => {
    const teamSet = new Set<string>()
    interns.forEach((intern) => {
      if (intern.team) {
        teamSet.add(intern.team)
      }
    })
    return Array.from(teamSet).sort()
  }, [interns])

  // Filter interns based on team and search query
  const filteredInterns = useMemo(() => {
    return interns.filter((intern) => {
      // Filter by team if selected
      if (selectedTeam && intern.team !== selectedTeam) {
        return false
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          intern.name.toLowerCase().includes(query) ||
          intern.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          (intern.team && intern.team.toLowerCase().includes(query)) ||
          intern.blurb.toLowerCase().includes(query)
        )
      }

      return true
    })
  }, [interns, selectedTeam, searchQuery])

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Hire Talent</h1>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <SearchFilter onSearch={setSearchQuery} />
          </div>
          <div>
            <TeamFilter teams={teams} selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
          </div>
        </div>

        {filteredInterns.length > 0 ? (
          <InternGrid interns={filteredInterns} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No interns match your filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
