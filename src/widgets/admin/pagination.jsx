import React from "react";

import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ totalPages, currentPage, onPageChange }) {
  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  return (
    <div className="flex justify-end pt-4 pr-4">
      <div className="flex items-center gap-4">
        <IconButton
          size="sm"
          onClick={prev}
          variant="outlined"
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-3 w-3" />
        </IconButton>

        <Typography color="gray" className="text-sm font-normal">
          Page <strong className="text-gray-900 text-sm">{currentPage}</strong>{" "}
          of <strong className="text-gray-900 text-sm">{totalPages}</strong>
        </Typography>

        <IconButton
          size="sm"
          onClick={next}
          variant="outlined"
          disabled={currentPage === totalPages}
        >
          <ArrowRightIcon strokeWidth={2} className="h-3 w-3" />
        </IconButton>
      </div>
    </div>
  );
}
