import { NextRequest, NextResponse } from "next/server";
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, company, description } = body;

    const prompt = PromptTemplate.fromTemplate(`
Given the following job description for a position at {company} titled "{title}", generate:
1. A full resume for a candidate applying to this job, organized into the following sections:
  - Contact Information
  - Professional Summary
  - Skills
  - Experience
  - Education
  - Certifications (if applicable)
  - Achievements (if applicable)
2. A personalized cover letter

Job Description:
{description}

Return the resume sections first, followed by the cover letter.
`);

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama3-70b-8192",
    });

    const chain = new LLMChain({ llm: model, prompt });

    const result = await chain.call({ title, company, description });
    const output = result.text;

    // Improved parsing logic for separating resume and cover letter
    const parts = output.split(/Cover Letter:\s*/i);

    // Ensure we handle unexpected format
    const resume = parts[0]?.trim() ?? "Resume not generated.";
    const coverLetter = parts[1]?.trim() ?? "Cover letter not generated.";

    return NextResponse.json({
      resume,
      coverLetter,
    });
  } catch (error) {
    console.error("[ERROR_GENERATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
