import { useSearch } from "@/context/admin/search";
import { Navbar, IconButton, Input } from "@material-tailwind/react";
import { Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/solid";
import {
  setOpenSidenav,
  setOpenConfigurator,
  useMaterialTailwindController,
} from "@/context";

export function DashboardNavbar() {
  const { searchValue, setSearchValue } = useSearch();

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse gap-6 md:flex-row md:items-center">
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input
              label="Search"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>

          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
