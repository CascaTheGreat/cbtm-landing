import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteDetails } from "@/data/siteDetails";

import "./globals.css";

const berthold = localFont({
  src: [
    {
      path: "./fonts/Berthold-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Berthold-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Berthold-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Berthold-Condensed.otf",
      weight: "600",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    type: "website",
    images: [
      {
        url: "/images/OG.png",
        width: 1200,
        height: 630,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ["/images/OG.png"],
  },
  itunes: {
    appId: "66JX3388MN", // Placeholder for the actual App Store ID
    appArgument: "cbtm://", // Placeholder for the actual app argument
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${berthold.className} antialiased`}>
        {siteDetails.googleAnalyticsId && (
          <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />
        )}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
