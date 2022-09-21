import React, {lazy} from "react";
import { Routes, Route } from "react-router-dom";
import "../src/assets/scss/app.scss";
import Home from "./pages/Home";

import MainLayout from "./components/lyaouts/MainLayout";

const Cart = lazy(() => import('./pages/Cart'))
const NotFound = lazy(() => import('./pages/NotFound'))
const FullPizza = lazy(() => import('./pages/FullPizza'))

function App() {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  );
}

export default App;
