import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="m-0">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
