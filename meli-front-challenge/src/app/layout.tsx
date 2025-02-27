import type { Metadata } from "next";
import "./globals.scss";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "Mercado Libre",
  description:
    "Comprá productos con Envío Gratis en el día en Mercado Libre Argentina. Encontrá miles de marcas y productos a precios increíbles.",
  openGraph: {
    title: "Mercado Libre",
    description:
      "Comprá productos con Envío Gratis en el día en Mercado Libre Argentina. Encontrá miles de marcas y productos a precios increíbles.",
    images:
      "https://http2.mlstatic.com/static/org-img/homesnw/mercado-libre.png",
    url: "http:localhost:3000/",
  },
  twitter: {
    title: "Mercado Libre",
    description:
      "Comprá productos con Envío Gratis en el día en Mercado Libre Argentina. Encontrá miles de marcas y productos a precios increíbles.",
    images:
      "https://http2.mlstatic.com/static/org-img/homesnw/mercado-libre.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SearchBar />
        {children}
      </body>
    </html>
  );
}
