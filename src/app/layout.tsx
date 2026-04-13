import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Naturel Shop - Premium Natural Products',
  description: 'Shop organic, natural, and eco-friendly products for a healthier lifestyle.',
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
