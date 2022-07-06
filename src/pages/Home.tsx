import React, { useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlockProps from "../interfaces/PizzaBlock";

export const Home = () => {
  const [items, setItems] = useState<PizzaBlockProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    property: "rating",
  });

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.property.replace("-", "");
    const order = sortType.property.includes("-") ? "asc" : "desc";

    fetch(
      `https://62b57a56da3017eabb1b8e17.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}`
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
  }, [categoryId, sortType]);

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
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock {...item} key={item.id} />)}
      </div>
    </div>
  );
};

export default Home;
