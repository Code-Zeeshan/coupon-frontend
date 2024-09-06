import axios from "@/lib/axios";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { USER_API } from "@/utils/constants";
import { Typography, Spinner } from "@material-tailwind/react";

export function AboutUsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularCompanies, setPopularCompanies] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchPopularCompanies();
  }, []);

  const fetchPopularCompanies = async () => {
    try {
      const { data } = await axios.get(USER_API.GET_POPULAR_COMPANIES);
      setPopularCompanies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const VoucherBigItem = ({ src, title, percentage }) => (
    <Link
      to={`/shops/${title}`}
      className="bg-[#FFFFFF] rounded-2xl p-4 h-full flex flex-col"
    >
      <img
        alt="Blog"
        src={src}
        className="w-full h-48 object-cover rounded-t-2xl mb-4"
      />
      <Typography variant="h6" color="black" className="pl-1 text-center">
        {title}
      </Typography>

      <Typography
        variant="small"
        style={{ color: "#D93E24" }}
        className="pl-1 text-center font-bold"
      >
        Upto {percentage}% Voucers Rewards
      </Typography>
    </Link>
  );

  const VoucherSmallItem = ({ name, src, percentage }) => (
    <Link
      to={`/shops/${name}`}
      className="bg-[#FFFFFF] rounded-2xl p-4 h-full flex flex-col"
    >
      <img src={src} alt="Blog" className="w-full h-24 object-cover mb-4" />

      <Typography
        variant="small"
        style={{ color: "#D93E24" }}
        className="pl-1 text-center border border-gray font-bold"
      >
        Upto {percentage}%
      </Typography>
    </Link>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="blue" size="xl" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-20">
      <div className="flex flex-col md:flex-row mt-10 space-y-4 md:space-y-0 md:space-x-4">
        {popularCompanies.slice(0, 1).map((company, index) => (
          <div key={index} className="w-full md:w-1/2">
            <VoucherBigItem
              src={company.logo}
              title={company.name}
              percentage={company.percentage}
            />
          </div>
        ))}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-1/2">
          {popularCompanies.slice(1, 9).map((company, index) => (
            <VoucherSmallItem
              key={index}
              src={company.logo}
              name={company.name}
              percentage={company.percentage}
            />
          ))}

          <Link
            to="/shops"
            className="bg-[#FFFFFF] rounded-2xl p-4 h-full flex items-center justify-center"
          >
            <Typography variant="small" className="text-center">
              View All
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}
