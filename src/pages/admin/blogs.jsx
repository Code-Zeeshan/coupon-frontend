import axios from "@/lib/axios";

import { useState, useEffect } from "react";
import { ADMIN_API } from "@/utils/constants";
import { useSearch } from "@/context/admin/search";
import { Pagination, Loader } from "@/widgets/admin";
import {
  CreateBlogModal,
  UpdateBlogModal,
  DeleteBlogModal,
} from "./blog/index";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function Blogs() {
  const { searchValue } = useSearch();

  const [title, setTitle] = useState("");
  const [tagId, setTagId] = useState("");
  const [blogId, setBlogId] = useState(null);
  const [content, setContent] = useState("");
  const [titleImage, setTitleImage] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchBlogs(1);
  }, [searchValue]);

  const onAction = (action) => {
    if (action === "edit") {
      closeEditModal();
    } else if (action === "create") {
      closeCreateModal();
    } else {
      closeDeleteModal();
    }

    setIsLoading(true);
    fetchBlogs(1);
  };

  const handleEdit = (blog) => {
    setBlogId(blog._id);
    setTitle(blog.title);
    setTagId(blog.tagId);
    setContent(blog.content);
    setTitleImage(blog.titleImage);

    setOpenEditModal(true);
  };

  const handleDelete = (blogId) => {
    setBlogId(blogId);
    setOpenDeleteModal(true);
  };

  const closeCreateModal = () => {
    setOpenCreateModal(false);

    setTitle("");
    setTagId(null);
    setBlogId(null);
    setContent("");
    setTitleImage("");
  };

  const closeEditModal = () => {
    setOpenEditModal(false);

    setTitle("");
    setBlogId(null);
    setContent("");
  };

  const closeDeleteModal = () => {
    setBlogId(null);
    setOpenDeleteModal(false);
  };

  const onPageChange = (pageNumber) => {
    setIsLoading(true);
    fetchBlogs(pageNumber);
  };

  const fetchBlogs = async (pageNumber) => {
    try {
      const { data } = await axios.get(ADMIN_API.GET_BLOGS, {
        pageNumber,
        searchValue,
      });

      setBlogs(data.blogs);
      setCurrentPage(pageNumber);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Blogs
            </Typography>

            <Button
              size="sm"
              color="white"
              className="flex items-center"
              onClick={() => setOpenCreateModal(true)}
            >
              Create
            </Button>
          </div>
        </CardHeader>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader />
          </div>
        ) : (
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["logo", "title", "tag", "actions"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {blogs.length > 0 &&
                  blogs.map(({ titleImage, title, _id, tag, content }, key) => {
                    const className = `py-3 px-5 ${
                      key === blogs.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <img
                            src={titleImage}
                            alt="nature image"
                            className="h-20 w-20 rounded-full object-cover object-center"
                          />
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {title}
                          </Typography>
                        </td>

                        <td className={className}>
                          {tag ? (
                            <Typography
                              variant="small"
                              className="font-semibold p-2 rounded-2xl"
                              style={{
                                backgroundColor: tag.backgroundColor,
                                color: tag.textColor,
                              }}
                            >
                              {tag.title}
                            </Typography>
                          ) : (
                            <Typography
                              variant="small"
                              className="font-semibold p-2"
                            >
                              No Tag Added
                            </Typography>
                          )}
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600"
                              onClick={() =>
                                handleEdit({
                                  _id,
                                  title,
                                  content,
                                  titleImage,
                                  tagId: tag?._id,
                                })
                              }
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                            </Typography>

                            <Typography
                              as="a"
                              href="#"
                              onClick={() => handleDelete(_id)}
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </Typography>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </CardBody>
        )}
      </Card>

      <CreateBlogModal
        title={title}
        tagId={tagId}
        content={content}
        setTagId={setTagId}
        setTitle={setTitle}
        onAction={onAction}
        setContent={setContent}
        titleImage={titleImage}
        isOpen={openCreateModal}
        onClose={closeCreateModal}
        setTitleImage={setTitleImage}
      />

      <UpdateBlogModal
        id={blogId}
        title={title}
        tagId={tagId}
        content={content}
        setTitle={setTitle}
        onAction={onAction}
        setTagId={setTagId}
        isOpen={openEditModal}
        setContent={setContent}
        titleImage={titleImage}
        onClose={closeEditModal}
        setTitleImage={setTitleImage}
      />

      <DeleteBlogModal
        blogId={blogId}
        onAction={onAction}
        isOpen={openDeleteModal}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

export default Blogs;
