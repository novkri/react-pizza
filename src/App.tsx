import React, {createContext, useContext} from "react";
import { Routes, Route } from "react-router-dom";
import "../src/assets/scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

interface ContextInterface  {
    searchValue: string
    setSearchValue: Function
}

export const SearchContext = createContext<ContextInterface  >({
    searchValue: '',
    setSearchValue: () => {}
})
export const useSearchContext = () => useContext(SearchContext)

function App() {
  return (
    <div className="wrapper">
        <Header />
        <div className="content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    </div>
  );
}

export default App;
