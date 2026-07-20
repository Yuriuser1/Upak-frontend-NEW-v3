
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

const SITE_URL = 'https://www.upak.space';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'UPAK - AI-карточки, фото-редактура и карточки под ключ для маркетплейсов',
  description: 'UPAK готовит карточки товаров для Wildberries, Ozon и других маркетплейсов: SEO-описание, преимущества, характеристики, фото-задачи, ручная проверка и формат под ключ.',
  keywords: 'карточки товаров, маркетплейсы, Wildberries, Ozon, AI генерация, фото товара, инфографика, карточка под ключ',
  authors: [{ name: 'UPAK Team' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'UPAK - карточки товаров, фото и визуал для маркетплейсов',
    description: 'AI-структура карточки, фото-редактура, ТЗ для визуала и ручная проверка.',
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    siteName: 'UPAK',
    images: [
      {
        url: `${SITE_URL}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: 'UPAK Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UPAK - карточки товаров, фото и визуал для маркетплейсов',
    description: 'AI-структура карточки, фото-редактура, ТЗ для визуала и ручная проверка.',
    images: [`${SITE_URL}/android-chrome-512x512.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
