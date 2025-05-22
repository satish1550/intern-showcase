"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

interface SearchFilterProps {
  onSearch: (query: string) => void
}

export function SearchFilter({ onSearch }: SearchFilterProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, onSearch])

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        placeholder="Search by name or skill..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
