import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Splashscreen from '../components/Splashscreen';
const Logo = require('../assets/images/logo.png');

const SplashScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Splashscreen
        Logoimage={Logo}
        screenname={'DashboardTab'}
        Backgroundimage={undefined}
        title='EVCharge'
        Subtitle='Your gateway to seamless EV charging'
        time={100}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
