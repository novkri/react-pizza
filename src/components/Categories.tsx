import React, {memo} from "react";

interface CategoriesProps {
  value: number;
  onClickCategory: Function;
}

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories = memo(
    ({ value, onClickCategory }: CategoriesProps) => {
      const categoryItem = categories.map((cat, idx) => (
          <li
              onClick={() => onClickCategory(idx)}
              key={cat}
              className={value === idx ? "active" : ""}
          >
            {cat}
          </li>
      ));

      return (
          <div className="categories">
            <ul>{categoryItem}</ul>
          </div>
      );
    }
)

export default Categories;
