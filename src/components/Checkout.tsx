import { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { CheckoutForm } from '../types';

interface CheckoutProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function Checkout({ onBack, onComplete }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  const handleChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g, '').length < 16)
      newErrors.cardNumber = 'Valid card number is required';
    if (!form.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!form.cvv.trim() || form.cvv.length < 3) newErrors.cvv = 'Valid CVV is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep('confirmation');
    }
  };

  const handleDone = () => {
    clearCart();
    onComplete();
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Order Confirmed!</h2>
        <p className="text-text-secondary mb-2">Thank you for your purchase, {form.fullName}.</p>
        <p className="text-text-secondary mb-8">
          Your order <span className="text-accent font-mono">#ORD-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span> has been placed successfully.
        </p>
        <div className="bg-bg-card border border-border rounded-xl p-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-text-primary">Order Summary</span>
          </div>
          <div className="space-y-2 text-sm">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between text-text-secondary">
                <span>{item.product.name} x{item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-border font-semibold text-text-primary">
              <span>Total</span>
              <span className="text-accent">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-text-secondary mb-6">A confirmation email has been sent to {form.email}.</p>
        <button
          onClick={handleDone}
          className="px-8 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors shadow-lg shadow-accent/25"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Back to cart
      </button>

      <h2 className="text-2xl font-bold text-text-primary mb-6">Checkout</h2>

      <div className="grid md:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
          <div className="bg-bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-text-primary">Shipping Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  className={`w-full px-3 py-2.5 bg-bg-primary border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.fullName ? 'border-danger' : 'border-border'}`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-danger text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className={`w-full px-3 py-2.5 bg-bg-primary border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.email ? 'border-danger' : 'border-border'}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-danger text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={e => handleChange('address', e.target.value)}
                className={`w-full px-3 py-2.5 bg-bg-primary border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.address ? 'border-danger' : 'border-border'}`}
                placeholder="123 Main Street"
              />
              {errors.address && <p className="text-danger text-xs mt-1">{errors.address}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => handleChange('city', e.target.value)}
                  className={`w-full px-3 py-2.5 bg-bg-primary border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.city ? 'border-danger' : 'border-border'}`}
                  placeholder="New York"
                />
                {errors.city && <p className="text-danger text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">ZIP Code</label>
                <input
                  type="text"
                  value={form.zipCode}
                  onChange={e => handleChange('zipCode', e.target.value)}
                  className={`w-full px-3 py-2.5 bg-bg-primary border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.zipCode ? 'border-danger' : 'border-border'}`}
                  placeholder="10001"
                />
                {errors.zipCode && <p className="text-danger text-xs mt-1">{errors.zipCode}</p>}
              </div>
            </div>
          </div>

          <div className="bg-bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-text-primary">Payment Details</h3>
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">Card Number</label>
              <input
                type="text"
                value={form.cardNumber}
                onChange={e => handleChange('cardNumber', e.target.value)}
                className={`w-full px-3 py-2.5 bg-bg-primary border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.cardNumber ? 'border-danger' : 'border-border'}`}
                placeholder="4242 4242 4242 4242"
                maxLength={19}
              />
              {errors.cardNumber && <p className="text-danger text-xs mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={form.expiryDate}
                  onChange={e => handleChange('expiryDate', e.target.value)}
                  className={`w-full px-3 py-2.5 bg-bg-primary border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.expiryDate ? 'border-danger' : 'border-border'}`}
                  placeholder="MM/YY"
                  maxLength={5}
                />
                {errors.expiryDate && <p className="text-danger text-xs mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">CVV</label>
                <input
                  type="text"
                  value={form.cvv}
                  onChange={e => handleChange('cvv', e.target.value)}
                  className={`w-full px-3 py-2.5 bg-bg-primary border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.cvv ? 'border-danger' : 'border-border'}`}
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvv && <p className="text-danger text-xs mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors shadow-lg shadow-accent/25"
          >
            Place Order — ${totalPrice.toFixed(2)}
          </button>
        </form>

        <div className="md:col-span-2">
          <div className="bg-bg-card border border-border rounded-xl p-5 sticky top-24">
            <h3 className="font-semibold text-text-primary mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary truncate">{item.product.name}</p>
                    <p className="text-xs text-text-secondary">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-semibold text-text-primary">Total</span>
                <span className="text-lg font-bold text-accent">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
