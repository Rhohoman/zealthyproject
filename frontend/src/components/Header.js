import React from "react";
import "../styles/components/Header.css";
import image from "../styles/assets/wellness.png";

export const Header = () => {
  return (
    <div className="header">
      <a id="logo" href="/">
        Zealthy
      </a>
      <img src={image} alt="Wellness-img" />
    </div>
  );
};
