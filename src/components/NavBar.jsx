import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      {/* Logo and navigation links */}
      <Link to="/">Home</Link>
      <Link to="/new-cars">New Cars</Link>
      <Link to="/tasks">Tasks</Link>
      {/* User account link */}
      <span>User Name</span>
    </nav>
  );
};

export default NavBar;