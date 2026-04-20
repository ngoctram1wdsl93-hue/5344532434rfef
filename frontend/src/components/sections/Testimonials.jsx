import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Олексій",
    city: "Київ",
    car: "Mercedes Sprinter",
    text: "Поставили на Sprinter — перестав просідати повністю. Їжджу з вантажем щодня, машина поводиться як порожня. Рекомендую.",
    rating: 5,
  },
  {
    name: "Володимир",
    city: "Львів",
    car: "VW Crafter",
    text: "Замовляв повний комплект під Crafter. Встановили за 1 день, відчутна різниця одразу — авто тримає рівень навіть при повному завантаженні.",
    rating: 5,
  },
  {
    name: "Андрій",
    city: "Одеса",
    car: "Ford Transit",
    text: "Хлопці підібрали під мою задачу, а не «на щось схоже». Пояснили все простими словами, без впарювання. Працює бездоганно.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-y-sm bg-[#F7F7F5]" data-testid="testimonials-section">
      <div className="container-page">
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E7E7E7] text-[#111111] text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5">
            <Star className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
            Відгуки клієнтів
          </div>
          <h2 className="mt-4 font-heading font-semibold text-[#111111] text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-tight">
            Реальні власники. Реальні результати.
          </h2>
          <p className="mt-3 text-[15px] sm:text-base text-[#555555] max-w-xl leading-relaxed">
            Ось що кажуть ті, хто вже їздить на нашій пневмопідвісці
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[24px] bg-white border border-[#E7E7E7] p-7 flex flex-col"
              data-testid={`testimonial-card-${i}`}
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-[#F1F1EF]" strokeWidth={1} />

              <div className="flex items-center gap-0.5">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              <p className="mt-4 text-[15px] text-[#1A1A1A] leading-[1.6] flex-1">
                «{r.text}»
              </p>

              <div className="mt-6 pt-5 border-t border-[#F1F1EF] flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#111111] text-white grid place-items-center font-heading font-semibold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-semibold text-[#111111] text-[14px] leading-tight">
                    {r.name}, {r.city}
                  </div>
                  <div className="text-[12px] text-[#666666] mt-0.5 truncate">{r.car}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
