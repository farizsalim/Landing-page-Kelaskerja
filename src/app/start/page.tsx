import type {Metadata} from "next";
import {Suspense} from "react";
import StartQuizPage from "@/components/StartQuizPage";

export const metadata: Metadata = {
  title: "Temukan Jalur Kariermu | Kelaskerja.com",
  description:
    "Ikuti quiz singkat dan temukan bootcamp Kelaskerja.com yang paling sesuai dengan tujuan kariermu.",
  alternates: {canonical: "https://kelaskerja.com/start"},
};

export default function StartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f5ef]" />}>
      <StartQuizPage />
    </Suspense>
  );
}
