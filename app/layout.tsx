import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Lakshmishwar Manjula Jha Foundation",
  description:
    "Official website of the Lakshmishwar Manjula Jha Foundation — working to uplift communities through education, healthcare, and social welfare initiatives.",
  keywords: [
    "Lakshmishwar Manjula Jha Foundation",
    "education foundation",
    "NGO India",
    "community development",
    "women empowerment",
    "charity trust",
  ],
  openGraph: {
    title: "Lakshmishwar Manjula Jha Foundation",
    description:
      "Join us in empowering communities and transforming lives through education, healthcare, and social welfare programs.",
    url: "https://lakshmishwarmanjulajhafoundation.com",
    siteName: "Lakshmishwar Manjula Jha Foundation",
    type: "website",
    images: [
      {
        url: "https://lakshmishwarmanjulajhafoundation.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lakshmishwar Manjula Jha Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakshmishwar Manjula Jha Foundation",
    description:
      "Transforming lives through education and community support — learn more about our mission and projects.",
    images: ["https://lakshmishwarmanjulajhafoundation.com/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
