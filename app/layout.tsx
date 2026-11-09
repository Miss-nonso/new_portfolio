import type { Metadata } from "next";
import { profile } from "@/lib/content";
import "./current.css";
import "./reboot.css";
import "./gallery-modes.css";
import "./hero-motion.css";
import "./audacious-palette.css";
import "./autonomous-motion.css";
import "./palette-revision.css";
import "./functional-palette.css";
import "./mobile-polish.css";
import "./portfolio-tablet.css";
import "./doodle-arrow.css";
import "./hero-copy-layout.css";
import "./game-layout.css";
import "./experience-approach.css";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Software Engineer`,
    template: `%s · ${profile.name}`,
  },
  description: profile.hero.lede,
  metadataBase: new URL("https://chinonso-daniels-current.toyoski.chatgpt.site"),
  openGraph: {
    title: `${profile.name} — Software Engineer`,
    description: profile.hero.lede,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Software Engineer`,
    description: profile.hero.lede,
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Chinonso Daniels",
    "Software Engineer",
    "Fullstack",
    "React",
    "TypeScript",
    "FastAPI",
    "IoT",
    "SaaS",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  url: profile.links.portfolio,
  sameAs: [profile.links.github, profile.links.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "try{var t=localStorage.getItem('cd-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full font-sans">
        {children}
      </body>
    </html>
  );
}
