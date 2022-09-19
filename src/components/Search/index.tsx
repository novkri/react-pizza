import React, {useCallback, useRef, useState} from "react";
import styles from "./Search.module.scss";
import { useSearchContext } from "../../App";
import debounce from 'lodash.debounce'

const Search = () => {
  const { searchValue, setSearchValue } = useSearchContext()
  const [ value, setValue ] = useState('')
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const onClickClear = () => {
    setSearchValue('')
    inputRef.current.focus()
  }

  const updateSearchValue = useCallback(
      debounce((str) => {
        console.log(1)
        setSearchValue(str)
      }, 250), []
  )

  const onChangeInput = (ev: { target: { value: any; }; }) => {
    setValue(ev.target.value)
    updateSearchValue(ev.target.value)
  }

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы ..."
        value={value}
        onChange={onChangeInput}
      />
      {value && (
        <svg
          onClick={onClickClear}
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
