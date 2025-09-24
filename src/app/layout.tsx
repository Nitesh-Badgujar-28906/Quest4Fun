import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Quest4Fun - Gamified Learning for Kids",
  description: "A fun, interactive learning platform for children from JKG to 4th standard",
  keywords: "kids learning, educational games, children education, online learning",
  authors: [{ name: "Quest4Fun Team" }],
  creator: "Quest4Fun",
  publisher: "Quest4Fun",
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="child-mode" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
