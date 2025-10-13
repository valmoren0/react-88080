// src/components/ItemDetailContainer.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../data/mockAPIService";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = ({ addItem }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((item) => setProduct(item))
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <h2 className="text-3xl font-semibold text-green-600">
          Cargando detalles del Mate...
        </h2>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl font-semibold text-red-500">
          Producto no encontrado.
        </h2>
      </div>
    );

  return <ItemDetail item={product} onAdd={addItem} />;
};

export default ItemDetailContainer;
