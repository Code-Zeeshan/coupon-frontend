import axios from "@/lib/axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_API } from "@/utils/constants";
import { Typography } from "@material-tailwind/react";

export function ShopsShow() {
  const { name } = useParams();

  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCompany();
  }, [name]);

  const fetchCompany = async () => {
    try {
      const { data } = await axios.get(
        `${USER_API.GET_CATEGORY_BY_NAME}/${name}`,
      );

      setCompany(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F9F9F9]"></div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F9F9F9]">
        <Typography variant="h6">No company found.</Typography>
      </div>
    );
  }

  const formattedDate =
    new Date(company.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }) + " vouchers";

  return (
    <div className="py-6 px-4 md:px-20 bg-[#F9F9F9]">
      <div className="flex items-start">
        <img
          alt={company.name}
          src={company.imageUrl}
          className="mr-8 w-32 h-20 object-cover rounded-3xl"
        />

        <div>
          <Typography variant="h4" className="font-bold font-heading">
            {company.name}
          </Typography>

          <Typography variant="paragraph" className="text-gray-500">
            {formattedDate}
          </Typography>

          <Typography variant="small" className="mt-2">
            {company.description}
          </Typography>

          <div className="mt-4 flex flex-row">
            <Typography variant="paragraph">Related Categories:</Typography>

            {company.relatedCategories.map((relatedCategory) => (
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
          {[].map(({ name, description, icon }, key) => {
            return (
              <Link
                key={key}
                to={`/categories/${name}`}
                className=" link-no-underline mb-4 bg-white rounded-lg p-4 flex items-center"
              >
                <div className="w-16 h-16 bg-gray-300 rounded mr-4">
                  <IconDisplay iconName={icon} className={"w-16 h-16"} />
                </div>

                {/* Right Content */}
                <div className="flex flex-col justify-between">
                  <div className="flex items-center">
                    <Typography variant="h6" color="black">
                      {name}
                    </Typography>

                    <ChevronRightIcon className="h-4 w-4 ml-4" />
                  </div>

                  <Typography variant="small" color="gray">
                    {description}
                  </Typography>

                  <Typography variant="small" color="gray">
                    Vouchers:
                  </Typography>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="w-full md:w-1/4 md:ml-4 hidden md:block">
          <Typography variant="h4" color="black" className="mb-4 font-heading">
            See other vouchers
          </Typography>

          {/* Fetch popular 10 coupons */}
          <div className="flex flex-col">
            {[].map(({ name, description, icon }, key) => {
              return (
                <Link
                  key={key}
                  to={`/categories/${name}`}
                  className="link-no-underline my-4"
                >
                  <div className="flex flex-row items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded mr-4">
                      <IconDisplay iconName={icon} className={"w-16 h-16"} />
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
                        {description}
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
