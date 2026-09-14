import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedCitiesScreen from '../screens/SavedCitiesScreen';
import AddCityScreen from '../screens/AddCityScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SavedCities" component={SavedCitiesScreen} />
      <Stack.Screen name="AddCity" component={AddCityScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;