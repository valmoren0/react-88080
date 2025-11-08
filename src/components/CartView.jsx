// src/components/CartView.jsx

import React from 'react';
import { useCart } from "./CartContext";
import { Link } from 'react-router-dom';

const CartView = () => {
    const { cart, totalPrice, clearCart, removeItem } = useCart();

    if (cart.length === 0) {
        return (
            <div className="text-center p-20">
                <h1 className="text-3xl font-bold text-gray-700 mb-4">Tu carrito está vacío 😔</h1>
                <Link to="/" className="text-indigo-600 hover:underline">
                    Ver productos de la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-3xl font-bold mb-6 border-b pb-2">Resumen de tu Compra</h1>

            {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b">
                    <p className="font-semibold">{item.name}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                    >
                        Eliminar
                    </button>
                </div>
            ))}

            <div className="mt-8 text-right">
                <h2 className="text-2xl font-extrabold text-gray-800">Total: ${totalPrice.toFixed(2)}</h2>

                <div className="mt-4 space-x-4">
                    <button
                        onClick={clearCart}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                    >
                        Vaciar Carrito
                    </button>

                    <Link to="/checkout" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-bold">
                        Finalizar Compra
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartView;