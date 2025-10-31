import React from 'react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onCardClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onCardClick }) => {
  return (
    <div 
      onClick={() => onCardClick(product)}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
    >
      <div className="relative h-56">
        <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
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
