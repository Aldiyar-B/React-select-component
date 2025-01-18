import React, { useState } from "react";
import styles from "./CustomSelect.module.scss";

interface Option {
  id: string | number;
  label: string;
  icon?: string;
}

interface CustomSelectProps {
  options?: string[] | Option[];
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options = [],
  placeholder = "Введите значение",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen((currentState) => !currentState);

  const handleSelect = (option: string) => {
    setSelectedOptions(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect}>
      <div className={styles.selectInput} onClick={toggleDropdown}>
        <span className={styles.text}>{selectedOptions || placeholder}</span>
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
                {typeof option !== "string" && option.icon && (
                  <span>{option.icon}</span>
                )}
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
