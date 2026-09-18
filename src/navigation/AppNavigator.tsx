import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import SavedCitiesScreen from '../screens/SavedCitiesScreen';
import AddCityScreen from '../screens/AddCityScreen';
import WeatherDetailScreen from '../screens/WeatherDetailScreen';

export type RootStackParamList = {
  SavedCities: undefined;
  AddCity: undefined;
  WeatherDetail: {
    cityName: string;
    latitude?: number;
    longitude?: number;
  };
};

export type WeatherDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WeatherDetail'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SavedCities" component={SavedCitiesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddCity" component={AddCityScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WeatherDetail" component={WeatherDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;