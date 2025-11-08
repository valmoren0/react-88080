// src/components/ItemListContainer.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts as getMockProducts } from "../data/mockAPIService";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const productsRef = collection(db, "products");

    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    getDocs(q)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Asignar los productos
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al conectar a Firestore, usando mock data:", error);
        setProducts([]); 
      })
      .finally(() => {
        setLoading(false);
      });

  }, [categoryId]);

  if (loading)
    return (
      <h2 className="text-center mt-12 text-2xl font-semibold text-indigo-600">
        Cargando productos...
      </h2>
    );

  if (!products.length)
    return (
      <h2 className="text-center mt-12 text-2xl font-semibold text-red-500">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center max-w-7xl mx-auto">
        <ItemList products={products} />
      </div>
    </section>
  );
};

export default ItemListContainer;