'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PilotTermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-6 text-4xl font-bold">Условия пилотного заказа</h1>
        <div className="space-y-6 text-muted-foreground">
          <p>
            UPAK сейчас используется для ограниченного коммерческого пилота. Платный заказ оформляется только после
            согласования задачи, количества SKU, состава результата, срока и стоимости.
          </p>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Что входит в результат</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>структура карточки товара для выбранной площадки;</li>
              <li>название, описание, преимущества и характеристики на основе исходных данных;</li>
              <li>список рисковых или неподтвержденных формулировок;</li>
              <li>визуальное ТЗ для фото или инфографики;</li>
              <li>экспорт в согласованном формате, если он входит в пакет.</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Чего UPAK не обещает</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>рост продаж, позиции в поиске или попадание в топ;</li>
              <li>автоматическую загрузку карточек в кабинет маркетплейса;</li>
              <li>проверку юридических ограничений категории вместо клиента;</li>
              <li>дизайн инфографики, если он отдельно не согласован.</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Переделки и возвраты</h2>
            <p>
              Если результат технически не соответствует согласованному составу, он дорабатывается бесплатно.
              Возврат или частичная компенсация обсуждаются индивидуально до оплаты и фиксируются в условиях конкретного заказа.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Контакты</h2>
            <p>
              Для согласования пилота: <a className="text-blue-600 underline" href="mailto:info@upak.space">info@upak.space</a>
              {' '}или Telegram SellEasyBot.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
