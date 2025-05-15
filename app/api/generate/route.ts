import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, company, description } = body;

    const prompt = PromptTemplate.fromTemplate(`
Given the following job description for a position at {company} titled "{title}", generate:
1. A full resume for a candidate applying to this job, organized into:
  - Contact Information
  - Professional Summary
  - Skills
  - Experience
  - Education
  - Certifications (if applicable)
  - Achievements (if applicable)

2. A personalized cover letter.

Please separate the resume and cover letter sections clearly by writing the exact phrases:

--- Resume End ---
--- Cover Letter Start ---

Job Description:
{description}

Return the resume first, then print:

--- Resume End ---
--- Cover Letter Start ---

and then the cover letter.
`);

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama3-70b-8192",
    });

    const chain = new LLMChain({ llm: model, prompt });

    const result = await chain.call({ title, company, description });
    const output = result.text;

    // Split using exact separator markers
    const parts = output.split(/--- Resume End ---\s*--- Cover Letter Start ---/i);

    let resume = "Resume not generated.";
    let coverLetter = "Cover letter not generated.";

    if (parts.length === 2) {
      resume = parts[0].trim();
      coverLetter = parts[1].trim();
    } else {
      // Fallback: try to detect "Cover Letter" keyword and split accordingly
      const coverIndex = output.search(/Cover Letter/i);
      if (coverIndex !== -1) {
        resume = output.slice(0, coverIndex).trim();
        coverLetter = output.slice(coverIndex).trim();
      } else {
        // No clear cover letter found, save whole output as resume only
        resume = output.trim();
        coverLetter = "";
      }
    }

    // Save to DB
    await addDoc(collection(db, "resumes"), {
      title,
      company,
      description,
      resume,
      coverLetter,
      createdAt: new Date(),
    });

    return NextResponse.json({ resume, coverLetter });
  } catch (error) {
    console.error("[ERROR_GENERATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const q = query(collection(db, "resumes"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const resumes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ resumes });
  } catch (error) {
    console.error("[ERROR_FETCH_ALL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
