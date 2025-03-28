// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { Plus, Minus, Trash2 } from 'lucide-react';
// import toast from 'react-hot-toast';

// const CartPage = () => {
//   const { cartItems, updateQuantity, removeFromCart } = useCart();

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleCheckout = () => {
//     toast.success('Order placed successfully!');
//     // Add your checkout logic here
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
//         <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
//         <Link
//           to="/menu"
//           className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
//         >
//           Browse Menu
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen">
//       <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

//       <div className="grid md:grid-cols-3 gap-8">
//         <div className="md:col-span-2 space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded"
//               />
              
//               <div className="flex-1">
//                 <h3 className="font-semibold">{item.name}</h3>
//                 <p className="text-orange-500 font-bold">${item.price.toFixed(2)}</p>
                
//                 <div className="flex items-center gap-4 mt-2">
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                     className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="p-1 rounded-full text-red-500 hover:bg-red-50"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-lg shadow p-6 h-fit">
//           <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//           <div className="space-y-2 mb-4">
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex justify-between text-gray-600">
//                 <span>{item.name} x {item.quantity}</span>
//                 <span>${(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))}
//           </div>
//           <div className="border-t pt-4">
//             <div className="flex justify-between font-bold text-lg">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>
//           <button 
//             onClick={handleCheckout}
//             className="w-full bg-orange-500 text-white py-3 rounded-full mt-6 hover:bg-orange-600 transition duration-300"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;










import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Load order from session storage on component mount
  useEffect(() => {
    const savedOrder = sessionStorage.getItem('currentOrder');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrderDetails(parsedOrder);
        setOrderCompleted(true);
      } catch (error) {
        console.error('Failed to parse saved order:', error);
        sessionStorage.removeItem('currentOrder');
      }
    }
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Create order object
    const order = {
      items: cartItems.map(item => ({
        ...item,
        // Ensure we're storing simple data (no functions or complex objects)
      })),
      total: total.toFixed(2),
      date: new Date().toISOString(),
      orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };

    // Save to session storage
    try {
      sessionStorage.setItem('currentOrder', JSON.stringify(order));
      setOrderDetails(order);
      clearCart();
      setOrderCompleted(true);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Failed to save order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const clearOrder = () => {
    sessionStorage.removeItem('currentOrder');
    setOrderCompleted(false);
    setOrderDetails(null);
  };

  if (cartItems.length === 0 && !orderCompleted) {
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
    <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen pb-12">
      {!orderCompleted ? (
        <>
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.quantity}`} // Unique key for each cart item
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
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        disabled={item.quantity <= 1}
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

            <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-4">
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
                disabled={cartItems.length === 0}
                className={`w-full py-3 rounded-full mt-6 transition duration-300 ${
                  cartItems.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="text-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h1 className="text-2xl font-bold mt-4">Order Confirmed!</h1>
              <p className="text-gray-600 mt-2">Thank you for your purchase</p>
              <p className="text-gray-500 mt-1">Order ID: {orderDetails.orderId}</p>
              <p className="text-gray-500">Date: {new Date(orderDetails.date).toLocaleString()}</p>
            </div>

            <div className="border-t pt-4">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <div className="space-y-2 mb-4">
                {orderDetails.items.map((item) => (
                  <div key={`${item.id}-${item.quantity}`} className="flex justify-between text-gray-600">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${orderDetails.total}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={clearOrder}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition duration-300"
            >
              Start New Order
            </button>
            <Link
              to="/menu"
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
            >
              Back to Menu
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;