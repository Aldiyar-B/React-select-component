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
  small?: boolean;
  large?: boolean;
  size?: "small" | "large";
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options = [],
  placeholder = "Введите значение",
  disabled = false,
  size = "small",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string | null>(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((currentState) => !currentState);
    }
  };

  const handleSelect = (option: string) => {
    if (disabled) return;
    setSelectedOptions(option);
    setIsOpen(false);
  };

  const clearContext = () => {
    setSelectedOptions("");
  };

  return (
    <div
      className={`${styles.customSelect} ${disabled ? styles.disabled : ""} ${
        styles[size]
      } `}
    >
      <div className={styles.selectInput} onClick={toggleDropdown}>
        <span className={styles.text}>{selectedOptions || placeholder}</span>
        {selectedOptions && (
          <button
            className={styles.cross}
            onClick={(event) => {
              event.stopPropagation();
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
                className={styles.option}
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
