//perfect code
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import toast from 'react-hot-toast';

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface Order {
//   items: CartItem[];
//   total: string;
//   date: string;
//   orderId: string;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   orderHistory: Order[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
//   addToOrderHistory: (order: Order) => void;
// }

// const CartContext = createContext<CartContextType>({
//   cartItems: [],
//   orderHistory: [],
//   addToCart: () => {},
//   removeFromCart: () => {},
//   updateQuantity: () => {},
//   clearCart: () => {},
//   addToOrderHistory: () => {},
// });

// export const useCart = () => useContext(CartContext);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [orderHistory, setOrderHistory] = useState<Order[]>([]);
//   const [isInitialized, setIsInitialized] = useState(false);

//   // Load cart and order history from session storage on initial render
//   useEffect(() => {
//     const savedCart = sessionStorage.getItem('cartItems');
//     const savedOrderHistory = sessionStorage.getItem('orderHistory');

//     if (savedCart) {
//       try {
//         const parsedCart = JSON.parse(savedCart);
//         if (Array.isArray(parsedCart)) {
//           setCartItems(parsedCart);
//         }
//       } catch (error) {
//         console.error('Failed to parse saved cart:', error);
//         sessionStorage.removeItem('cartItems');
//       }
//     }

//     if (savedOrderHistory) {
//       try {
//         const parsedOrderHistory = JSON.parse(savedOrderHistory);
//         if (Array.isArray(parsedOrderHistory)) {
//           setOrderHistory(parsedOrderHistory);
//         }
//       } catch (error) {
//         console.error('Failed to parse saved order history:', error);
//         sessionStorage.removeItem('orderHistory');
//       }
//     }

//     setIsInitialized(true);
//   }, []);

//   // Save cart and order history to session storage whenever they change
//   useEffect(() => {
//     if (isInitialized) {
//       sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
//       sessionStorage.setItem('orderHistory', JSON.stringify(orderHistory));
//     }
//   }, [cartItems, orderHistory, isInitialized]);

//   const addToCart = (item: CartItem) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((i) => i.id === item.id);
//       let newCart;
      
//       if (existingItem) {
//         toast.success(`Updated ${item.name} quantity in cart`);
//         newCart = prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
//         );
//       } else {
//         toast.success(`Added ${item.name} to cart`);
//         newCart = [...prev, item];
//       }
      
//       return newCart;
//     });
//   };

//   const removeFromCart = (id: number) => {
//     const item = cartItems.find(i => i.id === id);
//     if (item) {
//       toast.success(`Removed ${item.name} from cart`);
//     }
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: number, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(id);
//       return;
//     }
    
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const addToOrderHistory = (order: Order) => {
//     setOrderHistory(prev => [order, ...prev]);
//   };

//   return (
//     <CartContext.Provider 
//       value={{ 
//         cartItems, 
//         orderHistory,
//         addToCart, 
//         removeFromCart, 
//         updateQuantity,
//         clearCart,
//         addToOrderHistory
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
































import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isCombination?: boolean;
  mainItemId?: number;
}

interface Order {
  items: CartItem[];
  total: string;
  date: string;
  orderId: string;
  tokenId?: string;
  email?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  orderHistory: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number, isCombination?: boolean, mainItemId?: number) => void;
  clearCart: () => void;
  addToOrderHistory: (order: Order) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  orderHistory: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  addToOrderHistory: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart and order history from session storage on initial render
  useEffect(() => {
    const savedCart = sessionStorage.getItem('cartItems');
    const savedOrderHistory = sessionStorage.getItem('orderHistory');

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
        sessionStorage.removeItem('cartItems');
      }
    }

    if (savedOrderHistory) {
      try {
        const parsedOrderHistory = JSON.parse(savedOrderHistory);
        if (Array.isArray(parsedOrderHistory)) {
          setOrderHistory(parsedOrderHistory);
        }
      } catch (error) {
        console.error('Failed to parse saved order history:', error);
        sessionStorage.removeItem('orderHistory');
      }
    }

    setIsInitialized(true);
  }, []);

  // Save cart and order history to session storage whenever they change
  useEffect(() => {
    if (isInitialized) {
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      sessionStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }
  }, [cartItems, orderHistory, isInitialized]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => 
        i.id === item.id && 
        (i.isCombination === item.isCombination) &&
        (!i.isCombination || i.mainItemId === item.mainItemId)
      );
      
      let newCart;
      if (existingItem) {
        // For existing items, update the quantity to the exact value passed in
        newCart = prev.map((i) =>
          i.id === item.id && 
          (i.isCombination === item.isCombination) &&
          (!i.isCombination || i.mainItemId === item.mainItemId)
            ? { ...i, quantity: item.quantity }
            : i
        );
        toast.success(`Updated ${item.name} quantity in cart`);
      } else {
        newCart = [...prev, item];
        toast.success(`Added ${item.name} to cart`);
      }
      
      return newCart;
    });
  };

  const removeFromCart = (id: number, isCombination?: boolean, mainItemId?: number) => {
    setCartItems((prev) => {
      const item = prev.find(i => 
        i.id === id && 
        (i.isCombination === isCombination) &&
        (!isCombination || i.mainItemId === mainItemId)
      );
      
      if (item) {
        toast.success(`Removed ${item.name} from cart`);
      }
      
      return prev.filter((item) => 
        !(item.id === id && 
          (item.isCombination === isCombination) &&
          (!isCombination || item.mainItemId === mainItemId))
      );
    });
  };

  const updateQuantity = (id: number, quantity: number, isCombination?: boolean, mainItemId?: number) => {
    if (quantity <= 0) {
      removeFromCart(id, isCombination, mainItemId);
      return;
    }
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && 
        (item.isCombination === isCombination) &&
        (!isCombination || item.mainItemId === mainItemId)
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    sessionStorage.removeItem('cartItems');
  };

  const addToOrderHistory = (order: Order) => {
    setOrderHistory(prev => [order, ...prev]);
    sessionStorage.setItem('currentOrder', JSON.stringify(order));
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        orderHistory,
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        addToOrderHistory
      }}
    >
      {children}
    </CartContext.Provider>
  );
};