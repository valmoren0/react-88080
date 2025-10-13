// src/components/ItemDetail.jsx
import React from "react";

const ItemDetail = ({ item, onAdd }) => {
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
                ID de Producto: #{item.id} | Stock Disponible: {item.stock}{" "}
                unidades
              </p>
            </div>

            <div className="mt-8">
              <button
                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-500 transition duration-150"
                onClick={() => onAdd(item, 1)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
