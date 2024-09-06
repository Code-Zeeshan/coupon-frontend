import { IconButton, Typography } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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
      <div className="flex items-center">
        <Typography variant="small" color="gray" className="font-normal mr-4">
          {currentPage} - {totalPages} of {totalPages}
        </Typography>

        <IconButton
          size="sm"
          onClick={prev}
          variant="outlined"
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </IconButton>

        <IconButton
          size="sm"
          onClick={next}
          variant="outlined"
          disabled={currentPage === 10}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
}
