// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { loadMenuData } from '../pictures';
// import { Plus, Minus, X, ShoppingCart } from 'lucide-react';
// import toast from 'react-hot-toast';

// const ItemDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [item, setItem] = useState(null);
//   const [allItems, setAllItems] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [comboQuantity, setComboQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [showCombinationsModal, setShowCombinationsModal] = useState(false);
//   const [selectedCombination, setSelectedCombination] = useState(null);
//   const { addToCart } = useCart();

//   const parsePrice = (price) => {
//     if (price === null || price === undefined) {
//       console.warn('Price is null or undefined');
//       return 0;
//     }
//     if (typeof price === 'number') return price;
//     if (typeof price === 'string') {
//       const numericString = price.replace(/[^0-9.]/g, '');
//       const parsed = parseFloat(numericString);
//       if (isNaN(parsed)) {
//         console.warn(`Could not parse price: ${price}`);
//         return 0;
//       }
//       return parsed;
//     }
//     console.warn(`Unexpected price type: ${typeof price}`);
//     return 0;
//   };

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const data = await loadMenuData();
//         const foundItem = data.find(i => i.id === parseInt(id));
//         if (!foundItem) {
//           console.error(`Item with id ${id} not found`);
//           setLoading(false);
//           return;
//         }

//         foundItem.price = parsePrice(foundItem.price);
        
//         if (foundItem.combinations) {
//           foundItem.combinations = foundItem.combinations.map(comb => {
//             if (typeof comb === 'string') {
//               const comboItem = data.find(item => 
//                 item.name.toLowerCase() === comb.toLowerCase()
//               );
//               if (comboItem) {
//                 return {
//                   ...comboItem,
//                   price: parsePrice(comboItem.price)
//                 };
//               }
//               return null;
//             }
//             return {
//               ...comb,
//               price: parsePrice(comb.price)
//             };
//           }).filter(Boolean);
//         }

//         setItem(foundItem);
//         setAllItems(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error loading item:', error);
//         setLoading(false);
//       }
//     };
//     fetchItem();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!item) return;

//     const cartItem = {
//       id: item.id,
//       name: item.name,
//       price: parsePrice(item.price),
//       quantity,
//       image: item.image,
//     };
    
//     addToCart(cartItem);
    
//     let toastMessage = `Added ${quantity} ${item.name} to cart`;
    
//     if (selectedCombination) {
//       const comboItem = {
//         ...selectedCombination,
//         price: parsePrice(selectedCombination.price),
//         quantity: comboQuantity,
//         isCombination: true,
//         mainItemId: item.id
//       };
//       addToCart(comboItem);
//       toastMessage += ` and ${comboQuantity} ${selectedCombination.name}`;
//       setSelectedCombination(null);
//       setComboQuantity(1);
//     }
    
//     toast.success(toastMessage);
//   };

//   const findCombinationItems = () => {
//     if (!item?.combinations) return [];
//     return item.combinations.map(comb => {
//       if (typeof comb === 'string') {
//         return allItems.find(menuItem => 
//           menuItem.name.toLowerCase() === comb.toLowerCase()
//         );
//       }
//       return comb;
//     }).filter(Boolean);
//   };

//   const combinationItems = findCombinationItems();

//   if (loading) {
//     return (
//       <div className="pt-16 flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   if (!item) {
//     return (
//       <div className="pt-16 flex items-center justify-center min-h-screen">
//         <div className="text-xl">Item not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-20 px-4 max-w-7xl mx-auto">
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="relative">
//           <img
//             src={item.image}
//             alt={item.name}
//             className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-lg"
//           />
//         </div>
        
//         <div className="space-y-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{item.name}</h1>
//           <p className="text-gray-600 text-base md:text-lg">{item.desc}</p>
//           <div className="text-2xl md:text-3xl font-bold text-orange-500">
//             €{parsePrice(item.price).toFixed(2)}
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setQuantity(q => Math.max(1, q - 1))}
//               className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//             >
//               <Minus className="w-5 h-5" />
//             </button>
//             <span className="text-xl font-semibold">{quantity}</span>
//             <button
//               onClick={() => setQuantity(q => q + 1)}
//               className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//             >
//               <Plus className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={() => navigate('/cart')}
//               className="flex-1 bg-gray-800 text-white py-3 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
//             >
//               <ShoppingCart className="w-5 h-5" />
//               Go to Cart
//             </button>
//           </div>

