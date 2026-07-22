'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-6 text-4xl font-bold">Политика обработки данных</h1>
        <div className="space-y-6 text-muted-foreground">
          <p>
            UPAK работает в пилотном режиме. Данные из формы preview используются только для подготовки примера карточки,
            связи по заявке и согласования пилотного заказа.
          </p>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Какие данные могут обрабатываться</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>описание товара и исходные данные по SKU;</li>
              <li>маркетплейс и требования к карточке;</li>
              <li>Telegram, email и иные контакты, которые пользователь указал сам;</li>
              <li>файлы и фото товара, если они переданы для пилота.</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Для чего используются данные</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>подготовка бесплатного preview;</li>
              <li>согласование состава результата и стоимости пилота;</li>
              <li>обратная связь по качеству результата;</li>
              <li>ручная обработка заказа, если пользователь согласовал платный пилот.</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Передача и хранение</h2>
            <p>
              Данные не продаются третьим лицам. Для работы могут использоваться технические сервисы сайта, API,
              Telegram и платежные инструменты, если пользователь переходит к платному заказу.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Удаление данных</h2>
            <p>
              Чтобы удалить заявку или уточнить состав данных, напишите на <a className="text-blue-600 underline" href="mailto:info@upak.space">info@upak.space</a>
              {' '}или в Telegram SellEasyBot.
            </p>
          </section>
          <section className="rounded-lg border bg-muted p-4">
            <h2 className="mb-2 text-xl font-semibold text-foreground">Важно</h2>
            <p>
              Реквизиты исполнителя, счет, чек, условия возврата и состав результата указываются до оплаты конкретного
              пилотного заказа. Массовые онлайн-продажи не запускаются до завершения юридической и технической подготовки.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
