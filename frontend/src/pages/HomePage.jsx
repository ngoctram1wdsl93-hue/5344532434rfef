import Hero from "@/components/sections/Hero";
import PainBlock from "@/components/sections/PainBlock";
import MiniTrust from "@/components/sections/MiniTrust";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import UseCases from "@/components/sections/UseCases";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionNav from "@/components/layout/SectionNav";

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <SectionNav />

      {/* 01 Production (Hero) */}
      <Hero />

      {/* 02 Pain → Solution */}
      <div id="pain" className="scroll-mt-20 panel-lg">
        <PainBlock />
      </div>

      {/* Mini live-counter strip */}
      <MiniTrust />

      {/* 03 Categories */}
      <div id="categories" className="scroll-mt-20 panel-lg">
        <Categories />
      </div>

      {/* 04 Popular products */}
      <div id="featured" className="scroll-mt-20 panel-lg">
        <FeaturedProducts />
      </div>

      {/* 05 Use cases / by vehicle */}
      <div id="use-cases" className="scroll-mt-20 panel-lg">
        <UseCases />
      </div>

      {/* 06 Why us */}
      <div id="why-us" className="scroll-mt-20 panel-lg">
        <WhyChooseUs />
      </div>

      {/* 07 Real cases / gallery */}
      <div id="cases" className="scroll-mt-20 panel-lg">
        <Gallery />
      </div>

      {/* 08 Testimonials */}
      <div id="testimonials" className="scroll-mt-20 panel-lg">
        <Testimonials />
      </div>

      {/* 09 How it works */}
      <div id="process" className="scroll-mt-20 panel-lg">
        <HowItWorks />
      </div>

      {/* 10 FAQ */}
      <div id="faq" className="scroll-mt-20 panel-lg">
        <FAQSection />
      </div>

      {/* 11 Final CTA + contact screen (acts as footer) */}
      <div id="contact" className="scroll-mt-20">
        <FinalCTA />
      </div>
    </div>
  );
}
