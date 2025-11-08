// src/components/ItemDetailContainer.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const ItemDetailContainer = ({ addItem }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.warn(`❌ No se encontró el producto con id: ${id}`);
          setProduct(null);
        }
      } catch (error) {
        console.error("Error al cargar el producto desde Firebase:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <h2 className="text-3xl font-semibold text-green-600">
          Cargando detalles del producto...
        </h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl font-semibold text-red-500">
          Producto no encontrado.
        </h2>
      </div>
    );
  }

  return <ItemDetail item={product} onAdd={addItem} />;
};

export default ItemDetailContainer;
