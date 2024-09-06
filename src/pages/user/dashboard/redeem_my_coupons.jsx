import { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";

export function RedeemMyCoupons() {
  const steps = [
    `Find the shop you want and the right voucher promotion. Then simply click on "Show voucher"`,
    "An intermediate page will open where you can see the voucher code and helpful redemption instructions. Now copy the code.",
    "The online shop will open in a new window. Enter the voucher code in the corresponding field in the shopping cart or at the checkout. You've already saved money!",
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // Set the initial state

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-[#7DCEFF21] my-8 mx-4 md:mx-20 p-6 rounded-2xl">
      <div className="flex flex-col md:flex-row">
        <div className="flex w-full mt-10 justify-between flex-col md:flex-row">
          {/* Left side content */}
          <div className="w-full md:w-1/4 flex flex-col items-center justify-center pr-0 md:pr-8 mb-8 md:mb-0">
            <Typography
              variant="h5"
              className="font-medium"
              style={{ color: "#2A8FCD" }}
            >
              How to Redeem my coupon?
            </Typography>

            <Typography
              color="blue-gray"
              variant="small"
              className="mt-4 text-center"
            >
              We have collected thousands of voucher codes for you. These
              discounts are provided by the respective shops as a special
              incentive to buy. You can get the codes from us for free and
              without registration in 3 simple steps.
            </Typography>
          </div>

          {/* Right side content */}
          <div className="w-full md:w-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex items-center space-x-2 md:space-x-0 md:mr-4"
              >
                <div
                  style={{
                    top: isSmallScreen ? "70%" : "50%",
                    transform: "translate(-50%, -50%)",
                    left: isSmallScreen ? "50%" : "-10%",
                  }}
                  className="absolute flex items-center justify-center"
                >
                  <Typography
                    variant="h1"
                    style={{
                      md: "200px",
                      fontSize: "120px",
                      color: "#EE7C234D",
                    }}
                    className="opacity-50"
                  >
                    {index + 1}
                  </Typography>
                </div>

                <div className="bg-[#FFFFFF99] flex justify-center border w-full md:w-48 h-56 rounded-3xl p-4">
                  <Typography
                    variant="paragraph"
                    className="text-center"
                    style={{ color: "#999999", fontSize: "14px" }}
                  >
                    {step}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
