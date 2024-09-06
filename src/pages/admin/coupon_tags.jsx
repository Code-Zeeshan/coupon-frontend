import axios from "@/lib/axios";

import { useState, useEffect } from "react";
import { ADMIN_API } from "@/utils/constants";
import { useSearch } from "@/context/admin/search";
import { Pagination, Loader } from "@/widgets/admin";
import {
  UpdateCouponTagModal,
  DeleteCouponTagModal,
  CreateCouponTagModal,
} from "./coupon_tag/index";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function CouponTags() {
  const { searchValue } = useSearch();

  const [title, setTitle] = useState("");
  const [textColor, setTextColor] = useState("");
  const [couponTagId, setCouponTagId] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [couponTags, setCouponTags] = useState([]);
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

  const handleEdit = (couponTag) => {
    setTitle(couponTag.title);
    setCouponTagId(couponTag._id);
    setTextColor(couponTag.textColor);
    setBackgroundColor(couponTag.backgroundColor);

    setOpenEditModal(true);
  };

  const handleDelete = (couponTagId) => {
    setCouponTagId(couponTagId);
    setOpenDeleteModal(true);
  };

  const closeCreateModal = () => {
    setOpenCreateModal(false);

    setTitle("");
    setTextColor("");
    setCouponTagId("");
    setBackgroundColor("");
  };

  const closeEditModal = () => {
    setOpenEditModal(false);

    setTitle("");
    setTextColor("");
    setCouponTagId("");
    setBackgroundColor("");
  };

  const closeDeleteModal = () => {
    setCouponTagId("");
    setOpenDeleteModal(false);
  };

  const onPageChange = (pageNumber) => {
    setIsLoading(true);
    fetchBlogTags(pageNumber);
  };

  const fetchBlogTags = async (pageNumber) => {
    try {
      const { data } = await axios.get(ADMIN_API.GET_COUPON_TAGS, {
        pageNumber,
        searchValue,
      });

      setCurrentPage(pageNumber);
      setCouponTags(data.couponTags);
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
              Coupon Tags
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
                  {["title", "text color", "background color", "actions"].map(
                    (el) => (
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
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {couponTags.length > 0 &&
                  couponTags.map(
                    ({ title, textColor, backgroundColor, _id }, key) => {
                      const className = `py-3 px-5 ${
                        key === couponTags.length - 1
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

      <CreateCouponTagModal
        title={title}
        setTitle={setTitle}
        onAction={onAction}
        textColor={textColor}
        isOpen={openCreateModal}
        onClose={closeCreateModal}
        setTextColor={setTextColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />

      <UpdateCouponTagModal
        title={title}
        id={couponTagId}
        setTitle={setTitle}
        onAction={onAction}
        textColor={textColor}
        isOpen={openEditModal}
        onClose={closeEditModal}
        setTextColor={setTextColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />

      <DeleteCouponTagModal
        onAction={onAction}
        isOpen={openDeleteModal}
        couponTagId={couponTagId}
        onClose={closeDeleteModal}
      />
    </div>
  );
}
