import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

// Bruges, hvis brugeren afviser adgang til lokation (Rådhuspladsen i København).
export const DEFAULT_COORDS = { latitude: 55.6761, longitude: 12.5683 };

// Hook: spørger om lov til at bruge lokation og henter brugerens aktuelle position.
// Giver altid nogle koordinater tilbage, så resten af appen ikke skal tjekke for null.
export function useUserLocation() {
  const [coords, setCoords] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermissionDenied(true);
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      // Gemmer kun de to tal, vi skal bruge, så de kan sendes videre via navigation.
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    // Fx hvis GPS er slået fra på telefonen. Så bruger vi bare DEFAULT_COORDS.
    getLocation().catch(() => setPermissionDenied(true));
  }, []);

  return {
    coords: coords ?? DEFAULT_COORDS,
    hasLocation: coords !== null,
    permissionDenied,
  };
}

// Afstand i km mellem to punkter i luftlinje (haversine-formlen).
export function getDistanceKm(from, to) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(to.latitude - from.latitude);
  const dLon = toRad(to.longitude - from.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.latitude)) * Math.cos(toRad(to.latitude)) * Math.sin(dLon / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Tilføjer distanceKm til hvert gym ud fra brugerens position.
export function addDistances(gyms, coords) {
  return gyms.map((gym) => ({ ...gym, distanceKm: getDistanceKm(coords, gym) }));
}
