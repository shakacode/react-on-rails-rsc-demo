'use client';

// AddToCart - Client Component
//
// This is a client component (note 'use client' at the top).
// Its JavaScript IS shipped to the browser for interactivity.
// It becomes interactive immediately, even while other server components
// are still streaming.

import React, { useState } from 'react';

interface AddToCartProps {
  productName: string;
}

const AddToCart: React.FC<AddToCartProps> = ({ productName }) => {
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    setAdded(true);
    // In a real app, this would call an API
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{
          padding: '6px 8px',
          borderRadius: 6,
          border: '1px solid #d1d5db',
          fontSize: '0.9em',
        }}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleAdd}
        disabled={added}
        style={{
          padding: '8px 16px',
          borderRadius: 6,
          border: 'none',
          background: added ? '#059669' : '#2563eb',
          color: '#fff',
          cursor: added ? 'default' : 'pointer',
          fontSize: '0.9em',
          transition: 'background 0.2s',
        }}
      >
        {added ? '✓ Added!' : `Add to Cart`}
      </button>
    </div>
  );
};

export default AddToCart;
