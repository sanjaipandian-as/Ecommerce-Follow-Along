import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose, IoHome } from "react-icons/io5";
import { TbLogin2 } from "react-icons/tb";
import { MdOutlineAddBox } from "react-icons/md";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white font-bold text-lg">MyStore</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-white font-semibold flex items-center" : "text-gray-200 flex items-center hover:text-white"
              }
            >
              <IoHome className="mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold flex items-center" : "text-gray-200 flex items-center hover:text-white"
              }
            >
              <MdOutlineAddBox className="mr-2" />
              Add Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold flex items-center" : "text-gray-200 flex items-center hover:text-white"
              }
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold flex items-center" : "text-gray-200 flex items-center hover:text-white"
              }
            >
              <TbLogin2 className="mr-2" />
              Login
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
        >
          {!isOpen ? <GiHamburgerMenu size={24} /> : <IoClose size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col mt-2 space-y-2 bg-blue-700 p-4">
          <li>
            <Link
              to="/"
              className="text-white flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <IoHome className="mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Createpage"
              className="text-white flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <MdOutlineAddBox className="mr-2" />
              Add Products
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-white flex items-center"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <TbLogin2 className="mr-2" />
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
