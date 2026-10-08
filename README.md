# GymFindr

En React Native (Expo)-app til at finde fitnesscentre i nærheden af dig og sortere/filtrere dem efter afstand, pris, rating og faciliteter (pool, sauna, holdtræning, personlig træning, 24/7-adgang).

## Nyt i iteration 2 (godkendelsesopgave 2)

- **Filtervalg gemmes** med AsyncStorage, så de huskes, når appen lukkes (feedback fra opgave 1). "Nulstil filtre" sletter dem igen.
- **Din aktuelle placering** (expo-location): afstanden til hvert gym regnes ud fra hvor du står. Afviser man adgang, bruges Rådhuspladsen.
- **Kort** (react-native-maps): dine filtrerede gyms vises som pins sammen med din egen position. Tryk på en pin for at åbne gymmet.
- **AI-rådgiver** (OpenAI / ChatGPT): beskriv hvad du leder efter, og få en anbefaling blandt GymFindrs gyms. AI'en får gebyrer, binding og den samlede pris for første år med, så den sammenligner den reelle pris og ikke kun månedsprisen. Kan også åbnes fra et gym med "Spørg AI om dette gym".

## Demovideo

https://youtube.com/shorts/wgOe2acMoO8?feature=share

## Screens

- **Home** — liste over gyms, sorteret/filtreret efter dine valgte kriterier
- **Filters & Sort** — vælg sortering (afstand, pris, rating) og til-/fravælg hvilke faciliteter der betyder noget for dig
- **Gym Details** — fuld facilitetsliste, rating, afstand, aktuelt tilbud (hvis der er et), en gebyroversigt (oprettelsesgebyr, administrationsgebyr, bindingsperiode, samlet pris første år), en "Sign up"-knap, der åbner gymmets egen hjemmeside (affiliate-link — GymFindrs forretningsmodel er en kommission pr. tilmelding), og en knap til AI-rådgiveren
- **Kort** — gyms som pins på et kort med din position
- **AI-rådgiver** — chat med ChatGPT om hvilket gym der passer til dig

## Projektstruktur

- `App.js` — opsætning af navigation (fem screens)
- `screens/` — HomeScreen, FilterScreen, GymDetailScreen, MapScreen, AiAssistantScreen
- `services/location.js` — henter brugerens placering og regner afstande ud
- `services/storage.js` — gemmer/henter filtervalg med AsyncStorage
- `services/openai.js` — kald til OpenAI's API
- `data/gyms.js` — fiktive gym-data med koordinater
- `styles/styles.js` — al styling samlet i én fil

## Sådan køres appen

```bash
npm install
cp .env.example .env   # indsæt jeres OpenAI-nøgle i .env
npx expo start
```

`.env` er i `.gitignore`, så nøglen ikke kommer med på GitHub. Bemærk: `EXPO_PUBLIC_`-variabler bliver bygget ind i appen, så i en rigtig app skulle kaldet til OpenAI gå gennem en backend.

Scan QR-koden med Expo Go (iOS/Android).

## Tech

- Expo / React Native
- React Navigation (native stack)
- AsyncStorage (lokal lagring)
- expo-location og react-native-maps
- OpenAI Chat Completions API (gpt-4o-mini)
