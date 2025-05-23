"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Linkedin,
  FileText,
  ChevronLeft,
  User,
  ArrowUpRight,
  Mail,
  ChevronRight,
} from "lucide-react";
import type { Intern } from "@/types/intern";
import { cn } from "@/lib/utils";

interface InternCardProps {
  intern: Intern;
}

export function InternCard({ intern }: InternCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  // Add escape key handler to flip back
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFlipped) {
        setIsFlipped(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isFlipped]);

  return (
    <div
      className="h-[280px] perspective-1000 group"
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative h-full w-full transform-style-3d cursor-pointer transition-all duration-500",
          isFlipped ? "card-flipped" : "",
          isHovered && !isFlipped ? "card-container" : ""
        )}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-pressed={isFlipped}
        aria-label={`Intern card for ${intern.name}`}
      >
        {/* Front of card */}
        <div
          className={cn(
            "card-content-front card-shadow flex flex-col items-center justify-center text-center",
            isHovered && !isFlipped ? "card-shadow-hover" : ""
          )}
        >
          <div className="absolute top-4 right-4">
            <button
              className="p-1 rounded-full bg-accent text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="View details"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center w-full mb-2">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-3">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {intern.name}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{intern.team}</p>
            <div className="flex justify-center gap-4 mb-2">
              <a
                href={intern.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-icon bg-gray-50 text-gray-600"
                aria-label={`View ${intern.name}'s resume`}
                onClick={(e) => e.stopPropagation()}
              >
                <FileText className="h-5 w-5" />
              </a>
              <a
                href={intern.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-icon bg-gray-50 text-gray-600"
                aria-label={`View ${intern.name}'s LinkedIn profile`}
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-3">Unlocking impact in:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-auto">
            {intern.jobOpportunities?.slice(0, 3).map((opportunity, index) => (
              <span key={index} className="skill-tag">
                {opportunity}
              </span>
            ))}
          </div>
        </div>

        {/* Back of card */}
        <div className="card-content-back card-shadow flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <button
              className="mr-2 p-1 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              aria-label="Flip card back"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {intern.name}
          </h3>

          {/* Scrollable content wrapper to prevent overflow */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              {intern.blurb}
            </p>
            <div className="flex space-x-4 w-full justify-center mb-2">
              <a
                href={intern.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-icon bg-gray-50 text-gray-600"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${intern.name}'s resume`}
              >
                <FileText className="h-5 w-5" />
              </a>
              <a
                href={intern.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-icon bg-gray-50 text-gray-600"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${intern.name}'s LinkedIn profile`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              {/* Skills Section */}
              <div className="flex flex-wrap gap-2 w-full justify-center">
                {intern.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
