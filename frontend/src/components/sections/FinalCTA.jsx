import { useState } from "react";
import { toast } from "sonner";
import { Send, MessageCircle, Phone, ArrowRight, Check, AlertTriangle } from "lucide-react";
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
  // New human-scenario form: vehicle + task + contact
  const [form, setForm] = useState({ vehicle: "", task: "", contact: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.vehicle.trim() || !form.contact.trim()) {
      toast.error("Вкажіть авто та контакт");
      return;
    }
    setLoading(true);
    try {
      // Adapt to backend Lead schema: {name, phone, message}
      const payload = {
        name: form.vehicle.slice(0, 60), // summary of request
        phone: form.contact,
        message: `Авто: ${form.vehicle}\nЗадача: ${form.task || "—"}`,
      };
      await api.post("/leads", payload);
      toast.success("Дякуємо! Ми зв'яжемося з вами найближчим часом.");
      setForm({ vehicle: "", task: "", contact: "" });
    } catch (_) {
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
                Напишіть нам —<br />підберемо під ваше авто
              </h2>
              <p className="mt-5 text-[#BDBDBD] text-base sm:text-lg max-w-xl leading-relaxed">
                Коротко опишіть авто та задачу — підкажемо оптимальний варіант по ціні, термінах та сумісності.
              </p>

              {/* FOMO strip — scarcity without aggression */}
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#FCD34D] text-[12px] sm:text-[13px] font-semibold px-4 py-2">
                <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />
                Щоб тримати якість — беремо обмежену кількість авто на день
              </div>

              {/* Guarantees — "Що ви отримуєте" */}
              <div className="mt-7 rounded-[20px] bg-white/5 border border-white/10 p-5 sm:p-6">
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

            {/* HUMAN-SCENARIO FORM */}
            <form onSubmit={submit} className="rounded-[24px] bg-white p-6 sm:p-8 text-[#111111] self-start" data-testid="final-cta-form">
              <h3 className="font-heading font-semibold text-xl tracking-tight">Коротка заявка</h3>
              <p className="text-sm text-[#666666] mt-1.5">3 прості питання — і ми підберемо рішення.</p>

              <div className="mt-5 flex flex-col gap-3.5">
                <div>
                  <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">Яке авто?</label>
                  <input
                    required
                    placeholder="Sprinter / Crafter / інше"
                    value={form.vehicle}
                    onChange={(e) => setForm((f) => ({ ...f, vehicle: e.target.value }))}
                    className="h-12 w-full px-4 rounded-[14px] border border-[#E7E7E7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#111111]"
                    data-testid="final-cta-vehicle-input"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">Яка задача?</label>
                  <input
                    placeholder="Вантаж · причіп · постійне навантаження"
                    value={form.task}
                    onChange={(e) => setForm((f) => ({ ...f, task: e.target.value }))}
                    className="h-12 w-full px-4 rounded-[14px] border border-[#E7E7E7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#111111]"
                    data-testid="final-cta-task-input"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">Телефон або Telegram</label>
                  <input
                    required
                    placeholder="+380 97 123 45 67 або @username"
                    value={form.contact}
                    onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                    className="h-12 w-full px-4 rounded-[14px] border border-[#E7E7E7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#111111]"
                    data-testid="final-cta-contact-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-13 mt-1 rounded-[14px] bg-[#111111] text-white font-semibold hover:bg-[#2A2A2A] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2 py-3.5"
                  data-testid="final-cta-submit-button"
                >
                  {loading ? "Відправлення…" : <>Отримати підбір <ArrowRight className="h-4 w-4" /></>}
                </button>
              </div>

              {/* Reassurance */}
              <div className="mt-4 rounded-[14px] bg-[#F7F7F5] border border-[#E7E7E7] p-3.5 flex items-start gap-2.5 text-[12.5px] text-[#1A1A1A] leading-snug">
                <span className="shrink-0 text-[16px] leading-none mt-0.5">⚠️</span>
                <span>
                  Якщо рішення не підійде під ваше авто — <strong className="font-semibold">скажемо одразу</strong>.
                  Ми не продаємо «аби продати».
                </span>
              </div>

              {/* LAZY PATH — strongest converter */}
              <div className="mt-5 rounded-[16px] bg-[#111111] p-4 flex items-center gap-3">
                <div className="shrink-0 h-10 w-10 rounded-full bg-white grid place-items-center">
                  <Send className="h-4 w-4 text-[#111111]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white leading-tight">Не хочете заповнювати?</div>
                  <div className="text-[12px] text-[#BDBDBD] mt-0.5">Напишіть нам у Telegram — відповімо швидше</div>
                </div>
                <a
                  href={telegramUrl(settings)}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] text-[12.5px] font-semibold bg-white text-[#111111] hover:bg-[#F1F1EF] transition-colors"
                  data-testid="final-cta-lazy-telegram"
                >
                  Написати <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-[#555555] font-medium">
                <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} />
                <span>Безкоштовний підбір · Відповідь протягом 1 години</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
