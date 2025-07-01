import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { MdChevronRight } from "react-icons/md";
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';

const CartPage: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [agreeTerms, setAgreeTerms] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  const handleQuantityChange = (cartId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ cartId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (cartId: string) => {
    dispatch(removeFromCart(cartId));
  };

   return (
    <div className="font-sans bg-white text-gray-900 max-w-6xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">FALCON</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for anything..."
          className="w-full p-3 border border-gray-300 rounded-md pl-10"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span className="text-gray-900">Home</span>
        <span className="mx-2">''</span>
        <span className="text-gray-900">My Cart</span>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">More Appliances</h2>
        <div className="flex gap-4 text-sm">
          <span>Worker & Baby</span>
          <span>Automotive</span>
          <span>Sports Gear</span>
        </div>
      </div>

      {/* Cart Title */}
      <div className="border-t border-b border-gray-200 py-4 mb-6">
        <h2 className="text-xl font-bold">My Cart (3)</h2>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {items.map((item, index) => (
            <div key={index} className="border-b border-gray-200 py-6">
              <div className="flex items-start">
                <input type="checkbox" className="mr-4 mt-1" checked={item.id !== '2'} readOnly />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.name}</h3>
                    {item.price > 0 && <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>}
                  </div>
                  {item.color && (
                    <div className="text-sm text-gray-600 mt-1">
                      Color: {item.color}; Size: {item.size}
                    </div>
                  )}
                  {item.quantity > 0 && (
                    <div className="mt-3 flex items-center">
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200">
                          -
                        </button>
                        <span className="px-4 py-1 w-12 text-center border-x border-gray-300">{item.quantity}</span>
                        <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200">
                          +
                        </button>
                      </div>
                      <button className="ml-4 text-red-600 hover:text-red-800 text-sm">
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4">Order summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Price (3 items)</span>
                <span>$1000</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping fee</span>
                <span>To be added</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Store / Falcon coupon</h3>
              <button className="w-full py-2 border border-gray-300 rounded-md text-blue-600 hover:bg-gray-50">
                Apply
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Sub Total</span>
                <span>$1000</span>
              </div>
            </div>

            <button
              disabled={!agreeTerms}
              className={`w-full py-3 rounded-md font-medium mb-6 ${!agreeTerms ? 'bg-gray-300 cursor-not-allowed' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              Proceed to Checkout
            </button>

            <div className="text-xs text-gray-500 mb-4">
              <div className="flex items-start mb-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mr-2 mt-1"
                />
                <span>I have read and agree to the Terms and Conditions, Privacy Policy and Refund and Return Policy</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>b1139</p>
            <p>b1538</p>
            <p>b1139</p>
            <p>b1539</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">FALCON</h3>
            <p className="text-gray-600 mb-4">Experience our new platform & Enjoy great deals and offers on your day to day.</p>
            <div className="space-y-2 text-sm">
              <p>House #64, Road 13, ASA Center, Uttara, Dhaka 1402</p>
              <p>01729-1497201</p>
              <p>falcon@gmail.com</p>
            </div>
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200"></div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">ABOUT</h4>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Cancellation & Returns</li>
              <li>Terms of Use</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">HELP</h4>
            <ul className="space-y-2 text-sm">
              <li>Payments</li>
              <li>Shipping</li>
              <li>My Orders</li>
              <li>FAQs</li>
              <li>Terms of Use</li>
              <li>Security</li>
              <li>Privacy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Head Support?</h4>
            <p className="text-sm mb-4">10724-7814XX</p>
            <button className="w-full bg-black text-white py-2 rounded-md text-sm mb-4">DOWNLOAD APP</button>
            <div className="flex gap-2 mb-4">
              <button className="flex-1 border border-gray-300 rounded-md py-2 text-sm">GET IT ON<br/>Google Play</button>
              <button className="flex-1 border border-gray-300 rounded-md py-2 text-sm">Download on the<br/>App Store</button>
            </div>
            <div className="mt-4">
              <h5 className="text-xs font-bold mb-2">PAYMENTS ACCEPTED</h5>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-gray-100 rounded text-xs">VISA</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Welcome to service | Login</p>
          <p className="mt-2">Falcon ©2023. Design by VLP</p>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;