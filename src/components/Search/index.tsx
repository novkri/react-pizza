import React, {useCallback, useRef, useState} from "react";
import styles from "./Search.module.scss";
import debounce from 'lodash.debounce'
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";

const Search = () => {
  const dispatch = useDispatch()
  const [ value, setValue ] = useState('')
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    inputRef.current.focus()
  }

  const updateSearchValue = useCallback(
      debounce((str) => {
          dispatch(setSearchValue(str))
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
