import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { loadMenuData } from '../pictures';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadMenuData();
        setMenuItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading menu data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 px-4 max-w-7xl mx-auto">
      {/* Promotional Banner */}
      <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl overflow-hidden mb-8 shadow-lg mt-5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
        <div className="relative z-10 p-6 md:p-8 lg:p-10 text-white">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">Dine Faster, Not Later!</h2>
<p className="text-amber-100 mb-5">
  Order online and collect piping hot meals directly from our restaurant counter - no waiting required!
</p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/order" 
                className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-2 rounded-full font-medium text-sm md:text-base text-center transition-colors shadow-sm"
              >
                Order Now
              </Link>
              <Link 
                to="/about" 
                className="border border-white text-white hover:bg-white hover:bg-opacity-10 px-6 py-2 rounded-full font-medium text-sm md:text-base text-center transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            to={`/item/${item.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 group"
          >
            <div className="relative h-32 sm:h-36">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold mb-1 line-clamp-1">{item.name}</h3>
              <p className="text-gray-600 text-xs mb-2 line-clamp-2">{item.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold text-sm">${item.price}</span>
                <span className="text-xs bg-orange-100 text-orange-500 px-2 py-1 rounded-full">
                  View
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Special Offer Section */}
      {/* <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="flex-shrink-0">
            <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z" />
              </svg>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg text-gray-800 mb-1">First Order Special!</h3>
            <p className="text-sm text-gray-600">Get 15% off your first order when you spend $30 or more. Use code <span className="font-mono bg-amber-100 px-2 py-0.5 rounded">WELCOME15</span></p>
          </div>
          <div className="md:ml-auto mt-3 md:mt-0">
            <Link 
              to="/order" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Claim Offer
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MenuPage;