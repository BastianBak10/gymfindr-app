import { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import * as Location from 'expo-location';
import { styles } from '../styles/styles';
import { GYMS } from '../data/gyms';
import { getDistanceKm } from '../utils/distance';

const DEFAULT_SORT = 'distance';

export default function HomeScreen({ navigation, route }) {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const sortBy = route.params?.sortBy ?? DEFAULT_SORT;
  const selectedFacilities = route.params?.selectedFacilities ?? [];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Location permission denied — showing gyms without distance.');
        return;
      }
      const position = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    })();
  }, []);

  const gyms = useMemo(() => {
    let list = GYMS.map((gym) => ({
      ...gym,
      distanceKm: userLocation
        ? getDistanceKm(
            userLocation.latitude,
            userLocation.longitude,
            gym.latitude,
            gym.longitude
          )
        : null,
    }));

    if (selectedFacilities.length > 0) {
      list = list.filter((gym) =>
        selectedFacilities.every((f) => gym.facilities.includes(f))
      );
    }

    list.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance' && a.distanceKm != null && b.distanceKm != null) {
        return a.distanceKm - b.distanceKm;
      }
      return 0;
    });

    return list;
  }, [userLocation, sortBy, selectedFacilities]);

  // Knap-krav: hvert gym-kort er tryk-bart og navigerer til detalje-siden
  const renderGym = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('GymDetail', { gym: item })}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardAddress}>{item.address}</Text>
      <View style={styles.cardRow}>
        <Text style={styles.price}>{item.price} kr/md</Text>
        <Text style={styles.distance}>
          {item.distanceKm != null ? `${item.distanceKm.toFixed(1)} km away` : '★ ' + item.rating}
        </Text>
      </View>
      <View style={styles.facilityPillRow}>
        {item.facilities.map((f) => (
          <View key={f} style={styles.pill}>
            <Text style={styles.pillText}>{f}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>GymFindr</Text>
      <Text style={styles.subtitle}>
        {locationError ?? 'Gyms near you, sorted and filtered your way.'}
      </Text>

      {/* Knap-krav: knap med funktion - navigerer til FilterScreen */}
      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Filters', { sortBy, selectedFacilities })}
      >
        <Text style={styles.secondaryButtonText}>
          Filters & Sort ({sortBy}
          {selectedFacilities.length > 0 ? `, ${selectedFacilities.length} facilities` : ''})
        </Text>
      </Pressable>

      {/* Liste-krav: FlatList viser alle gyms som en scrollbar liste */}
      <FlatList
        data={gyms}
        keyExtractor={(item) => item.id}
        renderItem={renderGym}
        style={{ marginTop: 16 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No gyms match your filters.</Text>}
      />
    </View>
  );
}
