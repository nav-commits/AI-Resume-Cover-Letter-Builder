"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type ResumeData = {
  id: string;
  resume: string;
  coverLetter: string;
  createdAt: { seconds: number; nanoseconds: number } | null;
};

export default function ResumesPage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResumes() {
      try {
        const res = await fetch("/api/generate");
        if (!res.ok) throw new Error("Failed to fetch resumes");

        const data = await res.json();
        setResumes(data.resumes);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchResumes();
  }, []);

  if (loading) return <p>Loading resumes...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (resumes.length === 0) return <p>No resumes found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 relative min-h-screen">
      {/* Top bar container: button left, title center */}
      <div className="absolute top-6 left-0 right-0 flex items-center px-6">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-black text-black hover:bg-black hover:text-white transition"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="flex-grow text-center text-3xl font-bold">
          All Resumes & Cover Letters
        </h1>

        {/* Placeholder to balance flex: same width as button */}
        <div style={{ width: "140px" }} />
      </div>

      {/* Padding top to prevent overlap */}
      <div className="pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map(({ id, resume, coverLetter, createdAt }) => (
            <div
              key={id}
              className="border p-4 rounded-lg bg-gray-50 shadow-sm flex flex-col"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <p className="text-xs text-gray-500 mb-1">
                Created:{" "}
                {createdAt
                  ? new Date(createdAt.seconds * 1000).toLocaleString()
                  : "Unknown"}
              </p>
              <h2 className="text-lg font-semibold mb-2">Resume</h2>
              <pre className="whitespace-pre-wrap text-xs mb-4 flex-grow overflow-auto">{resume}</pre>
              <h2 className="text-lg font-semibold mb-2">Cover Letter</h2>
              <pre className="whitespace-pre-wrap text-xs overflow-auto">{coverLetter}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
