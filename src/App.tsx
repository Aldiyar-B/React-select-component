import styles from "./App.module.scss";
import CustomSelect from "./components/CustomSelect/CustomSelect.tsx";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher.tsx";

export function App() {
  const options = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
    { id: 4, label: "Option 4" },
    { id: 5, label: "Option 5" },
    // { id: 6, label: "Option 6" },
    // { id: 7, label: "Option 7" },
    // { id: 8, label: "Option 8" },
    // { id: 9, label: "Option 9" },
    // { id: 10, label: "Option 10" },
  ];

  const animals = [
    { id: 1, label: "Dog" },
    { id: 2, label: "Cat" },
    { id: 3, label: "Elephant" },
    { id: 4, label: "Tiger" },
    { id: 5, label: "Lion" },
    { id: 6, label: "Monkey" },
    { id: 7, label: "Giraffe" },
    { id: 8, label: "Bear" },
    { id: 9, label: "Zebra" },
    { id: 10, label: "Horse" },
    { id: 11, label: "Kangaroo" },
    { id: 12, label: "Puppy" },
    { id: 13, label: "Donkey" },
    { id: 14, label: "Panda" },
    { id: 15, label: "Raccoon" },
    { id: 16, label: "Dog" },
    { id: 17, label: "Cat" },
    { id: 18, label: "Elephant" },
    { id: 19, label: "Tiger" },
    { id: 20, label: "Lion" },
  ];

  return (
    <>
      <h1>Custom Select</h1>
      <ThemeSwitcher />
      <div className={styles.layout}>
        <div className="disabled">
          <h2>Disabled</h2>
          <CustomSelect
            options={options}
            placeholder="Выбери значение"
            disabled
            size="large"
            filter={true}
            multiSelect={false}
          />
        </div>
        <div className="small">
          <h2>Small</h2>
          <CustomSelect
            options={animals}
            placeholder="Выбери значение"
            size="small"
            multiSelect={true}
            filter={true}
            isModal={false}
          />
        </div>
        <div className="large">
          <h2>Large</h2>
          <CustomSelect
            options={animals}
            placeholder="Выбери значение"
            size="large"
            multiSelect={false}
            filter={true}
            isModal={false}
          />
        </div>
        <br />
      </div>
    </>
  );
}
