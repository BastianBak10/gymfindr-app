import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './styles/styles';
import HomeScreen from './screens/HomeScreen';
import FilterScreen from './screens/FilterScreen';
import GymDetailScreen from './screens/GymDetailScreen';
import MapScreen from './screens/MapScreen';
import AiAssistantScreen from './screens/AiAssistantScreen';

const Stack = createNativeStackNavigator();

// Indgangen til appen. Her sættes de fem screens op, så man kan navigere mellem dem.
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'GymFindr' }} />
        <Stack.Screen name="Filters" component={FilterScreen} options={{ title: 'Filters & Sort' }} />
        <Stack.Screen name="GymDetail" component={GymDetailScreen} options={{ title: 'Gym Details' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Kort' }} />
        <Stack.Screen name="AiAssistant" component={AiAssistantScreen} options={{ title: 'AI-rådgiver' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
