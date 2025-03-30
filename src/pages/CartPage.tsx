import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import OtpVerification from './OtpVerification';

const CartPage = () => {
  const { 
    cartItems, 
    orderHistory,
    updateQuantity, 
    removeFromCart, 
    clearCart,
    addToOrderHistory
  } = useCart();
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [orderSent, setOrderSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const generateRandomTokenId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const processOrder = async () => {
    if (cartItems.length === 0) {
      toast.error('No items to order. Please add items first.');
      return;
    }

    const tokenId = generateRandomTokenId();
    const orderTime = new Date().toISOString();

    const orderData = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: total.toFixed(2),
      date: new Date().toISOString(),
      orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      tokenId,
      email: userEmail,
      orderTime
    };

    try {
      setIsLoading(true);
      // Send order to backend
      const response = await fetch("https://route66-server.gofastapi.com/sendOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dishes: orderData.items,
          tokenId: orderData.tokenId,
          email: orderData.email,
          total: orderData.total,
          orderTime: orderTime
        }),
      });

      if (response.ok) {
        // Add to order history and clear cart
        addToOrderHistory(orderData);
        clearCart();
        setOrderSent(true);
        setSuccessMessage(`Order sent successfully! Your Token ID is ${tokenId}`);
        toast.success('Order placed successfully!');
      } else {
        const errorData = await response.json();
        toast.error("Failed to send order: " + errorData.error);
      }
    } catch (error) {
      toast.error("Error sending order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setIsOtpModalVisible(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen pb-12">
      {/* OTP Verification Modal */}
      {isOtpModalVisible && (
        <OtpVerification
          onVerify={() => {
            setIsOtpModalVisible(false);
            processOrder();
          }}
          onCancel={() => setIsOtpModalVisible(false)}
          onEmailUpdate={(email) => setUserEmail(email)}
        />
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          <p>{successMessage}</p>
        </div>
      )}

      {cartItems.length === 0 && orderHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link
            to="/menu"
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          {/* Current Cart Section */}
          {cartItems.length > 0 && (
            <>
              <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.quantity}`}
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
                    disabled={cartItems.length === 0 || isLoading}
                    className={`w-full py-3 rounded-full mt-6 transition duration-300 ${
                      cartItems.length === 0 || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
              </div>
            </>
          )}

          {cartItems.length === 0 && orderHistory.length > 0 && (
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                  <Link
                  to="/menu"
                  className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300 inline-block"
                >
                  Browse Menu
                </Link>
              </div>
          )}


          {/* Order History Section */}
          {orderHistory.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              <div className="space-y-6">
                {orderHistory.map((order) => (
                  <div key={order.orderId} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Order #{order.orderId}</h3>
                        <p className="text-gray-500 text-sm">
                          {new Date(order.date).toLocaleString()}
                        </p>
                        {order.tokenId && (
                          <p className="text-gray-500 text-sm mt-1">
                            Token ID: {order.tokenId}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold">Total: ${order.total}</p>
                        <p className="text-green-500 text-sm">Completed</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Items:</h4>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div 
                            key={`${item.id}-${order.orderId}`} 
                            className="flex items-center gap-4"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 flex justify-between items-center">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                              </div>
                              <div className="text-right">
                                <p>x {item.quantity}</p>
                                <p className="font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty cart but has order history */}
          
        </>
      )}
    </div>
  );
};

export default CartPage;