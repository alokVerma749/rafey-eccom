import type { Metadata } from "next";
import { Bellefair, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SessionProviderWrapper } from "./components/SessionProviderWrapper";


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

export const metadata: Metadata = {
  title: "Wonders Tapestry",
  description: "Discover and shop unique resin art, ceramic masterpieces, and hand-poured candles that bring warmth and beauty to your space. Each creation is a perfect blend of artistry and passion, crafted to inspire and delight.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <SessionProviderWrapper>
        <body className={`${bellefairFont.variable} ${poppinsFont.variable} antialiased`}>
          <div className="bg-background">
            <Header />
          </div>
          <div className="min-h-[70vh]">
            {children}
            {/* <Toaster /> */}
          </div>
          <div className="h-[25dvh] bg-background">
            <Footer />
          </div>
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
