import styles from "./App.module.scss";
import CustomSelect from "./components/CustomSelect/CustomSelect.tsx";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher.tsx";

export function App() {
  const options = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" }, // Без иконки
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
          />
        </div>
        <div className="small">
          <h2>Small</h2>
          <CustomSelect
            options={options}
            placeholder="Выбери значение"
            size="small"
            multiSelect={true}
            filter={true}
            modal={true}
          />
        </div>
        <div className="large">
          <h2>Large</h2>
          <CustomSelect
            options={options}
            placeholder="Выбери значение"
            size="large"
            multiSelect={true}
            filter={true}
            modal={true}
          />
        </div>
        <br />
      </div>
    </>
  );
}
