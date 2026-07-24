'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PilotTermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-6 text-4xl font-bold">Условия заказа UPAK под ключ</h1>
        <div className="space-y-6 text-muted-foreground">
          <p>
            UPAK используется для подготовки карточек товаров под ключ в управляемом режиме. Платный заказ оформляется
            только после согласования задачи, исходных фото, количества SKU, состава результата, срока и стоимости.
          </p>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Что входит в результат</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>структура карточки товара для выбранной площадки;</li>
              <li>название, описание, преимущества и характеристики на основе исходных данных;</li>
              <li>список рисковых или неподтвержденных формулировок;</li>
              <li>обработка фото или визуальное ТЗ для фото/инфографики, если это входит в тариф;</li>
              <li>PDF для согласования, ZIP с изображениями и CSV/XLSX для работы, если это согласовано;</li>
              <li>экспорт в согласованном формате, если он входит в пакет.</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Фото и AI-обработка</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>клиент подтверждает, что имеет право передавать фото и товарные материалы в работу;</li>
              <li>UPAK может улучшать фон, свет, кадр и визуальную подачу, но не должен менять реальные свойства товара;</li>
              <li>сложная инфографика, ретушь, фотомонтаж или съемка согласуются отдельно;</li>
              <li>если исходные фото технически слабые, результат может быть ограничен рекомендациями или ТЗ дизайнеру.</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Чего UPAK не обещает</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>рост продаж, позиции в поиске или попадание в топ;</li>
              <li>автоматическую загрузку карточек в кабинет маркетплейса, если это отдельно не согласовано;</li>
              <li>проверку юридических ограничений категории вместо клиента;</li>
              <li>прохождение модерации маркетплейса при неверных исходных данных или отсутствии обязательных документов.</li>
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
