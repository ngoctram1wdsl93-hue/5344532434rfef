import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";

export default function PublicLayout() {
  const location = useLocation();
  // Home page: FinalCTA acts as footer screen (contact + mini-footer),
  // so hide the regular Footer to keep presentation-site feel.
  const hideFooter = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] overflow-x-hidden">
      <Header />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
      {hideFooter ? null : <Footer />}
      <FloatingContact />
      <StickyMobileCTA />
    </div>
  );
}
