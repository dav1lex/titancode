import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for content on the TITANCODE website.',
  robots: {
    index: false, // No need to index the search page itself
    follow: true,
  },
};