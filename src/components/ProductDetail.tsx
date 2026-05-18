import { Star, ShoppingCart, ArrowLeft, Minus, Plus, Package } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden bg-bg-card border border-border">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-text-secondary">{product.rating}</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-3">{product.name}</h1>
          <p className="text-2xl font-bold text-accent mb-4">${product.price.toFixed(2)}</p>
          <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-2 mb-6">
            <Package className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {product.stock} items in stock
            </span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-text-secondary">Quantity:</span>
            <div className="flex items-center gap-3 bg-bg-card border border-border rounded-lg">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="p-2 hover:bg-bg-hover rounded-l-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                className="p-2 hover:bg-bg-hover rounded-r-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors shadow-lg shadow-accent/25"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart — ${(product.price * qty).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
