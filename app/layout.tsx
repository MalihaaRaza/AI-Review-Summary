import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Review Summary",
  description: "Customer reviews powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}