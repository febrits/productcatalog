import { Star, ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => onViewDetail(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/90 text-black rounded-lg text-sm font-medium hover:bg-white transition-colors"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => addToCart(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-text-secondary">{product.rating}</span>
          <span className="text-xs text-text-secondary ml-1">• {product.category}</span>
        </div>
        <h3 className="font-semibold text-text-primary mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-text-secondary line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-accent">${product.price.toFixed(2)}</span>
          <span className="text-xs text-text-secondary">{product.stock} in stock</span>
        </div>
      </div>
    </div>
  );
}
