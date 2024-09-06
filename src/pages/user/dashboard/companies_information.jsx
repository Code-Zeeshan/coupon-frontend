import axios from "@/lib/axios";

import { useState, useEffect } from "react";
import { USER_API } from "@/utils/constants";
import { Typography } from "@material-tailwind/react";

export function CompaniesInformation() {
  const [companiesInformation, setCompaniesInformation] = useState([]);

  useEffect(() => {
    fetchCompanyInformation();
  }, []);

  const fetchCompanyInformation = async () => {
    try {
      const { data } = await axios.get(USER_API.GET_COMPANIES_INFORMATION);
      setCompaniesInformation(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 py-8">
      <div className="flex items-center">
        <div className="h-5 w-5 bg-[#F0F3F4] rounded-full mr-2"></div>
        <Typography>
          {companiesInformation?.shopsCount} shops and brands
        </Typography>
      </div>

      <div className="flex items-center">
        <div className="h-5 w-5 bg-[#F0F3F4] rounded-full mr-2"></div>
        <Typography>Verified Coupons</Typography>
      </div>

      <div className="flex items-center">
        <div className="h-5 w-5 bg-[#F0F3F4] rounded-full mr-2"></div>
        <Typography>
          {companiesInformation?.couponsCount} vouchers and discounts
        </Typography>
      </div>
    </div>
  );
}
