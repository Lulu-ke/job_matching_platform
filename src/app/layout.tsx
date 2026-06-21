import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jobr.co.ke'),
  title: {
    default: "JOBR Kenya – Find Jobs, Internships & Opportunities in Kenya",
    template: '%s | JOBR Kenya',
  },
  description:
    "Kenya's #1 job board. Discover verified jobs, government jobs, internships, scholarships, and career opportunities from trusted employers across Kenya.",
  keywords: [
    "Kenya jobs",
    "jobs in Kenya",
    "government jobs Kenya",
    "internships Kenya",
    "careers Kenya",
    "job board Kenya",
    "Nairobi jobs",
    "Kenyan job search",
  ],
  authors: [{ name: "JOBR Kenya" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "JOBR Kenya – Find Jobs, Internships & Opportunities in Kenya",
    description:
      "Kenya's #1 job board. Discover verified jobs, government jobs, internships, scholarships, and career opportunities from trusted employers across Kenya.",
    siteName: "JOBR Kenya",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOBR Kenya – Find Jobs, Internships & Opportunities in Kenya",
    description:
      "Kenya's #1 job board. Discover verified jobs, government jobs, internships, scholarships, and career opportunities from trusted employers across Kenya.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} antialiased`}
        style={{ background: '#faf9f6' }}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}