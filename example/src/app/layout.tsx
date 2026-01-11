import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "react-sharesheet Example",
  description: "A demo of react-sharesheet with gwendall.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
