import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type LoadingPropsType = {}

export const Loading: FC<LoadingPropsType> = ({}) => {

  return (
    <View style={styles.container}>
      <Text> LOADING... </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});


