import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Send, MessageCircle, Phone, ArrowRight, Check, AlertTriangle, Mail, MapPin } from "lucide-react";
import { api } from "@/lib/api";
import { useSettings } from "@/lib/settings-context";
import { telegramUrl, whatsappUrl, telUrl, mailtoUrl } from "@/lib/cta";
import Logo from "@/components/shared/Logo";

export default function FinalCTA() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ vehicle: "", task: "", contact: "" });
  const [loading, setLoading] = useState(false);
  const brand = settings?.company_name || "ПНЕВМО";
  const year = new Date().getFullYear();

  const submit = async (e) => {
    e.preventDefault();
    if (!form.vehicle.trim() || !form.contact.trim()) {
      toast.error("Вкажіть авто та контакт");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.vehicle.slice(0, 60),
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
    <section className="relative bg-[#111111] text-white panel-lg" data-testid="final-cta-section">
      {/* HERO BAND */}
      <div className="container-page pt-14 sm:pt-20 lg:pt-24 pb-10 sm:pb-14">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 sm:gap-10 lg:gap-14 items-start">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 text-white text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5">
              Підбір рішення
            </div>
            <h2 className="font-heading font-semibold text-white text-[28px] sm:text-4xl lg:text-[54px] leading-[1.08] lg:leading-[1.03] tracking-tight mt-4 sm:mt-5 [text-wrap:balance]">
              Підберемо рішення під ваше авто та навантаження
            </h2>
            <p className="mt-4 sm:mt-5 text-[#BDBDBD] text-[14px] sm:text-base lg:text-lg max-w-xl leading-relaxed">
              Безкоштовно. Без «впарювання». По вашій задачі.
            </p>

            <div className="mt-5 sm:mt-6 inline-flex items-start sm:items-center gap-2 sm:gap-2.5 rounded-[14px] sm:rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#FCD34D] text-[12px] sm:text-[13px] font-semibold px-3 sm:px-4 py-2">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 sm:mt-0" strokeWidth={2.5} />
              <span>Беремо обмежену кількість авто на день</span>
            </div>

            <div className="mt-7 sm:mt-9 grid sm:grid-cols-2 gap-3">
              {settings?.phone ? (
                <a
                  href={telUrl(settings)}
                  className="flex items-start gap-3 rounded-[16px] bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors"
                  data-testid="final-cta-call-card"
                >
                  <span className="shrink-0 h-10 w-10 rounded-[12px] bg-white text-[#111111] grid place-items-center">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-[#A0A0A0] font-semibold">Телефон</div>
                    <div className="font-heading font-semibold text-white text-[15px] sm:text-[16px] tracking-tight mt-0.5 truncate">{settings.phone}</div>
                  </div>
                </a>
              ) : null}
              <a
                href={telegramUrl(settings)}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 rounded-[16px] bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors"
                data-testid="final-cta-telegram-card"
              >
                <span className="shrink-0 h-10 w-10 rounded-[12px] bg-white text-[#111111] grid place-items-center">
                  <Send className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[#A0A0A0] font-semibold">Telegram</div>
                  <div className="font-heading font-semibold text-white text-[15px] sm:text-[16px] tracking-tight mt-0.5 truncate">
                    @{(settings?.telegram_username || "").replace(/^@/, "")}
                  </div>
                </div>
              </a>
              <a
                href={whatsappUrl(settings)}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 rounded-[16px] bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors"
                data-testid="final-cta-whatsapp-card"
              >
                <span className="shrink-0 h-10 w-10 rounded-[12px] bg-white text-[#111111] grid place-items-center">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[#A0A0A0] font-semibold">WhatsApp</div>
                  <div className="font-heading font-semibold text-white text-[15px] sm:text-[16px] tracking-tight mt-0.5 truncate">
                    +{(settings?.whatsapp_number || "").replace(/\D/g, "")}
                  </div>
                </div>
              </a>
              {settings?.email ? (
                <a
                  href={mailtoUrl(settings)}
                  className="flex items-start gap-3 rounded-[16px] bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors"
                  data-testid="final-cta-email-card"
                >
                  <span className="shrink-0 h-10 w-10 rounded-[12px] bg-white text-[#111111] grid place-items-center">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-[#A0A0A0] font-semibold">Email</div>
                    <div className="font-heading font-semibold text-white text-[15px] sm:text-[16px] tracking-tight mt-0.5 truncate">{settings.email}</div>
                  </div>
                </a>
              ) : null}
            </div>

            {settings?.address ? (
              <div className="mt-5 inline-flex items-start gap-2 text-[13px] text-[#A0A0A0]">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{settings.address}{settings?.working_hours ? ` · ${settings.working_hours}` : ""}</span>
              </div>
            ) : null}
          </div>

          {/* FORM */}
          <form onSubmit={submit} className="rounded-[22px] sm:rounded-[26px] bg-white p-5 sm:p-8 text-[#111111] self-start" data-testid="final-cta-form">
            <h3 className="font-heading font-semibold text-lg sm:text-xl tracking-tight">Коротка заявка</h3>
            <p className="text-[13px] sm:text-sm text-[#666666] mt-1 sm:mt-1.5">3 прості питання — і ми підберемо рішення.</p>

            <div className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-3.5">
              <div>
                <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">Яке авто?</label>
                <input
                  required
                  placeholder="Sprinter / Crafter / інше"
                  value={form.vehicle}
                  onChange={(e) => setForm((f) => ({ ...f, vehicle: e.target.value }))}
                  className="h-12 w-full px-4 rounded-[14px] border border-[#E7E7E7] bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                  data-testid="final-cta-vehicle-input"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">Яка задача?</label>
                <input
                  placeholder="Вантаж · причіп · навантаження"
                  value={form.task}
                  onChange={(e) => setForm((f) => ({ ...f, task: e.target.value }))}
                  className="h-12 w-full px-4 rounded-[14px] border border-[#E7E7E7] bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                  data-testid="final-cta-task-input"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#111111] mb-1.5">Телефон або Telegram</label>
                <input
                  required
                  inputMode="tel"
                  placeholder="+380 97 123 45 67 або @username"
                  value={form.contact}
                  onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                  className="h-12 w-full px-4 rounded-[14px] border border-[#E7E7E7] bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                  data-testid="final-cta-contact-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-12 mt-1 rounded-[14px] bg-[#111111] text-white font-semibold hover:bg-[#2A2A2A] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
                data-testid="final-cta-submit-button"
              >
                {loading ? "Відправлення…" : <>Отримати підбір <ArrowRight className="h-4 w-4" /></>}
              </button>
            </div>

            <div className="mt-4 rounded-[14px] bg-[#F7F7F5] border border-[#E7E7E7] p-3 sm:p-3.5 flex items-start gap-2.5 text-[12px] sm:text-[12.5px] text-[#1A1A1A] leading-snug">
              <span className="shrink-0 text-[15px] sm:text-[16px] leading-none mt-0.5">⚠️</span>
              <span>
                Якщо не підійде — <strong className="font-semibold">скажемо одразу</strong>. Ми не продаємо «аби продати».
              </span>
            </div>

            <div className="mt-4 rounded-[16px] bg-[#111111] p-3 sm:p-4 flex items-center gap-3">
              <div className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white grid place-items-center">
                <Send className="h-4 w-4 text-[#111111]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] sm:text-[13px] font-semibold text-white leading-tight">Не хочете заповнювати?</div>
                <div className="text-[11px] sm:text-[12px] text-[#BDBDBD] mt-0.5 leading-tight">Напишіть у Telegram — відповімо швидше</div>
              </div>
              <a
                href={telegramUrl(settings)}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 h-9 sm:h-10 px-3 sm:px-3.5 rounded-[10px] text-[12px] sm:text-[12.5px] font-semibold bg-white text-[#111111] hover:bg-[#F1F1EF] transition-colors"
                data-testid="final-cta-lazy-telegram"
              >
                Написати <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] sm:text-[12px] text-[#555555] font-medium text-center">
              <Check className="h-3.5 w-3.5 text-[#16A34A] shrink-0" strokeWidth={2.5} />
              <span>Безкоштовний підбір · Відповідь протягом 1 години</span>
            </div>
          </form>
        </div>
      </div>

      {/* Mini-footer band (inside contact screen) */}
      <div className="border-t border-white/10">
        <div className="container-page py-6 sm:py-7 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo variant="light" height="h-9 sm:h-10" />
            <span className="text-[11px] sm:text-[12px] text-[#666666]">© {year} {brand}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] sm:text-[13px] text-[#A1A1A1]">
            <Link to="/catalog" className="hover:text-white transition-colors">Каталог</Link>
            <Link to="/about" className="hover:text-white transition-colors">Про нас</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link to="/contacts" className="hover:text-white transition-colors">Контакти</Link>
            <Link to="/admin" className="hover:text-white transition-colors opacity-60" data-testid="footer-admin-link">Адмін</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