//           {combinationItems.length > 0 && (
//             <div className="border-t pt-6">
//               <h2 className="text-xl font-bold mb-4">Best Combinations</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                 {combinationItems.map((combo) => (
//                   <div
//                     key={combo.id}
//                     onClick={() => {
//                       setSelectedCombination(combo);
//                       setShowCombinationsModal(true);
//                     }}
//                     className="cursor-pointer group"
//                   >
//                     <div className="relative overflow-hidden rounded-lg">
//                       <img
//                         src={combo.image}
//                         alt={combo.name}
//                         className="w-full h-32 object-cover group-hover:scale-105 transition duration-300"
//                       />
//                       <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
//                         <span className="text-white text-sm font-medium">View Details</span>
//                       </div>
//                     </div>
//                     <h3 className="mt-2 text-sm font-medium">{combo.name}</h3>
//                     <p className="text-orange-500 font-bold">€{parsePrice(combo.price).toFixed(2)}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Combinations Modal */}
//       {showCombinationsModal && selectedCombination && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold">Add Combination</h2>
//               <button
//                 onClick={() => {
//                   setShowCombinationsModal(false);
//                   setSelectedCombination(null);
//                   setComboQuantity(1);
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-full"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
            
//             <div className="space-y-6">
//               <div className="relative">
//                 <img
//                   src={selectedCombination.image}
//                   alt={selectedCombination.name}
//                   className="w-full h-48 object-cover rounded-lg"
//                 />
//               </div>
              
//               <div>
//                 <h3 className="text-lg font-bold">{selectedCombination.name}</h3>
//                 <p className="text-orange-500 font-bold mt-1">€{parsePrice(selectedCombination.price).toFixed(2)}</p>
//                 <p className="text-gray-600 mt-2">{selectedCombination.desc}</p>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button
//                     onClick={() => setComboQuantity(q => Math.max(1, q - 1))}
//                     className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//                   >
//                     <Minus className="w-5 h-5" />
//                   </button>
//                   <span className="text-xl font-semibold">{comboQuantity}</span>
//                   <button
//                     onClick={() => setComboQuantity(q => q + 1)}
//                     className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//                   >
//                     <Plus className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="text-lg font-bold">
//                   €{(parsePrice(selectedCombination.price) * comboQuantity).toFixed(2)}
//                 </div>
//               </div>
              
//               <button
//                 onClick={() => {
//                   handleAddToCart();
//                   setShowCombinationsModal(false);
//                 }}
//                 className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
//               >
//                 Add Combination to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItemDetails;






















// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { loadMenuData } from '../pictures';
// import { Plus, Minus, X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { useSwipeable } from 'react-swipeable';

// const ItemDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [item, setItem] = useState(null);
//   const [allItems, setAllItems] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [comboQuantity, setComboQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [showCombinationsModal, setShowCombinationsModal] = useState(false);
//   const [selectedCombination, setSelectedCombination] = useState(null);
//   const { addToCart } = useCart();
//   const lastToastRef = useRef(null);
//   const [slideDirection, setSlideDirection] = useState(null);
//   const contentRef = useRef(null);

//   const parsePrice = (price) => {
//     if (price === null || price === undefined) {
//       console.warn('Price is null or undefined');
//       return 0;
//     }
//     if (typeof price === 'number') return price;
//     if (typeof price === 'string') {
//       const numericString = price.replace(/[^0-9.]/g, '');
//       const parsed = parseFloat(numericString);
//       if (isNaN(parsed)) {
//         console.warn(`Could not parse price: ${price}`);
//         return 0;
//       }
//       return parsed;
//     }
//     console.warn(`Unexpected price type: ${typeof price}`);
//     return 0;
//   };

//   const loadItemData = async () => {
//     try {
//       const data = await loadMenuData();
//       const foundItem = data.find(i => i.id === parseInt(id));
//       if (!foundItem) {
//         console.error(`Item with id ${id} not found`);
//         setLoading(false);
//         return;
//       }

//       foundItem.price = parsePrice(foundItem.price);
      
