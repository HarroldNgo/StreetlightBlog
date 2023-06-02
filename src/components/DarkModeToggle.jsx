import React from "react";
import { useDarkMode } from "../useHooks/useDarkMode";

import '../css/darkmodetoggle.css'

export const DarkModeToggle = () => {
  const { isDark, setIsDark } = useDarkMode();

  const toggle = () => {
    setIsDark(!isDark)
  }
  return (
    <button onClick={toggle} className={'toggle--button ' + (isDark ? 'toggle-dark' : '')}>
    </button>
  );
};