import React from "react";
import axios from "@/lib/axios";

import { useState } from "react";
import { ADMIN_API } from "@/utils/constants";
import {
  Input,
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

export function UpdateBlogTagModal({
  id,
  title,
  isOpen,
  onClose,
  setTitle,
  onAction,
  textColor,
  showOnHome,
  setTextColor,
  setShowOnHome,
  backgroundColor,
  setBackgroundColor,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setIsSubmitting(true);

      await axios.patch(`${ADMIN_API.UPDATE_BLOG_TAG}/${id}`, {
        title,
        textColor,
        showOnHome,
        backgroundColor,
      });

      onAction("edit");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);

      onClose();
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>
        <Typography variant="h6" color="gray">
          Update Blog Tag
        </Typography>
      </DialogHeader>

      <DialogBody className="flex flex-col gap-4">
        <Typography color="gray" variant="small" className="font-semibold">
          Title <span style={{ color: "red" }}>*</span>
        </Typography>

        <Input
          size="lg"
          type="text"
          value={title}
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col w-full md:w-auto">
            <Typography
              color="gray"
              variant="small"
              className="mb-2 font-semibold"
            >
              Text Color <span style={{ color: "red" }}>*</span>
            </Typography>

            <Input
              size="lg"
              type="color"
              value={textColor}
              variant="outlined"
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full md:w-auto">
            <Typography
              color="gray"
              variant="small"
              className="mb-2 font-semibold"
            >
              Background Color <span style={{ color: "red" }}>*</span>
            </Typography>

            <Input
              size="lg"
              type="color"
              variant="outlined"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
        </div>

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

        <div>
          <label className="mt-px font-light text-gray-700 cursor-pointer select-none">
            Blog Tag View
          </label>

          <Typography
            variant="small"
            className="font-semibold p-2 rounded-2xl mt-2 max-w-full"
            style={{
              color: textColor,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              backgroundColor: backgroundColor,
            }}
          >
            {title}
          </Typography>
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
          disabled={!title || !textColor || !backgroundColor || isSubmitting}
        >
          <span>Update</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
