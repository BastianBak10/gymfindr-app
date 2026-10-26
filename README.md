# GymFindr
GymFindr er en React Native-app (Expo), der sammenligner fitnesscentre og anbefaler det abonnement, der passer bedst til brugeren. Appen sammenligner på den **ærlige årspris**: det, man reelt betaler pr. måned over et år, med gebyrer, kampagner og rabatter, i stedet for den reklamerede månedspris.

## Demovideo
https://youtu.be/VepzBKofcNY

## GitHub
https://github.com/BastianBak10/gymfindr-app

## Kør projektet
1. Installer dependencies: `npm install`
2. Kopiér `.env.example` til `.env`, og udfyld nøglerne til Firebase og OpenAI. Uden nøgler kører appen med eksempeldata, og Spørg Ronnie er slået fra.
3. Start Expo: `npx expo start`
4. Scan QR-koden med Expo Go. Computer og telefon skal være på samme wifi.

Testene køres med `npm test`.

## Skærme
Første gang vises en opstart. Derefter er der fire faner i bunden: Find, Spørg Ronnie, Favoritter og Profil. Centerdetalje og Filtre åbnes oven på fanerne, og Om os åbnes fra Profil.

| Skærm | Hvad den gør |
|---|---|
| Opstart | Adresse eller placering, fødselsdato, rabatter, nuværende medlemskab og præferencer |
| Find | Kort og liste over de centre, der passer til dine filtre, med det anbefalede center markeret |
| Filtre | Sortering og filtre, fx sauna, holdtræning, døgnåbent, ingen binding og maks. afstand. Valgene huskes efter genstart |
| Centerdetalje | Centrets tilbud med ærlig årspris, gebyrer, binding og en knap til tilmelding |
| Spørg Ronnie | Chat med en AI-assistent, der anbefaler centre ud fra dine egne priser |
| Favoritter | Gemte centre og prisalarmer, der giver besked, når prisen falder |
| Profil, Om os og Log ind | Ret dine oplysninger, læs om appen og log ind med en konto |

## Data og styling
- **Firebase Realtime Database:** centre og priser samt brugerens profil, favoritter og prisalarmer.
- **AsyncStorage:** filtre og en lokal kopi af profil og favoritter, så de huskes efter genstart.
- **Natlig scraper** (`scraper/`): henter rigtige priser fra SATS, LOOP, PureGym og Fitness X hver nat via GitHub Actions.
- **Styling** ligger samlet i `styles/GlobalStyle.js`.

## Hvem har lavet hvad
Hver skærmfil har en `// Ansvarlig: <navn>`-kommentar øverst.

| Ansvarlig | Skærme og dele |
|---|---|
| Jakob | Opstart, Profil, Om os og Log ind, scraperen og nat-jobbet samt afsendelse af push |
| Christian | Find (kort og liste), Filtre og Centerdetalje |
| Bastian | Spørg Ronnie, Favoritter/Alarmer og push-registrering i appen samt service-account-nøglen og adgangen til Firebase |

## Teknologi
React Native med Expo, React Navigation, Firebase, react-native-maps, expo-location, expo-notifications og OpenAI (gpt-4o-mini) til Spørg Ronnie.

AI blev brugt til at planlægge appens opsætning. Vi brugte Matt Pocock's **/grill-with-docs** skill (https://github.com/mattpocock/skills/blob/main/docs/engineering/grill-with-docs.md) sammen med en AI-assistent til at gennemgå planen og fastlægge appens begreber.

## Mere dokumentation
Opsætning af Firebase og push, sikkerhedsregler, test og den natlige scraper står i [docs/teknisk-dokumentation.md](docs/teknisk-dokumentation.md).
