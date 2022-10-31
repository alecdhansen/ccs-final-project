import React from "react";
import { Outlet } from "react-router-dom";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Layout;
