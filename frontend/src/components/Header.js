import React from "react";
import SignIn from "./SignIn";

export const Header = () => {
  return (
    <div className="bg-dark h-100 w-100">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <img src="/logo.png" alt="logo" className="logo img-fluid py-3" />
          <div className="btn">
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
