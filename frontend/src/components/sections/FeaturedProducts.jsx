import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import ProductCard from "@/components/shared/ProductCard";
import SectionHeading from "@/components/shared/SectionHeading";

export default function FeaturedProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products", { params: { featured: true } })
      .then((res) => setItems(res.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-y bg-white border-t border-b border-[#E7E7E7]" data-testid="featured-products-section">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="Топ-підбори"
            title="Продукти, що замовляють найчастіше"
            subtitle="Працюючі рішення під Sprinter, Crafter, Transit та вантажні авто — в наявності або під замовлення."
          />
          <Link
            to="/catalog"
            className="hidden sm:inline-flex items-center gap-2 px-5 h-11 rounded-[14px] text-sm font-medium bg-[#111111] text-white hover:bg-[#2A2A2A]"
            data-testid="featured-view-all-button"
          >
            Усі товари <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6" data-testid="featured-products-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="surface-card h-[400px] sm:h-[460px] animate-pulse" />
              ))
            : items.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center gap-2 px-4 h-12 w-full rounded-[16px] text-sm font-medium bg-[#111111] text-white"
          >
            Усі товари <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
