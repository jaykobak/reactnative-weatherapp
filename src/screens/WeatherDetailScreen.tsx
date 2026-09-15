import { View, Text } from 'react-native';
import { WeatherDetailScreenProps } from '../navigation/AppNavigator';

function WeatherDetailScreen({ route }: WeatherDetailScreenProps) {

    // Get the city name
    const { cityName } = route.params;

    return (
        <View>
            <Text>{ cityName }</Text>
        </View>
    );
}

export default WeatherDetailScreen;