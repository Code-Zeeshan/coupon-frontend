import React from "react";
import axios from "@/lib/axios";

import { useState } from "react";
import { ADMIN_API } from "@/utils/constants";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

export function DeleteCategoryModal({ id, isOpen, onClose, onAction }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsDeleting(true);
      await axios.del(`${ADMIN_API.DELETE_CATEGORY}/${id}`);

      onAction("delete");
    } catch (error) {
      console.error(error);
      setIsDeleting(false);

      onClose();
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>
        <Typography variant="h6">Delete Category</Typography>
      </DialogHeader>

      <DialogBody>
        <Typography>Are you sure you want to delete this category?</Typography>
      </DialogBody>

      <DialogFooter className="flex justify-end">
        <Button
          color="gray"
          variant="text"
          className="mr-2"
          onClick={onClose}
          disabled={isDeleting}
        >
          <span>CANCEL</span>
        </Button>
        <Button
          color="gray"
          variant="gradient"
          disabled={isDeleting}
          onClick={handleDelete}
        >
          <span>DELETE</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
