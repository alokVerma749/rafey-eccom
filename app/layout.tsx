import type { Metadata } from "next";
import { Bellefair, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SessionProviderWrapper } from "./components/SessionProviderWrapper";
import { getSession } from "@/utils/auth";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cartContext";

const bellefairFont = Bellefair({
  weight: "400",
  variable: "--font-bellefair",
  subsets: ["latin"],
});

const poppinsFont = Poppins({
  weight: ["400", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const interFont = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wonders Tapestry",
  description: "Discover and shop unique resin art, ceramic masterpieces, and hand-poured candles that bring warmth and beauty to your space. Each creation is a perfect blend of artistry and passion, crafted to inspire and delight.",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession()
  return (
    <html lang="en">
      <SessionProviderWrapper session={session}>
        <CartProvider session={session}>
          <body className={`${bellefairFont.variable} ${poppinsFont.variable} ${interFont.variable} antialiased`}>
            <div className="bg-background"></div>
            <div className="min-h-[70vh]">
              {children}
              <Toaster />
            </div>
          </body>
        </CartProvider>
      </SessionProviderWrapper>
    </html>
  );
}
