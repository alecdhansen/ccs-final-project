import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Layout({ isAuth, setIsAuth, state, setState }) {
  return (
    <>
      <Header
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
