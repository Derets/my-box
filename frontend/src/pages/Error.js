import React, { useContext, useEffect } from "react";
import Header from "../components/Layout/Header";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <div>
      <Header />
      <main>
        <p>Error page</p>
      </main>
    </div>
  );
};

export default Error;
