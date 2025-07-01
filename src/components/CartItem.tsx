import React from 'react';
import { CartItem as CartItemType } from '../features/cart/types';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (cartId: string, quantity: number) => void;
  onRemove: (cartId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="border-b last:border-b-0 py-4 px-4 flex">
      <div className="w-24 h-24 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.name}</h3>
          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        
        <div className="text-sm text-gray-600 mt-1">
          <span>Color: {item.selectedColor}</span>
          <span className="mx-2">|</span>
          <span>Size: {item.selectedSize}</span>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button 
              onClick={() => onQuantityChange(item.cartId, item.quantity - 1)}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
            >
              -
            </button>
            <span className="px-3 py-1 w-12 text-center">{item.quantity}</span>
            <button 
              onClick={() => onQuantityChange(item.cartId, item.quantity + 1)}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
          
          <button 
            onClick={() => onRemove(item.cartId)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;