import { Alert, StatusBar, StyleSheet } from 'react-native';
import { Loading } from './components/Loading';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import axois from 'axios';
import { Weather } from './components/Weather';
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = 'e4c4b727621f195c880c628cce157283';

export default function App() {

  console.log('__________________________________');

  const [weather, setWeather] = useState<any>(null);
  const [status, requestPermission] = Location.useBackgroundPermissions();

  useEffect(() => {
    (async() => {
      await requestPermission();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const res = await axois.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric`);
      setWeather(res.data);
    })();
    Alert.alert('Reloaded');
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={['#4c669f', '#3b5998', '#192f6a']}
    >
      <StatusBar barStyle="dark-content" />
      {!weather
        ? <Loading />
        : <Weather weather={weather} />
      }
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
