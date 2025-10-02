
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "MDX Vendas",
  description: "Site de Vendas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body >
        <Header />
        {children}
      </body>
    </html>
  );
}
