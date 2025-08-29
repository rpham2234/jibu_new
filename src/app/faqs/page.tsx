"use client";

import HeroImage from "@/components/HeroImage";
import React, { useEffect, useState } from "react"
import { getQuestions } from "./getQuestions"

  type faq = {
    question?: string,
    answer?: string,
  }

export default function FAQPage() {
    const [questions, setQuestions] = useState<faq[]>([]);

    useEffect(() => {
        // Test Executive fetch
        getQuestions().then((data) => {
          console.log("Q&A", data);
          setQuestions(data);
        });
    }, []);

  return (
    <main>
      <HeroImage imageurl="https://jibuco.com/wp-content/uploads/2022/09/FAQBanner.jpeg" title="FAQs" subtitle="Questions most frequently asked about Jibu, Inc." showButton={false} />
      <div className="bg-white border border-gray-200 divide-y divide-gray-200 rounded-xl m-12">
        


        {questions.map((question, index) => (
            <details key={index} className="p-6 group">
                <summary className="flex items-center justify-between cursor-pointer">
                    <h5 className="text-lg font-medium text-gray-900">
                        {question.question}
                    </h5>

                    <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                </summary>

                <p className="mt-4 leading-relaxed text-gray-700">
                    {question.answer}
                </p>
            </details>
        ))}
    </div>
    </main>
  )};