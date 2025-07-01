import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getProductBySlug } from '../features/products/productSlice';
import { RootState, AppDispatch } from '../store';
import { addToCart } from '../features/cart/cartSlice';
import { getProductBySlug } from '../features/product/productSlice';

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, status } = useSelector((state: RootState) => state.product);
  const [selectedColor, setSelectedColor] = useState<string>('Navy Blue');
  const [selectedSize, setSelectedSize] = useState<string>('XS');
  const [quantity, setQuantity] = useState<number>(2);
  const [showFullSpecs, setShowFullSpecs] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(getProductBySlug(slug));
    }
  }, [slug, dispatch]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      cartId: `${product.id}-${selectedColor}-${selectedSize}`,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedColor,
      selectedSize,
      quantity,
    };
    
    dispatch(addToCart(cartItem));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

 return (
    <div className="font-sans bg-white text-gray-900 max-w-6xl mx-auto p-6">
      {/* Product Header */}
      <h1 className="text-3xl font-bold mb-2">Meta Skills & Fashionable Trend</h1>
      
      {/* Rating and Reviews */}
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center mr-3">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-medium">4.7</span>
        </div>
        <span className="text-gray-600">1,139.33 reviews</span>
      </div>

      {/* Preorder Notice */}
      <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-md inline-block mb-6">
        <span className="font-medium">Preorder:</span> This speed is $40
      </div>

      {/* Product Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Images */}
        <div className="md:w-1/2">
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
            <div className="text-gray-400">Main Product Image</div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-100 rounded border border-gray-200"></div>
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="md:w-1/2">
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Available Color: Navy Blue</h3>
            <div className="flex gap-2">
              {['Navy Blue', 'Black', 'White', 'Red'].map(color => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 ${color === 'Navy Blue' ? 'border-blue-500' : 'border-gray-300'}`}
                  style={{ 
                    backgroundColor: color === 'Navy Blue' ? '#1E3A8A' : 
                                  color === 'Black' ? '#000' : 
                                  color === 'White' ? '#FFF' : '#EF4444'
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Select Size: {selectedSize}</h3>
            <div className="flex gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded-md w-24">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 mb-8">
            Add to Cart
          </button>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-700">
              Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bad design solutions. And how good that in such realities Apple everything is fine with displays.<br/><br/>
              Advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bad design solutions. And how good that in such realities Apple everything.
            </p>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-xl font-bold mb-4">Specification</h2>
            <h3 className="font-medium mb-2">Sharp FP-J30E-B Air Purifier</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>GMP Cosmetic Good Manufacturing Practice</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Cruelty Free</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>No Alarm Testing</span>
              </li>
              {showFullSpecs && (
                <>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Zombi Global Standard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Comply with Global Standard</span>
                  </li>
                </>
              )}
            </ul>
            <button 
              onClick={() => setShowFullSpecs(!showFullSpecs)}
              className="text-blue-600 mt-2 flex items-center"
            >
              See More {showFullSpecs ? '▲' : '▼'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;