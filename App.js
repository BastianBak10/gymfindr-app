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
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'GymFindr' }} />
        <Stack.Screen name="Filters" component={FilterScreen} options={{ title: 'Filters & Sort' }} />
        <Stack.Screen
          name="GymDetail"
          component={GymDetailScreen}
          options={{ title: 'Gym Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
