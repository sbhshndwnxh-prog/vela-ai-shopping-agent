import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vela — AI Personal Shopping Agent",
  description: "A multimodal shopping agent that turns your photo, plans and budget into explainable picks.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
