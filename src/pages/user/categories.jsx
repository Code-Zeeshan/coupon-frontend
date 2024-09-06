import axios from "@/lib/axios";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { USER_API } from "@/utils/constants";
import { IconDisplay } from "@/widgets/common";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Typography, Spinner } from "@material-tailwind/react";

export function Categories() {
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const [categories, setCategories] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    fetchCategories(1);
    fetchPopularCategories();
  }, []);

  const fetchCategories = async (pageNumber) => {
    try {
      const { data } = await axios.get(USER_API.GET_CATEGORIES, {
        pageNumber,
      });

      setCurrentPage(pageNumber);
      setCategories((prevCategories) => [
        ...prevCategories,
        ...data.categories,
      ]);

      setIsLastPage(currentPage === data.totalPages - 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPopularCategories = async () => {
    try {
      const { data } = await axios.get(USER_API.GET_POPULAR_CATEGORIES);

      setPopularCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onPageChange = (pageNumber) => {
    setIsLoading(true);
    fetchCategories(pageNumber);
  };

  const next = () => {
    onPageChange(currentPage + 1);
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <div className="py-6 px-4 md:px-20 bg-[#F9F9F9]">
      <Typography variant="h2" color="black" className="font-heading">
        Categories
      </Typography>

      <div className="flex flex-col md:flex-row mt-10">
        <div className="w-full md:w-3/4 md:mr-4">
          {categories.map(({ name, description, icon, companies }, key) => {
            const descLength = windowWidth < 768 ? 150 : 350;

            return (
              <Link
                key={key}
                to={`/categories/${name}`}
                className="link-no-underline mb-4 bg-white rounded-lg p-4 flex flex-col md:flex-row items-start"
              >
                <div className="p-4 hidden md:block bg-gray-300 rounded mr-4 md:mb-0 mt-1">
                  <IconDisplay iconName={icon} className={"w-10 h-10"} />
                </div>

                <div className="flex flex-col justify-between w-full">
                  <div className="flex flex-row items-start items-center">
                    <Typography variant="h6" color="black">
                      {name}
                    </Typography>
                    <ChevronRightIcon className="h-4 w-4 ml-0 md:ml-4" />
                  </div>

                  <div className="mt-1 flex">
                    <Typography color="gray" variant="small">
                      {truncateText(description, descLength)}
                    </Typography>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center">
                    <Typography variant="small" color="gray" className="mr-2">
                      Brands:
                    </Typography>

                    {companies.map((company) => (
                      <Typography
                        variant="small"
                        key={company._id}
                        className="rounded border mr-2 px-3 py-1"
                        style={{ color: "#EE7C23", borderColor: "#EE7C23" }}
                      >
                        {company.name}
                      </Typography>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}

          {!isLastPage && !isLoading && (
            <small
              onClick={next}
              className="text-[#EE7C23] cursor-pointer ml-[50%]"
            >
              Load More
            </small>
          )}

          {isLoading && (
            <div className="flex flex-row justify-center">
              <Spinner className="h-12 w-12" />
            </div>
          )}
        </div>

        <div className="w-full md:w-1/4 md:ml-4 hidden md:block">
          <Typography variant="h4" color="black" className="mb-2 font-heading">
            Popular Categories
          </Typography>

          <div className="flex flex-col">
            {popularCategories.map(({ name, description, icon }, key) => {
              const descLength = windowWidth < 1400 ? 40 : 80;

              return (
                <Link
                  key={key}
                  to={`/categories/${name}`}
                  className="link-no-underline my-2 border rounded-2xl p-4"
                >
                  <div className="flex flex-row items-center">
                    <div className="p-4 bg-gray-300 rounded mr-4 flex items-center justify-center">
                      <IconDisplay iconName={icon} className={"w-10 h-10"} />
                    </div>

                    <div className="flex flex-col">
                      <Typography
                        color="black"
                        variant="small"
                        className="font-bold mb-2"
                      >
                        {name}
                      </Typography>

                      <Typography color="black" variant="small">
                        {truncateText(description, descLength)}
                      </Typography>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
