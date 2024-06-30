import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import metadata from "@/app/metadata";
import HiddenNavBar from "@/components/hidden_navbar/HiddenNavBar";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import HiddenFooter from "@/components/hidden_footer/HiddenFooter";
import GloboChat from "@/components/GloboChat/GloboChat";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <title>{String(metadata.title) || "Título por defecto"}</title>
        <meta name="description" content={String(metadata.description) || "Descripción por defecto"} />
      </head>
      <body className={inter.className}>
        <HiddenNavBar>
          <Navbar />
        </HiddenNavBar>
        {children}
        <HiddenFooter>
          <Footer username={null} />
        </HiddenFooter>
        <GloboChat />
      </body>
    </html>
  );
}
