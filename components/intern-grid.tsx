import { InternCard } from "@/components/intern-card"
import type { Intern } from "@/types/intern"

interface InternGridProps {
  interns: Intern[]
}

export function InternGrid({ interns }: InternGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {interns.map((intern) => (
        <InternCard key={intern.name} intern={intern} />
      ))}
    </div>
  )
}
