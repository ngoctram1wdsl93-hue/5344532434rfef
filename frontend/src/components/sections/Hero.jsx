import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Send,
  Factory,
  Truck,
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

// Trust strip — 4 точки, сильні аргументи, без "вся Україна"
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
      {/* decorative hairlines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E7E7E7] to-transparent" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-[#EDEDE9] blur-3xl opacity-50" />

      <div className="container-page relative pt-12 sm:pt-16 lg:pt-24 pb-20 sm:pb-24 lg:pb-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-start"
        >
          {/* LEFT: Copy */}
          <div>
            {/* Dark trust badge — "10+ років виробництва..." */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-[#111111] text-white text-[12px] font-semibold tracking-[0.02em]"
              data-testid="hero-trust-badge"
            >
              <Factory className="h-3.5 w-3.5" strokeWidth={2} />
              10+ років виробництва пневмопідвіски в Україні
            </motion.div>

            {/* Second micro-line */}
            <motion.div variants={item} className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-[#444444] font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#16A34A]/50 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
              </span>
              Один із перших виробників пневмопідвіски в Україні
            </motion.div>

            <motion.h1
              variants={item}
              className="display-heading hero-heading-shadow text-[46px] leading-[0.97] sm:text-[62px] lg:text-[84px] mt-7"
              data-testid="hero-title"
            >
              Підсилена <span className="text-[#5C5C5C]">пневмопідвіска</span>
              <br />під ваше авто
            </motion.h1>

            {/* Sharper, shorter subheadline — final cut */}
            <motion.p
              variants={item}
              className="mt-7 text-[19px] sm:text-[22px] text-[#1A1A1A] max-w-xl leading-[1.4] font-medium"
            >
              <strong className="font-semibold text-[#111111]">Не просідає навіть коли авто повністю завантажене.</strong>
            </motion.p>
            <motion.p
              variants={item}
              className="mt-3 text-[15px] sm:text-[16px] text-[#555555] max-w-xl leading-[1.55]"
            >
              Підбираємо під Sprinter, Crafter, Transit та вантажні авто — під вашу вагу, а не «як у всіх».
            </motion.p>

            {/* Vehicle chips with prefix */}
            <motion.div variants={item} className="mt-8" data-testid="hero-vehicles-strip">
              <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#666666] mb-2.5">
                Працюємо з
              </div>
              <div className="flex flex-wrap gap-1.5">
                {VEHICLES.map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-white border border-[#E7E7E7] text-[12px] font-medium text-[#111111]"
                  >
                    <Circle className="h-1.5 w-1.5 fill-[#111111] text-[#111111]" />
                    {v}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={telegramUrl(settings)}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 h-[68px] px-9 rounded-[20px] text-[17px] font-semibold bg-[#111111] text-white hover:bg-[#000000] transition-colors cta-lift"
                data-testid="hero-primary-cta"
              >
                <span>Підібрати під авто</span>
                <span className="h-9 w-9 rounded-full bg-white text-[#111111] grid place-items-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
              <a
                href={telegramUrl(settings)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-[68px] px-6 rounded-[20px] text-base font-medium bg-white text-[#111111] border border-[#E7E7E7] hover:bg-[#F1F1EF] transition-colors"
                data-testid="hero-telegram-button"
              >
                <Send className="h-4 w-4" /> Telegram
              </a>
            </motion.div>

            {/* Microcopy under CTA */}
            <motion.div variants={item} className="mt-4 flex items-center gap-2 text-[13px] text-[#555555]">
              <Check className="h-4 w-4 text-[#16A34A]" strokeWidth={2.2} />
              <span>Безкоштовний підбір за 15 хвилин</span>
            </motion.div>

            {/* 3-check row — Безкоштовно · Швидко · Без "впарювання" */}
            <motion.div variants={item} className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-[#2A2A2A]">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.6} />
                Безкоштовно
              </span>
              <span className="text-[#C7C7C7]">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.6} />
                Швидко
              </span>
              <span className="text-[#C7C7C7]">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.6} />
                Без «впарювання»
              </span>
            </motion.div>

            <motion.div variants={item} className="mt-1.5">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#111111] hover:underline underline-offset-4 decoration-[#111111]/30"
                data-testid="hero-catalog-button"
              >
                Переглянути каталог <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Trust row - reworked: 1000+ / 10+ років / Власне / ~1 год */}
            <motion.ul variants={item} className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-[20px] overflow-hidden border border-[#E7E7E7] bg-[#E7E7E7]">
              {TRUST.map((t) => (
                <li
                  key={t.label}
                  className="bg-white p-5 flex flex-col justify-between min-h-[112px]"
                >
                  <t.icon className="h-4 w-4 text-[#111111]" strokeWidth={1.75} />
                  <div>
                    <div className="font-heading font-semibold text-[#111111] text-[22px] leading-[1] tracking-tight whitespace-nowrap">
                      {t.value}
                    </div>
                    <div className="text-[12px] text-[#666666] mt-1.5 leading-snug">{t.label}</div>
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
            className="relative"
          >
            {/* Main photo — REAL close-up */}
            <div className="relative rounded-[28px] overflow-hidden bg-[#111111] border border-[#E7E7E7] aspect-[4/5] lg:aspect-[5/6]">
              <img
                src={imageUrl("/api/photos/IMG_7339.JPG")}
                alt="Пневмоподушка власного виробництва — крупним планом"
                className="w-full h-full object-cover img-neutral"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

              {/* Top-left metric chip */}
              <div className="absolute top-5 left-5 rounded-full bg-white/95 backdrop-blur-sm border border-white pl-3 pr-4 py-2 flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} />
                <span className="text-[12px] font-semibold text-[#111111] tracking-tight">Власне виробництво</span>
              </div>

              {/* Top-right badge */}
              <div className="absolute top-5 right-5 rounded-full bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-1.5">
                2026
              </div>
            </div>

            {/* Overlap product card (editorial pop) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -left-4 sm:-left-6 lg:-left-10 w-[74%] sm:w-[62%] rounded-[22px] bg-white border border-[#E7E7E7] p-4 sm:p-5 shadow-[0_20px_50px_rgba(17,17,17,0.12)] hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 rounded-[14px] bg-[#F1F1EF] grid place-items-center overflow-hidden">
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
                  <div className="font-heading font-semibold text-[#111111] text-[15px] tracking-tight leading-snug truncate">
                    Mercedes Sprinter
                  </div>
                  <div className="text-[12px] text-[#666666] mt-0.5">Пневмоподушки + комплект</div>
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

            {/* Floating numeric card (right-bottom) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 -right-3 sm:-right-5 rounded-[20px] bg-[#111111] text-white px-5 py-4 shadow-[0_20px_50px_rgba(17,17,17,0.3)] hidden sm:block"
            >
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#A1A1A1] font-semibold">Гарантія</div>
              <div className="font-heading font-semibold text-2xl tracking-tight leading-none mt-1">до 24 міс</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="hairline" />
    </section>
  );
}
