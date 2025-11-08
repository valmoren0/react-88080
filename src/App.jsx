// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { CartProvider, useCart } from "./components/CartContext.jsx";
import CartView from "./components/CartView.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import "./app.css";

const MainApp = () => {
  const { totalQuantity, addItem } = useCart();

  return (
    <>
      <NavBar itemCount={totalQuantity} />

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
            path="/cart"
            element={<CartView />}
          />
          <Route
            path="/checkout"
            element={<CheckoutForm />}
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

const App = () => {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
};

export default App;