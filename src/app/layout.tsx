import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const interClassName: string = inter.className;

export const metadata: Metadata = {
  title: "BornoBihar - Global Online Bookstore",
  description:
    "BornoBihar is a leading online bookstore offering a vast collection of books worldwide. Discover fiction, non-fiction, academic books, and more with international shipping.",
  keywords: [
    "buy books online",
    "BornoBihar",
    "international bookstore",
    "online book shop",
    "fiction books",
    "non-fiction books",
    "academic books",
    "ebooks",
    "global book delivery",
  ],
  referrer: "origin-when-cross-origin",
  robots: "index, follow",
  publisher: "BornoBihar Inc.",
  authors: [
    { name: "Emam Bokhari", url: "https://www.facebook.com/emambokhari99" },
  ],
  creator: "Emam Bokhari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interClassName}  bg-white`}>
        <Providers>
          {children}
          <Toaster
            expand
            position="top-right"
            toastOptions={{
              style: {
                background: "#F65D4E",
                border: "#F65D4E",
                color: "#ffffff",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
