import Hero from "@/components/sections/Hero";
import MiniTrust from "@/components/sections/MiniTrust";
import PainBlock from "@/components/sections/PainBlock";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import UseCases from "@/components/sections/UseCases";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";
import Gallery from "@/components/sections/Gallery";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <Hero />
      <PainBlock />
      <MiniTrust />
      <Categories />
      <FeaturedProducts />
      <UseCases />
      <WhyChooseUs />
      <Gallery />
      <HowItWorks />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}
