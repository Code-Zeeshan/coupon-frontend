import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Spinner, Typography } from "@material-tailwind/react";

export function BlogsWithTags({ isLoading, blogsWithTags }) {
  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner color="blue" size="xl" />
      </div>
    );
  }

  return (
    <div className="mt-10">
      {blogsWithTags.map((tagGroup, index) => (
        <div key={index} className="mb-8">
          <Link to="/all_blogs" className="flex items-center mb-4">
            <Typography variant="h4" color="black" className="mr-2">
              {tagGroup.tagTitle}
            </Typography>
            <ChevronRightIcon className="h-6 w-6" />
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {tagGroup.blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/${blog.title}`}
                className="flex flex-col bg-[#F5F7F8] rounded-2xl justify-between relative"
              >
                <img
                  alt="Blog"
                  src={blog.titleImage}
                  className="w-full h-auto rounded-t-2xl mb-4"
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
      ))}
    </div>
  );
}
