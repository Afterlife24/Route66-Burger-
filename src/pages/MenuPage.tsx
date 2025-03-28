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
    <div className="pt-20 px-4 max-w-7xl mx-auto">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            to={`/item/${item.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="relative h-32 sm:h-36">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
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
    </div>
  );
};

export default MenuPage;