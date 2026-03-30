import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '../components';
import { fontFamilyBold } from '../modules/themes';

interface HeaderProps {
  label?: string;
  onBack?: () => void;
  onSearch?: () => void;
  onFilter?: () => void;
  onProfile?: () => void;
}

const Header2: React.FC<HeaderProps> = ({
  label,
  onBack,
  onSearch,
  onFilter,
  onProfile,
}) => {
  return (
    <View style={styles.container}>
      
      {/* TOP ROW */}
      <View style={styles.row}>

        {/* LEFT (Back) */}
        <View style={styles.left}>
          {onBack && (
           <TouchableOpacity onPress={onBack} style={[styles.iconBox,{paddingLeft:5}]}>
  <Icon name="arrow-back-ios" type="MaterialIcons" size={22} />
</TouchableOpacity>
          )}
        </View>

           {/* LABEL */}
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

        {/* RIGHT (Icons) */}
        <View style={[styles.right]}>
          {onSearch && (
          <View style={styles.iconBox}>
            <TouchableOpacity onPress={onSearch}>
              <Icon name="search" type="MaterialIcons" size={24} />
            </TouchableOpacity>
                        </View>

          )}

          {onFilter && (
                      <View style={styles.iconBox}>

            <TouchableOpacity onPress={onFilter}>
              <Icon name="filter" type="Ionicons" size={24} />
            </TouchableOpacity>
                                    </View>

          )}

          {onProfile && (
                      <View style={styles.iconBox}>

            <TouchableOpacity onPress={onProfile}>
              <Icon
                name="account-circle-outline"
                type="MaterialCommunityIcons"
                size={26}
              />
            </TouchableOpacity>
                                    </View>

          )}
        </View>
      
      </View>

     
    </View>
  );
};

export default Header2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    padding: 10,
    height:55,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
left: {
  minWidth: 40,
  alignItems: 'center',
  justifyContent: 'center',
  
},
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    
  },
  iconBox: {
    backgroundColor: '#f1f1f1d6',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize:25,
    fontFamily: fontFamilyBold,
    // marginTop: 10,
    // marginLeft: 10,
  },
});