//       if (foundItem.combinations) {
//         foundItem.combinations = foundItem.combinations.map(comb => {
//           if (typeof comb === 'string') {
//             const comboItem = data.find(item => 
//               item.name.toLowerCase() === comb.toLowerCase()
//             );
//             if (comboItem) {
//               return {
//                 ...comboItem,
//                 price: parsePrice(comboItem.price)
//               };
//             }
//             return null;
//           }
//           return {
//             ...comb,
//             price: parsePrice(comb.price)
//           };
//         }).filter(Boolean);
//       }

//       setItem(foundItem);
//       setAllItems(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error loading item:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadItemData();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!item) return;

//     if (lastToastRef.current) {
//       toast.dismiss(lastToastRef.current);
//     }

//     const cartItem = {
//       id: item.id,
//       name: item.name,
//       price: parsePrice(item.price),
//       quantity,
//       image: item.image,
//     };
    
//     addToCart(cartItem);
    
//     let toastMessage = `Added ${quantity} ${item.name} to cart`;
    
//     if (selectedCombination) {
//       const comboItem = {
//         ...selectedCombination,
//         price: parsePrice(selectedCombination.price),
//         quantity: comboQuantity,
//         isCombination: true,
//         mainItemId: item.id
//       };
//       addToCart(comboItem);
//       toastMessage += ` and ${comboQuantity} ${selectedCombination.name}`;
//       setSelectedCombination(null);
//       setComboQuantity(1);
//     }
    
//     lastToastRef.current = toast.success(toastMessage);
//   };

//   const findCombinationItems = () => {
//     if (!item?.combinations) return [];
//     return item.combinations.map(comb => {
//       if (typeof comb === 'string') {
//         return allItems.find(menuItem => 
//           menuItem.name.toLowerCase() === comb.toLowerCase()
//         );
//       }
//       return comb;
//     }).filter(Boolean);
//   };

//   const navigateToAdjacentItem = (direction) => {
//     if (!allItems.length) return;
    
//     const currentIndex = allItems.findIndex(i => i.id === parseInt(id));
//     if (currentIndex === -1) return;
    
//     let newIndex;
//     if (direction === 'prev') {
//       newIndex = currentIndex > 0 ? currentIndex - 1 : allItems.length - 1;
//       setSlideDirection('slide-out-right');
//     } else {
//       newIndex = currentIndex < allItems.length - 1 ? currentIndex + 1 : 0;
//       setSlideDirection('slide-out-left');
//     }
    
//     // Apply slide animation
//     if (contentRef.current) {
//       contentRef.current.style.transform = direction === 'prev' 
//         ? 'translateX(100%)' 
//         : 'translateX(-100%)';
//       contentRef.current.style.opacity = '0';
//     }
    
//     setTimeout(() => {
//       navigate(`/item/${allItems[newIndex].id}`);
//       setQuantity(1);
//       setSlideDirection(direction === 'prev' ? 'slide-in-left' : 'slide-in-right');
      
//       if (contentRef.current) {
//         contentRef.current.style.transform = 'translateX(0)';
//         contentRef.current.style.opacity = '1';
//       }
//     }, 300);
//   };

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => navigateToAdjacentItem('next'),
//     onSwipedRight: () => navigateToAdjacentItem('prev'),
//     trackMouse: true,
//     delta: 50 // Minimum swipe distance
//   });

//   const combinationItems = findCombinationItems();

//   if (loading) {
//     return (
//       <div className="pt-16 flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   if (!item) {
//     return (
//       <div className="pt-16 flex items-center justify-center min-h-screen">
//         <div className="text-xl">Item not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-20 px-4 max-w-7xl mx-auto relative overflow-hidden">
//       {/* Desktop navigation arrows */}
//       <div className="hidden md:flex absolute top-1/2 left-4 right-4 -translate-y-1/2 justify-between z-10">
//         <button 
//           onClick={() => navigateToAdjacentItem('prev')}
//           className="p-3 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors backdrop-blur-sm"
//           aria-label="Previous item"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </button>
//         <button 
//           onClick={() => navigateToAdjacentItem('next')}
//           className="p-3 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors backdrop-blur-sm"
//           aria-label="Next item"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </button>
//       </div>

