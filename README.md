# GymFindr

En React Native (Expo)-app til at finde fitnesscentre i nærheden af dig og sortere/filtrere dem efter afstand, pris, rating og faciliteter (pool, sauna, holdtræning, personlig træning, 24/7-adgang).

## Demovideo

https://youtube.com/shorts/wgOe2acMoO8?feature=share

## Screens

- **Home** — liste over gyms, sorteret/filtreret efter dine valgte kriterier
- **Filters & Sort** — vælg sortering (afstand, pris, rating) og til-/fravælg hvilke faciliteter der betyder noget for dig
- **Gym Details** — fuld facilitetsliste, rating, aktuelt tilbud (hvis der er et), en gebyroversigt (oprettelsesgebyr, administrationsgebyr, bindingsperiode) samt en "Sign up"-knap, der åbner gymmets egen hjemmeside (affiliate-link — GymFindrs forretningsmodel er en kommission pr. tilmelding)

## Projektstruktur

- `App.js` — opsætning af navigation (tre screens)
- `screens/` — HomeScreen, FilterScreen, GymDetailScreen
- `data/gyms.js` — fiktive gym-data
- `styles/styles.js` — al styling samlet i én fil

## Sådan køres appen

```bash
npm install
npx expo start
```

Scan QR-koden med Expo Go (iOS/Android).

## Tech

- Expo / React Native
- React Navigation (native stack)
