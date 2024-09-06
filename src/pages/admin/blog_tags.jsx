import axios from "@/lib/axios";

import { useState, useEffect } from "react";
import { ADMIN_API } from "@/utils/constants";
import { useSearch } from "@/context/admin/search";
import { Pagination, Loader } from "@/widgets/admin";
import {
  CreateBlogTagModal,
  UpdateBlogTagModal,
  DeleteBlogTagModal,
} from "./blog_tag/index";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function BlogTags() {
  const { searchValue } = useSearch();

  const [title, setTitle] = useState("");
  const [textColor, setTextColor] = useState("");
  const [blogTagId, setBlogTagId] = useState(null);
  const [showOnHome, setShowOnHome] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [blogTags, setBlogTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchBlogTags(1);
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
    fetchBlogTags(1);
  };

  const handleEdit = (blogTag) => {
    setTitle(blogTag.title);
    setBlogTagId(blogTag._id);
    setTextColor(blogTag.textColor);
    setShowOnHome(blogTag.showOnHome);
    setBackgroundColor(blogTag.backgroundColor);

    setOpenEditModal(true);
  };

  const handleDelete = (blogTagId) => {
    setBlogTagId(blogTagId);
    setOpenDeleteModal(true);
  };

  const closeCreateModal = () => {
    setOpenCreateModal(false);

    setTitle("");
    setBlogTagId("");
    setTextColor("");
    setShowOnHome(false);
    setBackgroundColor("");
  };

  const closeEditModal = () => {
    setOpenEditModal(false);

    setTitle("");
    setBlogTagId("");
    setTextColor("");
    setShowOnHome(false);
    setBackgroundColor("");
  };

  const closeDeleteModal = () => {
    setBlogTagId("");
    setOpenDeleteModal(false);
  };

  const onPageChange = (pageNumber) => {
    setIsLoading(true);
    fetchBlogTags(pageNumber);
  };

  const fetchBlogTags = async (pageNumber) => {
    try {
      const { data } = await axios.get(ADMIN_API.GET_BLOG_TAGS, {
        pageNumber,
        searchValue,
      });

      setBlogTags(data.blogTags);
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
              Blog Tags
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
                  {[
                    "title",
                    "text color",
                    "background color",
                    "Show On Home",
                    "actions",
                  ].map((el) => (
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
                {blogTags.length > 0 &&
                  blogTags.map(
                    (
                      { title, textColor, backgroundColor, showOnHome, _id },
                      key,
                    ) => {
                      const className = `py-3 px-5 ${
                        key === blogTags.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={key}>
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
                            <Typography
                              variant="small"
                              className="font-semibold"
                              style={{ color: textColor }}
                            >
                              {textColor}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="font-semibold w-24 p-2 rounded-2xl"
                              style={{
                                backgroundColor: backgroundColor,
                                color: textColor,
                              }}
                            >
                              {backgroundColor}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="font-semibold w-24 p-2 rounded-2xl"
                            >
                              {showOnHome ? "True" : "False"}
                            </Typography>
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
                                    textColor,
                                    showOnHome,
                                    backgroundColor,
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
                    },
                  )}
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

      <CreateBlogTagModal
        title={title}
        setTitle={setTitle}
        onAction={onAction}
        textColor={textColor}
        showOnHome={showOnHome}
        isOpen={openCreateModal}
        onClose={closeCreateModal}
        setTextColor={setTextColor}
        setShowOnHome={setShowOnHome}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />

      <UpdateBlogTagModal
        title={title}
        id={blogTagId}
        setTitle={setTitle}
        onAction={onAction}
        textColor={textColor}
        isOpen={openEditModal}
        showOnHome={showOnHome}
        onClose={closeEditModal}
        setTextColor={setTextColor}
        setShowOnHome={setShowOnHome}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />

      <DeleteBlogTagModal
        onAction={onAction}
        blogTagId={blogTagId}
        isOpen={openDeleteModal}
        onClose={closeDeleteModal}
      />
    </div>
  );
}
