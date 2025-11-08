// src/components/CheckoutForm.jsx

import React, { useState } from 'react';
import { useCart } from "./CartContext";
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const CheckoutForm = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [buyer, setBuyer] = useState({ name: '', email: '', phone: '' });

    const handleChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const order = {
            buyer,
            items: cart.map(item => ({ 
                id: item.id, 
                name: item.name, 
                price: item.price, 
                quantity: item.quantity 
            })),
            total: totalPrice,
            date: new Date(),
        };

        try {
            const docRef = await addDoc(collection(db, "orders"), order);
            
            setOrderId(docRef.id);
            clearCart(); // Vaciar el carrito después de la compra
        } catch (error) {
            console.error("Error al crear la orden:", error);
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return (
            <div className="text-center p-12 my-10 bg-green-100 border border-green-500 rounded-lg">
                <h1 className="text-3xl font-extrabold text-green-700 mb-4">¡Compra Finalizada con Éxito!</h1>
                <p className="text-xl text-gray-700">Tu número de orden es:</p>
                <p className="text-4xl font-mono mt-3 text-green-900">#{orderId}</p>
            </div>
        );
    }
    
    if (loading) {
        return <h1 className="text-center text-3xl p-20">Procesando orden... ⏳</h1>;
    }

    return (
        <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-2xl rounded-xl">
            <h1 className="text-3xl font-bold mb-6">Datos de Contacto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campos del formulario */}
                <input required type="text" name="name" placeholder="Nombre completo" onChange={handleChange} className="w-full p-3 border rounded" />
                <input required type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded" />
                <input required type="tel" name="phone" placeholder="Teléfono" onChange={handleChange} className="w-full p-3 border rounded" />
                
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow">
                    Confirmar Compra
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;