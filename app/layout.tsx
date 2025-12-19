import type { Metadata } from 'next';
import { Providers } from './providers';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Milaknight - Task Manager',
  description: 'A lightweight task manager for individuals and teams. Plan, assign, and track progress in minutes.',
  keywords: ['task manager', 'productivity', 'team collaboration', 'Milaknight'],
  authors: [{ name: 'Milaknight' }],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [{ url: '/favicon.png' }],
  },
  openGraph: {
    title: 'Milaknight - Task Manager',
    description: 'A lightweight task manager for individuals and teams.',
    images: ['/favicon.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Milaknight - Task Manager',
    description: 'A lightweight task manager for individuals and teams.',
    images: ['/favicon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

