// ProductReviews - Async Server Component (Streams Separately)
//
// This component is wrapped in <Suspense> by its parent, so it streams
// independently. The product card appears first, then reviews fill in
// as this async fetch resolves — no loading spinners on the initial page load.

import React from 'react';

interface Review {
  author: string;
  text: string;
  rating: number;
  date: string;
}

interface ProductReviewsProps {
  productId: number;
}

async function fetchReviews(productId: number): Promise<Review[]> {
  // Simulate a slower API call — this is why we use Suspense
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 500 + productId * 200));

  const reviewsByProduct: Record<number, Review[]> = {
    1: [
      { author: 'Sarah K.', text: 'Best desk I have ever owned. The memory presets are a game changer.', rating: 5, date: '2026-02-10' },
      { author: 'Mike R.', text: 'Solid build quality. Cable management could be better.', rating: 4, date: '2026-02-05' },
    ],
    2: [
      { author: 'Alex T.', text: 'Incredible noise cancellation. Battery lasts forever.', rating: 5, date: '2026-02-12' },
      { author: 'Jordan L.', text: 'Great for calls. Spatial audio is impressive.', rating: 4, date: '2026-02-08' },
    ],
    3: [
      { author: 'Chris P.', text: 'Hot-swap switches are amazing. Best keyboard for coding.', rating: 5, date: '2026-02-14' },
      { author: 'Dana W.', text: 'PBT keycaps feel premium. RGB is tasteful.', rating: 5, date: '2026-02-11' },
    ],
  };

  return reviewsByProduct[productId] || [];
}

function formatReviewDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(dateStr));
}

const ProductReviews = async ({ productId }: ProductReviewsProps) => {
  const reviews = await fetchReviews(productId);

  if (reviews.length === 0) return null;

  return (
    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
      <h4 style={{ margin: '0 0 8px', fontSize: '0.9em', color: '#6b7280' }}>Recent Reviews</h4>
      {reviews.map((review) => (
        <div key={`${review.author}-${review.date}`} style={{ marginBottom: 8, fontSize: '0.85em' }}>
          <span style={{ color: '#f59e0b' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
          <span style={{ fontWeight: 600, marginLeft: 8 }}>{review.author}</span>
          <span style={{ color: '#9ca3af', marginLeft: 8 }}>{formatReviewDate(review.date)}</span>
          <p style={{ margin: '4px 0 0', color: '#4b5563' }}>{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
