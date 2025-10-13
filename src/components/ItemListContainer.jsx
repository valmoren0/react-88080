// src/components/ItemListContainer.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../data/mockAPIService";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    getProducts(categoryId)
      .then((res) => setProducts(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading)
    return (
      <h2 className="text-center mt-12 text-2xl">Cargando productos...</h2>
    );

  if (!products.length)
    return (
      <h2 className="text-center mt-12 text-2xl">
        No hay productos disponibles.
      </h2>
    );

  return (
    <section className="itemlist p-4">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        {categoryId
          ? `Productos en la categoría: ${categoryId.toUpperCase()}`
          : greeting}
      </h3>

      <div className="item-grid">
        <ItemList products={products} />
      </div>
    </section>
  );
};

export default ItemListContainer;
