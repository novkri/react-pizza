import React from "react";
import { Routes, Route } from "react-router-dom";
import "../src/assets/scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<NotFound />} />
            {/* todo what is index  */}
            {/* <Route index element={<Home />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
