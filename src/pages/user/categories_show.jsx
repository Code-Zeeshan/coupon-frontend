import axios from "@/lib/axios";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_API } from "@/utils/constants";
import {
  Tab,
  Tabs,
  Spinner,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";

export function CategoriesShow() {
  const { name } = useParams();

  const [currentPage, setCurrentPage] = useState({
    Popular: 1,
    Latest: 1,
    Closing: 1,
  });
  const [isLastPage, setIsLastPage] = useState({
    Popular: false,
    Latest: false,
    Closing: false,
  });
  const [activeTab, setActiveTab] = useState("Popular");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [data, setData] = useState({ Popular: [], Latest: [], Closing: [] });

  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [popularCompanies, setPopularCompanies] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetchCategory();
    fetchPopularCompanies();
  }, []);

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        `${USER_API.GET_CATEGORY_BY_NAME}/${name}`,
      );

      setCategory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPopularCompanies = async () => {
    try {
      const { data } = await axios.get(USER_API.GET_POPULAR_COMPANIES);

      setPopularCompanies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoryCouponData = async (pageNumber) => {
    setIsLoadingData(true);

    const APIS = {
      Latest: USER_API.GET_LATEST_CATEGORIES_COUPONS,
      Popular: USER_API.GET_POPULAR_CATEGORIES_COUPONS,
      Closing: USER_API.GET_CLOSING_CATEGORIES_COUPONS,
    };

    try {
      const response = await axios.get(APIS[activeTab], {
        pageNumber,
      });

      setCurrentPage((prevData) => ({
        ...prevData,
        [activeTab]: pageNumber,
      }));

      setData((prevData) => ({
        ...prevData,
        [activeTab]: response.data,
      }));

      setIsLastPage((prevData) => ({
        ...prevData,
        [activeTab]: currentPage[activeTab] === data.totalPages - 1,
      }));
    } catch (error) {
      console.error(`Error fetching ${activeTab} data:`, error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleActiveTabChange = (title) => {
    setActiveTab(title);
    fetchCategoryCouponData(1);
  };

  const next = () => onPageChange(currentPage[activeTab] + 1);
  const onPageChange = (pageNumber) => fetchCategoryCouponData(pageNumber);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen "></div>;
  }

  if (!category) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Typography variant="h6">No category found.</Typography>
      </div>
    );
  }

  const formattedDate =
    new Date(category.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }) + " vouchers";

  return (
    <div className="py-6 px-4 md:px-20 ">
      <div className="flex items-start">
        <img
          alt={category.name}
          src={category.imageUrl}
          className="mr-8 w-32 h-32 object-cover rounded-3xl"
        />

        <div>
          <Typography variant="h4" className="font-bold font-heading">
            {category.name}
          </Typography>

          <Typography variant="paragraph" className="text-gray-500">
            {formattedDate}
          </Typography>

          <Typography variant="small" className="mt-2">
            {category.description}
          </Typography>

          <div className="mt-4 flex flex-row">
            <Typography variant="paragraph">Related Categories:</Typography>

            {category.relatedCategories.map((relatedCategory) => (
              <Typography
                variant="small"
                key={relatedCategory._id}
                className="rounded border ml-4 px-3"
                style={{ color: "#EE7C23", borderColor: "#EE7C23" }}
              >
                {relatedCategory.name}
              </Typography>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-10">
        <div className="w-full md:w-3/4 md:mr-4">
          <Tabs value={activeTab}>
            <TabsHeader className="bg-[#FFFFFF] p-0">
              <Tab
                value="Popular"
                className={`w-16 ${
                  activeTab === "Popular" && "text-[#EE7C23] "
                }`}
                onClick={() => handleActiveTabChange("Popular")}
              >
                Popular
              </Tab>
              <Tab
                value="Latest"
                className={`w-16 ${
                  activeTab === "Latest" && "text-[#EE7C23] "
                }`}
                onClick={() => handleActiveTabChange("Latest")}
              >
                Latest
              </Tab>
              <Tab
                value="Closing"
                className={`w-16 ${
                  activeTab === "Closing" && "text-[#EE7C23] "
                }`}
                onClick={() => handleActiveTabChange("Closing")}
              >
                Closing
              </Tab>
            </TabsHeader>

            <TabsBody>
              {!isLastPage[activeTab] && !isLoadingData && (
                <small
                  onClick={next}
                  className="text-[#EE7C23] cursor-pointer ml-[50%]"
                >
                  Load More
                </small>
              )}

              {isLoadingData && (
                <div className="flex flex-row justify-center">
                  <Spinner className="h-12 w-12" />
                </div>
              )}
            </TabsBody>
          </Tabs>
        </div>

        <div className="w-full md:w-1/4 md:ml-4 hidden md:block">
          <Typography variant="h4" color="black" className="mb-2 font-heading">
            See other shops
          </Typography>

          <div className="flex flex-col">
            {popularCompanies.map(({ name, description, logo }, key) => {
              return (
                <Link
                  key={key}
                  to={`/shops/${name}`}
                  className="link-no-underline my-2 border rounded-2xl p-4"
                >
                  <div className="flex flex-row items-center">
                    <img
                      src={logo}
                      alt="Company Logo"
                      className="w-16 h-16 rounded mr-4"
                    />

                    <div className="flex flex-col">
                      <Typography
                        color="black"
                        variant="small"
                        className="font-bold mb-2"
                      >
                        {name}
                      </Typography>

                      <Typography color="black" variant="small">
                        {description}
                      </Typography>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link to={`/shops`} className="text-center">
            <Typography
              variant="small"
              style={{ color: "#EE7C23" }}
              className="mb-2 font-heading mt-4"
            >
              See all shops
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}
