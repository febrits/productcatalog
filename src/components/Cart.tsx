import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, onCheckout }: CartProps) {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-bg-secondary border-l border-border z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold text-text-primary">Shopping Cart</h2>
            <span className="text-sm text-text-secondary">({items.length} items)</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-bg-hover rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some products to get started</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="flex gap-3 bg-bg-card border border-border rounded-xl p-3">
                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary truncate">{item.product.name}</h3>
                  <p className="text-sm text-accent font-semibold mt-0.5">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:bg-bg-hover rounded transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-bg-hover rounded transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-danger hover:bg-danger/10 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-lg font-bold text-text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-success font-medium">Free</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="font-semibold text-text-primary">Total</span>
              <span className="text-xl font-bold text-accent">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors shadow-lg shadow-accent/25"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
