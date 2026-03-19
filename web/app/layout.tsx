import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Ciro Torres | Blog",
    template: "%s | Ciro Torres | Blog",
  },
  description:
    "Explorações sobre Engenharia de Software, Computação Gráfica e Ciência da Computação. Artigos técnicos sobre Java, Python, TS/JS, C#, além de tutoriais de Blender e Unity.",
  keywords: [
    "Programação",
    "Java",
    "Python",
    "TypeScript",
    "JavaScript",
    "C#",
    "Blender",
    "Unity",
    "Ciência da Computação",
    "Segurança da Informação",
    "Banco de Dados",
    "Redes",
    "Criptografia",
    "Desenvolvimento Web",
    "Game Dev",
  ],
  authors: [{ name: "Ciro Torres" }],
  creator: "Ciro Torres",
  metadataBase: new URL("https://cirobtorres.com.br"),
  openGraph: {
    title: "cirobtorres/blog",
    description:
      "Desenvolvimento de software, arte 3D e fundamentos de Ciência da Computação.",
    url: "https://cirobtorres.com.br",
    siteName: "cirobtorres/blog",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cirobtorres/blog",
    description: "Engenharia de Software e Computação Gráfica por Ciro Torres.",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
