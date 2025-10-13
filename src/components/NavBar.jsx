// src/components/NavBar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = ({ itemCount }) => {
  const categories = [
    { name: "Mates", path: "mates" },
    { name: "Yerbas", path: "yerbas" },
    { name: "Accesorios", path: "accesorios" },
  ];

  const brandColor = "text-green-600";
  const brandHoverColor = "hover:text-green-500";
  const activeBorder = "border-green-600";

  const linkClasses =
    "text-sm font-medium transition duration-150 py-1 text-gray-300 hover:text-white";

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16 !px-10">
          <Link
            to="/"
            className={`text-2xl font-extrabold ${brandColor} tracking-wider ${brandHoverColor} transition duration-150`}
          >
            IMPERIAL
          </Link>

          <nav className="flex items-center gap-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive ? `${brandColor} border-b-2 ${activeBorder}` : ""
                }`
              }
            >
              Inicio
            </NavLink>

            {categories.map((cat) => (
              <NavLink
                key={cat.path}
                to={`/category/${cat.path}`}
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive ? `${brandColor} border-b-2 ${activeBorder}` : ""
                  }`
                }
              >
                {cat.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center">
            <CartWidget itemCount={itemCount} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
