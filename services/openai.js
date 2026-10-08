// Kalder OpenAI's Chat Completions API, så brugeren kan få råd om, hvilket gym der passer til dem.
// Nøglen ligger i en .env-fil (EXPO_PUBLIC_OPENAI_API_KEY), som IKKE kommer med på GitHub.
const API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini';
const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

// Den samlede pris for det første år: oprettelse + 12 x (månedspris + administrationsgebyr).
// Vi regner den selv ud, så AI'en ikke laver regnefejl.
export function getFirstYearCost(gym) {
  return gym.signupFee + 12 * (gym.price + gym.adminFee);
}

// Instruktionen til AI'en. Den får vores gym-data med, så den kun anbefaler gyms, der findes i appen.
function buildSystemPrompt(gyms) {
  const gymData = gyms.map((gym) => ({
    navn: gym.name,
    adresse: gym.address,
    afstandKm: Number(gym.distanceKm.toFixed(1)),
    prisPrMd: gym.price,
    oprettelsesgebyr: gym.signupFee,
    adminGebyrPrMd: gym.adminFee,
    bindingMdr: gym.bindingMonths,
    samletPrisFoersteAar: getFirstYearCost(gym),
    rating: gym.rating,
    faciliteter: gym.facilities,
    tilbud: gym.offer,
  }));

  return [
    'Du er GymFindrs rådgiver og hjælper brugeren med at vælge det fitnesscenter, der passer bedst til dem.',
    'Anbefal KUN blandt disse fitnesscentre, og skriv navnene præcis som de står i data:',
    JSON.stringify(gymData),
    'Når du sammenligner priser, så brug samletPrisFoersteAar og nævn gebyrer og binding, så brugeren ikke bliver overrasket.',
    'Afstand er målt fra brugerens nuværende position.',
    'Svar kort og venligt på dansk (max ca. 120 ord). Hvis brugerens ønsker ikke kan opfyldes, så sig det ærligt og foreslå det nærmeste alternativ.',
  ].join('\n');
}

// Sender samtalen til OpenAI og returnerer AI'ens svar som tekst.
// messages er en liste af { role: 'user' | 'assistant', content: '...' }.
export async function askGymAssistant(messages, gyms) {
  if (!API_KEY) {
    throw new Error('Mangler OpenAI-nøgle. Opret en .env-fil med EXPO_PUBLIC_OPENAI_API_KEY (se README).');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.4,
      messages: [{ role: 'system', content: buildSystemPrompt(gyms) }, ...messages],
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message ?? `Fejl fra OpenAI (${response.status})`);
  }
  return data.choices[0].message.content.trim();
}
