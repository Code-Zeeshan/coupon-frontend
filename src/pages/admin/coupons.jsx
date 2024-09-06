import axios from "@/lib/axios";

import { useState, useEffect } from "react";
import { ADMIN_API } from "@/utils/constants";
import { useSearch } from "@/context/admin/search";
import { Pagination, Loader } from "@/widgets/admin";
import {
  CreateCouponModal,
  DeleteCouponModal,
  UpdateCouponModal,
} from "./coupon/index";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function Coupons() {
  const { searchValue } = useSearch();

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Coupon");
  const [discount, setDiscount] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [description, setDescription] = useState("");
  const [couponTagId, setCouponTagId] = useState(null);

  const [couponId, setCouponId] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCoupons(1);
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
    fetchCoupons(1);
  };

  const closeCreateModal = () => {
    setOpenCreateModal(false);

    setUrl("");
    setTitle("");
    setDiscount("");
    setType("Coupon");
    setCouponCode("");
    setCompanyId(null);
    setDescription("");
    setCouponTagId(null);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);

    setUrl("");
    setTitle("");
    setDiscount("");
    setType("Coupon");
    setCouponCode("");
    setCouponId(null);
    setCompanyId(null);
    setDescription("");
    setCouponTagId(null);
  };

  const closeDeleteModal = () => {
    setCouponId(null);
    setOpenDeleteModal(false);
  };

  const handleEdit = (coupon) => {
    setCouponId(coupon._id);

    setUrl(coupon.url);
    setType(coupon.type);
    setCouponCode(coupon.couponCode);
    setTitle(coupon.title);
    setDiscount(coupon.discount);
    setCouponTagId(coupon.tagId);
    setCompanyId(coupon.company?._id);
    setDescription(coupon.description);

    setOpenEditModal(true);
  };

  const handleDelete = (couponId) => {
    setCouponId(couponId);
    setOpenDeleteModal(true);
  };

  const onPageChange = (pageNumber) => {
    setIsLoading(true);
    fetchCoupons(pageNumber);
  };

  const fetchCoupons = async (pageNumber) => {
    try {
      const { data } = await axios.get(ADMIN_API.GET_COUPONS, {
        pageNumber,
        searchValue,
      });

      setCoupons(data.coupons);
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
              Coupons
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
                    "description",
                    "type",
                    "code",
                    "discount",
                    "url",
                    "company",
                    "tag",
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
                {coupons.length > 0 &&
                  coupons.map(
                    (
                      {
                        _id,
                        url,
                        couponCode,
                        type,
                        title,
                        company,
                        discount,
                        couponTag,
                        description,
                      },
                      key,
                    ) => {
                      const className = `py-3 px-5 ${
                        key === coupons.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={title}>
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
                            <Typography variant="small" color="blue-gray">
                              {description}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {type}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {couponCode}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {discount}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {url}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {company?.name || ""}
                            </Typography>
                          </td>

                          <td className={className}>
                            {couponTag ? (
                              <Typography
                                variant="small"
                                className="font-semibold p-2 rounded-2xl"
                                style={{
                                  color: couponTag.textColor,
                                  backgroundColor: couponTag.backgroundColor,
                                }}
                              >
                                {couponTag.title}
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
                                    description,
                                    type,
                                    couponCode,
                                    url,
                                    discount,
                                    company,
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

      <CreateCouponModal
        url={url}
        type={type}
        title={title}
        setUrl={setUrl}
        setType={setType}
        setTitle={setTitle}
        onAction={onAction}
        discount={discount}
        companyId={companyId}
        couponCode={couponCode}
        isOpen={openCreateModal}
        couponTagId={couponTagId}
        description={description}
        setDiscount={setDiscount}
        onClose={closeCreateModal}
        setCompanyId={setCompanyId}
        setCouponCode={setCouponCode}
        setCouponTagId={setCouponTagId}
        setDescription={setDescription}
      />

      <UpdateCouponModal
        url={url}
        type={type}
        title={title}
        setUrl={setUrl}
        setType={setType}
        setTitle={setTitle}
        discount={discount}
        onAction={onAction}
        couponId={couponId}
        companyId={companyId}
        isOpen={openEditModal}
        couponCode={couponCode}
        onClose={closeEditModal}
        setDiscount={setDiscount}
        description={description}
        setCouponId={setCouponId}
        couponTagId={couponTagId}
        setCompanyId={setCompanyId}
        setCouponCode={setCouponCode}
        setCouponTagId={setCouponTagId}
        setDescription={setDescription}
      />

      <DeleteCouponModal
        onAction={onAction}
        couponId={couponId}
        isOpen={openDeleteModal}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

export default Coupons;
