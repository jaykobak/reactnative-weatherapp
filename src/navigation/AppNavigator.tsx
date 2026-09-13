import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedCitiesScreen from '../screens/SavedCitiesScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SavedCities" component={SavedCitiesScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;