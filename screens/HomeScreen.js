import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { styles } from '../styles/styles';
import { GYMS } from '../data/gyms';
import { useUserLocation, addDistances } from '../services/location';
import { loadFilters, DEFAULT_FILTERS } from '../services/storage';

// Viser listen af gyms. Filtrene hentes fra telefonens lager og opdateres, når man kommer tilbage fra FilterScreen.
export default function HomeScreen({ navigation, route }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const { coords, hasLocation, permissionDenied } = useUserLocation();
  const { sortBy, selectedFacilities } = filters;

  // Når appen åbnes: hent de filtre, brugeren gemte sidst.
  useEffect(() => {
    loadFilters().then(setFilters);
  }, []);

  // Når FilterScreen sender nye filtre tilbage, bruges de med det samme.
  useEffect(() => {
    if (route.params?.filters) setFilters(route.params.filters);
  }, [route.params?.filters]);

  // Regn afstand ud fra brugerens position, behold kun gyms med alle de valgte faciliteter, og sortér.
  const gyms = addDistances(GYMS, coords)
    .filter((gym) => selectedFacilities.every((f) => gym.facilities.includes(f)))
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.distanceKm - b.distanceKm;
    });

  // Tekst der fortæller, hvor afstandene er målt fra.
  let locationText = '📍 Finder din placering...';
  if (hasLocation) locationText = '📍 Afstande er målt fra din placering';
  else if (permissionDenied) locationText = '📍 Ingen adgang til placering – afstande er fra Rådhuspladsen';

  // Tegner ét gym i listen. Kortet er en knap, der åbner GymDetail med det valgte gym.
  const renderGym = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('GymDetail', { gym: item })}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardAddress}>{item.address}</Text>
      {item.offer && <Text style={styles.offerBadge}>🔥 Offer available</Text>}
      <View style={styles.cardRow}>
        <Text style={styles.price}>{item.price} kr/md</Text>
        <Text style={styles.distance}>{item.distanceKm.toFixed(1)} km away</Text>
      </View>
      <View style={styles.facilityPillRow}>
        {item.facilities.map((f) => (
          <View key={f} style={styles.pill}>
            <Text style={styles.pillText}>{f}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>GymFindr</Text>
      <Text style={styles.subtitle}>Gyms near you, sorted and filtered your way.</Text>
      <Text style={styles.locationText}>{locationText}</Text>

      {/* Knap: går til FilterScreen og tager de nuværende valg med */}
      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Filters', { filters })}
      >
        <Text style={styles.secondaryButtonText}>
          Filters & Sort ({sortBy}
          {selectedFacilities.length > 0 ? `, ${selectedFacilities.length} facilities` : ''})
        </Text>
      </Pressable>

      {/* To nye knapper: kortet får de filtrerede gyms og brugerens position med, AI-rådgiveren åbnes tom */}
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.secondaryButton, styles.buttonRowItem]}
          onPress={() => navigation.navigate('Map', { gyms, coords })}
        >
          <Text style={styles.secondaryButtonText}>🗺️ Vis på kort</Text>
        </Pressable>
        <Pressable
          style={[styles.secondaryButton, styles.buttonRowItem]}
          onPress={() => navigation.navigate('AiAssistant')}
        >
          <Text style={styles.secondaryButtonText}>🤖 Spørg AI</Text>
        </Pressable>
      </View>

      {/* Liste: FlatList viser alle gyms og en tekst, hvis ingen matcher filtrene */}
      <FlatList
        data={gyms}
        keyExtractor={(item) => item.id}
        renderItem={renderGym}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No gyms match your filters.</Text>}
      />
    </View>
  );
}
