// src/components/Item.jsx

import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <article className="w-72 rounded-xl overflow-hidden shadow-lg bg-white transform hover:scale-[1.02] transition duration-300 m-3">
      <Link to={`/item/${item.id}`} className="block">
        <div className="h-80 w-full overflow-hidden bg-gray-100">
          <img
            className="w-full max-h-52 md:max-h-72 object-contain rounded-md"
            src={item.img}
            alt={item.name}
          />
        </div>

        <div className="p-4">
          <h4 className="text-xl font-semibold text-gray-800 truncate">
            {item.name}
          </h4>
          <p className="text-sm text-green-800 mt-1">
            Categoría: {item.category}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${item.price.toLocaleString("es-AR")}
          </p>
          <span
            className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${
              item.stock > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item.stock > 0 ? `Stock: ${item.stock}` : "Agotado"}
          </span>
        </div>
      </Link>
    </article>
  );
};

export default Item;
