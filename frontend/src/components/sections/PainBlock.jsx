import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { useSettings } from "@/lib/settings-context";
import { telegramUrl } from "@/lib/cta";

const PAINS = [
  "Машину «садить» на задню вісь при загрузці",
  "Керування і гальмування стають гіршими",
  "Швидше розбиваються пружини й амортизатори",
  "Ризик перевантаження, поломки, штрафів",
];

export default function PainBlock() {
  const { settings } = useSettings();

  return (
    <section className="section-y-sm bg-[#111111] text-white" data-testid="pain-block">
      <div className="container-page">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 sm:gap-10 lg:gap-14 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#2A0F0F] border border-[#5A1F1F] text-[#FCA5A5] text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
              Знайома ситуація
            </div>
            <h2 className="mt-4 sm:mt-5 font-heading font-semibold text-white text-[26px] sm:text-4xl lg:text-[44px] leading-[1.08] sm:leading-[1.05] tracking-tight">
              Авто просідає<br />під навантаженням?
            </h2>
            <ul className="mt-5 sm:mt-7 space-y-3">
              {PAINS.map((p) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3"
                >
                  <span className="shrink-0 h-6 w-6 rounded-full bg-[#2A0F0F] border border-[#5A1F1F] grid place-items-center mt-0.5">
                    <X className="h-3.5 w-3.5 text-[#EF4444]" strokeWidth={2.5} />
                  </span>
                  <span className="text-[14px] sm:text-[16px] text-[#E7E7E7] leading-snug">{p}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] sm:rounded-[24px] bg-white text-[#111111] p-5 sm:p-7 lg:p-9 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F1F1EF] text-[#111111] text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5">
              <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} />
              Ми вирішуємо це
            </div>
            <h3 className="mt-4 font-heading font-semibold text-[22px] sm:text-3xl leading-tight tracking-tight">
              Пневмопідвіска повертає авто висоту<br className="hidden sm:block" /> і тримає вагу
            </h3>
            <ul className="mt-4 sm:mt-5 space-y-2.5">
              {[
                "Авто не падає на зад — тримає рівень",
                "Машину не кидає і не кренить у поворотах",
                "Підвіска і шини живуть у 2–3 рази довше",
                "Їдете спокійно з повним кузовом",
              ].map((g) => (
                <li key={g} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-[#1A1A1A]">
                  <Check className="h-4 w-4 text-[#16A34A] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span>{g}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={telegramUrl(settings)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-6 rounded-[14px] sm:rounded-[16px] text-[14px] sm:text-[15px] font-semibold bg-[#111111] text-white hover:bg-[#000000] transition-colors cta-lift"
                data-testid="pain-block-cta"
              >
                Підібрати під авто <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-5 rounded-[14px] sm:rounded-[16px] text-[13px] sm:text-[14px] font-medium bg-[#F1F1EF] text-[#111111] border border-[#E7E7E7] hover:bg-[#E7E7E7] transition-colors"
              >
                Переглянути каталог
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-[11px] sm:text-[12px] text-[#555555] font-medium">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} /> Безкоштовний підбір</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} /> Відповідь за ~15 хв</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} /> По всій Україні</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
