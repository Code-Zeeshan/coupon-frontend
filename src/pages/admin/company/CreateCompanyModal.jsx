import axios from "@/lib/axios";
import Select from "react-tailwindcss-select";

import { useState, useEffect } from "react";
import { ADMIN_API } from "@/utils/constants";
import { ImagePicker } from "@/widgets/admin";
import {
  Input,
  Button,
  Dialog,
  Textarea,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

export function CreateCompanyModal({
  name,
  file,
  isOpen,
  onClose,
  setName,
  setFile,
  onAction,
  discount,
  showOnHome,
  companyUrl,
  categories,
  setDiscount,
  description,
  setCompanyUrl,
  setCategories,
  setShowOnHome,
  setDescription,
}) {
  const [allCategories, setAllCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAllCategories();
    }
  }, [isOpen]);

  const fetchAllCategories = async () => {
    try {
      const { data } = await axios.get(ADMIN_API.GET_ALL_CATEGORIES, {
        filter: {},
      });

      setAllCategories(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    if (!name || !description || !companyUrl) return;

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("discount", discount);
      formData.append("companyUrl", companyUrl);
      formData.append("showOnHome", showOnHome);

      if (categories.length > 0) {
        formData.append("categories", JSON.stringify(categories));
      }

      formData.append("description", description);
      formData.append("logo", file);

      await axios.post(ADMIN_API.CREATE_COMPANY, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onAction("create");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);

      onClose();
    }
  };

  const handleCategoryChange = (selectedItems) => {
    if (selectedItems && selectedItems.length) {
      const selectedCategoryIds = selectedItems.map((item) => item.value);
      setCategories(selectedCategoryIds);
    } else {
      setCategories([]);
    }
  };

  const categoriesOptions = () => {
    return allCategories.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>
        <Typography variant="h6">Create Company</Typography>
      </DialogHeader>

      <DialogBody className="flex flex-col gap-4 h-[70vh] overflow-auto">
        <Typography color="gray" variant="small" className="font-semibold">
          Name <span style={{ color: "red" }}>*</span>
        </Typography>

        <Input
          size="lg"
          type="text"
          value={name}
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />

        <Typography color="gray" variant="small" className="font-semibold">
          Company URL <span style={{ color: "red" }}>*</span>
        </Typography>

        <Input
          size="lg"
          type="text"
          value={companyUrl}
          variant="outlined"
          onChange={(e) => setCompanyUrl(e.target.value)}
        />

        <Typography color="gray" variant="small" className="font-semibold">
          Discount
        </Typography>

        <Input
          size="lg"
          type="text"
          value={discount}
          variant="outlined"
          onChange={(e) => setDiscount(e.target.value)}
        />

        <div className="inline-flex items-center">
          <label
            htmlFor="showOnHome"
            className="mt-px font-light text-gray-700 cursor-pointer select-none mr-2"
          >
            Show On Home
          </label>
          <label className="relative flex items-center p-3 rounded-full cursor-pointer">
            <input
              id="showOnHome"
              type="checkbox"
              checked={showOnHome}
              onChange={() => setShowOnHome((prev) => !prev)}
              className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
            />
            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
        </div>

        <div className="mb-4">
          <Typography
            color="gray"
            variant="small"
            className="mb-2 font-semibold"
          >
            Categories
          </Typography>

          {allCategories.length > 0 && (
            <Select
              isMultiple={true}
              options={categoriesOptions()}
              onChange={handleCategoryChange}
              value={categoriesOptions().filter((option) =>
                categories.includes(option.value),
              )}
            />
          )}
        </div>

        <Typography color="gray" variant="small" className="font-semibold">
          Description <span style={{ color: "red" }}>*</span>
        </Typography>
        <Textarea
          rows={4}
          value={description}
          className="resize-none"
          onChange={(e) => setDescription(e.target.value)}
        />

        <Typography color="gray" variant="small" className="mb-2 font-semibold">
          Company Image <span style={{ color: "red" }}>*</span>
        </Typography>
        <ImagePicker
          file={file}
          setFile={setFile}
          placeHolder={"Upload Company Image"}
        />
      </DialogBody>

      <DialogFooter className="flex justify-end">
        <Button
          color="gray"
          variant="text"
          className="mr-2"
          onClick={onClose}
          disabled={isSubmitting}
        >
          <span>Cancel</span>
        </Button>

        <Button
          color="gray"
          variant="gradient"
          onClick={handleSubmit}
          disabled={!name || !description || !companyUrl || isSubmitting}
        >
          <span>Submit</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
