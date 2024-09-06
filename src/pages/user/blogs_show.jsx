import axios from "@/lib/axios";
import DOMPurify from "dompurify";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_API } from "@/utils/constants";
import { Typography } from "@material-tailwind/react";

export function BlogsShow() {
  const { name } = useParams();

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [popularCompanies, setPopularCompanies] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetchBlog();
    fetchPopularCompanies();
  }, []);

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`${USER_API.GET_BLOG_BY_NAME}/${name}`);

      setBlog(data);
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

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"></div>;
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6">No blog found.</Typography>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(blog.content);

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-6 px-4 md:px-20">
      <div>
        {blog.tag && (
          <span
            className="inline-block font-semibold text-sm p-2 mt-4 rounded"
            style={{
              color: blog.tag.textColor,
              backgroundColor: blog.tag.backgroundColor,
            }}
          >
            {blog.tag.title}
          </span>
        )}

        <Typography variant="h4" className="font-bold font-heading my-4">
          {blog.title}
        </Typography>

        <Typography variant="paragraph" className="text-gray-500">
          {formattedDate}
        </Typography>
      </div>

      <div className="flex flex-col md:flex-row mt-10">
        <div className="w-full md:w-3/4 md:mr-4">
          <img
            alt="Blog"
            src={blog.titleImage}
            className="w-full h-auto rounded-2xl mb-4"
          />

          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
        </div>

        <div className="w-full md:w-1/4 md:ml-4 hidden md:block">
          <Typography variant="h4" color="black" className="mb-2 font-heading">
            More Shops
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