//       {/* Mobile floating navigation buttons */}
//       <div className="md:hidden fixed bottom-6 left-0 right-0 flex justify-center gap-8 z-10">
//         <button 
//           onClick={() => navigateToAdjacentItem('prev')}
//           className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
//           aria-label="Previous item"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </button>
//         <button 
//           onClick={() => navigate('/menu')}
//           className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
//           aria-label="Back to menu"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <line x1="3" y1="12" x2="21" y2="12"></line>
//             <line x1="3" y1="6" x2="21" y2="6"></line>
//             <line x1="3" y1="18" x2="21" y2="18"></line>
//           </svg>
//         </button>
//         <button 
//           onClick={() => navigateToAdjacentItem('next')}
//           className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
//           aria-label="Next item"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </button>
//       </div>

//       {/* Content with slide animation */}
//       <div 
//         ref={contentRef}
//         className={`transition-all duration-300 ease-in-out ${slideDirection || ''}`}
//         style={{ transform: 'translateX(0)', opacity: 1 }}
//         {...swipeHandlers}
//       >
//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="relative">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-[200px] md:h-[400px] object-cover rounded-lg shadow-lg"
//             />
//           </div>
          
//           <div className="space-y-6">
//             <h1 className="text-xl md:text-3xl font-bold text-gray-900">{item.name}</h1>
//             <p className="text-gray-600 text-base md:text-lg">{item.desc}</p>
//             <div className="text-2xl md:text-3xl font-bold text-orange-500">
//               €{parsePrice(item.price).toFixed(2)}
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               >
//                 <Minus className="w-5 h-5" />
//               </button>
//               <span className="text-xl font-semibold">{quantity}</span>
//               <button
//                 onClick={() => setQuantity(q => q + 1)}
//                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               >
//                 <Plus className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
//               >
//                 Add to Cart
//               </button>
//               <button
//                 onClick={() => navigate('/cart')}
//                 className="flex-1 bg-gray-800 text-white py-3 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
//               >
//                 <ShoppingCart className="w-5 h-5" />
//                 Go to Cart
//               </button>
//             </div>

//             {combinationItems.length > 0 && (
//               <div className="border-t pt-6">
//                 <h2 className="text-xl font-bold mb-4">Best Combinations</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   {combinationItems.map((combo) => (
//                     <div
//                       key={combo.id}
//                       onClick={() => {
//                         setSelectedCombination(combo);
//                         setShowCombinationsModal(true);
//                       }}
//                       className="cursor-pointer group"
//                     >
//                       <div className="relative overflow-hidden rounded-lg">
//                         <img
//                           src={combo.image}
//                           alt={combo.name}
//                           className="w-full h-32 object-cover group-hover:scale-105 transition duration-300"
//                         />
//                         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
//                           <span className="text-white text-sm font-medium">View Details</span>
//                         </div>
//                       </div>
//                       <h3 className="mt-2 text-sm font-medium">{combo.name}</h3>
//                       <p className="text-orange-500 font-bold">€{parsePrice(combo.price).toFixed(2)}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Combinations Modal */}
//       {showCombinationsModal && selectedCombination && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold">Add Combination</h2>
//               <button
//                 onClick={() => {
//                   setShowCombinationsModal(false);
//                   setSelectedCombination(null);
//                   setComboQuantity(1);
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-full"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
            
//             <div className="space-y-6">
//               <div className="relative">
//                 <img
//                   src={selectedCombination.image}
//                   alt={selectedCombination.name}
//                   className="w-full h-48 object-cover rounded-lg"
//                 />
//               </div>
              
//               <div>
//                 <h3 className="text-lg font-bold">{selectedCombination.name}</h3>
//                 <p className="text-orange-500 font-bold mt-1">€{parsePrice(selectedCombination.price).toFixed(2)}</p>
//                 <p className="text-gray-600 mt-2">{selectedCombination.desc}</p>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button
//                     onClick={() => setComboQuantity(q => Math.max(1, q - 1))}
//                     className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//                   >
//                     <Minus className="w-5 h-5" />
//                   </button>
//                   <span className="text-xl font-semibold">{comboQuantity}</span>
//                   <button
//                     onClick={() => setComboQuantity(q => q + 1)}
//                     className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//                   >
//                     <Plus className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="text-lg font-bold">
//                   €{(parsePrice(selectedCombination.price) * comboQuantity).toFixed(2)}
//                 </div>
//               </div>
              
//               <button
//                 onClick={() => {
//                   handleAddToCart();
//                   setShowCombinationsModal(false);
//                 }}
//                 className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
//               >
//                 Add Combination to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItemDetails;


