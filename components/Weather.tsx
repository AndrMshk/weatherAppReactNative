import { FC } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type WeatherDataType = {
  coord: {
    lon: number
    lat: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ],
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  },
  visibility: number
  wind: {
    speed: number
    deg: number
  },
  clouds: {
    all: number
  },
  dt: number
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  },
  timezone: number
  id: number
  name: string
  cod: number
}

const getWindDirection = (deg: number) => {
  if (!deg) {
    return;
  } else if (deg === 0 || deg === 360) {
    return 'N';
  } else if (deg > 0 && deg < 90) {
    return 'NE';
  } else if (deg === 90) {
    return 'E';
  } else if (deg > 90 && deg < 180) {
    return 'SE';
  } else if (deg === 180) {
    return 'S';
  } else if (deg > 180 && deg < 270) {
    return 'SW';
  } else if (deg === 270) {
    return 'W';
  } else if (deg > 270 && deg < 360) {
    return 'NW';
  }
};

type WeatherPropsType = {
  weather: WeatherDataType
}

export const Weather: FC<WeatherPropsType> = ({ weather }) => {

  return (
    <LinearGradient
      style={styles.container}
      colors={['#ffecad', '#a0cfff', '#0041ff']}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.description}>
        <Image
          style={styles.img}
          source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
        />
        <View>
          <Text style={styles.temp}>Temp: {Math.round(weather.main.temp)} °C</Text>
          <Text style={styles.temp}>Feel like: {Math.round(weather.main.feels_like)} °C</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.details}>Country: {weather.sys.country}</Text>
        <Text style={styles.details}>City: {weather.name}</Text>
        <Text style={styles.details}>Temp: {Math.round(weather.main.temp)} °C</Text>
        <Text style={styles.details}>Feel like: {Math.round(weather.main.feels_like)} °C</Text>
        <Text style={styles.details}>Wind: {getWindDirection(weather.wind.deg)} speed: {Math.round(
          weather.wind.speed)} </Text>
      </View>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
  },
  temp: {
    fontSize: 30,
  },
  info: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 200,
  },
  details: {
    fontSize: 26,
    color: 'white',
  },
});
