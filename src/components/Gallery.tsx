import React, { useState } from 'react';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      <div className="mb-4 rounded-lg overflow-hidden">
        <img 
          src={images[selectedImage]} 
          alt="Main product" 
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-transparent'}`}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;