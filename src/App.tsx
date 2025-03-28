import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import ItemDetails from './pages/ItemDetails';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 2000,
              style: {
                marginTop: '4rem',
                background: '#333',
                color: '#fff',
                fontSize: '0.875rem',
              },
            }}
          />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;