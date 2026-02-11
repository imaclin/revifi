import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "REVIFI | Historic Building Rehabilitation in Cleveland",
    template: "%s | REVIFI",
  },
  description:
    "Revitalizing the great buildings of yesterday for a better tomorrow. REVIFI specializes in historic building rehabilitation and community-centric real estate development in Cleveland, Ohio.",
  keywords: [
    "historic building restoration",
    "Cleveland real estate",
    "building rehabilitation",
    "commercial restoration",
    "interior design",
    "construction management",
  ],
  authors: [{ name: "REVIFI" }],
  icons: {
    icon: [
      { url: "/revifi-icon.png", sizes: "32x32", type: "image/png" },
      { url: "/revifi-icon.png", sizes: "16x16", type: "image/png" },
      { url: "/revifi-icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/revifi-icon.png",
    apple: "/revifi-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://revifi.com",
    siteName: "REVIFI",
    title: "REVIFI | Historic Building Rehabilitation in Cleveland",
    description:
      "Revitalizing the great buildings of yesterday for a better tomorrow.",
    images: [
      {
        url: "/revifi-icon.png",
        width: 512,
        height: 512,
        alt: "REVIFI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REVIFI | Historic Building Rehabilitation in Cleveland",
    description:
      "Revitalizing the great buildings of yesterday for a better tomorrow.",
    images: ["/revifi-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <LocalBusinessJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
