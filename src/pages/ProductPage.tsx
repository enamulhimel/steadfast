import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getProductBySlug, getCategories } from '../features/products/productSlice';
import { RootState } from '../store';
import Gallery from '../components/Gallery';
import VariationSelector from '../components/VariationSelector';
import QuantitySelector from '../components/QuantitySelector';
import { addToCart } from '../features/cart/cartSlice';
import CategoryList from '../components/CategoryList';
import { getCategories, getProductBySlug } from '../features/product/productSlice';

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();
  const { product, categories, status } = useSelector((state: RootState) => state.product);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(getProductBySlug(slug));
      dispatch(getCategories());
    }
  }, [slug, dispatch]);

  const handleAddToCart = () => {
    if (!product || !selectedColor || !selectedSize) return;
    
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Gallery images={product.images} />
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-semibold text-gray-800 mb-4">${product.price}</div>
          
          <div className="mb-6">
            <VariationSelector 
              type="color" 
              variations={product.colors} 
              selected={selectedColor} 
              onSelect={setSelectedColor} 
            />
            <VariationSelector 
              type="size" 
              variations={product.sizes} 
              selected={selectedSize} 
              onSelect={setSelectedSize} 
            />
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <button 
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedSize}
              className={`px-6 py-3 rounded-md font-medium ${(!selectedColor || !selectedSize) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              Add to Cart
            </button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <div className={`${!showFullDescription ? 'line-clamp-3' : ''}`}>
              {product.description}
            </div>
            <button 
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-600 mt-2"
            >
              {showFullDescription ? 'Show Less' : 'Show More'}
            </button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <span className="font-medium">{key}:</span> {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default ProductPage;