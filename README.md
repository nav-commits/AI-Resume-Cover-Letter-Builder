# 🧠 AI Resume & Cover Letter Generator (Next.js + Langchain/GROQ)

This is a simple full-stack web application built with **Next.js 13/14 App Router**, **TypeScript**, **React Hook Form**, **Zod**, and a backend API route. It allows users to input a job title, company, and job description and receive an **AI-generated resume and cover letter**.

## 🚀 Features

- Job input form with validation (Zod + React Hook Form)
- Generates content (resume & cover letter) using a backend API
- Loading indicator while content is being generated
- Displays generated content in a styled UI
- Tailwind CSS styling
- Uses `.env.local` for secure API keys

---

## 🛠️ Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- GROQ API (via `/api/generate`)

---

## 📄 Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```env
GROQ_API_KEY=your-groq-api-key
