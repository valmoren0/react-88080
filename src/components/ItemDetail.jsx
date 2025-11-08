// src/components/ItemDetail.jsx
import React, { useState } from "react";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";

const ItemDetail = ({ item, onAdd }) => {
  const [addedQty, setAddedQty] = useState(0);
  const maxStock = item?.stock ?? 0;

  const handleAdd = (qty) => {
    if (qty > 0 && maxStock > 0) {
      onAdd(item, qty);
      setAddedQty(qty);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-8 md:p-16 bg-white">
      <div className="max-w-7xl bg-white shadow-2xl rounded-2xl border border-black p-16 md:p-20 m-6 md:m-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          <div className="md:w-1/2 flex justify-center items-center p-8 md:p-12 bg-white rounded-lg border border-black">
            <img
              className="max-w-full max-h-80 md:max-h-96 object-contain rounded-md"
              src={item.img}
              alt={item.name}
            />
          </div>

          <div className="md:w-1/2 flex flex-col p-4 md:p-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-black mb-4">
              {item.name}
            </h1>
            <p className="text-xl text-green-600 font-semibold mb-8">
              ${item.price}
            </p>

            <div className="space-y-6 text-black flex-grow">
              <p className="text-base md:text-lg leading-relaxed border-t border-black pt-4">
                {item.description}
              </p>
              <p className="font-medium text-sm text-black">
                ID de Producto: #{item.id} | Stock Disponible: {item.stock} unidades
              </p>
            </div>

            <div className="mt-8">
              {addedQty === 0 ? (
                <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <Link
                      to="/cart"
                      className="w-full text-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-500 transition duration-150"
                    >
                      Ir al carrito ({addedQty})
                    </Link>

                    <Link
                      to="/"
                      className="w-full text-center border border-gray-300 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
                    >
                      Seguir comprando
                    </Link>
                  </div>

                  <p className="text-sm text-gray-600">
                    Agregaste <strong>{addedQty}</strong> unidad(es) al carrito.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
