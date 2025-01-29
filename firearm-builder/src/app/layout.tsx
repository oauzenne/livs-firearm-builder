import "./globals.css";
import { BuilderProvider } from "@/context/BuilderContext";

export const metadata = {
  title: "My App",
  description: "A modern app with cursive font",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Playwrite+IN:wght@100..400&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <BuilderProvider>{children}</BuilderProvider>
      </body>
    </html>
  );
}
