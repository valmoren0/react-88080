// src/components/CheckoutForm.jsx (Con Lógica de Stock y Transacción)

import React, { useState } from 'react';
import { useCart } from "./CartContext";
import { db } from '../firebase/config';
import { collection, doc, writeBatch, getDoc, serverTimestamp } from 'firebase/firestore';

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

        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos para continuar.');
            setLoading(false);
            return;
        }

        const order = {
            buyer,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: totalPrice,
            date: serverTimestamp(),
        };

        const batch = writeBatch(db);
        const outOfStock = [];

        for (const item of cart) {
            const productRef = doc(db, 'products', item.id);
            const productDoc = await getDoc(productRef);

            if (productDoc.exists()) {
                const stockActual = productDoc.data().stock;

                if (stockActual >= item.quantity) {
                    batch.update(productRef, { stock: stockActual - item.quantity });
                } else {
                    outOfStock.push(item.name);
                }
            }
        }

        if (outOfStock.length === 0) {
            const orderRef = doc(collection(db, 'orders'));
            batch.set(orderRef, order);

            try {
                await batch.commit();
                setOrderId(orderRef.id);
                clearCart();
            } catch (error) {
                console.error("Error al confirmar la transacción:", error);
                alert("Hubo un error al procesar la compra.");
            }
        } else {
            alert(`Error de Stock: Los siguientes productos no tienen stock suficiente: ${outOfStock.join(', ')}.`);
        }

        setLoading(false);
    };

    if (orderId) {
        return (
            <div className="text-center p-12 my-10 bg-green-100 border border-green-500 rounded-lg max-w-lg mx-auto">
                <h1 className="text-3xl font-extrabold text-green-700 mb-4">¡Compra Finalizada con Éxito!</h1>
                <p className="text-xl text-gray-700">Tu número de orden es:</p>
                <p className="text-4xl font-mono mt-3 text-green-900 break-all">#{orderId}</p>
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
                <input required type="text" name="name" onChange={handleChange} placeholder="Nombre completo" className="w-full p-3 border rounded" />
                <input required type="email" name="email" onChange={handleChange} placeholder="Email" className="w-full p-3 border rounded" />
                <input required type="tel" name="phone" onChange={handleChange} placeholder="Teléfono" className="w-full p-3 border rounded" />

                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow">
                    Confirmar Compra
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;