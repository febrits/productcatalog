import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Header({ onCartClick, currentView, onNavigate }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-bg-secondary/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Store className="w-7 h-7 text-accent" />
            <span className="text-xl font-bold text-text-primary">ProductHub</span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('catalog')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'catalog' ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Products
            </button>
          </nav>

          <button
            onClick={onCartClick}
            className="relative p-2 rounded-lg hover:bg-bg-hover transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
