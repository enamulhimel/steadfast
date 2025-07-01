import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import CartItem from '../components/CartItem';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';

const CartPage: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [agreeTerms, setAgreeTerms] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99; // Fixed shipping cost for example
  const total = subtotal + shipping;

  const handleQuantityChange = (cartId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ cartId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (cartId: string) => {
    dispatch(removeFromCart(cartId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600">Start shopping to add items to your cart</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {items.map((item) => (
                <CartItem
                  key={item.cartId}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => dispatch(clearCart())}
                className="text-red-600 hover:text-red-800"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mr-2"
                  />
                  <span>I agree to the Terms & Conditions</span>
                </label>
              </div>
              
              <button
                disabled={!agreeTerms}
                className={`w-full py-3 rounded-md font-medium ${!agreeTerms ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;