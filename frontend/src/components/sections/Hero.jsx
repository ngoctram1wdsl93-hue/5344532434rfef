import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Send,
  Factory,
  Clock,
  Circle,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useSettings } from "@/lib/settings-context";
import { telegramUrl } from "@/lib/cta";
import { imageUrl } from "@/lib/utils";

const VEHICLES = [
  "Sprinter",
  "Crafter",
  "Transit",
  "Вантажні авто",
  "Причепи",
  "Спецтехніка",
];

const TRUST = [
  { icon: Factory, value: "1000+", label: "встановлених комплектів" },
  { icon: ShieldCheck, value: "10+ років", label: "досвіду" },
  { icon: Sparkles, value: "Власне", label: "виробництво" },
  { icon: Clock, value: "~1 год", label: "середня відповідь" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section className="relative overflow-hidden hero-bg" data-testid="hero-section">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E7E7E7] to-transparent" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-[360px] w-[360px] sm:h-[520px] sm:w-[520px] rounded-full bg-[#EDEDE9] blur-3xl opacity-50" />

      <div className="container-page relative pt-8 sm:pt-12 lg:pt-20 pb-14 sm:pb-20 lg:pb-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-[1.15fr_1fr] gap-8 sm:gap-10 lg:gap-14 items-start"
        >
          {/* LEFT: Copy */}
          <div className="min-w-0">
            {/* Dark trust badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 bg-[#111111] text-white text-[11px] sm:text-[12px] font-semibold tracking-[0.02em]"
              data-testid="hero-trust-badge"
            >
              <Factory className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" strokeWidth={2} />
              <span className="truncate">10+ років виробництва пневмопідвіски в Україні</span>
            </motion.div>

            <motion.div variants={item} className="mt-3 flex items-center gap-1.5 text-[11px] sm:text-[12px] text-[#444444] font-medium">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#16A34A]/50 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
              </span>
              <span>Один із перших виробників пневмопідвіски в Україні</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="display-heading hero-heading-shadow text-[34px] leading-[1.02] sm:text-[50px] lg:text-[62px] xl:text-[76px] xl:leading-[0.98] mt-5 sm:mt-7 [hyphens:none] break-words"
              data-testid="hero-title"
            >
              Підсилена <span className="text-[#5C5C5C]">пневмопідвіска</span>
              <br className="hidden sm:block" /> <span className="sm:hidden"> </span>під ваше авто
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 sm:mt-7 text-[17px] sm:text-[20px] lg:text-[22px] text-[#1A1A1A] max-w-xl leading-[1.4] font-medium"
            >
              <strong className="font-semibold text-[#111111]">Не просідає навіть коли авто повністю завантажене.</strong>
            </motion.p>
            <motion.p
              variants={item}
              className="mt-3 text-[14px] sm:text-[16px] text-[#555555] max-w-xl leading-[1.55]"
            >
              Підбираємо під Sprinter, Crafter, Transit та вантажні авто — під вашу вагу, а не «як у всіх».
            </motion.p>

            {/* Vehicle chips */}
            <motion.div variants={item} className="mt-6 sm:mt-8" data-testid="hero-vehicles-strip">
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-semibold text-[#666666] mb-2 sm:mb-2.5">
                Працюємо з
              </div>
              <div className="flex flex-wrap gap-1.5">
                {VEHICLES.map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white border border-[#E7E7E7] text-[11px] sm:text-[12px] font-medium text-[#111111]"
                  >
                    <Circle className="h-1.5 w-1.5 fill-[#111111] text-[#111111]" />
                    {v}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={telegramUrl(settings)}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 h-14 sm:h-[68px] px-6 sm:px-9 rounded-[18px] sm:rounded-[20px] text-[15px] sm:text-[17px] font-semibold bg-[#111111] text-white hover:bg-[#000000] transition-colors cta-lift w-full sm:w-auto"
                data-testid="hero-primary-cta"
              >
                <span>Підібрати під авто</span>
                <span className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white text-[#111111] grid place-items-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
              <a
                href={telegramUrl(settings)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-14 sm:h-[68px] px-6 rounded-[18px] sm:rounded-[20px] text-sm sm:text-base font-medium bg-white text-[#111111] border border-[#E7E7E7] hover:bg-[#F1F1EF] transition-colors"
                data-testid="hero-telegram-button"
              >
                <Send className="h-4 w-4" /> Telegram
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-4 flex items-center gap-2 text-[12px] sm:text-[13px] text-[#555555]">
              <Check className="h-4 w-4 text-[#16A34A] shrink-0" strokeWidth={2.2} />
              <span>Безкоштовний підбір за 15 хвилин</span>
            </motion.div>

            <motion.div variants={item} className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] sm:text-[13px] font-medium text-[#2A2A2A]">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.6} /> Безкоштовно
              </span>
              <span className="text-[#C7C7C7]">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.6} /> Швидко
              </span>
              <span className="text-[#C7C7C7]">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.6} /> Без «впарювання»
              </span>
            </motion.div>

            <motion.div variants={item} className="mt-3">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#111111] hover:underline underline-offset-4 decoration-[#111111]/30"
                data-testid="hero-catalog-button"
              >
                Переглянути каталог <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.ul variants={item} className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-[18px] sm:rounded-[20px] overflow-hidden border border-[#E7E7E7] bg-[#E7E7E7]">
              {TRUST.map((t) => (
                <li
                  key={t.label}
                  className="bg-white p-4 sm:p-5 flex flex-col justify-between min-h-[96px] sm:min-h-[112px]"
                >
                  <t.icon className="h-4 w-4 text-[#111111]" strokeWidth={1.75} />
                  <div className="min-w-0">
                    <div className="font-heading font-semibold text-[#111111] text-[18px] sm:text-[22px] leading-[1] tracking-tight whitespace-nowrap">
                      {t.value}
                    </div>
                    <div className="text-[11px] sm:text-[12px] text-[#666666] mt-1 sm:mt-1.5 leading-snug">{t.label}</div>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT: Editorial composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#111111] border border-[#E7E7E7] aspect-[4/3] sm:aspect-[4/5] lg:aspect-[5/6]">
              <img
                src={imageUrl("/api/photos/IMG_7339.JPG")}
                alt="Пневмоподушка власного виробництва — крупним планом"
                className="w-full h-full object-cover img-neutral"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

              <div className="absolute top-4 sm:top-5 left-4 sm:left-5 rounded-full bg-white/95 backdrop-blur-sm border border-white pl-2.5 sm:pl-3 pr-3 sm:pr-4 py-1.5 sm:py-2 flex items-center gap-2">
                <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#16A34A]" strokeWidth={2.5} />
                <span className="text-[11px] sm:text-[12px] font-semibold text-[#111111] tracking-tight">Власне виробництво</span>
              </div>

              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 rounded-full bg-[#111111] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] px-2.5 sm:px-3 py-1 sm:py-1.5">
                2026
              </div>
            </div>

            {/* Overlap card (desktop/tablet only to avoid mobile clutter) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 -left-3 sm:-left-6 lg:-left-10 w-[78%] sm:w-[62%] rounded-[18px] sm:rounded-[22px] bg-white border border-[#E7E7E7] p-3 sm:p-5 shadow-[0_20px_50px_rgba(17,17,17,0.12)] hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-[12px] sm:rounded-[14px] bg-[#F1F1EF] grid place-items-center overflow-hidden">
                  <img
                    src={imageUrl("/api/photos/IMG_7327.JPG")}
                    alt="Встановлений комплект пневмопідвіски"
                    className="w-full h-full object-cover img-neutral"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[#666666]">
                    Популярний підбір
                  </div>
                  <div className="font-heading font-semibold text-[#111111] text-[14px] sm:text-[15px] tracking-tight leading-snug truncate">
                    Mercedes Sprinter
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-[#666666] mt-0.5 truncate">Пневмоподушки + комплект</div>
                </div>
              </div>
              <div className="hairline mt-3" />
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#111111]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" /> В наявності
                </span>
                <Link
                  to="/catalog/air-springs-sprinter"
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#111111] hover:underline underline-offset-4"
                >
                  Дивитись <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-4 -right-2 sm:-right-5 rounded-[16px] sm:rounded-[20px] bg-[#111111] text-white px-4 sm:px-5 py-3 sm:py-4 shadow-[0_20px_50px_rgba(17,17,17,0.3)] hidden sm:block"
            >
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#A1A1A1] font-semibold">Гарантія</div>
              <div className="font-heading font-semibold text-xl sm:text-2xl tracking-tight leading-none mt-1">до 24 міс</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="hairline" />
    </section>
  );
}
