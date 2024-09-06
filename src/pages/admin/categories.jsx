import axios from "@/lib/axios";

import { useState, useEffect } from "react";
import { ADMIN_API } from "@/utils/constants";
import { IconDisplay } from "@/widgets/common";
import { cacheBuster } from "@/utils/cacheBuster";
import { useSearch } from "@/context/admin/search";
import { Pagination, Loader } from "@/widgets/admin";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  CreateCategoryModal,
  UpdateCategoryModal,
  DeleteCategoryModal,
} from "./category/index";
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function Categories() {
  const { searchValue } = useSearch();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [relatedCategories, setRelatedCategories] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCategories(1);
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
    fetchCategories(1);
  };

  const closeCreateModal = () => {
    setOpenCreateModal(false);

    setName("");
    setIcon("");
    setFile(null);
    setDescription("");
    setRelatedCategories([]);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);

    setId("");
    setName("");
    setIcon("");
    setFile(null);
    setDescription("");
    setRelatedCategories([]);
  };

  const closeDeleteModal = () => {
    setId("");
    setOpenDeleteModal(false);
  };

  const handleEdit = (category) => {
    setId(category._id);
    setIcon(category.icon);
    setName(category.name);
    setImageUrl(category.imageUrl);
    setDescription(category.description);
    setRelatedCategories(category.relatedCategories);

    setOpenEditModal(true);
  };

  const handleDelete = (categoryId) => {
    setId(categoryId);
    setOpenDeleteModal(true);
  };

  const onPageChange = (pageNumber) => {
    setIsLoading(true);
    fetchCategories(pageNumber);
  };

  const fetchCategories = async (pageNumber) => {
    try {
      const { data } = await axios.get(ADMIN_API.GET_CATEGORIES, {
        pageNumber,
        searchValue,
      });

      setCurrentPage(pageNumber);
      setCategories(data.categories);
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
              Categories
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
                  {["image", "name", "description", "views", "actions"].map(
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
                {categories.length > 0 &&
                  categories.map(
                    (
                      {
                        _id,
                        name,
                        icon,
                        views,
                        imageUrl,
                        description,
                        relatedCategories,
                      },
                      key,
                    ) => {
                      const className = `py-3 px-5 ${
                        key === categories.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={name}>
                          <td className={className}>
                            <img
                              alt="nature image"
                              src={cacheBuster(imageUrl)}
                              className="h-12 w-20 rounded-2xl object-cover object-center"
                            />
                          </td>

                          <td className={className}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold flex flex-row items-center"
                            >
                              <IconDisplay
                                iconName={icon}
                                className={"inline-block w-6 h-6 mr-2"}
                              />
                              {name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {description}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {views}
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
                                    icon,
                                    imageUrl,
                                    description,
                                    relatedCategories,
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

      <CreateCategoryModal
        name={name}
        icon={icon}
        file={file}
        setIcon={setIcon}
        setName={setName}
        setFile={setFile}
        onAction={onAction}
        isOpen={openCreateModal}
        description={description}
        onClose={closeCreateModal}
        setDescription={setDescription}
        relatedCategories={relatedCategories}
        setRelatedCategories={setRelatedCategories}
      />

      <UpdateCategoryModal
        id={id}
        name={name}
        icon={icon}
        file={file}
        setIcon={setIcon}
        setName={setName}
        setFile={setFile}
        onAction={onAction}
        imageUrl={imageUrl}
        isOpen={openEditModal}
        onClose={closeEditModal}
        description={description}
        setImageUrl={setImageUrl}
        setDescription={setDescription}
        relatedCategories={relatedCategories}
        setRelatedCategories={setRelatedCategories}
      />

      <DeleteCategoryModal
        id={id}
        onAction={onAction}
        isOpen={openDeleteModal}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

export default Categories;
