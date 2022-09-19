import React from "react";
import styles from "./Search.module.scss";
import { useSearchContext } from "../../App";

const Search = () => {
  const { searchValue, setSearchValue } = useSearchContext()

  const foo = (ev: any) => {
    console.log(ev.target.value);
    console.log(searchValue);
    setSearchValue(ev.target.value);
  };
  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы ..."
        value={searchValue}
        onChange={foo}
      />
      {searchValue && (
        <svg
          onClick={() => setSearchValue("")}
          className={styles.close}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="cross">
            <line className="cls-1" x1="7" x2="25" y1="7" y2="25" />
            <line className="cls-1" x1="7" x2="25" y1="25" y2="7" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
