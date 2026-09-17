import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './styles/styles';
import HomeScreen from './screens/HomeScreen';
import FilterScreen from './screens/FilterScreen';
import GymDetailScreen from './screens/GymDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {/* Krav: minimum 3 screens med navigation imellem dem */}
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
