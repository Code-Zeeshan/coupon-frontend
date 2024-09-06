import axios from "@/lib/axios";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ADMIN_API } from "@/utils/constants";
import { cacheBuster } from "@/utils/cacheBuster";
import { useSearch } from "@/context/admin/search";
import { Pagination, Loader } from "@/widgets/admin";
import {
  CreateCompanyModal,
  UpdateCompanyModal,
  DeleteCompanyModal,
} from "./company/index";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function Companies() {
  const { searchValue } = useSearch();

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [file, setFile] = useState(null);
  const [discount, setDiscount] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [companyUrl, setCompanyUrl] = useState("");
  const [description, setDescription] = useState("");
  const [showOnHome, setShowOnHome] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCompanies(1);
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
    fetchCompanies(1);
  };

  const handleEdit = (company) => {
    setName(company.name);
    setLogo(company.logo);
    setCompanyId(company._id);
    setDiscount(company.discount);
    setCompanyUrl(company.companyUrl);
    setCategories(company.categories);
    setShowOnHome(company.showOnHome);
    setDescription(company.description);

    setOpenEditModal(true);
  };

  const handleDelete = (companyId) => {
    setCompanyId(companyId);
    setOpenDeleteModal(true);
  };

  const closeCreateModal = () => {
    setOpenCreateModal(false);

    setName("");
    setLogo("");
    setFile(null);
    setDiscount("");
    setCompanyId("");
    setCompanyUrl("");
    setCategories([]);
    setDescription("");
    setShowOnHome(false);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);

    setName("");
    setLogo("");
    setFile(null);
    setDiscount("");
    setCompanyId("");
    setCategories([]);
    setCompanyUrl("");
    setDescription("");
    setShowOnHome(false);
  };

  const closeDeleteModal = () => {
    setCompanyId("");
    setOpenDeleteModal(false);
  };

  const onPageChange = (pageNumber) => {
    setIsLoading(true);
    fetchCompanies(pageNumber);
  };

  const fetchCompanies = async (pageNumber) => {
    try {
      const { data } = await axios.get(ADMIN_API.GET_COMPANIES, {
        pageNumber,
        searchValue,
      });

      setCurrentPage(pageNumber);
      setCompanies(data.companies);
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
              Companies
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
                    "logo",
                    "name",
                    "description",
                    "discount",
                    "total categories",
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
                {companies.length > 0 &&
                  companies.map(
                    (
                      {
                        _id,
                        logo,
                        name,
                        discount,
                        categories,
                        companyUrl,
                        description,
                        showOnHome,
                      },
                      key,
                    ) => {
                      const className = `py-3 px-5 ${
                        key === companies.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={name}>
                          <td className={className}>
                            <img
                              alt="company image"
                              src={cacheBuster(logo)}
                              className="h-20 w-20 rounded-full object-cover object-center"
                            />
                          </td>
                          <td className={className}>
                            <Link to={companyUrl}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                            </Link>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {description}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {discount}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {categories.length}
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
                                    name,
                                    logo,
                                    discount,
                                    companyUrl,
                                    categories,
                                    description,
                                    showOnHome,
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

      <CreateCompanyModal
        file={file}
        name={name}
        setFile={setFile}
        setName={setName}
        discount={discount}
        onAction={onAction}
        companyUrl={companyUrl}
        showOnHome={showOnHome}
        categories={categories}
        isOpen={openCreateModal}
        setDiscount={setDiscount}
        description={description}
        onClose={closeCreateModal}
        setCategories={setCategories}
        setShowOnHome={setShowOnHome}
        setCompanyUrl={setCompanyUrl}
        setDescription={setDescription}
      />

      <UpdateCompanyModal
        name={name}
        logo={logo}
        file={file}
        setLogo={setLogo}
        setName={setName}
        setFile={setFile}
        onAction={onAction}
        discount={discount}
        companyId={companyId}
        isOpen={openEditModal}
        companyUrl={companyUrl}
        showOnHome={showOnHome}
        categories={categories}
        onClose={closeEditModal}
        description={description}
        setDiscount={setDiscount}
        setCategories={setCategories}
        setShowOnHome={setShowOnHome}
        setCompanyUrl={setCompanyUrl}
        setDescription={setDescription}
      />

      <DeleteCompanyModal
        onAction={onAction}
        companyId={companyId}
        isOpen={openDeleteModal}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

export default Companies;
