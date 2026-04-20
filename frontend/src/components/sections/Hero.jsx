import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Factory,
  Check,
  Users,
  Package,
  Wrench,
  ShieldCheck,
} from "lucide-react";
import { useSettings } from "@/lib/settings-context";
import { telegramUrl } from "@/lib/cta";
import { imageUrl } from "@/lib/utils";

// Production-first hero: brand of manufacturer, not product seller
const TRUST = [
  { icon: Factory, value: "10+", label: "років виробництва" },
  { icon: Package, value: "1000+", label: "встановлених комплектів" },
  { icon: ShieldCheck, value: "Власне", label: "виробництво" },
  { icon: Wrench, value: "Підбір", label: "під задачу" },
];

// Production collage images
const COLLAGE = [
  { src: "/api/photos/IMG_7347.JPG", label: "Виробництво", tall: true },
  { src: "/api/photos/IMG_7339.JPG", label: "Продукція" },
  { src: "/api/photos/IMG_7327.JPG", label: "Монтаж" },
  { src: "/api/photos/IMG_7334.JPG", label: "Комплект" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section
      id="production"
      className="relative overflow-hidden hero-bg scroll-mt-20 panel-lg"
      data-testid="hero-section"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E7E7E7] to-transparent" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-[360px] w-[360px] sm:h-[520px] sm:w-[520px] rounded-full bg-[#EDEDE9] blur-3xl opacity-50" />

      <div className="container-page relative pt-8 sm:pt-12 lg:pt-16 pb-14 sm:pb-20 lg:pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid xl:grid-cols-[1.1fr_1fr] gap-8 sm:gap-10 xl:gap-14 items-center"
        >
          {/* LEFT: Manufacturer story */}
          <div className="min-w-0">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 bg-[#111111] text-white text-[11px] sm:text-[12px] font-semibold tracking-[0.02em]"
              data-testid="hero-trust-badge"
            >
              <Factory className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" strokeWidth={2} />
              <span className="truncate">Виробник пневмопідвіски в Україні</span>
            </motion.div>

            <motion.div variants={item} className="mt-3 flex items-center gap-1.5 text-[11px] sm:text-[12px] text-[#444444] font-medium">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#16A34A]/50 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
              </span>
              <span>Одне із перших виробництв пневмопідвіски в українській індустрії</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="display-heading hero-heading-shadow text-[30px] leading-[1.05] sm:text-[44px] md:text-[54px] lg:text-[60px] xl:text-[68px] 2xl:text-[82px] xl:leading-[0.98] mt-5 sm:mt-7 [text-wrap:balance] [overflow-wrap:normal] [word-break:keep-all] [hyphens:none]"
              data-testid="hero-title"
            >
              Виробництво <span className="text-[#5C5C5C]">пневмопідвіски</span> в Україні
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 sm:mt-7 text-[15px] sm:text-[18px] lg:text-[19px] text-[#1A1A1A] max-w-xl leading-[1.5] font-medium"
            >
              <strong className="font-semibold text-[#111111]">10+ років виготовляємо</strong> пневмоподушки та комплекти під реальні задачі комерційного транспорту: Sprinter, Crafter, Transit, вантажні авто та причепи.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white border border-[#E7E7E7] px-3 py-1.5 text-[12px] sm:text-[13px] font-semibold text-[#111111]"
            >
              <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.6} />
              Не просідає навіть при повному завантаженні
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/catalog"
                className="group relative inline-flex items-center justify-center gap-3 h-14 sm:h-[62px] px-6 sm:px-8 rounded-[16px] sm:rounded-[18px] text-[14px] sm:text-[16px] font-semibold bg-[#111111] text-white hover:bg-[#000000] transition-colors cta-lift w-full sm:w-auto"
                data-testid="hero-primary-cta"
              >
                <span>Переглянути рішення</span>
                <span className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white text-[#111111] grid place-items-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <a
                href={telegramUrl(settings)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-14 sm:h-[62px] px-6 rounded-[16px] sm:rounded-[18px] text-[14px] sm:text-[15px] font-medium bg-white text-[#111111] border border-[#E7E7E7] hover:bg-[#F1F1EF] transition-colors"
                data-testid="hero-telegram-button"
              >
                Підібрати під авто
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.ul variants={item} className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-[18px] sm:rounded-[20px] overflow-hidden border border-[#E7E7E7] bg-[#E7E7E7]">
              {TRUST.map((t) => (
                <li key={t.label} className="bg-white p-4 sm:p-5 flex flex-col gap-2 sm:gap-3 min-h-[96px] sm:min-h-[112px]">
                  <t.icon className="h-4 w-4 text-[#111111]" strokeWidth={1.75} />
                  <div className="min-w-0 mt-auto">
                    <div className="font-heading font-semibold text-[#111111] text-[18px] sm:text-[22px] leading-[1] tracking-tight whitespace-nowrap">
                      {t.value}
                    </div>
                    <div className="text-[11px] sm:text-[12px] text-[#666666] mt-1 sm:mt-1.5 leading-snug">{t.label}</div>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT: Production collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative order-first xl:order-last"
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3 auto-rows-[120px] sm:auto-rows-[160px] lg:auto-rows-[200px] xl:auto-rows-[180px]">
              {COLLAGE.map((img, i) => (
                <div
                  key={i}
                  className={`relative rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#111111] border border-[#E7E7E7] ${
                    img.tall ? "row-span-2" : ""
                  }`}
                >
                  <img
                    src={imageUrl(img.src)}
                    alt={img.label}
                    className="w-full h-full object-cover img-neutral"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                  <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 border border-white px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-[#111111]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#111111]" />
                    {img.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Scale badge — only on xl */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 rounded-[16px] sm:rounded-[20px] bg-[#111111] text-white px-4 sm:px-5 py-3 sm:py-4 shadow-[0_20px_50px_rgba(17,17,17,0.3)] hidden xl:block">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#A1A1A1]" strokeWidth={1.75} />
                <div className="text-[10px] uppercase tracking-[0.12em] text-[#A1A1A1] font-semibold">B2B · B2C · СТО</div>
              </div>
              <div className="font-heading font-semibold text-[15px] sm:text-base tracking-tight leading-tight mt-1.5 max-w-[180px]">
                Комерційний транспорт — щодня
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="hairline" />
    </section>
  );
}
