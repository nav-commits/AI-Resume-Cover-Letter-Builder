"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  description: z.string().min(50, {
    message:
      "Job description must be at least 50 characters for better results.",
  }),
});

type GeneratedContent = {
  resume: string;
  coverLetter: string;
};

export function JobForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const { toast } = useToast();

  const router = useRouter(); // Using useRouter for client-side navigation

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setGeneratedContent(null); // reset on each submit

    try {
      const response = await fetch("http://localhost:3000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content.");
      }

      const data = await response.json();

      setGeneratedContent({
        resume: data.resume || "",
        coverLetter: data.coverLetter || "",
      });

      toast({
        title: "Success!",
        description: "Content generated successfully.",
      });
    } catch (error) {
      console.error("Error generating content", error);
      toast({
        title: "Error",
        description: "Something went wrong while generating content.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the full job description here..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Generate Content"
            )}
          </Button>
        </form>
      </Form>

      {generatedContent && (
        <div className="mt-10 space-y-6">
          <div className="p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Resume</h2>
            <pre className="whitespace-pre-wrap text-sm">{generatedContent.resume}</pre>
          </div>

          <div className="p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Cover Letter</h2>
            <pre className="whitespace-pre-wrap text-sm">{generatedContent.coverLetter}</pre>
          </div>
        </div>
      )}

      {/* Go Back to Homepage Button */}
      <div className="mt-6">
        <Button onClick={() => router.push('/')}>Go Back to Homepage</Button>
      </div>
    </>
  );
}
