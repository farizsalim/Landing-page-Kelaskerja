import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kelaskerja.com | Bootcamp Online Bersama Mentor Praktisi",
  description:
    "Bootcamp online berbasis industri dengan mentor profesional, project nyata, sertifikasi, dan peluang magang.",
  keywords: ["bootcamp", "karier", "mentor praktisi", "digital marketing"],
  alternates: {canonical: "https://kelaskerja.com"},
  openGraph: {
    title: "Kelaskerja.com | Bootcamp Online Bersama Mentor Praktisi",
    description:
      "Bootcamp online berbasis industri dengan mentor profesional, project nyata, sertifikasi, dan peluang magang.",
    url: "https://kelaskerja.com",
    type: "website",
    siteName: "Kelaskerja",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelaskerja.com | Bootcamp Online Bersama Mentor Praktisi",
    description:
      "Bootcamp online berbasis industri dengan mentor profesional, project nyata, sertifikasi, dan peluang magang.",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
