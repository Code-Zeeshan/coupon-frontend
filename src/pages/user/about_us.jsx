import { Typography } from "@material-tailwind/react";

export function AboutUs() {
  return (
    <div className="my-8 px-8 py-8 md:px-24 md:py-20 bg-[#F9F9F9]">
      <Typography variant="h4" color="black" className="font-heading">
        Welcome to Gutscheine Konig !
      </Typography>

      <Typography variant="small" color="black">
        When George W. Bush and Gerhard Schröder were still in agreement, Werder
        Bremen became German football champions with "Kugelblitz" Ailton and
        Michael Schumacher won his 7th Formula 1 title, Torsten Latussek founded
        his heart project COUPONS4U in 2004. His goal: to bring the voucher hype
        that he experienced first-hand on a trip to the USA to Germany and thus
        offer people the opportunity to save money when shopping thanks to
        vouchers and coupons. As one of the oldest - and yet young at heart -
        voucher portals in Germany, we have a really good instinct for both the
        right online shops and vouchers and coupons. Thanks to many close
        collaborations with well-known shops and brands, we often offer you
        exclusive voucher codes on COUPONS .DE (until February 2019
        coupons4u.de) and our green heart project gruene-gutscheine.de that are
        not available anywhere else.
      </Typography>
    </div>
  );
}
