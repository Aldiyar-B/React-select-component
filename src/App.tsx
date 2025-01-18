import styles from "./App.module.scss";
import CustomSelect from "./components/CustomSelect.tsx";

export function App() {
  const options = ["😂", "😯", "🤩", "^-^", ":)", "Привет"];

  return (
    <div className={styles.layout}>
      <h1>Custom Select</h1>
      <br />
      <CustomSelect options={options} placeholder="Выбери эмодзи" />
    </div>
  );
}
