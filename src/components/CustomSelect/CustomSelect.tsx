import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.scss";

interface Option {
  id: string | number;
  label: string;
}

interface CustomSelectProps {
  options?: Option[];
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "large";
  multiSelect: boolean;
  isModal?: boolean;
  filter?: boolean;
}

const CustomSelect = ({
  options = [],
  placeholder = "Введите значение",
  disabled = false,
  size = "small",
  multiSelect = false,
  isModal = false,
  filter = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [filterValue, setFilterValue] = useState("");

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((currentState) => !currentState);
    }
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      // Проверка того, был ли сделан клик внутри контейнера
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target as Node) &&
        target &&
        !target.closest(`.${styles.selectInput}`)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: Option) => {
    if (disabled) return;

    setSelectedOptions((current) =>
      multiSelect
        ? current.some((selectedOption) => selectedOption.id === option.id)
          ? current.filter((selectedOption) => selectedOption.id !== option.id)
          : [...current, option]
        : [option]
    );

    if (!multiSelect) setIsOpen(false);
  };

  const isSelected = (option: Option) => {
    return selectedOptions.some(
      (selectedOption) => selectedOption.id === option.id
    );
  };

  const clearContext = () => {
    setSelectedOptions(multiSelect ? [] : []); // Для очищения выбранных опций
  };

  const clearFilter = () => {
    setFilterValue("");
  };

  const filteredOptions = options.filter((option) => {
    return option.label.toLowerCase().includes(filterValue.toLowerCase());
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
        } ${isModal ? styles.modal : ""}`}
      >
        <div className={styles.selectInput} onClick={toggleDropdown}>
          {multiSelect ? (
            selectedOptions.length > 0 ? (
              <div className={styles.selectedItems}>
                {selectedOptions.map((option) => (
                  <span key={option.id} className={styles.text}>
                    {option.label}
                  </span>
                ))}
              </div>
            ) : (
              <span className={styles.placeholder}>{placeholder}</span>
            )
          ) : (
            <span className={styles.text}>
              {selectedOptions.length > 0
                ? selectedOptions[0].label
                : placeholder}
            </span>
          )}
          {(multiSelect
            ? selectedOptions.length > 0
            : selectedOptions.length > 0) && (
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
          <div className={styles.dropdownContainer} ref={dropdownRef}>
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
                  onClick={clearFilter}
                >
                  ⨉
                </button>
              </>
            )}
            <ul className={styles.dropdown}>
              {filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={`${styles.option} ${
                    isSelected(option) ? styles.selected : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomSelect;
