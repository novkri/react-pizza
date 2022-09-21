import React, {lazy, Suspense} from "react";
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
            <Route path="cart" element={<Suspense fallback={<div>Загрузка...</div>}><Cart /></Suspense>} />
            <Route path="pizza/:id" element={<Suspense fallback={<div>Загрузка...</div>}><FullPizza /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<div>Загрузка...</div>}><NotFound /></Suspense>} />
        </Route>
    </Routes>
  );
}

export default App;