import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { loadMenuData } from '../pictures';
import { Plus, Minus, X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSwipeable } from 'react-swipeable';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [comboQuantity, setComboQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showCombinationsModal, setShowCombinationsModal] = useState(false);
  const [selectedCombination, setSelectedCombination] = useState(null);
  const { addToCart } = useCart();
  const [slideDirection, setSlideDirection] = useState(null);
  const [showNavButtons, setShowNavButtons] = useState(true);
  const contentRef = useRef(null);
  const inactivityTimerRef = useRef(null);

  const parsePrice = (price) => {
    if (price === null || price === undefined) {
      console.warn('Price is null or undefined');
      return 0;
    }
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const numericString = price.replace(/[^0-9.]/g, '');
      const parsed = parseFloat(numericString);
      if (isNaN(parsed)) {
        console.warn(`Could not parse price: ${price}`);
        return 0;
      }
      return parsed;
    }
    console.warn(`Unexpected price type: ${typeof price}`);
    return 0;
  };

  const resetInactivityTimer = () => {
    setShowNavButtons(true);
    clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setShowNavButtons(false);
    }, 2000);
  };

  useEffect(() => {
    const handleActivity = () => {
      resetInactivityTimer();
    };

    resetInactivityTimer();
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      clearTimeout(inactivityTimerRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, []);

  const loadItemData = async () => {
    try {
      const data = await loadMenuData();
      const foundItem = data.find(i => i.id === parseInt(id));
      if (!foundItem) {
        console.error(`Item with id ${id} not found`);
        setLoading(false);
        return;
      }

      foundItem.price = parsePrice(foundItem.price);
      
      if (foundItem.combinations) {
        foundItem.combinations = foundItem.combinations.map(comb => {
          if (typeof comb === 'string') {
            const comboItem = data.find(item => 
              item.name.toLowerCase() === comb.toLowerCase()
            );
            if (comboItem) {
              return {
                ...comboItem,
                price: parsePrice(comboItem.price)
              };
            }
            return null;
          }
          return {
            ...comb,
            price: parsePrice(comb.price)
          };
        }).filter(Boolean);
      }

      setItem(foundItem);
      setAllItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading item:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItemData();
  }, [id]);

  const handleAddToCart = () => {
    if (!item) return;

    toast.dismiss();

    const cartItem = {
      id: item.id,
      name: item.name,
      price: parsePrice(item.price),
      quantity,
      image: item.image,
    };
    
    addToCart(cartItem);
    
    let toastMessage = `Added ${quantity} ${item.name} to cart`;
    
    if (selectedCombination) {
      const comboItem = {
        id: selectedCombination.id,
        name: selectedCombination.name,
        price: parsePrice(selectedCombination.price),
        quantity: comboQuantity,
        image: selectedCombination.image,
        isCombination: true,
        mainItemId: item.id
      };
      addToCart(comboItem);
      
      setSelectedCombination(null);
      setComboQuantity(1);
    }
    
    
  };

  const handleAddCombinationToCart = () => {
    if (!selectedCombination) return;
    
    toast.dismiss();

    const comboItem = {
      id: selectedCombination.id,
      name: selectedCombination.name,
      price: parsePrice(selectedCombination.price),
      quantity: comboQuantity,
      image: selectedCombination.image,
      isCombination: true,
      mainItemId: item.id
    };
    
    addToCart(comboItem);
    
    
    
    setShowCombinationsModal(false);
    setSelectedCombination(null);
    setComboQuantity(1);
  };

  const findCombinationItems = () => {
    if (!item?.combinations) return [];
    return item.combinations.map(comb => {
      if (typeof comb === 'string') {
        return allItems.find(menuItem => 
          menuItem.name.toLowerCase() === comb.toLowerCase()
        );
      }
      return comb;
    }).filter(Boolean);
  };

  const navigateToAdjacentItem = (direction) => {
    if (!allItems.length) return;
    
    const currentIndex = allItems.findIndex(i => i.id === parseInt(id));
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : allItems.length - 1;
      setSlideDirection('slide-out-right');
    } else {
      newIndex = currentIndex < allItems.length - 1 ? currentIndex + 1 : 0;
      setSlideDirection('slide-out-left');
    }
    
    if (contentRef.current) {
      contentRef.current.style.transform = direction === 'prev' 
        ? 'translateX(100%)' 
        : 'translateX(-100%)';
      contentRef.current.style.opacity = '0';
    }
    
    setTimeout(() => {
      navigate(`/item/${allItems[newIndex].id}`);
      setQuantity(1);
      setSlideDirection(direction === 'prev' ? 'slide-in-left' : 'slide-in-right');
      
      if (contentRef.current) {
        contentRef.current.style.transform = 'translateX(0)';
        contentRef.current.style.opacity = '1';
      }
    }, 300);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateToAdjacentItem('next'),
    onSwipedRight: () => navigateToAdjacentItem('prev'),
    trackMouse: true,
    delta: 50
  });

  const combinationItems = findCombinationItems();

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="text-xl">Item not found</div>
      </div>
    );
  }

  return (
    <div 
      className="pt-20 px-4 max-w-7xl mx-auto relative overflow-hidden"
      onMouseMove={resetInactivityTimer}
      onTouchStart={resetInactivityTimer}
    >
      <div className={`hidden md:flex absolute top-1/2 left-4 right-4 -translate-y-1/2 justify-between z-10 transition-opacity duration-300 ${showNavButtons ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={() => {
            resetInactivityTimer();
            navigateToAdjacentItem('prev');
          }}
          className="p-3 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors backdrop-blur-sm"
          aria-label="Previous item"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => {
            resetInactivityTimer();
            navigateToAdjacentItem('next');
          }}
          className="p-3 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors backdrop-blur-sm"
          aria-label="Next item"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className={`md:hidden fixed inset-0 pointer-events-none z-10 transition-opacity duration-300 ${showNavButtons ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-auto">
          <button 
            onClick={() => {
              resetInactivityTimer();
              navigateToAdjacentItem('prev');
            }}
            className="p-3 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto">
          <button 
            onClick={() => {
              resetInactivityTimer();
              navigateToAdjacentItem('next');
            }}
            className="p-3 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
            aria-label="Next item"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={contentRef}
        className={`transition-all duration-300 ease-in-out ${slideDirection || ''}`}
        style={{ transform: 'translateX(0)', opacity: 1 }}
        {...swipeHandlers}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[180px] md:h-[400px] object-cover rounded-lg shadow-lg mt-[30px]"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-2xl md:text-xl font-bold text-gray-800">{item.name}</h1>
            <p className="text-gray-600 text-base md:text-lg">{item.desc}</p>
            <div className="text-2xl md:text-3xl font-bold text-orange-500">
              €{parsePrice(item.price).toFixed(2)}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="flex-1 bg-gray-800 text-white py-3 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Go to Cart
              </button>
            </div>

            {combinationItems.length > 0 && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Best Combinations</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {combinationItems.map((combo) => (
                    <div
                      key={combo.id}
                      onClick={() => {
                        setSelectedCombination(combo);
                        setShowCombinationsModal(true);
                      }}
                      className="cursor-pointer group"
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={combo.image}
                          alt={combo.name}
                          className="w-full h-32 object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                          <span className="text-white text-sm font-medium">View Details</span>
                        </div>
                      </div>
                      <h3 className="mt-2 text-sm font-medium">{combo.name}</h3>
                      <p className="text-orange-500 font-bold">€{parsePrice(combo.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCombinationsModal && selectedCombination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Add Combination</h2>
              <button
                onClick={() => {
                  setShowCombinationsModal(false);
                  setSelectedCombination(null);
                  setComboQuantity(1);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={selectedCombination.image}
                  alt={selectedCombination.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-bold">{selectedCombination.name}</h3>
                <p className="text-orange-500 font-bold mt-1">€{parsePrice(selectedCombination.price).toFixed(2)}</p>
                <p className="text-gray-600 mt-2">{selectedCombination.desc}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setComboQuantity(q => Math.max(1, q - 1))}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-semibold">{comboQuantity}</span>
                  <button
                    onClick={() => setComboQuantity(q => q + 1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-lg font-bold">
                  €{(parsePrice(selectedCombination.price) * comboQuantity).toFixed(2)}
                </div>
              </div>
              
              <button
                onClick={handleAddCombinationToCart}
                className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
              >
                Add Combination to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;