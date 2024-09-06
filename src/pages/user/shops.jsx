import axios from "@/lib/axios";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pagination } from "@/widgets/user";
import { USER_API } from "@/utils/constants";
import { ShopsSearch, ShopsSorting } from "./shop";
import { Spinner, Typography } from "@material-tailwind/react";

export function Shops() {
  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchCompanies(1);
  }, [search]);

  const fetchCompanies = async (pageNumber) => {
    try {
      const { data } = await axios.get(USER_API.GET_COMPANIES, {
        search,
        pageNumber,
      });

      setCurrentPage(pageNumber);
      setTotalPages(data.totalPages);
      setCompanies(data.categorizedCompanies);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (pageNumber) => {
    setIsLoading(true);
    fetchCompanies(pageNumber);
  };

  return (
    <div className="p-6 md:px-20">
      <Typography variant="h3" color="black" className="font-bold">
        All Shops
      </Typography>

      <ShopsSearch search={search} setSearch={setSearch} />
      <ShopsSorting />

      {isLoading ? (
        <div className="flex justify-center my-8">
          <Spinner color="blue" size="xl" />
        </div>
      ) : (
        <>
          {Object.keys(companies).map((letter) => (
            <div key={letter} className="mt-6">
              <Typography variant="h4" color="gray" className="font-bold">
                {letter}
              </Typography>

              <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  {companies[letter].map((company, index) => (
                    <Link
                      key={index}
                      to={`/shops/${company.name}`}
                      className="bg-white rounded-2xl shadow-md overflow-hidden"
                    >
                      <div className="h-52 bg-gray-200">
                        <img
                          alt="Logo"
                          src={company.logo}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <Typography
                          variant="h5"
                          color="gray"
                          className="font-bold mb-2"
                        >
                          {company.name}
                        </Typography>

                        <Typography variant="small" color="gray">
                          {company.description}
                        </Typography>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}
