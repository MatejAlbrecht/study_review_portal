import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "All-in-one productivity app for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
