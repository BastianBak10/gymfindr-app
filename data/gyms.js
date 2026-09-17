// Fiktive gym-data for København. Hvert gym har en afstand (km fra brugeren - fast
// værdi her, men kunne i en rigtig app komme fra brugerens position), en månedspris
// i kroner, en rating og en liste af faciliteter, som HomeScreen og FilterScreen
// bruger til sortering/filtrering.
// I en rigtig app ville denne liste typisk komme fra et API eller en database i stedet.
export const GYMS = [
  {
    id: '1',
    name: 'Fitness World Frederiksberg',
    address: 'Falkoner Allé 20, Frederiksberg',
    distanceKm: 1.2,
    price: 199,
    rating: 4.2,
    facilities: ['Pool', 'Sauna', 'Group classes', '24/7 access'],
  },
  {
    id: '2',
    name: 'SATS Vesterport',
    address: 'Vesterbrogade 3, København V',
    distanceKm: 2.4,
    price: 349,
    rating: 4.6,
    facilities: ['Pool', 'Sauna', 'Group classes', 'Personal training'],
  },
  {
    id: '3',
    name: 'Fresh Fitness Nørrebro',
    address: 'Nørrebrogade 45, København N',
    distanceKm: 0.8,
    price: 149,
    rating: 3.9,
    facilities: ['24/7 access', 'Group classes'],
  },
  {
    id: '4',
    name: 'Loop Fitness City',
    address: 'Frederiksberggade 22, København K',
    distanceKm: 3.1,
    price: 179,
    rating: 4.0,
    facilities: ['24/7 access', 'Personal training'],
  },
  {
    id: '5',
    name: 'PureGym Amager',
    address: 'Amagerbrogade 100, København S',
    distanceKm: 4.6,
    price: 129,
    rating: 3.7,
    facilities: ['24/7 access'],
  },
  {
    id: '6',
    name: 'SATS Østerbro',
    address: 'Østerbrogade 62, København Ø',
    distanceKm: 5.3,
    price: 399,
    rating: 4.7,
    facilities: ['Pool', 'Sauna', 'Group classes', 'Personal training', '24/7 access'],
  },
];

// Samlet liste af alle mulige faciliteter - bruges i FilterScreen til at tegne
// alle facilitets-pillerne, uden at skulle liste dem manuelt to steder.
export const ALL_FACILITIES = [
  'Pool',
  'Sauna',
  'Group classes',
  'Personal training',
  '24/7 access',
];
