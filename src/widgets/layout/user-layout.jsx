import React from "react";

import { useLocation, Outlet } from "react-router-dom";
import { Footer, Header, Breadcrumb, Faqs } from "../user";

export function UserLayout() {
  const location = useLocation();

  const showFaqRoutes = [
    "/coupons",
    "/categories",
    "/blogs",
    "/contact",
    "/about_us",
  ];

  // Check if the current route should show FAQs
  const shouldShowFaqs = showFaqRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Breadcrumb />

      <main className="flex-grow bg-[#FFFFFF]">
        <Outlet />
      </main>

      {shouldShowFaqs && <Faqs />}
      <Footer />
    </div>
  );
}
