import axios from "@/lib/axios";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { USER_API } from "@/utils/constants";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Typography, Spinner } from "@material-tailwind/react";

export function BlogsAndStories() {
  const [topBlogs, setTopBlogs] = useState([]);
  const [isLoadingTopBlogs, setIsLoadingTopBlogs] = useState(true);

  useEffect(() => {
    fetchTopBlogs();
  }, []);

  const fetchTopBlogs = async () => {
    try {
      const { data } = await axios.get(USER_API.GET_TOP_BLOGS);

      setTopBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingTopBlogs(false);
    }
  };

  if (isLoadingTopBlogs) {
    return (
      <div className="flex justify-center my-8">
        <Spinner color="blue" size="xl" />
      </div>
    );
  }

  return (
    <div className="bg-[#EE7C231A] my-8 mx-4 md:mx-20 p-6 rounded-2xl py-20">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col justify-center md:w-full md:pr-8">
          <Typography
            variant="h4"
            className="font-medium font-heading"
            style={{ color: "#EE7C23" }}
          >
            Blogs & Stories
          </Typography>

          <Typography
            className="mt-2"
            variant="paragraph"
            style={{ color: "#C2A271" }}
          >
            Explore our curated collection of insightful reads, handpicked to
            inspire and inform
          </Typography>

          <Link
            to={"/all_blogs"}
            className="bg-[#EE7C23] rounded flex flex-row items-center max-w-max p-1 mt-2"
          >
            <Typography
              color="white"
              variant="paragraph"
              className="font-medium mr-4"
            >
              See All
            </Typography>

            <ArrowRightIcon className="h-4 w-4" color="white" />
          </Link>
        </div>

        <div className="flex md:flex-row flex-col mt-6 md:mt-0 md:gap-4">
          {topBlogs.slice(0, 3).map((blog, index) => (
            <Link
              key={index}
              to={`/blogs/${blog.title}`}
              className="bg-[#F5F7F8] rounded-2xl mb-4 flex flex-col"
            >
              <img
                alt="Blog"
                src={blog.titleImage}
                className="w-full h-auto rounded-t-2xl"
              />

              <div className="pl-5 pb-4">
                <Typography variant="h6" color="black" className="py-4">
                  {blog.title}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
