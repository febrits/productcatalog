import { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { products, categories } from './data/products';
import type { Product } from './types';

type View = 'catalog' | 'detail' | 'checkout';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: string) => {
    if (view === 'catalog') {
      setCurrentView('catalog');
      setSelectedProduct(null);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header
        onCartClick={() => setCartOpen(true)}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'catalog' && (
          <>
            {/* Hero */}
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-3">
                Discover Amazing <span className="text-accent">Products</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Browse our curated collection of premium products. Quality meets style.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <SearchBar value={search} onChange={setSearch} />
              <CategoryFilter categories={categories} active={category} onChange={setCategory} />
            </div>

            {/* Results count */}
            <p className="text-sm text-text-secondary mb-4">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetail={handleViewDetail}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-text-secondary text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => { setSearch(''); setCategory('All'); }}
                  className="mt-4 text-accent hover:text-accent-hover font-medium transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentView('catalog')}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout
            onBack={() => setCurrentView('catalog')}
            onComplete={() => {
              setCurrentView('catalog');
              setSelectedProduct(null);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-text-secondary">
            <p>&copy; 2026 ProductHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
