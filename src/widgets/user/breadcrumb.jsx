import React from "react";

import { useLocation, Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x)
    .map((pathname) => decodeURIComponent(pathname)); // Decode URI components

  const isHome = pathnames.length === 0;
  if (isHome) return null;

  return (
    <nav
      aria-label="breadcrumb"
      className="w-full md:w-max p-3 md:p-6 px-4 md:px-20"
    >
      <ol className="flex flex-wrap items-center w-full p-1 rounded-full bg-opacity-60">
        <li className="flex items-center pr-2 md:pr-4">
          <Link
            to="/"
            className="pr-2 md:pr-3 py-1 font-medium text-gray-500 hover:text-light-blue-500"
          >
            <Typography variant="small" color="gray" fontWeight="medium">
              Home
            </Typography>
          </Link>

          <span className="text-sm text-gray-500">
            <ArrowRightIcon className="w-3 h-3" />
          </span>
        </li>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={to} className="flex items-center">
              <Typography
                variant="small"
                fontWeight="medium"
                style={{ color: "#EE7C23" }}
                className="px-2 md:px-3 py-1 font-medium"
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Typography>
            </li>
          ) : (
            <li key={to} className="flex items-center pr-2 md:pr-4">
              <Link
                to={to}
                className="px-2 md:px-3 py-1 font-medium hover:text-light-blue-500"
              >
                <Typography
                  variant="small"
                  fontWeight="medium"
                  style={{ color: "#EE7C23" }}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Typography>
              </Link>

              <span className="mx-1 md:mx-2 text-gray-500">
                <ArrowRightIcon className="w-3 h-3" />
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
