import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles, colors } from '../styles/styles';

// Viser de filtrerede gyms som pins på et kort sammen med brugerens egen position.
// Home sender både gyms og brugerens koordinater med via route.params.
export default function MapScreen({ navigation, route }) {
  const { gyms, coords } = route.params;

  return (
    <View style={styles.mapScreen}>
      <MapView
        style={styles.map}
        initialRegion={{ ...coords, latitudeDelta: 0.06, longitudeDelta: 0.06 }}
        showsUserLocation
        showsMyLocationButton
      >
        {/* Én pin per gym. Gyms med tilbud får en orange pin. Tryk på boksen over pinnen åbner detaljer. */}
        {gyms.map((gym) => (
          <Marker
            key={gym.id}
            coordinate={{ latitude: gym.latitude, longitude: gym.longitude }}
            title={gym.name}
            description={`${gym.price} kr/md · ${gym.distanceKm.toFixed(1)} km · Tryk for detaljer`}
            pinColor={gym.offer ? colors.accent : colors.primary}
            onCalloutPress={() => navigation.navigate('GymDetail', { gym })}
          />
        ))}
      </MapView>

      <View style={styles.mapHint}>
        <Text style={styles.mapHintText}>
          {gyms.length} gyms · 🟠 = tilbud · Tryk på en pin og derefter på boksen for detaljer
        </Text>
      </View>
    </View>
  );
}
