import AsyncStorage from '@react-native-async-storage/async-storage';

// Nøglen filtrene gemmes under på telefonen.
const FILTERS_KEY = 'gymfindr:filters';

export const DEFAULT_FILTERS = { sortBy: 'distance', selectedFacilities: [] };

// Henter de gemte filtervalg. Er der ingen (første gang appen åbnes), bruges standardvalgene.
export async function loadFilters() {
  try {
    const json = await AsyncStorage.getItem(FILTERS_KEY);
    return json ? JSON.parse(json) : DEFAULT_FILTERS;
  } catch {
    return DEFAULT_FILTERS;
  }
}

// Gemmer filtervalgene, så de huskes, når appen lukkes og åbnes igen.
export async function saveFilters(filters) {
  await AsyncStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
}

// Sletter de gemte filtervalg (bruges af "Nulstil"-knappen).
export async function clearFilters() {
  await AsyncStorage.removeItem(FILTERS_KEY);
}
