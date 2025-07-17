'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      {query ? (
        <p>Showing results for: <strong>{query}</strong></p>
      ) : (
        <p>Please enter a search term.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}