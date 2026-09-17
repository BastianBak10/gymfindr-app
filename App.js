import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './styles/styles';
import HomeScreen from './screens/HomeScreen';
import FilterScreen from './screens/FilterScreen';
import GymDetailScreen from './screens/GymDetailScreen';

// Opretter selve navigations-"stakken" - den holder styr på hvilken
// screen der vises, og hvordan man kan gå frem/tilbage mellem dem.
const Stack = createNativeStackNavigator();

// App.js er indgangen til hele appen (kaldes fra index.js).
export default function App() {
  return (
    // NavigationContainer skal ligge yderst - den styrer navigations-tilstanden
    // for hele appen (fx hvilken screen der er aktiv lige nu).
    <NavigationContainer>
      <StatusBar style="light" />
      {/* Krav: minimum 3 screens med navigation imellem dem.
          screenOptions sætter fælles udseende (farver) for headeren på alle screens. */}
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {/* Screen 1: gym-liste */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'GymFindr' }} />
        {/* Screen 2: filtrering og sortering */}
        <Stack.Screen name="Filters" component={FilterScreen} options={{ title: 'Filters & Sort' }} />
        {/* Screen 3: detaljer for ét gym */}
        <Stack.Screen
          name="GymDetail"
          component={GymDetailScreen}
          options={{ title: 'Gym Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
