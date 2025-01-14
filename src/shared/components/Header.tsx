import React from 'react';
import "./Header.css";
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
  return (
    <>
      <header>
        <img src={logo} alt="Logo do site aqui-oh" />
      </header>
    </>
  );
};

export default Header;