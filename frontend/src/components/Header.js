import React from "react";

export const Header = () => {
  return (
    <div className="bg-dark h-100 w-100">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <img src="/Group 7.png" alt="logo" className="logo img-fluid py-3" />
          <div className="btn">
            <button type="button" class="btn btn-warning">
              Log In
            </button>
            <button type="button" class="btn btn-warning mx-3">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
