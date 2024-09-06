import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <div className="relative min-h-screen w-full">
      <Outlet />
    </div>
  );
}
