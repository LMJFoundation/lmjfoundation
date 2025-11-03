import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "LMJ India Foundation | Empowering Communities Across India",
  description: "LMJ India Foundation - Nonprofit organization empowering communities through education, healthcare, women empowerment, and environmental initiatives across India. Donate and volunteer today.",
  keywords: "NGO India, nonprofit organization, education, healthcare, women empowerment, environmental awareness, donate, volunteer, social entrepreneurship, child education, rural development, LMJ India",
  authors: [{ name: "LMJ India Foundation" }],
  
  metadataBase: new URL('https://lmjindia.com'),
  alternates: {
    canonical: 'https://lmjindia.com',
  },
  
  openGraph: {
    title: "LMJ India Foundation - Empowering Communities Across India",
    description: "Building a just, inclusive, and sustainable India through education, healthcare, livelihood, and environmental action.",
    url: "https://lmjindia.com",
    siteName: "LMJ India Foundation",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LMJ India Foundation - Community Empowerment",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "LMJ India Foundation - Empowering Communities Across India",
    description: "Nonprofit organization building a just, inclusive, and sustainable India",
    images: ["/og-image.jpg"],
    creator: "@lmjindia", // Add if you have Twitter handle
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Add these for better SEO
  category: 'nonprofit',
  classification: 'NGO, Charity, Nonprofit Organization',
  
  // You'll add this after setting up Google Search Console
  // verification: {
  //   google: 'your-google-search-console-verification-code',
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} ${playfair.className}`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <link rel="apple-touch-icon" href="/apple-touch-icon?<generated>" type="image/<generated>" sizes="<generated>" />
      </head>
      <body className="font-inter">
        {children}
      </body>
    </html>
  )
}
