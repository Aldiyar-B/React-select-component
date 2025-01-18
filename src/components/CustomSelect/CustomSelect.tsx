import React, { useState } from "react";
import styles from "./CustomSelect.module.scss";

interface Option {
  id: string | number;
  label: string;
}

interface CustomSelectProps {
  options?: string[] | Option[];
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "large";
  multiSelect: boolean;
  isModal?: boolean;
  filter?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options = [],
  placeholder = "Введите значение",
  disabled = false,
  size = "small",
  multiSelect = false,
  isModal = false,
  filter = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[] | string>("");
  const [filterValue, setFilterValue] = useState("");
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((currentState) => !currentState);
    }
  };

  const handleSelect = (option: string) => {
    if (disabled) return;

    setSelectedOptions((current) =>
      multiSelect
        ? Array.isArray(current) && current.includes(option)
          ? current.filter((o) => o !== option)
          : [...(Array.isArray(current) ? current : []), option]
        : option
    );

    if (!multiSelect) setIsOpen(false);
  };

  const clearContext = () => {
    setSelectedOptions(multiSelect ? [] : "");
  };

  const isSelected = (option: string) => {
    if (multiSelect) {
      return selectedOptions?.includes(option);
    }
    return selectedOptions === option;
  };

  const clearFilter = () => {
    setFilterValue("");
  };

  const filteredOptions = options.filter((option) => {
    const label = typeof option === "string" ? option : option.label;
    return label.toLowerCase().includes(filterValue.toLowerCase());
  });

  return (
    <>
      {isModal && isOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`${styles.customSelect} ${disabled ? styles.disabled : ""} ${
          styles[size]
        } ${isModal ? styles.modal : ""} `}
      >
        <div className={styles.selectInput} onClick={toggleDropdown}>
          {multiSelect ? (
            Array.isArray(selectedOptions) && selectedOptions.length > 0 ? (
              <div className={styles.selectedItems}>
                {selectedOptions.map((option, index) => (
                  <span key={index} className={styles.text}>
                    {option}
                  </span>
                ))}
              </div>
            ) : (
              <span className={styles.placeholder}>{placeholder}</span>
            )
          ) : (
            <span className={styles.text}>
              {selectedOptions || placeholder}
            </span>
          )}
          {(multiSelect
            ? Array.isArray(selectedOptions) && selectedOptions.length > 0
            : selectedOptions !== "") && (
            <button
              className={styles.cross}
              onClick={(e) => {
                e.stopPropagation();
                clearContext();
              }}
            >
              ⨉
            </button>
          )}
          <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && options.length > 0 && (
          <div className={styles.dropdownContainer}>
            {filter && isOpen && (
              <>
                <input
                  type="text"
                  className={styles.filterInput}
                  placeholder="Поиск..."
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
                <button
                  className={styles.clearFilterButton}
                  onClick={clearFilter} // Очистка фильтра
                >
                  ⨉
                </button>
              </>
            )}
            <ul className={styles.dropdown}>
              {filteredOptions.map((option, index) => {
                const label =
                  typeof option === "string" ? option : option.label;
                return (
                  <li
                    key={index}
                    className={`${styles.option} ${
                      isSelected(label) ? styles.selected : ""
                    }`}
                    onClick={() => handleSelect(label)}
                  >
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomSelect;
