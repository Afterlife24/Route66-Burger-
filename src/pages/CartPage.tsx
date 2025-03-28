import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    toast.success('Order placed successfully!');
    // Add your checkout logic here
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/menu"
          className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-orange-500 font-bold">${item.price.toFixed(2)}</p>
                
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 rounded-full text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-600">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-orange-500 text-white py-3 rounded-full mt-6 hover:bg-orange-600 transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;








