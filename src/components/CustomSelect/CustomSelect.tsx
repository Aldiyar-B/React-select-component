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
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options = [],
  placeholder = "Введите значение",
  disabled = false,
  size = "small",
  multiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[] | string>("");

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
  return (
    <div
      className={`${styles.customSelect} ${disabled ? styles.disabled : ""} ${
        styles[size]
      } `}
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
          <span className={styles.text}>{selectedOptions || placeholder}</span>
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
        <ul className={styles.dropdown}>
          {options.map((option, index) => {
            const label = typeof option === "string" ? option : option.label;
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
      )}
    </div>
  );
};

export default CustomSelect;
