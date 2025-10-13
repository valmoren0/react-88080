// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import "./app.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const addItem = (productToAdd, quantity = 1) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.product.id === productToAdd.id
    );

    if (existingProductIndex !== -1) {
      const newCart = [...cart];
      newCart[existingProductIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { product: productToAdd, quantity }]);
    }
  };

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <NavBar itemCount={totalItemsInCart} />
      <main className="min-h-[calc(100vh-4rem)] bg-gray-100 pb-12">
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting="Bienvenido a IMPERIAL" />}
          />
          <Route
            path="/category/:categoryId"
            element={<ItemListContainer greeting="Productos Filtrados" />}
          />
          <Route
            path="/item/:id"
            element={<ItemDetailContainer addItem={addItem} />}
          />
          <Route
            path="*"
            element={
              <h1 className="text-4xl text-center mt-20">
                404 - Página no encontrada
              </h1>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
