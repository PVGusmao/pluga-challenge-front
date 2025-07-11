import type { Metadata } from "next";
import "./globals.css";
import { MainProvider } from "@/contexts/main-context";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Pluga Challenge Front",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <MainProvider>
          <Header />

          {children}
        </MainProvider>
      </body>
    </html>
  );
}
