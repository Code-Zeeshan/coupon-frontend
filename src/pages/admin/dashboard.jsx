import routes from "@/routes";

import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "@/context/admin/search";
import { Sidenav, Configurator, DashboardNavbar } from "@/widgets/layout";

export function Dashboard() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-blue-gray-50/50">
        <Sidenav routes={routes} />

        <div className="p-4 xl:ml-80">
          <DashboardNavbar />
          <Configurator />

          <Routes>
            {routes[0].pages.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </div>
      </div>
    </SearchProvider>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
