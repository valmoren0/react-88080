// src/context/CartContext.jsx

import React, { createContext, useState, useMemo, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const isInCart = (id) => cart.some(item => item.id === id);

    // Función que agrega/actualiza un ítem
    const addItem = (product, quantity) => {
        if (isInCart(product.id)) {
            // Actualiza la cantidad
            setCart(prevCart => prevCart.map(item => 
                item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ));
        } else {
            // Agrega el ítem nuevo
            setCart(prevCart => [...prevCart, { ...product, quantity, price: product.price }]);
        }
    };

    // Funciones esenciales de manipulación
    const removeItem = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalQuantity = useMemo(() => 
        cart.reduce((acc, item) => acc + item.quantity, 0), 
    [cart]);

    const totalPrice = useMemo(() => 
        cart.reduce((acc, item) => acc + (item.quantity * item.price), 0), 
    [cart]);

    const contextValue = useMemo(() => ({
        cart,
        addItem,
        removeItem,
        clearCart,
        totalQuantity,
        totalPrice,
    }), [cart, totalQuantity, totalPrice]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};