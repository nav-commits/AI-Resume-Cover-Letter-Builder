'use client';

import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JobForm } from "@/components/job-form";

export function JobFormContainer() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="min-h-screen bg-background py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Create Your Tailored Application</h1>
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Enter the job information to generate tailored resume bullets and a cover letter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JobForm />
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-muted-foreground text-sm">
            <p>For best results, include the full job description with requirements and responsibilities.</p>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}