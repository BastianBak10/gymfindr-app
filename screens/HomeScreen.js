import { View, Text, FlatList, Pressable } from 'react-native';
import { styles } from '../styles/styles';
import { GYMS } from '../data/gyms';

// Viser listen af gyms. Sortering og filtre kommer fra FilterScreen via route.params.
export default function HomeScreen({ navigation, route }) {
  const sortBy = route.params?.sortBy ?? 'distance';
  const selectedFacilities = route.params?.selectedFacilities ?? [];

  // Behold kun gyms med alle de valgte faciliteter, og sortér derefter.
  const gyms = GYMS.filter((gym) =>
    selectedFacilities.every((f) => gym.facilities.includes(f))
  ).sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.distanceKm - b.distanceKm;
  });

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

      {/* Knap: går til FilterScreen og tager de nuværende valg med */}
      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Filters', { sortBy, selectedFacilities })}
      >
        <Text style={styles.secondaryButtonText}>
          Filters & Sort ({sortBy}
          {selectedFacilities.length > 0 ? `, ${selectedFacilities.length} facilities` : ''})
        </Text>
      </Pressable>

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
