import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (value: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
      <button 
        onClick={decrement}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
      >
        -
      </button>
      <span className="px-4 py-2 w-12 text-center">{quantity}</span>
      <button 
        onClick={increment}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;