
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

const SITE_URL = 'https://www.upak.space';

const criticalFallbackCss = `
  .upak-landing{min-height:100vh;background:#111827;color:#fff;font-family:Inter,Arial,sans-serif}
  .upak-landing *{box-sizing:border-box}
  .upak-landing header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(17,24,39,.95);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.08)}
  .upak-landing header>div,.upak-landing section>div,.upak-landing footer>div{max-width:72rem;margin:0 auto;padding-left:1rem;padding-right:1rem}
  .upak-landing header>div>div{height:4rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
  .upak-landing nav{display:flex;align-items:center;gap:1.25rem}
  .upak-landing a{color:#93c5fd;text-decoration:none}
  .upak-landing a:hover{color:#fff}
  .upak-landing button,.upak-landing [role=button]{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:.5rem;border:1px solid rgba(96,165,250,.55);background:#2563eb;color:#fff;padding:.75rem 1rem;font-weight:700;line-height:1.1;cursor:pointer}
  .upak-landing button:hover,.upak-landing [role=button]:hover{background:#3b82f6}
  .upak-landing .pt-16{padding-top:4rem}
  .upak-landing section{position:relative;padding:5rem 0}
  .upak-landing section:first-of-type{min-height:calc(100vh - 4rem);display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle at 28% 20%,rgba(37,99,235,.35),transparent 32%),radial-gradient(circle at 78% 70%,rgba(147,51,234,.25),transparent 36%),#111827;text-align:center}
  .upak-landing h1{font-size:clamp(2.5rem,6vw,4.75rem);line-height:1.05;margin:0 auto 1.5rem;font-weight:900;max-width:58rem}
  .upak-landing h2{font-size:clamp(2rem,4vw,3rem);line-height:1.1;margin:0 0 1rem;font-weight:900;text-align:center}
  .upak-landing h3{font-size:1.35rem;margin:0 0 .75rem;font-weight:800}
  .upak-landing p{font-size:1rem;line-height:1.7;color:#d1d5db}
  .upak-landing h1 span:last-child,.upak-landing h2 span:last-child,.upak-landing .text-gradient{background:linear-gradient(90deg,#60a5fa,#c084fc);-webkit-background-clip:text;background-clip:text;color:transparent}
  .upak-landing .grid{display:grid;gap:1.5rem}
  .upak-landing .rounded-xl,.upak-landing .rounded-2xl{border-radius:1rem}
  .upak-landing .bg-gray-800,.upak-landing .bg-gray-900{background:#1f2937}
  .upak-landing .border,.upak-landing [class*=border-gray]{border:1px solid rgba(75,85,99,.95)}
  .upak-landing [class*=shadow]{box-shadow:0 22px 55px rgba(37,99,235,.12)}
  .upak-landing img{max-width:100%;display:block}
  .upak-landing ul{padding-left:0;list-style:none}
  .upak-landing li{margin:.5rem 0}
  .upak-landing footer{background:#1f2937;border-top:1px solid rgba(255,255,255,.08);padding:3rem 0}
  @media (max-width:768px){.upak-landing nav{display:none}.upak-landing header button{padding:.55rem .75rem;font-size:.85rem}.upak-landing section{padding:3.5rem 0}.upak-landing .grid{grid-template-columns:1fr!important}}
  @media (min-width:768px){.upak-landing .md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.upak-landing .md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}
  @media (min-width:1024px){.upak-landing .lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.upak-landing .lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}
`;

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
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalFallbackCss }} />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
