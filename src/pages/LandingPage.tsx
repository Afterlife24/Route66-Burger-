import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Clock, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { loadMenuData } from '../pictures';
import toast from 'react-hot-toast';
import scrollIcon from '../assets/img6.jpg'; // Adjust path as needed

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const menuData = await loadMenuData();
        const uniqueCategories = ['All', ...new Set(menuData.map(item => item.category))];
        setCategories(uniqueCategories.slice(0, 5)); // Get 'All' + first 4 categories

        // Get the first image for each category
        const images = {};
        menuData.forEach(item => {
          if (!images[item.category] && item.image) {
            images[item.category] = item.image;
          }
        });
        setCategoryImages(images);
        setLoading(false);
      } catch (error) {
        console.error('Error loading categories:', error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div 
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Route66</h1>
            <p className="text-xl md:text-2xl mb-8">Experience the finest flavors in town</p>
            <Link
              to="/menu"
              className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300 inline-block"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            categories.filter(cat => cat !== 'All').map((category) => (
              <Link
                key={category}
                to={`/menu?category=${category}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={categoryImages[category] || `https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`}
                  alt={category}
                  className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 p-4 flex items-center justify-between w-full">
                  <span className="text-white text-xl font-semibold">{category}</span>
                  <ChevronRight className="text-white w-6 h-6 group-hover:translate-x-2 transition duration-300" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Special Features */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Star className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">Made with premium ingredients</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Hot food at your doorstep</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Best Location</h3>
              <p className="text-gray-600">Easy to find and access</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Phone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              At FoodieSpot, we believe in bringing the finest culinary experiences to your table. 
              Our passion for food and commitment to quality has made us a favorite destination for 
              food lovers.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Star className="w-5 h-5 text-orange-500 mr-2" />
                <span>Fresh ingredients sourced daily</span>
              </li>
              <li className="flex items-center">
                <Star className="w-5 h-5 text-orange-500 mr-2" />
                <span>Expert chefs with years of experience</span>
              </li>
              <li className="flex items-center">
                <Star className="w-5 h-5 text-orange-500 mr-2" />
                <span>Wide variety of cuisines</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1542528180-1c2803fa048c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Restaurant interior"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Location & Contact */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Us</h2>
            <p className="text-gray-600">Find us at our convenient location</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-orange-500 mr-3" />
                  <span>123 Foodie Street, Cuisine City, FC 12345</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-orange-500 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-orange-500 mr-3" />
                  <span>info@foodiespot.com</span>
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="mt-6">
                <h4 className="font-semibold mb-3">Subscribe to our newsletter</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647043276541!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button with Image */}
{/* <div className="fixed bottom-10 right-6 z-50">
  <button className="p-3 shadow-lg">
    <img 
      src={scrollIcon} 
      alt="Scroll Button"
      className="w-19 h-16 bg-transparent" // Ensures no background color
    />
  </button>
</div> */}




      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FoodieSpot</h3>
              <p className="text-gray-400">
                Bringing the finest culinary experiences to your table since 2020.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/menu" className="text-gray-400 hover:text-white transition duration-300">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-400 hover:text-white transition duration-300">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <ul className="text-gray-400">
                <li>Monday - Friday: 9:00 AM - 10:00 PM</li>
                <li>Saturday - Sunday: 10:00 AM - 11:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodieSpot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;