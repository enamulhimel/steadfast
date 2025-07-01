import React from 'react';

interface VariationSelectorProps {
  type: 'color' | 'size';
  variations: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const VariationSelector: React.FC<VariationSelectorProps> = ({ 
  type, variations, selected, onSelect 
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2 capitalize">{type}</h3>
      <div className="flex flex-wrap gap-2">
        {variations.map((variation) => (
          <button
            key={variation}
            onClick={() => onSelect(variation)}
            className={`px-3 py-1 rounded-md text-sm ${type === 'color' ? 
              `bg-${variation.toLowerCase()}-500 text-white` : 
              'border border-gray-300'} ${selected === variation ? 
              (type === 'color' ? 'ring-2 ring-offset-2 ring-blue-500' : 'bg-gray-200') : 
              'hover:bg-gray-100'}`}
          >
            {type === 'color' ? '' : variation}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariationSelector;