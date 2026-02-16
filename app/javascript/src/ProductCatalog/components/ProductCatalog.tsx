// ProductCatalog - Async React Server Component with Streaming
//
// This demonstrates a realistic RSC use case:
// - Async data fetching with await (no useEffect)
// - Nested Suspense boundaries for progressive loading
// - Server-only formatting (dates, prices, markdown) — zero client JS
// - Client component islands (AddToCart) for interactivity
//
// None of the code in this file ships to the browser.

import React, { Suspense } from 'react';
import ProductCard from './ProductCard';
import ProductReviews from './ProductReviews';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  rating: number;
  reviewCount: number;
}

// Simulate fetching products from a database or API
async function fetchProducts(): Promise<Product[]> {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 200));

  return [
    {
      id: 1,
      name: 'Ergonomic Standing Desk',
      description:
        'Height-adjustable desk with **memory presets** and built-in cable management. Perfect for the modern home office.',
      price: 599.99,
      category: 'Office',
      createdAt: '2026-01-15T10:30:00Z',
      rating: 4.8,
      reviewCount: 342,
    },
    {
      id: 2,
      name: 'Noise-Canceling Headphones',
      description:
        'Premium wireless headphones with **40-hour battery life** and spatial audio. Ideal for focused work sessions.',
      price: 349.0,
      category: 'Audio',
      createdAt: '2026-02-01T14:00:00Z',
      rating: 4.6,
      reviewCount: 891,
    },
    {
      id: 3,
      name: 'Mechanical Keyboard',
      description:
        'Hot-swappable switches with **RGB backlighting** and PBT keycaps. Tactile typing experience for developers.',
      price: 179.99,
      category: 'Peripherals',
      createdAt: '2025-12-20T09:15:00Z',
      rating: 4.9,
      reviewCount: 1203,
    },
  ];
}

// Server-only formatting — these libraries stay on the server, zero client JS
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr));
}

// Simple markdown bold — in a real app, use a library like `marked` (it stays server-side!)
function renderMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

const ProductCatalog = async () => {
  const products = await fetchProducts();
  const totalProducts = products.length;
  const avgRating = products.reduce((sum, p) => sum + p.rating, 0) / totalProducts;

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2>Product Catalog</h2>
        <p style={{ color: '#666' }}>
          {totalProducts} products — Average rating: {renderStars(avgRating)} ({avgRating.toFixed(1)})
        </p>
        <p style={{ fontSize: '0.85em', color: '#059669', background: '#ecfdf5', padding: '8px 12px', borderRadius: 6 }}>
          Server Component: All formatting (prices, dates, ratings, markdown) runs on the server. Check
          your Network tab — none of this component&apos;s JS was sent to the browser.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 24 }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: 24,
              background: '#fff',
            }}
          >
            <ProductCard
              name={product.name}
              description={renderMarkdown(product.description)}
              price={formatPrice(product.price)}
              category={product.category}
              date={formatDate(product.createdAt)}
              stars={renderStars(product.rating)}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />

            {/* Reviews stream in separately — they have their own Suspense boundary */}
            <Suspense
              fallback={
                <div style={{ padding: '12px 0', color: '#9ca3af', fontStyle: 'italic' }}>
                  Loading reviews...
                </div>
              }
            >
              <ProductReviews productId={product.id} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
