import React from 'react';
import { Link } from 'react-router-dom';

const style = {
  nav: `bg-gray-800 text-white flex justify-center items-center p-4`,
  navContent: `flex justify-between items-center w-full max-w-[75%]`, 
  logo: `h-14`, 
  navLinks: `flex items-center space-x-20`, 
  navLink: `text-xl hover:text-gray-300 font-semibold`,
  userName: `py-2 px-4 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer font-semibold`
};

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <div className={style.navContent}>
        <Link to="/" className={style.logo}>
          <img src="/logo.png" alt="Logo" className={style.logo} />
        </Link>

        <div className={style.navLinks}>
          <Link to="/" className={style.navLink}>Home</Link>
          <Link to="/new-cars" className={style.navLink}>New Cars</Link>
          <Link to="/tasks" className={style.navLink}>Tasks</Link>
        </div>

        <span className={style.userName}>Log In</span>
      </div>
    </nav>
  );
};

export default NavBar;