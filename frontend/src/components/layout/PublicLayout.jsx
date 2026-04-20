import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
      <StickyMobileCTA />
    </div>
  );
}
