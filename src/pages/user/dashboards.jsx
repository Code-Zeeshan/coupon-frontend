import {
  CompaniesView,
  CertifiedView,
  AboutUsSection,
  RedeemMyCoupons,
  PopularCoupons,
  BlogsAndStories,
  OnlyWithUsCoupons,
  CompaniesInformation,
  LatestAdditionCoupons,
  Slider
} from "./dashboard";

export function Dashboard() {
  return (
    <div>
      <CompaniesInformation />

      <div className="my-8 px-8 py-8 md:px-24 md:py-20 bg-[#EBF1FF]">
        <CompaniesView />
      </div>

      <div className="py-6 px-4 md:px-20">
        {/* TODO */}
        <PopularCoupons />

        <CertifiedView />

        {/* TODO */}
        <LatestAdditionCoupons />

        {/* TODO */}
        <OnlyWithUsCoupons />
      </div>

      <RedeemMyCoupons />
      <BlogsAndStories />

      <AboutUsSection />
      <Slider />
    </div>
  );
}
