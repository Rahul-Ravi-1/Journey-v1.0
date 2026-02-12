import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Journey",
  description: "A simple screen with the sky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
