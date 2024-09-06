import { Typography } from "@material-tailwind/react";

export function Contact() {
  return (
    <div className="my-8 px-8 py-8 md:px-24 md:py-12 bg-[#F9F9F9]">
      <Typography variant="h4" color="black" className="font-heading">
        Contact US
      </Typography>

      <div className="py-4">
        <Typography variant="paragraph" color="black">
          You didn't find the right answer to your question(s) on our FAQ page?
        </Typography>

        <Typography variant="paragraph" color="black">
          Then write us a message and we will process your request as quickly as
          possible:
        </Typography>

        <Typography variant="paragraph" color="black" className="py-2">
          Please note the following: COUPONS.DE is not an online shop ! This
          means that you cannot order, book or buy anything from us. We only
          offer vouchers and discount codes that you can use free of charge to
          save money on your order in the respective online shop. We cannot
          therefore give you any information if you have questions about your
          order, booking or shipping status. Please contact the relevant online
          shop where you ordered.
        </Typography>
      </div>
    </div>
  );
}
