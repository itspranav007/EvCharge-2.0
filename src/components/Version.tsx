import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from './Icon';
import { fontFamily } from '../modules';
import { fontFamilyBold } from '../modules/themes';

type VersionProps = {
  versionCode: string;
  colorname: string;
};

const Version: React.FC<VersionProps> = ({ versionCode, colorname }) => {
  return (
    <View style={styles.container}>
      <Icon style={{marginTop:8}} type="MaterialIcons" name="electric-bolt" size={20} color={colorname} />
      <Text style={[styles.versionText,{color:colorname}]}>Version: {versionCode}</Text>
    </View>
  );
};

export default Version;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    marginLeft: 8,
    fontFamily: fontFamilyBold, // or .regular, .bold etc., depending on your `fontFamily` object
    fontSize:14,
    marginTop:5

  },
});
