import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { imageUrl } from "@/lib/utils";

const CASES = [
  {
    title: "Mercedes Sprinter",
    desc: "Посилення задньої осі, під комерційний кузов",
    img: "/api/photos/IMG_7327.JPG",
    link: "/catalog?category=air-springs",
  },
  {
    title: "VW Crafter",
    desc: "Повні комплекти з електрокеруванням",
    img: "/api/photos/IMG_7334.JPG",
    link: "/catalog?category=air-suspension",
  },
  {
    title: "Ford Transit",
    desc: "Балонні подушки всередину пружини",
    img: "/api/photos/IMG_7330.JPG",
    link: "/catalog?category=air-springs",
  },
  {
    title: "Вантажні авто",
    desc: "Посилена пневмопідвіска до 7.5 т",
    img: "/api/photos/IMG_7352.JPG",
    link: "/catalog?category=air-suspension",
  },
  {
    title: "Причепи",
    desc: "Рівна площадка під вантаж",
    img: "/api/photos/IMG_7356.JPG",
    link: "/catalog?category=air-suspension",
  },
  {
    title: "Спецтехніка",
    desc: "Індивідуальні інженерні рішення",
    img: "/api/photos/IMG_7355.JPG",
    link: "/catalog?category=custom-solutions",
  },
];

export default function UseCases() {
  return (
    <section className="section-y" data-testid="use-cases-section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Для кого"
          title="Рішення під комерційний транспорт"
          subtitle="Sprinter, Crafter, Transit, вантажні авто, причепи, спецтехніка — підбираємо робочий комплект під вашу задачу."
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {CASES.map((c) => (
            <Link
              to={c.link}
              key={c.title}
              className="group surface-card overflow-hidden soft-lift"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#F1F1EF]">
                <img src={imageUrl(c.img)} alt={c.title} className="w-full h-full object-cover img-neutral transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
              </div>
              <div className="p-4 sm:p-5 flex items-start justify-between gap-3 sm:gap-4">
                <div className="min-w-0">
                  <h3 className="font-heading font-semibold text-[16px] sm:text-[17px] text-[#111111] tracking-tight">{c.title}</h3>
                  <p className="mt-1 text-[13px] sm:text-sm text-[#666666]">{c.desc}</p>
                </div>
                <span className="h-9 w-9 shrink-0 rounded-full bg-[#F1F1EF] grid place-items-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
