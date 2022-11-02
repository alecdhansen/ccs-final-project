import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Header/Navbar";

function Layout({ isAuth, setIsAuth, state, setState }) {
  return (
    <>
      <Header />
      <Navbar
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        state={state}
        setState={setState}
      />
      <Outlet />
    </>
  );
}

export default Layout;
