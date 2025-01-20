import React from "react";
import styles from "../Option/Option.module.scss";
import { OptionType } from "../DropDown/DropDown";

export interface OptionProps {
  option: OptionType;
  onSelect: (option: OptionType) => void;
  isSelected: boolean;
}

const Option = ({ option, onSelect, isSelected }: OptionProps) => {
  return (
    <li
      className={`${styles.option} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(option)}
    >
      {option.icon ? (
        <>
          <img
            src={option.icon}
            alt={option.label}
            className={styles.optionIcon}
          />
          {option.label}
        </>
      ) : (
        option.label
      )}
    </li>
  );
};

export default Option;
