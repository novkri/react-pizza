import React, { useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlockProps from "../interfaces/PizzaBlock";
import Pagination from "../components/Pagination";

interface HomeProps {
  searchValue: string;
  // setSearchValue: Function;
}

export const Home = ({ searchValue }: HomeProps) => {
  const [items, setItems] = useState<PizzaBlockProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    property: "rating",
  });

  const [currentPage, setCurrentPage] = useState(1)

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    const sortBy = sortType.property.replace("-", "");
    const order = sortType.property.includes("-") ? "asc" : "desc";

    fetch(
      `https://62b57a56da3017eabb1b8e17.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setTimeout(() => {
          setItems(arr);
          setIsLoading(false);
        }, 1000);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => <PizzaBlock {...item} key={item.id} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  //pagination
  // Invoke when user click to request another page.
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i: number) => setCategoryId(i)}
        />
        <Sort
          value={sortType}
          onClickSort={(i: { name: string; property: string }) =>
            setSortType(i)
          }
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
