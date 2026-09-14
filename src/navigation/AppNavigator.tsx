import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedCitiesScreen from '../screens/SavedCitiesScreen';
import AddCityScreen from '../screens/AddCityScreen';
import WeatherDetailScreen from '../screens/WeatherDetailScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SavedCities" component={SavedCitiesScreen} />
      <Stack.Screen name="AddCity" component={AddCityScreen} />
      <Stack.Screen name="WeatherDetail" component={WeatherDetailScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;