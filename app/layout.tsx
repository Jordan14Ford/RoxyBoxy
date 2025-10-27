import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cash App Currency Coach',
  description:
    'Get real-time currency conversions and friendly travel finance tips from the Cash App Currency Coach.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-light-bg text-text-primary">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-sm py-lg md:px-lg">
          {children}
        </div>
      </body>
    </html>
  );
}
