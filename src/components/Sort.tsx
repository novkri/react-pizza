import React, {memo, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setSort} from "../redux/slices/filter/slice";
import {  SortPropertyEnum} from '../redux/slices/filter/types'
import ISort from "../interfaces/ISort";

export const sortOptions = [
  { name: "популярности (DESC)", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "популярности (ASC)", sortProperty: SortPropertyEnum.RATING_ASC },
  { name: "цене (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене (ASC)", sortProperty: SortPropertyEnum.PRICE_ASK },
  { name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.TITLE_ASC },
];

type SortProps = {
  value: ISort
}

type PopupClick = MouseEvent & {
  path: Node[];
};

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

const Sort: React.FC<SortProps> = memo(({ value }) => {
  const dispatch = useDispatch()
  const sortRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const [open, setOpen] = useState(false);

  const setSorting = (obj: SortItem) => {
    dispatch(setSort(obj))
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
      <div className="sort" ref={sortRef}>
        <div className="sort__label">
          <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span onClick={() => setOpen(!open)}>{value.name}</span>
        </div>
        {open && (
            <div className="sort__popup">
              <ul>
                {sortOptions.map((option, idx) => (
                    <li
                        className={value.sortProperty === option.sortProperty ? "active" : ""}
                        key={idx}
                        onClick={() => setSorting(option as SortItem)}
                    >
                      {option.name}
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
  );
})

export default Sort;
