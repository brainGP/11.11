import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: '11.11 · Чамдаа зориулсан 11 бяцхан сюрприз',
  description: 'Бидний 282 хоногийн дурсамжаас. Нэг хайрцаг дүүрэн хайр.',
  openGraph: {
    title: 'Чамдаа зориулсан 11 бяцхан сюрприз ♡',
    description: 'Бидний 282 хоногийн дурсамжаас. Нэг хайрцаг дүүрэн хайр.',
    locale: 'mn_MN',
    siteName: '11.11 · Pepero Day',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Чамдаа зориулсан 11 бяцхан сюрприз ♡', description: 'Нэг хайрцаг дүүрэн хайр.' },
};
export const viewport: Viewport = { themeColor: '#f5efdf', width: 'device-width', initialScale: 1, viewportFit: 'cover' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
