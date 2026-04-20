import { useEffect, useMemo, useState } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/utils";

// Caption → case-label mapping. Each image gets a category badge that reads as proof.
function classify(item) {
  const tag = (item.tag || "").toLowerCase();
  const cap = (item.caption || "").toLowerCase();
  if (tag.includes("виробництв") || cap.includes("крупним") || cap.includes("готових"))
    return { label: "Власне виробництво", tone: "dark" };
  if (cap.includes("встановленн") || tag.includes("монтаж") || tag.includes("сервіс"))
    return { label: "Після встановлення", tone: "green" };
  if (cap.includes("вантаж") || tag.includes("вантаж") || cap.includes("причеп"))
    return { label: "Під навантаженням", tone: "amber" };
  if (tag.includes("van") || cap.includes("фургон") || cap.includes("авто"))
    return { label: "На авто клієнта", tone: "green" };
  if (tag.includes("деталі") || cap.includes("шток") || cap.includes("кронштейн"))
    return { label: "Крупний план", tone: "dark" };
  if (tag.includes("комплект") || cap.includes("комплект"))
    return { label: "Готовий комплект", tone: "dark" };
  if (tag.includes("custom") || cap.includes("індивідуальне"))
    return { label: "Індивідуальне рішення", tone: "amber" };
  if (tag.includes("результат") || cap.includes("працює"))
    return { label: "Результат", tone: "green" };
  return { label: item.caption || "Наша робота", tone: "dark" };
}

const TONE_CLASS = {
  dark: "bg-[#111111] text-white",
  green: "bg-[#16A34A] text-white",
  amber: "bg-[#D97706] text-white",
};

const FALLBACK = [
  { image: "/api/photos/IMG_7327.JPG", caption: "Після встановлення на Sprinter", tag: "Монтаж" },
  { image: "/api/photos/IMG_7339.JPG", caption: "Пневмоподушка крупним планом", tag: "Виробництво" },
  { image: "/api/photos/IMG_7333.JPG", caption: "Комплект у задній восі", tag: "Монтаж" },
  { image: "/api/photos/IMG_7334.JPG", caption: "Повний комплект під авто", tag: "Комплект" },
  { image: "/api/photos/IMG_7352.JPG", caption: "Підсилення вантажної осі", tag: "Вантажні" },
  { image: "/api/photos/IMG_7347.JPG", caption: "Партія готових виробів", tag: "Виробництво" },
  { image: "/api/photos/IMG_7330.JPG", caption: "Фургон після установки", tag: "Van" },
  { image: "/api/photos/IMG_7337.JPG", caption: "Монтаж у сервісі", tag: "Сервіс" },
];

const TALL_INDICES = new Set([0, 3, 7]);

export default function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/gallery")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) setItems(res.data);
        else setItems(FALLBACK);
      })
      .catch(() => setItems(FALLBACK));
  }, []);

  const enriched = useMemo(() => items.map((it) => ({ ...it, _case: classify(it) })), [items]);

  return (
    <section className="section-y" data-testid="gallery-section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Реальні кейси"
          title="Робота, яка говорить сама за себе"
          subtitle="Від пневмоподушки на верстаті — до встановленого комплекту на авто клієнта. Усе — власного виробництва."
        />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[240px] gap-3 sm:gap-4">
          {enriched.map((img, i) => {
            const isTall = img.tall || TALL_INDICES.has(i);
            const toneClass = TONE_CLASS[img._case.tone] || TONE_CLASS.dark;
            return (
              <div
                key={img.id || img.image || i}
                className={`relative rounded-[20px] overflow-hidden border border-[#E7E7E7] bg-white group ${
                  isTall ? "row-span-2" : ""
                }`}
                data-testid="gallery-tile"
              >
                <img
                  src={imageUrl(img.image)}
                  alt={img.caption}
                  className="w-full h-full object-cover img-neutral transition-transform duration-700 group-hover:scale-[1.06]"
                  loading="lazy"
                />
                {/* Top-left case badge */}
                <span className={`absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${toneClass}`}>
                  {img._case.label}
                </span>
                {/* Bottom caption strip */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/15 to-transparent">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#111111] max-w-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#111111] shrink-0" />
                    <span className="truncate">{img.caption}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
