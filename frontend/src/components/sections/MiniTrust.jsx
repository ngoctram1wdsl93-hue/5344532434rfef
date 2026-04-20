import { Truck, Users, Zap } from "lucide-react";

const POINTS = [
  { icon: Truck, text: "Працюємо з комерційним транспортом щодня — від мікроавтобусів до вантажівок" },
  { icon: Users, text: "Нам довіряють водії та власники авто по всій Україні" },
  { icon: Zap, text: "Підбираємо під ваше навантаження, а не «аби щось продати»" },
];

// Simple deterministic "live counter" — varies mildly by day
function todaysCount() {
  const d = new Date();
  const seed = d.getFullYear() * 400 + (d.getMonth() + 1) * 31 + d.getDate();
  // range 6..14
  return 6 + (seed % 9);
}

export default function MiniTrust() {
  const count = todaysCount();
  return (
    <section className="bg-white border-y border-[#E7E7E7]" data-testid="mini-trust-strip">
      <div className="container-page py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
          {/* Live counter */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-[#F7F7F5] border border-[#E7E7E7] px-4 py-2 shrink-0" data-testid="live-counter">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#16A34A]/50 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A]" />
            </span>
            <span className="text-[13px] text-[#111111] font-semibold">
              Сьогодні вже <span className="font-heading">{count}</span> підборів
            </span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 flex-1">
            {POINTS.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 h-9 w-9 rounded-[10px] bg-[#F1F1EF] border border-[#E7E7E7] grid place-items-center">
                  <p.icon className="h-4 w-4 text-[#111111]" strokeWidth={1.75} />
                </span>
                <span className="text-[13px] sm:text-[14px] text-[#1A1A1A] leading-snug font-medium">
                  {p.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
