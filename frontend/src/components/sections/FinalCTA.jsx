import { useState } from "react";
import { toast } from "sonner";
import { Send, MessageCircle, Phone, ArrowRight, Check } from "lucide-react";
import { api } from "@/lib/api";
import { useSettings } from "@/lib/settings-context";
import { telegramUrl, whatsappUrl, telUrl } from "@/lib/cta";

const GUARANTEES = [
  "Авто не просідає під навантаженням",
  "Машину не кидає і не кренить у поворотах",
  "Підбір під ваше авто, а не «як у всіх»",
  "Гарантія та підтримка після встановлення",
];

export default function FinalCTA() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Вкажіть ім'я та телефон");
      return;
    }
    setLoading(true);
    try {
      await api.post("/leads", form);
      toast.success("Заявка відправлена. Зв'яжемося найближчим часом.");
      setForm({ name: "", phone: "", message: "" });
    } catch (e) {
      toast.error("Помилка відправлення. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-y bg-[#F7F7F5]" data-testid="final-cta-section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[32px] bg-[#111111] text-white">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 p-8 sm:p-12 lg:p-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 text-white text-[11px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5">
                Підбір рішення
              </div>
              <h2 className="font-heading font-semibold text-white text-3xl sm:text-4xl lg:text-[50px] leading-[1.03] tracking-tight mt-5">
                Підберемо пневмопідвіску<br />під ваше авто та навантаження
              </h2>
              <p className="mt-5 text-[#BDBDBD] text-base sm:text-lg max-w-xl leading-relaxed">
                Опишіть авто та задачу — підкажемо оптимальний варіант по ціні, термінах та сумісності.
              </p>

              {/* Guarantees — "Що ви отримуєте" */}
              <div className="mt-8 rounded-[20px] bg-white/5 border border-white/10 p-5 sm:p-6">
                <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#A0A0A0]">Що ви отримуєте</div>
                <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {GUARANTEES.map((g) => (
                    <li key={g} className="flex items-start gap-2.5 text-[14px] text-white leading-snug">
                      <Check className="h-4 w-4 text-[#16A34A] mt-0.5 shrink-0" strokeWidth={2.5} />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <a
                  href={telegramUrl(settings)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-[14px] text-sm font-medium bg-white text-[#111111] hover:bg-[#F1F1EF] transition-colors"
                  data-testid="final-cta-telegram-button"
                >
                  <Send className="h-4 w-4" /> Telegram
                </a>
                <a
                  href={whatsappUrl(settings)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-[14px] text-sm font-medium bg-transparent text-white border border-white/30 hover:bg-white/10 transition-colors"
                  data-testid="final-cta-whatsapp-button"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                {settings?.phone ? (
                  <a
                    href={telUrl(settings)}
                    className="inline-flex items-center gap-2 h-12 px-6 rounded-[14px] text-sm font-medium bg-transparent text-white border border-white/30 hover:bg-white/10 transition-colors"
                    data-testid="final-cta-call-button"
                  >
                    <Phone className="h-4 w-4" /> {settings.phone}
                  </a>
                ) : null}
              </div>
            </div>

            <form onSubmit={submit} className="rounded-[24px] bg-white p-6 sm:p-8 text-[#111111] self-start" data-testid="final-cta-form">
              <h3 className="font-heading font-semibold text-xl tracking-tight">Підбір під ваше авто</h3>
              <p className="text-sm text-[#666666] mt-1.5">Опишіть марку, модель та задачу — підберемо за 1 годину.</p>
              <div className="mt-5 flex flex-col gap-3">
                <input
                  required
                  placeholder="Ваше ім'я"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="h-12 px-4 rounded-[14px] border border-[#E7E7E7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#111111]"
                  data-testid="final-cta-name-input"
                />
                <input
                  required
                  type="tel"
                  placeholder="Телефон (+380...)"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="h-12 px-4 rounded-[14px] border border-[#E7E7E7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#111111]"
                  data-testid="final-cta-phone-input"
                />
                <textarea
                  rows={3}
                  placeholder="Марка і модель авто / задача"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="p-4 rounded-[14px] border border-[#E7E7E7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] resize-none"
                  data-testid="final-cta-message-input"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 rounded-[14px] bg-[#111111] text-white font-semibold hover:bg-[#2A2A2A] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  data-testid="final-cta-submit-button"
                >
                  {loading ? "Відправлення…" : <>Отримати підбір <ArrowRight className="h-4 w-4" /></>}
                </button>
              </div>

              {/* Trust trigger below form */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-[#555555] font-medium">
                <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} />
                <span>Безкоштовний підбір · Відповідь протягом 1 години</span>
              </div>

              {/* Reassurance — removes "впарять" fear */}
              <div className="mt-2 flex items-start gap-2 text-[12px] text-[#666666] leading-snug px-2">
                <span className="shrink-0 text-[#111111]">⚠️</span>
                <span>
                  Якщо рішення не підійде під ваше авто — скажемо одразу.
                  Ми не продаємо «аби продати».
                </span>
              </div>

              <div className="mt-3 text-center text-[12px] text-[#666666]">
                Або напишіть одразу:{" "}
                <a
                  href={telegramUrl(settings)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#111111] underline underline-offset-2 decoration-[#111111]/40 hover:decoration-[#111111]"
                >
                  Telegram
                </a>{" "}
                /{" "}
                <a
                  href={whatsappUrl(settings)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#111111] underline underline-offset-2 decoration-[#111111]/40 hover:decoration-[#111111]"
                >
                  WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
