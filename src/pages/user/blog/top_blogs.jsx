import { Link } from "react-router-dom";
import { formatCreatedAt } from "@/utils/helper";
import { Spinner, Typography } from "@material-tailwind/react";

export function TopBlogs({ isLoading, topBlogs }) {
  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner color="blue" size="xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      {topBlogs.length > 0 && (
        <Link
          to={`/blogs/${topBlogs[0].title}`}
          className="w-full md:w-1/2 bg-[#F5F7F8] rounded-2xl md:mr-4 mb-4 md:mb-0 flex flex-col justify-between relative"
        >
          <img
            alt="Blog"
            src={topBlogs[0].titleImage}
            className="w-full h-auto rounded-2xl"
          />

          <div className="pl-5 pb-4">
            {topBlogs[0].tag && (
              <span
                className="inline-block font-semibold text-sm p-2 mt-4 rounded"
                style={{
                  color: topBlogs[0].tag.textColor,
                  backgroundColor: topBlogs[0].tag.backgroundColor,
                }}
              >
                {topBlogs[0].tag.title}
              </span>
            )}

            <Typography variant="h6" color="black" className="py-4">
              {topBlogs[0].title}
            </Typography>

            <Typography variant="small" color="black">
              {formatCreatedAt(topBlogs[0].createdAt)}
            </Typography>
          </div>
        </Link>
      )}

      <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {topBlogs.slice(1).map((blog, index) => (
          <Link
            key={index}
            to={`/blogs/${blog.title}`}
            className="bg-[#F5F7F8] rounded-2xl flex flex-col justify-between relative"
          >
            <img
              alt="Blog"
              src={blog.titleImage}
              className="w-full h-auto rounded-2xl"
            />

            <div className="pl-5 pb-4">
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

              <Typography variant="h6" color="black" className="py-4">
                {blog.title}
              </Typography>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
