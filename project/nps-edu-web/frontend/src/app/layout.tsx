import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "자격 시험 응시료 환급 모델",
  description: "자격 시험 응시료 환급 모델입니다. 총 3가지 페르소나를 가지고 시뮬레이션을 돌릴 수 있습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`flex flex-col min-h-screen w-full ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="flex flex-col flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
