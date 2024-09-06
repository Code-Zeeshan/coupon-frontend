import axios from "@/lib/axios";
import Select from "react-tailwindcss-select";

import { useState, useEffect } from "react";
import { ADMIN_API } from "@/utils/constants";
import { IconSelect, ImagePicker } from "@/widgets/admin";
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

export function CreateCategoryModal({
  icon,
  name,
  file,
  isOpen,
  onClose,
  setName,
  setIcon,
  setFile,
  onAction,
  description,
  setDescription,
  relatedCategories,
  setRelatedCategories,
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
      const { data } = await axios.get(ADMIN_API.GET_ALL_CATEGORIES);
      setAllCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("icon", icon);
      formData.append("image", file);
      formData.append("description", description);
      formData.append("relatedCategories", JSON.stringify(relatedCategories));

      await axios.post(ADMIN_API.CREATE_CATEGORY, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onAction("create");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);

      onClose();
    }
  };

  const handleRelatedCategoryChange = (selectedItems) => {
    if (selectedItems && selectedItems.length) {
      const selectedCategoryIds = selectedItems.map((item) => item.value);
      setRelatedCategories(selectedCategoryIds);
    } else {
      setRelatedCategories([]);
    }
  };

  const categoriesOptions = () => {
    return allCategories.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
  };

  return (
    isOpen && (
      <Dialog open={isOpen} handler={onClose}>
        <DialogHeader>
          <Typography variant="h6">Create Category</Typography>
        </DialogHeader>

        <DialogBody>
          <div className="mb-4">
            <Typography
              color="gray"
              variant="small"
              className="mb-2 font-semibold"
            >
              Name <span style={{ color: "red" }}>*</span>
            </Typography>

            <Input
              size="lg"
              type="text"
              value={name}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Typography
              color="gray"
              variant="small"
              className="mb-2 font-semibold"
            >
              Description <span style={{ color: "red" }}>*</span>
            </Typography>

            <Textarea
              rows={4}
              required={true}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Typography
              color="gray"
              variant="small"
              className="mb-2 font-semibold"
            >
              Category Icon <span style={{ color: "red" }}>*</span>
            </Typography>

            <IconSelect icon={icon} setIcon={setIcon} />
          </div>

          <div className="mb-4">
            <Typography
              color="gray"
              variant="small"
              className="mb-2 font-semibold"
            >
              Related Categories
            </Typography>

            {allCategories.length > 0 && (
              <Select
                isMultiple={true}
                options={categoriesOptions()}
                onChange={handleRelatedCategoryChange}
                value={categoriesOptions().filter((option) =>
                  relatedCategories.includes(option.value),
                )}
              />
            )}
          </div>

          <div className="mb-4">
            <Typography
              color="gray"
              variant="small"
              className="mb-2 font-semibold"
            >
              Category Image <span style={{ color: "red" }}>*</span>
            </Typography>

            <ImagePicker
              file={file}
              setFile={setFile}
              placeHolder={"Upload Category Image"}
            />
          </div>
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
            disabled={!name || !description || !icon || !file || isSubmitting}
          >
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    )
  );
}
