// ProductCard - Server Component (no 'use client')
//
// Renders product details using pre-formatted data from the parent.
// All formatting happened on the server — this component ships zero JS.

import React from 'react';
import AddToCart from './AddToCart';

interface ProductCardProps {
  name: string;
  description: string; // Pre-rendered HTML from markdown
  price: string; // Pre-formatted currency string
  category: string;
  date: string; // Pre-formatted date string
  stars: string; // Pre-rendered star rating
  rating: number;
  reviewCount: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  category,
  date,
  stars,
  rating,
  reviewCount,
}) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h3 style={{ margin: '0 0 4px' }}>{name}</h3>
        <span
          style={{
            fontSize: '0.75em',
            background: '#e0e7ff',
            color: '#3730a3',
            padding: '2px 8px',
            borderRadius: 4,
          }}
        >
          {category}
        </span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#059669' }}>{price}</div>
        <div style={{ fontSize: '0.85em', color: '#666' }}>Added {date}</div>
      </div>
    </div>

    {/* Description contains server-rendered markdown HTML */}
    <p
      style={{ margin: '12px 0', color: '#374151', lineHeight: 1.6 }}
      dangerouslySetInnerHTML={{ __html: description }}
    />

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: '0.9em' }}>
        <span style={{ color: '#f59e0b' }}>{stars}</span>
        <span style={{ color: '#666', marginLeft: 8 }}>
          {rating} ({reviewCount} reviews)
        </span>
      </div>

      {/* AddToCart is a client component — only its JS ships to the browser */}
      <AddToCart productName={name} />
    </div>
  </div>
);

export default ProductCard;
