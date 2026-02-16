'use client';

// LikeButton - Client Component
//
// This component has the 'use client' directive, so its JavaScript IS sent to the browser.
// Only this component's JS is included in the client bundle.
// The parent HelloServer component sends ZERO JS to the browser.

import React, { useState } from 'react';

const LikeButton: React.FC = () => {
  const [likes, setLikes] = useState(0);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginTop: 16,
        padding: '12px 16px',
        background: '#fefce8',
        border: '1px solid #fde68a',
        borderRadius: 8,
      }}
    >
      <button
        type="button"
        onClick={() => setLikes((prev) => prev + 1)}
        style={{
          padding: '8px 16px',
          fontSize: '1em',
          cursor: 'pointer',
          borderRadius: 6,
          border: '1px solid #d1d5db',
          background: '#fff',
        }}
      >
        👍 Like
      </button>
      <span>
        {likes} {likes === 1 ? 'like' : 'likes'}
      </span>
      <span style={{ color: '#92400e', fontSize: '0.85em' }}>
        ← This is a client component (only its JS was sent to the browser)
      </span>
    </div>
  );
};

export default LikeButton;
