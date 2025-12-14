import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vigneshwaran B | Portfolio',
  description: 'Software Engineer Portfolio - Engineering, OS, GPU, AI',
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

