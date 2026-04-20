import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import CategoryCard from "@/components/shared/CategoryCard";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Categories() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/categories").then((res) => setItems(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <section id="categories" className="section-y" data-testid="categories-section">
      <div className="container-page">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading
            eyebrow="Категорії"
            title="Вузька спеціалізація — від подушки до повного комплекту"
            subtitle="Пневмоподушки, комплекти пневмопідвіски, компресори та все, що потрібно для монтажу."
          />
          <Link
            to="/catalog"
            className="hidden lg:inline-flex items-center gap-2 h-11 px-5 rounded-[14px] text-sm font-medium bg-white border border-[#E7E7E7] text-[#111111] hover:bg-[#F1F1EF]"
          >
            Весь каталог <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="surface-card h-80 animate-pulse" />
              ))
            : items.map((cat, i) => <CategoryCard key={cat.slug} category={cat} />)}
        </div>
      </div>
    </section>
  );
}
