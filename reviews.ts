import { Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    rating: 5,
    date: '2 days ago',
    title: 'The crunch is unmatched — truly luxury confection!',
    comment: 'The moment you bite into these, you hear that crisp crackle before the warm, molten chocolate coats your palate. The Hazelnut Praline is easily the finest chocolate snack I have ever tasted.',
    flavor: 'Hazelnut Chocolate',
    verified: true,
    avatarBg: '#5C3826',
  },
  {
    id: 'rev-2',
    author: 'Marcus Sterling',
    rating: 5,
    date: '1 week ago',
    title: 'Bought the Connoisseur Box for dinner guests — disappeared in minutes.',
    comment: 'Served these alongside double espressos after dinner. The 72% Dark Chocolate was revered by everyone. The wafer layers remain unbelievably crisp even with such a rich, molten ganache.',
    flavor: 'The Grand Connoisseur Box',
    verified: true,
    avatarBg: '#2D1B13',
  },
  {
    id: 'rev-3',
    author: 'Sophia Lin-Dubois',
    rating: 5,
    date: '2 weeks ago',
    title: 'The Sea Salt Caramel drip is pure perfection.',
    comment: 'Finding a wafer bite that maintains its structural crunch while housing gooey artisan caramel is nearly impossible. Gourmet Bites nailed the physics and flavor balance completely.',
    flavor: 'Caramel Chocolate',
    verified: true,
    avatarBg: '#7A431D',
  },
  {
    id: 'rev-4',
    author: 'Julian Thorne',
    rating: 5,
    date: '3 weeks ago',
    title: 'Classic Chocolate done with master-tier finesse.',
    comment: 'Rich without being overly sugary. The cocoa notes taste like high-end Swiss pralines rather than mass-market candy. Subscribe & Save was an immediate decision for my pantry.',
    flavor: 'Classic Chocolate',
    verified: true,
    avatarBg: '#4E2C1D',
  }
];
