// Header.js
import React from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import SignIn from "./SignIn";

const Header = () => {
  const handleSuccess = (response) => {
    console.log('Login Success:', response.profileObj);
  };

  const handleFailure = (response) => {
    console.log('Login Failed:', response);
  };

  return (
    <Navbar className="h-100 w-100 text-light">
      <Navbar.Brand href="#home">
        <img
          src="/logo.png"
          alt="logo"
          className="logo img-fluid py-2 mx-2 my-2 w-25 h-25"
        />
      </Navbar.Brand>
      <Nav className="navText ml-auto">
        <h6 className="text-center py-4 px-4 text-dark lh-lg">
          Search recipes from all over the world. <br></br>Create an account to
          save your favorite recipes. ✨<br></br>
        </h6>
      </Nav>
      <Form className="d-flex mx-5">
        <SignIn onSuccess={handleSuccess} onFailure={handleFailure} />
      </Form>
    </Navbar>
  );
};

export default Header;
