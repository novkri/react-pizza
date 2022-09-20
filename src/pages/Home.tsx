import React, {useEffect, useRef} from "react";
import Categories from "../components/Categories";
import Sort, {sortOptions} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlockProps from "../interfaces/PizzaBlock";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from "qs";
import {Link, useNavigate} from "react-router-dom";
import {fetchAllPizzas, selectPizzas} from "../redux/slices/pizzasSlice";
import {LoadingStatus} from "../assets/enums";


export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const {categoryId, sort: sortType, currentPage, searchValue} = useSelector(selectFilter)
  const {items, status} = useSelector(selectPizzas)

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = async  () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    const sortBy = sortType.property.replace("-", "");
    const order = sortType.property.includes("-") ? "asc" : "desc";

    // @ts-ignore
    dispatch(fetchAllPizzas({
      sortBy,
      order,
      category,
      search,
      currentPage
    }))
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortOptions.find(i => i.property === params.sortProperty)
      dispatch(setFilters({...params, sort}))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas().then()
    }
    isSearch.current = false
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.property,
        categoryId,
        currentPage
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType, currentPage])

  const pizzas = items
    .filter((item: PizzaBlockProps) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
      .map((item: PizzaBlockProps) => <Link to={`/pizza/${item.id}`} key={item.id}><PizzaBlock {...item}   /></Link>);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={onClickCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      { status === LoadingStatus.error ? <div className="content__error-info">
        <h2>Произошла ошибка загрузки данных :(</h2>
        <p>Попробойте повторить поытку позже</p>
      </div> :  <div className="content__items">{status === LoadingStatus.loading ? skeletons : pizzas}</div>}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
