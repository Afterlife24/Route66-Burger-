import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Clock, MapPin, Phone, Mail, ArrowRight, X } from 'lucide-react';
import { loadMenuData } from '../pictures';
import toast from 'react-hot-toast';
import promoBanner from '../assets/img6.jpg';

interface MenuItem {
  category: string;
  image?: string;
  // Add other properties if needed
}

const LandingPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [showPromoBanner, setShowPromoBanner] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const menuData: MenuItem[] = await loadMenuData();
        const uniqueCategories = ['All', ...new Set(menuData.map(item => item.category))];
        setCategories(uniqueCategories.slice(0, 5));

        const images: Record<string, string> = {};
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Merci pour votre abonnement !');
    setEmail('');
  };

  const handlePromoClick = () => {
    console.log('Promo banner clicked');
    // You could add navigation or other actions here
    // Example: navigate('/promo-page');
  };

  const closePromoBanner = () => {
    setShowPromoBanner(false);
  };

  return (
    <div className="pt-16 relative">
      {/* Floating Promo Banner - Only visible on Landing Page */}
      {showPromoBanner && (
        <div className="fixed bottom-6 right-6 z-50 shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl bg-white">
  <div className="relative">
    <img 
      src={promoBanner} 
      alt="Special Offer" 
      className="max-h-[100px] w-auto cursor-pointer"
      onClick={() => window.location.href = 'https://route66-route66.gofastapi.com/menu'}
    />
  </div>
</div>

      )}

      {/* Hero Section */}
      <div 
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenue chez Route66</h1>
            <p className="text-xl md:text-2xl mb-8">Découvrez les meilleures saveurs en ville</p>
            <Link
              to="/menu"
              className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300 inline-block"
            >
              Voir le Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Catégories Populaires</h2>
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
              <h3 className="text-xl font-semibold mb-2">Nourriture de Qualité</h3>
              <p className="text-gray-600">Préparée avec des ingrédients premium</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">Plats chauds livrés chez vous</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Meilleur Emplacement</h3>
              <p className="text-gray-600">Facile à trouver et accessible</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Phone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Support 24h/24</h3>
              <p className="text-gray-600">Toujours là pour vous aider</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
            <p className="text-gray-600 mb-6">
              Chez Route66, nous croyons à l'expérience culinaire d'exception. Notre passion pour la
              cuisine et notre engagement envers la qualité font de nous une destination incontournable.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Star className="w-5 h-5 text-orange-500 mr-2" />
                <span>Ingrédients frais chaque jour</span>
              </li>
              <li className="flex items-center">
                <Star className="w-5 h-5 text-orange-500 mr-2" />
                <span>Chefs expérimentés</span>
              </li>
              <li className="flex items-center">
                <Star className="w-5 h-5 text-orange-500 mr-2" />
                <span>Large choix de cuisines</span>
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
            <h2 className="text-3xl font-bold mb-4">Rendez-nous visite</h2>
            <p className="text-gray-600">Trouvez-nous à notre adresse pratique</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Informations de Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-orange-500 mr-3" />
                  <span>2 Rue Paul Bellamy - 44000 Nantes, France</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-orange-500 mr-3" />
                  <span>02 52 10 18 87</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-orange-500 mr-3" />
                  <span>route66burger@yahoo.com</span>
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="mt-6">
                <h4 className="font-semibold mb-3">Abonnez-vous à notre newsletter</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre e-mail"
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2709.7860693197867!2d-1.5577077237925776!3d47.22076807115696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805eea3d518cda5%3A0x8927ca7dc5988246!2s2%20Rue%20Paul%20Bellamy%2C%2044000%20Nantes%2C%20France!5e0!3m2!1sen!2sin!4v1744732052374!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Restaurant Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Route66</h3>
              <p className="text-gray-400">
                Apportant les meilleures expériences culinaires.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/menu" className="text-gray-400 hover:text-white transition duration-300">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-400 hover:text-white transition duration-300">
                    Panier
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Heures d'ouverture</h3>
              <ul className="text-gray-400">
                <li>Lundi - Vendredi : 9h00 - 22h00</li>
                <li>Samedi - Dimanche : 10h00 - 23h00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Route66. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;