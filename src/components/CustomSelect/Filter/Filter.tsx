import React from "react";
import styles from "../Filter/Filter.module.scss";
interface FilterProps {
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
}

const Filter = ({ filterValue, setFilterValue }: FilterProps) => {
  const clearFilter = () => {
    setFilterValue("");
  };

  return (
    <div>
      <input
        type="text"
        className={styles.filterInput}
        placeholder="Поиск..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />{" "}
      <button className={styles.clearFilterButton} onClick={clearFilter}>
        ⨉
      </button>
    </div>
  );
};

export default Filter;
