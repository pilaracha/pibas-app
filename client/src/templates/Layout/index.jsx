import React from "react";
import MainLayout from "../../components/MainLayout";
import { ProtectedRoute } from "../../router/ProtectedRoute";
import { Outlet } from "react-router-dom";

const Layout = ({ user }) => {

  return (
    <ProtectedRoute user={user}>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Layout;
