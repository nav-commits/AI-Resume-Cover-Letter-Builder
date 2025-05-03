"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, FileText, PenLine, FileOutput } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/job-description");
  };

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Resume Bullets",
      description: "Generate tailored resume bullet points matching the job description"
    },
    {
      icon: <PenLine className="h-6 w-6" />,
      title: "Cover Letters",
      description: "Create customized cover letters that highlight your qualifications"
    },
    {
      icon: <FileOutput className="h-6 w-6" />,
      title: "Export to PDF",
      description: "Download your resume and cover letter as professional PDFs"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              AI-Powered <span className="text-primary">Resume</span> & <span className="text-primary">Cover Letter</span> Builder
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Paste a job description and let our AI create tailored resume bullets 
              and cover letters that match what employers are looking for.
            </p>
            <div className="pt-4">
              <Button 
                onClick={handleGetStarted} 
                size="lg" 
                className="group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl shadow-lg p-6 border border-border"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="w-full h-4 rounded bg-muted animate-pulse" />
                <div className="w-3/4 h-4 rounded bg-muted animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <div className="w-full h-4 rounded bg-muted animate-pulse" />
                <div className="w-5/6 h-4 rounded bg-muted animate-pulse" />
                <div className="w-4/5 h-4 rounded bg-muted animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <div className="w-full h-4 rounded bg-muted animate-pulse" />
                <div className="w-4/6 h-4 rounded bg-muted animate-pulse" />
                <div className="w-5/6 h-4 rounded bg-muted animate-pulse" />
                <div className="w-3/6 h-4 rounded bg-muted animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}