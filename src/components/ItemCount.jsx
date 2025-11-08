// src/components/ItemCount.jsx
import React, { useState } from "react";

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(Math.min(initial, stock > 0 ? stock : 1));

  const increment = () => {
    if (count < stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const isOutOfStock = stock === 0;

  return (
    <div className="flex flex-col items-center mt-4 space-y-3">
      <div className="flex items-center space-x-4">
        <button
          onClick={decrement}
          disabled={count <= 1 || isOutOfStock}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded text-lg font-bold disabled:opacity-50"
        >
          −
        </button>

        <span className="text-xl font-semibold">{count}</span>

        <button
          onClick={increment}
          disabled={count >= stock || isOutOfStock}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded text-lg font-bold disabled:opacity-50"
        >
          +
        </button>
      </div>

      <p className={`text-sm font-medium ${isOutOfStock ? 'text-red-500' : 'text-gray-500'}`}>
        {isOutOfStock ? 'Producto agotado' : `Stock: ${stock} unidades`}
      </p>

      <button
        onClick={() => onAdd(count)}
        disabled={isOutOfStock || count === 0}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg disabled:bg-gray-400"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;