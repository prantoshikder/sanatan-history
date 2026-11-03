import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

const body = Hind_Siliguri({
  variable: "--font-body",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

const heading = Noto_Serif_Bengali({
  variable: "--font-heading",
  subsets: ["bengali", "latin"],
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "সনাতন ইতিহাস — হিন্দু ধর্মের ইতিহাস ও চার যুগ",
    template: "%s | সনাতন ইতিহাস",
  },
  description:
    "সত্য, ত্রেতা, দ্বাপর ও কলি — চার যুগের বিস্তারিত বিবরণ, দশাবতার, শাস্ত্র এবং হিন্দু ধর্মের ঐতিহাসিক সময়রেখা বাংলায়।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${body.variable} ${heading.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        suppressContentEditableWarning
        className="min-h-full flex flex-col"
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
