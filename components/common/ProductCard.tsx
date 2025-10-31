import React, { useState } from 'react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onCardClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onCardClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? product.imageUrls.length - 1 : prevIndex - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    setCurrentImageIndex(prevIndex => (prevIndex === product.imageUrls.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div 
      onClick={() => onCardClick(product)}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
    >
      <div className="relative h-56">
        <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={product.imageUrls[currentImageIndex]} alt={`${product.name} image ${currentImageIndex + 1}`} />
        
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrevImage} 
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none z-10"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        </button>
        <button 
          onClick={handleNextImage} 
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none z-10"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
        </button>
        
        {/* Numeric Indicator */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs font-semibold rounded px-1.5 py-0.5">
            {currentImageIndex + 1} / {product.imageUrls.length}
        </div>

        <div className="absolute top-0 right-0 bg-secondary text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">{product.category}</div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm flex-grow">{product.description}</p>
        <div className="mt-4 flex items-center justify-end">
          <span className="text-xl font-bold text-primary">Desde ${product.price.toLocaleString('es-CO')}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;