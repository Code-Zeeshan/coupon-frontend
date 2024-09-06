import React, { useState } from "react";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Collapse, Button, Typography } from "@material-tailwind/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const faqItems = [
  {
    title: "What is COUPONS .DE ?",
    content:
      "COUPONS .DE is an internet platform that lists current vouchers for you. The vouchers offer you advantages and savings opportunities when shopping conveniently online. From product samples to discount vouchers to selected competitions, you will find the best promotions that online shops currently have to offer. If you wish, you can also always be informed about the latest coupon promotions via the free newsletter. COUPONS .DE does not issue vouchers itself, but simply collects and publishes discount and free offers from various providers. You do not enter into any contractual relationship with COUPONS .DE . COUPONS .DE is a free service.",
  },
  {
    title:
      "How do I redeem a voucher? How do I get the discount or free sample?",
    content:
      "To use a specific coupon offer, you must click on the coupon. After clicking, the provider page of the corresponding shop opens, where you will find all the vouchers and promotions for the provider in question listed. Further down, more detailed information about the shop and similar providers is listed. Click on the red 'Show voucher' button to use the desired coupon. For competitions, please simply click 'Participate now'. A layer will then open where you can read all the relevant information again. By clicking on 'more details' you can read all the information and, if necessary, images will be visible. If there is a voucher code, you can copy it to the clipboard here to redeem it later in the shop's shopping cart. The shop page will automatically open in the tab before and you can redeem the voucher. Now follow the instructions you have just read. Often a special code must be entered or certain restrictions or conditions of participation apply. Tip: If you want to become a voucher expert, we recommend our article on 9 tips on how to use vouchers correctly.",
  },
  {
    title: "Do I have to be a member or logged in to use the coupons?",
    content:
      "No. You can redeem any voucher available on our website without having to log in or register anywhere on the platform. However, providers often require you to register (create a customer account) in order to take advantage of the benefit.",
  },
  {
    title: "Are there any costs involved in using the vouchers?",
    content:
      "No. The COUPONS .DE service is and remains absolutely free of charge. However, you should read the participation or redemption conditions of the respective provider carefully, as some offers may be associated with costs or follow-up costs.",
  },
  {
    title: "Can I also redeem the vouchers in the store or supermarket?",
    content:
      "COUPONS .DE is an online service and is intended exclusively for purchases or other promotions on the Internet. The vouchers cannot be printed out and presented in the store unless this is explicitly stated or a voucher is offered for printing. We have collected such coupons for you to print out and update them constantly.",
  },
  {
    title: "How will I be informed about new coupons at COUPONS .DE ?",
    content:
      "To ensure you don't miss any of our new offers and current promotions, you can sign up for our newsletter mailing list free of charge and easily. There is a small form for this, which you can find further down on the COUPONS .DE homepage or at the very bottom under 'Newsletter'. Enter your name and email address here. You will then receive an email about twice a week with selected news about our voucher offers, advice articles and more.",
  },
  {
    title: "How can I unsubscribe from the newsletter?",
    content:
      "It's very easy and only requires a single click. At the bottom of the newsletter there is a link to unsubscribe from the newsletter. So if you no longer want to receive our newsletter, just click on this link and you will automatically be removed from our mailing list.",
  },
  {
    title: "Will my personal data be used further?",
    content:
      "No. COUPONS .DE does not pass on any of its users' data to third parties without permission. If you have signed up for a newsletter subscription, your data will only be used to send you our free newsletter.",
  },
  {
    title: "Why do online stores offer coupons?",
    content:
      "Once a trend that came to Germany from the USA, online coupons were designed to keep a shop's best customers happy. Today, they are mainly used to attract new customers or to encourage existing customers to order something from the respective provider again. If you have found a voucher of your choice in our range, you can look forward to the exclusive advantage that other customers do not have. Incidentally, only a third of all people in this country buy something online when a voucher is found for the order. Interesting to see which bargain hunters are among us, isn't it? In our magazine article you will find further interesting insights that emerged from our large voucher survey.",
  },
  {
    title: "A voucher or code doesn't work, what should I do?",
    content:
      "If a voucher does not work despite being valid, please write to us using our contact form with a detailed description of the error and we will try to help you as quickly as possible. Please understand, however, that some offers are often sold out quickly or promotions are ended prematurely by the providers. We have no influence on this.",
  },
  {
    title: "What do I have to do to cancel a subscription or an order?",
    content:
      "If you have any questions about an order or a subscription you have taken out, or if you would like to cancel a contract, please do not contact COUPONS .DE , but rather the respective provider of the offer directly. Only they can help you with your questions. You can also find the company name or the provider with whom you have taken out a magazine subscription on the sticker of the respective magazine.",
  },
  {
    title: "How can I earn money with surveys on COUPONS .DE ?",
    content:
      "Earning money with surveys is child's play. On our site we give you the opportunity to take part in paid surveys and earn some money or Amazon vouchers (and many other vouchers). You just have to register for free and without revealing too much about yourself. Maybe you can earn some nice extra income that way.",
  },
];

export function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="md:px-20 sm:px-6 px-6">
      <Typography variant="h4" color="black">
        FAQS
      </Typography>

      <div className="w-full mt-4">
        {faqItems.map((item, index) => (
          <div key={index} className="mb-4">
            <Button
              color="white"
              onClick={() => handleToggle(index)}
              style={{ boxShadow: "0px 4px 45px 0px #91A0B226" }}
              className="w-full min-h-20 flex items-center justify-between text-left rounded-3xl"
            >
              <div className="flex items-center">
                <QuestionMarkCircleIcon className="h-8 w-8 sm:h-10 sm:w-10 text-[#EE7C23] mr-2 sm:mr-4" />
                <Typography
                  variant="lead"
                  color="black"
                  className="text-sm sm:text-base"
                >
                  {item.title}
                </Typography>
              </div>
              {openIndex === index ? (
                <ChevronUpIcon className="h-6 w-6 text-[#EE7C23]" />
              ) : (
                <ChevronDownIcon className="h-6 w-6 text-[#EE7C23]" />
              )}
            </Button>

            <Collapse open={openIndex === index}>
              <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8 bg-[#FFFFFF] rounded">
                <Typography
                  variant="paragraph"
                  color="gray"
                  className="text-sm sm:text-base"
                >
                  {item.content}
                </Typography>
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
}
