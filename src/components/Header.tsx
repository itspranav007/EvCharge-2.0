import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { fontFamily, Size, useTheme } from '../modules';
import Icon from './Icon';
import { Colors, fontFamilyBold } from '../modules/themes';
// import ThreeDotMenu from '../screens/shop/ThreeDotMenu';
interface HeaderProps {
  label: string;
  onBack?: () => void;
  onFilter?: () => void;
  onSearch?: () => void;
  onShare?:()=>void;
  onDownload?:()=>void;
  rightChild?: React.ReactNode;
  leftChild?: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({
  label,
  leftChild,
  onBack,
  onFilter,
  onSearch,
  onShare,
  onDownload,
  rightChild,
}) => {
  // const colors = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor:"#ECECEC",
        paddingHorizontal:10,
        paddingVertical: 8,
        gap: 5,
        alignItems: 'center',
        flexDirection: 'row',
        // marginTop:20,

      }}>
      <View style={{ flexDirection: 'row'  }}>
        {onBack ? (
          <Icon
            name="chevron-left"
            type="Entypo"
            color={Colors.primary}
            size={26}
            onPress={onBack}
          />
        ) : null}
        {leftChild ? leftChild : null}

        {onFilter ? (
          <Icon
            name="filter"
            type="Feather"
            color={Colors.background}
            onPress={onFilter}
          />
        ) : null}
        {onSearch ? (
          <Icon
            name="search"
            type="Ionicons"
            // color={colors.background}
            color='black'
            onPress={onSearch}
          />
        ) : null}
        {onShare ? (
          <Icon
            name="share"
            type="Feather" // or use another icon set if preferred
            // color={colors.background}
            color='black'
            onPress={onShare}
          />
        ) : null}

        {onDownload ? (
          <Icon
            name="download"
            type="Feather"
            // color={colors.background}
            color='black'
            onPress={onDownload}
          />
        ) : null}
        {rightChild ? rightChild : null}
      </View>
      <Text
        numberOfLines={1}
        // adjustsFontSizeToFit
        style={{
          flex: 1,
          alignItems: 'center',
          fontSize:Size.lg,
          color: Colors.black,
          fontFamily:fontFamilyBold,
          
        }}>
        {label}
      </Text>
      
    </SafeAreaView>
    
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {},
});