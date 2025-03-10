import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.scss";
import Dropdown from "./DropDown/DropDown";

interface Option {
  id: string | number;
  label: string;
  icon?: string; // Путь к иконке
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
  const [dropdownZIndex, setDropdownZIndex] = useState<number>(1000);

  useEffect(() => {
    setDropdownZIndex((prevZIndex) => prevZIndex + 1);
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((currentState) => !currentState);
    }
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
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

  const clearContext = () => {
    setSelectedOptions([]);
  };

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
                    {option.icon ? (
                      <img src={option.icon} className={styles.optionIcon} />
                    ) : null}
                    {option.label}
                  </span>
                ))}
              </div>
            ) : (
              <span className={styles.placeholder}>{placeholder}</span>
            )
          ) : (
            <span className={styles.text}>
              {selectedOptions.length > 0 ? (
                <>
                  {selectedOptions[0].icon && (
                    <img
                      src={selectedOptions[0].icon}
                      alt={selectedOptions[0].label}
                      className={styles.optionIcon}
                    />
                  )}
                  {selectedOptions[0].label}
                </>
              ) : (
                placeholder
              )}
            </span>
          )}
          <div className={styles.itemsAction}>
            {selectedOptions.length > 0 && (
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
        </div>
        {isOpen && options.length > 0 && (
          <Dropdown
            options={options}
            filter={filter}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedOptions={selectedOptions}
            onSelect={handleSelect}
            dropdownZIndex={dropdownZIndex}
            dropdownRef={dropdownRef}
          />
        )}
      </div>
    </>
  );
};

export default CustomSelect;
