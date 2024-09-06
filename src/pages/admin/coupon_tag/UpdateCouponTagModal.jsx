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

export function UpdateCouponTagModal({
  id,
  title,
  isOpen,
  onClose,
  setTitle,
  onAction,
  textColor,
  setTextColor,
  backgroundColor,
  setBackgroundColor,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setIsSubmitting(true);

      await axios.patch(`${ADMIN_API.UPDATE_COUPON_TAG}/${id}`, {
        title,
        textColor,
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
          Update Coupon Tag
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

        <div>
          <label className="mt-px font-light text-gray-700 cursor-pointer select-none">
            Coupon Tag View
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
