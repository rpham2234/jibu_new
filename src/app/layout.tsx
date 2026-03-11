'use client';

import { Montserrat } from "next/font/google";
import "./globals.css";
import Container from "@/components/container";

import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import Example from "@/components/header_new";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const noLayoutRoutes = ['/uganda', '/kenya', '/burundi', '/kenya', '/tanzania', '/zambia', '/rwanda', '/drc', '/ghana']; //this is layout for global site. We dont want this to apply to country sites.
  const hideLayout = noLayoutRoutes.some(route => pathname.startsWith(route));
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${montserrat.variable} bg-zinc-200 font-sans`}>
        <Container>
          {!hideLayout && <Example />}
          {children}
          {!hideLayout && <Footer />}
        </Container>
      </body>
    </html>
  );
}


