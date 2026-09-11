/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';



// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

type CityProps = {
  cName: string;
  cTemp: string;
  cColor: string;
}

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets()

  return (
    <View style={[ styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom} ]}>

      {/* White card */}
      <View style={styles.card}>

        {/* Card title */}
        <View style={styles.wrapper}>
          <Text style={styles.title}>Saved cities</Text>
          <View style={styles.blueDot}>
            <Text style={styles.subtitle}>+</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={[ styles.divider, { marginBottom: 15 } ]} />

        {/* City rows */}
        <City cName="Lisbon" cTemp="72°F" cColor="#F5A623" />
        <City cName="Tokyo" cTemp="64°F" cColor="#94A3B8" />
        <City cName="Austin" cTemp="82°F" cColor="#3B82F6" />

      </View>
    </View>
  );
}

function City({cName, cTemp, cColor}: CityProps) {
  return (
    <View style={styles.cityRow}>
      <View style={[ styles.dot, { backgroundColor: cColor } ]} />
      <Text style={styles.cityName}>{cName}</Text>
      <Text style={styles.temperature}>{cTemp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F3F8',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

  card: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 25,
    padding: 20,
    paddingBottom: 30,
  },

  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  title: {
    color: '#16181D',
    fontSize: 30,
    fontWeight: 'bold',
  },

  blueDot: {
    backgroundColor: '#2563EB',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subtitle: {
    color: 'white',
    fontSize: 32,
    includeFontPadding: false,
  },

  divider: {
    backgroundColor: '#E3E7EE',
    height: 2.5,
    width: '100%',
    borderRadius: 20,
  },

  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },

  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 18,
  },

  cityName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#16181D',
    flex: 1,
  },

  temperature: {
    color: '#6B7280',
    fontSize: 18,
  }
})

export default App;
