import React, {useCallback, useEffect, useRef} from "react";
import Categories from "../components/Categories";
import Sort, {sortOptions} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import { setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filter/slice";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {LoadingStatus} from "../assets/scripts/enums";
import {selectFilter} from "../redux/slices/filter/selectors";
import {selectPizzas} from "../redux/slices/pizzas/selectors";
import ISort from "../interfaces/ISort";
import {FilterSliceState} from "../redux/slices/filter/types";
import {fetchAllPizzas} from "../redux/slices/pizzas/asyncActions";


export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const {categoryId, sort: sortType, currentPage, searchValue} = useSelector(selectFilter)
  const {items, status} = useSelector(selectPizzas)

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = async  () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";

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
      const sort = sortOptions.find(i => i.sortProperty === params.sortProperty) as ISort
      dispatch(setFilters({...params, sort} as FilterSliceState))
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
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType, currentPage])

  console.log(items)
  const pizzas = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
      .map((item) => <PizzaBlock {...item} key={item.id} />);

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
        <Sort value={sortType} />
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
