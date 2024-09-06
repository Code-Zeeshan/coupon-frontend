import axios from "@/lib/axios";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { USER_API } from "@/utils/constants";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Typography, Spinner } from "@material-tailwind/react";

export function OnlyWithUsCoupons() {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="blue" size="xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-10">
      <Link to="/all_blogs" className="flex items-center mb-4">
        <Typography variant="h4" color="black" className="mr-2">
          Only with us
        </Typography>
        <ChevronRightIcon className="h-6 w-6" />
      </Link>
    </div>
  );
}
