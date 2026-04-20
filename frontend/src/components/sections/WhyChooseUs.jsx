import { Factory, Target, Headphones, Truck, BadgePercent, Wrench } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const ITEMS = [
  {
    icon: Factory,
    title: "Виробляємо самі — без перепродажу",
    desc: "Контролюємо якість на кожному етапі та відповідаємо за результат. Жодних посередницьких націнок.",
  },
  {
    icon: Target,
    title: "Підбираємо під задачу, а не «як у всіх»",
    desc: "Враховуємо вагу, тип авто, сценарій використання та умови експлуатації.",
  },
  {
    icon: Headphones,
    title: "Пояснюємо простими словами",
    desc: "Без технічної «води». Допомагаємо обрати оптимальний варіант під ваш бюджет і задачу.",
  },
  {
    icon: Wrench,
    title: "Встановлюємо та консультуємо",
    desc: "Власний сервіс у Києві. Можемо встановити або дистанційно вести ваших майстрів при монтажі.",
  },
  {
    icon: Truck,
    title: "Швидка відправка по Україні",
    desc: "Товари в наявності — в день замовлення. Комплекти під авто — узгоджуємо чіткі строки виробництва.",
  },
  {
    icon: BadgePercent,
    title: "Працюємо з СТО та дилерами",
    desc: "Індивідуальні умови для партнерів: опт, знижки, техпідтримка, пробний прайс.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-y bg-[#F7F7F5]" data-testid="why-choose-us-section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Чому обирають нас"
          title="Шість причин довіряти нам пневмопідвіску"
          subtitle="Ми не просто продаємо — підбираємо рішення під навантаження, авто та реальні умови роботи."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ITEMS.map((item, i) => (
            <div key={item.title} className="surface-card p-7 soft-lift relative">
              <div className="absolute top-6 right-6 font-heading text-[12px] font-semibold text-[#B8B8B6] tracking-[0.1em]">
                0{i + 1}
              </div>
              <div className="h-12 w-12 rounded-[14px] bg-[#111111] text-white grid place-items-center">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-heading font-semibold text-[19px] text-[#111111] leading-snug tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm text-[#555555] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
