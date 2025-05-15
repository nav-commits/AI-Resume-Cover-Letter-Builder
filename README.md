# 🧠 AI Resume & Cover Letter Generator (Next.js + Langchain/GROQ + Firebase)

This is a simple full-stack web application built with **Next.js 13/14 App Router**, **TypeScript**, **React Hook Form**, **Zod**, and a backend API route. It allows users to input a job title, company, and job description and receive an **AI-generated resume and cover letter**. Additionally, generated resumes and cover letters are **saved to Firebase Firestore** for persistent storage and later retrieval.

## 🚀 Features

- Job input form with validation (Zod + React Hook Form)
- Generates content (resume & cover letter) using a backend API
- Loading indicator while content is being generated
- Displays generated content in a styled UI
- Saves generated resumes and cover letters to **Firebase Firestore**
- Tailwind CSS styling
- Uses `.env.local` for secure API keys and Firebase credentials

---

## 🛠️ Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- GROQ API (via `/api/generate`)
- **Firebase Firestore** for data persistence

---

![AIResume](https://github.com/user-attachments/assets/f206e64b-2c1f-4ac5-b558-bbfec2d1c68c)

## 📄 Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```env
GROQ_API_KEY=your-groq-api-key
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
