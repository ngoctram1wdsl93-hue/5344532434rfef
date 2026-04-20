import { MessageSquare, Search, Boxes, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const STEPS = [
  { icon: MessageSquare, title: "Залишаєте заявку", desc: "У Telegram, WhatsApp або телефоном. Відповідаємо протягом години." },
  { icon: Search, title: "Уточнюємо задачу", desc: "Модель авто, задача, постійне навантаження, бюджет." },
  { icon: Boxes, title: "Підбираємо рішення", desc: "Комплект з наявності або індивідуальне виготовлення." },
  { icon: CheckCircle2, title: "Відправка / встановлення", desc: "Доставляємо або записуємо на монтаж у нашому сервісі." },
];

export default function HowItWorks() {
  return (
    <section className="section-y bg-[#111111] text-white" data-testid="how-it-works-section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Як ми працюємо"
          title="4 кроки від звернення до готового авто"
          subtitle="Процес прозорий — ви точно знаєте, що відбувається на кожному етапі."
          invert={true}
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5" data-testid="how-we-work-steps">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative rounded-[20px] sm:rounded-[24px] border border-[#2A2A2A] bg-[#1A1A1A] p-5 sm:p-7 hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-[12px] sm:rounded-[14px] bg-white text-[#111111] grid place-items-center">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="font-heading text-3xl sm:text-4xl font-semibold text-[#2A2A2A] leading-none tracking-tight">0{i + 1}</span>
              </div>
              <h3 className="mt-5 sm:mt-8 font-heading font-semibold text-[17px] sm:text-[19px] text-white tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[13px] sm:text-sm text-[#A1A1A1] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
