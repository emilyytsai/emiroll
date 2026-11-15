import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const prettyNotes = localFont({
  src: "./fonts/PrettyNotes-Regular.otf",
  variable: "--font-pretty-notes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "emiroll",
  description: "emiroll",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${prettyNotes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
