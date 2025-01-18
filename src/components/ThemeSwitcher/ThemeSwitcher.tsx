import React from "react";

const ThemeSwitcher: React.FC = () => {
  const changeTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  return (
    <button className="button-theme" onClick={changeTheme}>
      {" "}
      Поменять тему
    </button>
  );
};

export default ThemeSwitcher;
