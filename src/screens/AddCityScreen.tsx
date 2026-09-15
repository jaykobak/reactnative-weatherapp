import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function AddCityScreen() {
    const navigation = useNavigation();

    return (
      <View>
        <Text>Add City</Text>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>Go back</Text>
        </Pressable>
      </View>
    );
}

export default AddCityScreen;