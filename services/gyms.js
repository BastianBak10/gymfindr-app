import { useEffect, useState } from 'react';
import { ref, onValue, get, set } from 'firebase/database';
import { rtdb } from '../database/firebase';
import { GYMS } from '../data/gyms';

// Stedet i databasen, hvor alle gyms ligger.
const gymsRef = ref(rtdb, 'Gyms');

// Lægger startdata fra data/gyms.js op i databasen, hvis den er tom (første gang appen kører).
// Hvert gym gemmes under sit id, fx Gyms/1, Gyms/2 osv.
export async function seedGymsIfEmpty() {
  const snap = await get(gymsRef);
  if (snap.exists()) return;
  const gymsById = Object.fromEntries(GYMS.map((gym) => [gym.id, gym]));
  await set(gymsRef, gymsById);
}

// Hook der lytter på Gyms i Firebase med onValue. Ændres data i konsollen,
// opdateres appen med det samme, uden at man skal genstarte.
export function useGyms() {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    seedGymsIfEmpty().catch((e) => setError(e.message));

    const unsubscribe = onValue(
      gymsRef,
      (snap) => {
        const data = snap.val() || {};
        // Firebase giver et objekt { id: gym }, så det laves om til en liste til FlatList.
        // Fordi id'erne er tal (1, 2, 3...), giver Firebase en liste med et tomt hul på plads 0,
        // så tomme pladser sorteres fra. Facilities kan mangle, hvis man har slettet dem i konsollen.
        setGyms(
          Object.entries(data)
            .filter(([, gym]) => gym)
            .map(([id, gym]) => ({ ...gym, id, facilities: gym.facilities || [] }))
        );
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );

    // Stop med at lytte, når skærmen lukkes.
    return unsubscribe;
  }, []);

  return { gyms, loading, error };
}
