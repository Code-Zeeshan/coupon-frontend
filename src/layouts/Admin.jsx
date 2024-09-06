import { useState, useEffect } from "react";
import { SignIn, Dashboard } from "@/pages/admin";
import { Routes, Route, Navigate } from "react-router-dom";

export function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("auth-token"),
  );

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        <Route
          path="/sign_in"
          element={
            isLoggedIn ? <Navigate to="/admin/dashboard" replace /> : <SignIn />
          }
        />

        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <Dashboard />
            ) : (
              <Navigate to="/admin/sign_in" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

Admin.displayName = "/src/layout/Admin.jsx";

export default Admin;
