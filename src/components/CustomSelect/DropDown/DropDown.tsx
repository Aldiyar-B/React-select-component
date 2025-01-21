import React from "react";
import styles from "../DropDown/DropDown.module.scss";
import Filter from "../Filter/Filter";
import Option from "../Option/Option";

export interface OptionType {
  id: string | number;
  label: string;
  icon?: string;
}

interface DropdownProps {
  options: OptionType[];
  filter: boolean;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  selectedOptions: OptionType[];
  onSelect: (option: OptionType) => void;
  dropdownZIndex: number;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const Dropdown = ({
  options,
  filter,
  filterValue,
  setFilterValue,
  selectedOptions,
  onSelect,
  dropdownZIndex,
  dropdownRef,
}: DropdownProps) => {
  const filteredOptions = options.filter((option) => {
    const noGapInput = filterValue.replace(/\s+/g, "").toLowerCase();
    const noGapLabel = option.label.replace(/\s+/g, "").toLowerCase();

    return noGapLabel.includes(noGapInput);
  });

  return (
    <div
      className={styles.dropdownContainer}
      style={{ zIndex: dropdownZIndex }}
      ref={dropdownRef}
    >
      {filter && (
        <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      )}
      <ul className={styles.dropdown}>
        {filteredOptions.map((option) => (
          <Option
            key={option.id}
            option={option}
            onSelect={onSelect}
            isSelected={selectedOptions.some(
              (selectedOption) => selectedOption.id === option.id
            )}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
