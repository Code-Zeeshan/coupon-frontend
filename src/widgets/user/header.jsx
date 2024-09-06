import axios from "@/lib/axios";

import { IconDisplay } from "../common";
import { Link } from "react-router-dom";
import { USER_API } from "@/utils/constants";
import { useEffect, useState, Fragment } from "react";
import {
  SunIcon,
  TagIcon,
  Bars4Icon,
  XMarkIcon,
  PhoneIcon,
  UserGroupIcon,
  NewspaperIcon,
  SquaresPlusIcon,
  ChevronDownIcon,
  GlobeAmericasIcon,
  RectangleGroupIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
  Menu,
  Input,
  Navbar,
  Collapse,
  MenuItem,
  ListItem,
  MenuList,
  Typography,
  IconButton,
  MenuHandler,
} from "@material-tailwind/react";

const NavListMenu = ({ title, items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = items?.map(
    ({ to, icon, name, description, image }, key) => (
      <Link to={to} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2">
            {icon && (
              <IconDisplay
                iconName={icon}
                strokeWidth="2"
                className="h-5 text-gray-900 w-5"
              />
            )}

            {image && (
              <img
                src={image}
                alt="company_header_image"
                className="h-5 text-gray-900 w-5"
              />
            )}
          </div>

          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {name}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description && description.length > 80
                ? description.slice(0, 80) + "..."
                : description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ),
  );

  return (
    <Fragment>
      <Menu
        open={isMenuOpen}
        allowHover={true}
        placement="bottom"
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              {title}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </Fragment>
  );
};

export function Header() {
  const [openNav, setOpenNav] = useState(false);

  const [headerCompanies, setHeaderCompanies] = useState([]);
  const [headerCategories, setHeaderCategories] = useState([]);

  useEffect(() => {
    fetchHeaderCompanies();
    fetchHeaderCategories();
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const fetchHeaderCategories = async () => {
    try {
      const { data } = await axios.get(`${USER_API.GET_HEADER_CATEGORIES}`);

      const headerCategories = data.map((category) => ({
        name: category.name,
        icon: category.icon,
        to: `/categories/${category.name}`,
        description: category.description,
      }));

      headerCategories.push({
        to: "/categories",
        name: "See All Categories",
        icon: "ChevronDoubleRightIcon",
        description: "Click here to see all categories",
      });

      setHeaderCategories(headerCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHeaderCompanies = async () => {
    try {
      const { data } = await axios.get(`${USER_API.GET_HEADER_COMPANIES}`);

      const headerCompanies = data.map((company) => ({
        name: company.name,
        image: company.logo,
        to: `/shops/${company.name}`,
        description: company.description,
      }));

      headerCompanies.push({
        to: "/shops",
        name: "See All Shops",
        icon: "ChevronDoubleRightIcon",
        description: "Click here to see all shops",
      });

      setHeaderCompanies(headerCompanies);
    } catch (error) {
      console.error(error);
    }
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>

      <NavListMenu title="Shops" items={headerCompanies} />
      <NavListMenu title="Categories" items={headerCategories} />

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/blogs" className="flex items-center">
          Blogs
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar
      style={{ maxWidth: "100vw" }}
      className="mx-auto px-4 py-2 lg:px-8 lg:py-4"
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between text-blue-gray-900">
        <div className="flex items-center gap-4">
          <Typography
            as="a"
            href="/"
            className="cursor-pointer py-1.5 font-medium"
          >
            <img src="/img/app-logo.png" className="h-4 w-4" alt="Logo" />
          </Typography>

          <div className="hidden lg:block">{navList}</div>
        </div>

        <div className="hidden items-center gap-x-2 lg:flex">
          <button
            className="relative flex w-full gap-2 md:w-max bg-blue-gray-100 text-blue-gray-700 px-4 py-2 rounded-lg hover:bg-blue-gray-200"
            onClick={() => {
              window.location.href = "/coupons";
            }}
          >
            <span>View Coupons</span>
          </button>
        </div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-4 w-4" />
          ) : (
            <Bars4Icon className="h-4 w-4" />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}

          <div className="flex flex-col gap-x-2 sm:flex-row sm:items-center">
            <div className="relative w-full gap-2 md:w-max">
              <Input
                type="search"
                placeholder="Search"
                icon={<MagnifyingGlassIcon className="h-4 w-4" />}
                containerProps={{
                  className: "min-w-[288px]",
                }}
                className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
