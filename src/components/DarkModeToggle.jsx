import React from "react";
import { useDarkMode } from "../useHooks/useDarkMode";

import '../css/darkmodetoggle.css'

export const DarkModeToggle = () => {
  const { isDark, setIsDark } = useDarkMode();

  const toggle = () => {
    setIsDark(!isDark)    
  }

  const getImage = isDark ? "/assets/Website_Darkmode.png" : "/assets/Website_Lightmode.png"

  return (
    <div className="darkmodetoggle">
      <img src={getImage} onClick={toggle} className="darktoggle" alt="" />
    </div>

  );
};