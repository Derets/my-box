import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const Root = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
