import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SectionHeading from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQSection({ heading = true }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/faq").then((res) => setItems(res.data)).catch(() => {});
  }, []);

  return (
    <section className="section-y bg-[#F7F7F5]" data-testid="faq-section">
      <div className="container-page">
        {heading ? (
          <SectionHeading
            eyebrow="FAQ"
            title="Часті запитання про пневмопідвіску"
            subtitle="Відповідаємо на те, що питають найчастіше. Не знайшли відповіді — напишіть нам."
          />
        ) : null}
        <div className="mt-10 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="flex flex-col gap-3" data-testid="faq-accordion">
            {items.map((q) => (
              <AccordionItem
                key={q.id}
                value={q.id}
                className="surface-card px-6 border"
                data-testid={`faq-item-${q.order}`}
              >
                <AccordionTrigger className="py-6 text-left font-heading font-medium text-[#111111] hover:no-underline text-[16px] tracking-tight">
                  {q.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#666666] pb-6 leading-relaxed">
                  {q.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
