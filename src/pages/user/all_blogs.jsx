import axios from "@/lib/axios";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pagination } from "@/widgets/user";
import { USER_API } from "@/utils/constants";
import { Spinner, Typography } from "@material-tailwind/react";

export function AllBlogs() {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [allBlogs, setAllBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllBlogs(1);
  }, []);

  const fetchAllBlogs = async (pageNumber) => {
    try {
      const { data } = await axios.get(USER_API.GET_ALL_BLOGS, {
        pageNumber,
      });

      setCurrentPage(pageNumber);
      setAllBlogs(data.allBlogs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (pageNumber) => {
    setIsLoading(true);
    fetchAllBlogs(pageNumber);
  };

  return (
    <div className="py-6 px-4 md:px-20">
      <Typography variant="h3" color="black" className="font-bold mb-4">
        All Blogs
      </Typography>

      {isLoading ? (
        <div className="flex justify-center my-8">
          <Spinner color="blue" size="xl" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allBlogs.map(({ titleImage, title }, key) => (
              <Link
                key={key}
                to={`/blogs/${title}`}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="bg-[#F5F7F8] rounded-2xl">
                  <img
                    alt="Blog"
                    src={titleImage}
                    className="w-full h-auto rounded-t-2xl mb-4"
                  />
                  <Typography variant="h6" color="black" className="pl-5 pb-4">
                    {title}
                  </Typography>
                </div>
              </Link>
            ))}
          </div>

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
