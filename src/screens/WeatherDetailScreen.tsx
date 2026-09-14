import { View, Text } from 'react-native';

function WeatherDetailScreen({ route }) {

    // Get the city name
    const { cityName } = route.params;

    return (
        <View>
            <Text>{ cityName }</Text>
        </View>
    );
}

export default WeatherDetailScreen;