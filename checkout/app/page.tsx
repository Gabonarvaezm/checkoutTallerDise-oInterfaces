'use client';

import { useState } from 'react';


// Product interface
interface CartItem {
  id: string;
  name: string;
  productId: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

// Shopping Cart Component - FIXED LAYOUT VERSION
export default function ShoppingCartFixed() {
  const [selectedCardType, setSelectedCardType] = useState<'mastercard' | 'visa' | 'verve'>('mastercard');
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Sample cart items - REPLACE WITH YOUR ACTUAL DATA
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Denim T-Shirt',
      productId: 'Ref: 1234/5678',
      color: 'Blue',
      quantity: 2,
      price: 7500.00,
      image: '/images/denim-tshirt.png' 
    },
    {
      id: '2',
      name: 'Denim Pants',
      productId: 'Ref: 0101/0101',
      color: 'Blue',
      quantity: 3,
      price: 9000.00,
      image: '/images/denim-pants.png'
    },
    {
      id: '3',
      name: 'Sony Smartwatch',
      productId: 'Ref: 7890/1234',
      color: 'Black',
      quantity: 1,
      price: 24500.00,
      image: '/images/smartwatch.png' 
    },
    {
      id: '4',
      name: 'Cognac Oxford',
      productId: 'Ref: 0987/6543',
      color: 'Brown',
      quantity: 1,
      price: 4500.00,
      image: '/images/oxford-shoes.png'
    }
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 font-sans flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <div className="flex">
          
          {/* LEFT SIDE - Shopping Cart - FIXED WIDTH */}
          <div className="w-[60%] bg-white rounded-l-2xl shadow-xl p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                {/* ⚠️ LOGO ICON - Replace with your actual logo */}
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <h1 className="text-2xl font-light text-gray-800 tracking-wide">
                Your Shopping Cart
              </h1>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg bg-white shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.productId}
                    </p>
                  </div>

                  {/* Color */}
                  <div className="text-sm text-gray-600 min-w-[60px]">
                    {item.color}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      
                    </button>
                    <span className="text-center text-sm font-medium text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[100px]">
                    <p className="font-semibold text-gray-800">
                      {item.price.toFixed(2)} NGN
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Remove item"
                  >
                    
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                  
                  <span className="text-sm">Back to Shop</span>
                </button>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Subtotal:</p>
                  <p className="text-xl font-bold text-gray-800">
                    {calculateSubtotal().toFixed(2)} NGN
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Card Details Panel - FIXED WIDTH - SMOKY BLACK BACKGROUND - COLLAPSIBLE */}
          <div className={`w-[40%] bg-neutral-800 text-white rounded-r-2xl shadow-2xl relative transition-all duration-300 ${isPanelOpen ? 'translate-x-0' : 'translate-x-[95%]'}`}>
            
            {/* Toggle Button - 3 DOTS ON LEFT SIDE */}
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="absolute left-0 top-8 w-6 h-14 bg-neutral-800 rounded-l-md flex flex-col items-center justify-center gap-1 -translate-x-full shadow-lg"
            >
              <div className="w-1 h-1 bg-yellow-500 rounded-full" />
              <div className="w-1 h-1 bg-yellow-500 rounded-full" />
              <div className="w-1 h-1 bg-yellow-500 rounded-full" />
            </button>

            <div className="p-8 h-full flex flex-col">
              
              {/* Card Details Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-light text-yellow-400">
                  Card Details
                </h2>
              </div>

              {/* Card Type Selection */}
              <div className="mb-8">
                <label className="block text-sm text-gray-300 mb-3">
                  Select Card Type
                </label>
                <div className="flex gap-3">
                  {/* Mastercard */}
                  <button
                    onClick={() => setSelectedCardType('mastercard')}
                    className={`flex-1 h-12 rounded-lg flex items-center justify-center transition-all ${
                      selectedCardType === 'mastercard'
                        ? 'bg-white/20 ring-2 ring-yellow-400'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {/* ⚠️ MASTERCARD LOGO - Replace with actual logo */}
                    {/* <img src="/icons/cards/mastercard.svg" alt="Mastercard" className="h-6" /> */}
                    <div className="flex gap-[-4px]">
                      <div className="w-5 h-5 rounded-full bg-red-500 opacity-80" />
                      <div className="w-5 h-5 rounded-full bg-orange-500 opacity-80 -ml-2" />
                    </div>
                  </button>

                  {/* Visa */}
                  <button
                    onClick={() => setSelectedCardType('visa')}
                    className={`flex-1 h-12 rounded-lg flex items-center justify-center transition-all ${
                      selectedCardType === 'visa'
                        ? 'bg-white/20 ring-2 ring-yellow-400'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {/* ⚠️ VISA LOGO - Replace with actual logo */}
                    {/* <img src="/icons/cards/visa.svg" alt="Visa" className="h-6" /> */}
                    <div className="text-blue-400 font-bold text-lg italic">VISA</div>
                  </button>

                  {/* Verve */}
                  <button
                    onClick={() => setSelectedCardType('verve')}
                    className={`flex-1 h-12 rounded-lg flex items-center justify-center transition-all ${
                      selectedCardType === 'verve'
                        ? 'bg-white/20 ring-2 ring-yellow-400'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {/* ⚠️ VERVE LOGO - Replace with actual logo */}
                    {/* <img src="/icons/cards/verve.svg" alt="Verve" className="h-6" /> */}
                    <div className="text-green-400 font-bold text-sm">VERVE</div>
                  </button>
                </div>
              </div>

              {/* Card Number */}
              <div className="mb-6">
                <label className="block text-sm text-gray-300 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="flex gap-4 mb-auto">
                <div className="flex-1">
                  <label className="block text-sm text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength={7}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-300 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="000"
                    maxLength={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl mt-8">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}