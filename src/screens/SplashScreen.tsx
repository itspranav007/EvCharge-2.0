import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Splashscreen from '../components/Splashscreen';
import Version from '../components/Version';
import { Colors } from '../modules/themes';
const Logo = require('../assets/images/evcar6.png');



import DeviceInfo from 'react-native-device-info';
const SplashScreen = () => {
  const versionName = DeviceInfo.getVersion();
  return (
    <View style={{ flex: 1, }}>
      <Splashscreen
        Logoimage={Logo}
        screenname={'DashboardTab'}
        Backgroundimage={undefined}
        title='EVCharge'
        Subtitle='Your gateway to seamless EV charging'
        time={500}
      />
                <View style={{justifyContent:"flex-end",marginBottom:0,backgroundColor:Colors.background}}>
                    <Version versionCode={versionName} colorname={Colors.primary}  />
                </View>

    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
