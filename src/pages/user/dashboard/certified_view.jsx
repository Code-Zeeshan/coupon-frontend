import { Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export function CertifiedView() {
  return (
    <div className="bg-[#63F6691A] p-4 md:p-10 mt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 rounded-2xl">
      <div className="text-center md:text-left">
        <CheckCircleIcon
          style={{ color: "#009951" }}
          className="h-10 w-10 mx-auto md:mx-0"
        />
        <Typography variant="h4" className="text-[#338D3C] mt-2">
          We are Certified
        </Typography>
        <Typography variant="small" className="text-[#9DCF9C] mt-2">
          Lorem ipsum dolor sit amet consectetur. Viverra quam eget nisl
          integer. Etiam amet consectetur imperdiet vitae. Porttitor auctor leo
          convallis ante eget ullamcorper cras magna. Nunc sem at ut praesent
          scelerisque sed.
        </Typography>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="h-24 w-24 md:h-48 md:w-32 bg-[#D9D9D9] rounded-full"></div>
        <div className="h-24 w-24 md:h-48 md:w-32 bg-[#D9D9D9] rounded-full"></div>
        <div className="h-24 w-24 md:h-48 md:w-32 bg-[#D9D9D9] rounded-full"></div>
      </div>
    </div>
  );
}
