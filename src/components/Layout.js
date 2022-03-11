import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import Loadingcontext from "../context/LoadingProvider";
import Header from "./Header/Header";
import Footer from "./Footer";

const Layout = () => {
  const [loading] = useContext(Loadingcontext);
  const Loading = loading === false;
  return (
    <main className="App">
      <Header />
      <Outlet />
      {Loading && <Footer />}
    </main>
  );
};

export default Layout;
