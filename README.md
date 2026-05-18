# ProductHub — E-Commerce Product Catalog
## 🌐 Live Demo
https://productcatalog-phi.vercel.app/
febrits/notepad


A modern, dark-themed e-commerce product catalog built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Features

- **Product Listing** — Browse products with images, names, prices, descriptions, ratings, and stock info
- **Category Filtering** — Filter products by category (Electronics, Clothing, Accessories, Footwear, Sports, Food & Beverage)
- **Search** — Real-time search across product names and descriptions
- **Product Detail View** — Full product page with quantity selector
- **Shopping Cart** — Slide-out cart with add/remove items, quantity adjustment
- **Checkout Flow** — Shipping & payment form with validation and order confirmation
- **12 Sample Products** — Pre-loaded across all categories
- **Dark Theme** — Sleek dark UI (#0a0a0f background)
- **Fully Responsive** — Works on mobile, tablet, and desktop

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Lucide React (icons)
- clsx + tailwind-merge

## Getting Started

```bash
npm install
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx        # Navigation header with cart badge
│   ├── SearchBar.tsx     # Search input
│   ├── CategoryFilter.tsx # Category pill buttons
│   ├── ProductCard.tsx   # Product grid card
│   ├── ProductDetail.tsx # Full product view
│   ├── Cart.tsx          # Slide-out shopping cart
│   └── Checkout.tsx      # Checkout form + confirmation
├── context/
│   └── CartContext.tsx   # Global cart state
├── data/
│   └── products.ts       # Sample product data
├── types/
│   └── index.ts          # TypeScript interfaces
├── App.tsx               # Main app with routing
├── main.tsx              # Entry point
└── index.css             # Tailwind imports + theme
```
