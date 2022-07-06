import React, { useState } from "react";

interface SortProps {
  value: {
    name: string;
    property: string;
  };
  onClickSort: Function;
}

function Sort({ value, onClickSort }: SortProps) {
  const [open, setOpen] = useState(false);
  const options = [
    { name: "популярности (DESC)", property: "rating" },
    { name: "популярности (ASC)", property: "-rating" },
    { name: "цене (DESC)", property: "price" },
    { name: "цене (ASC)", property: "-price" },
    { name: "алфавиту (DESC)", property: "name" },
    { name: "алфавиту (ASC)", property: "-name" },
  ];
  console.log(value);

  const setSorting = (str: { name: string; property: string }) => {
    onClickSort(str);
    setOpen(false);
  };

  return (
    <div className="sort">
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
            {options.map((option, idx) => (
              <li
                className={value.property === option.property ? "active" : ""}
                key={idx}
                onClick={() => setSorting(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Sort;
