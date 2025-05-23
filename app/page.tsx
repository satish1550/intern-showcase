"use client";

import { useState, useEffect } from "react";
import { InternGrid } from "@/components/intern-grid";
import { Header } from "@/components/header";
import { HireTalentView } from "@/components/hire-talent-view";
import { LoadingSpinner } from "@/components/loading-spinner";
import type { Intern } from "@/types/intern";
import axios from "axios";

export default function Home() {
  const [showHireTalent, setShowHireTalent] = useState(false);
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const { data } = await axios.get("/api/interns");

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch data");
        }

        setInterns(data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch interns"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  const handleHireTalentClick = () => {
    setShowHireTalent(true);
  };

  const handleCloseHireTalent = () => {
    setShowHireTalent(false);
  };

  if (showHireTalent) {
    return <HireTalentView interns={interns} onClose={handleCloseHireTalent} />;
  }

  return (
    <>
      <Header onHireTalentClick={handleHireTalentClick} />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Interns Spotlight 2025
            </h1>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 mb-4 text-primary">
              Own Tomorrow. Recruit Greatness.
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              The 2025 intern roster is laced-up and sprinting toward impact-
              innovators, builders, boundary-breakers. Scroll the lineup, tap
              into their hustle, and sign the next champion before the buzzer
              sounds.
            </p>
          </header>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="font-medium">{error}</p>
              <p className="text-sm mt-2">Please try refreshing the page</p>
            </div>
          ) : (
            <InternGrid interns={interns} />
          )}
        </div>
      </main>
    </>
  );
}
