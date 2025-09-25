
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'UPAK - Продающие карточки для маркетплейсов с помощью AI',
  description: 'Создавайте профессиональные карточки товаров для Wildberries, Ozon и других маркетплейсов за минуты. AI-генерация контента, обработка изображений, готовые файлы для загрузки.',
  keywords: 'карточки товаров, маркетплейсы, Wildberries, Ozon, AI генерация, продажи',
  authors: [{ name: 'UPAK Team' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'UPAK - Продающие карточки для маркетплейсов',
    description: 'Один клик и твоя карточка готова!',
    type: 'website',
    locale: 'ru_RU',
    url: 'https://upak.space',
    siteName: 'UPAK',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'UPAK Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UPAK - Продающие карточки для маркетплейсов',
    description: 'Один клик и твоя карточка готова!',
    images: ['/android-chrome-512x512.png'],
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
