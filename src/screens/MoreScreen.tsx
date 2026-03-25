import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Header, Icon } from '../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { fontFamily } from '../modules';
import { Colors, fontFamilyBold } from '../modules/themes';
import SearchBar from '../components/SearchBar';

const MoreScreen = () => {
  const navigation = useNavigation();

  const data = [
    {
      title: 'Service Center',
      icon: 'gears',
      screen: 'ServiceCenter',
      type: 'FontAwesome',
    },
    {
      title: 'EV News',
      icon: 'newspaper-o',
      screen: 'EvNews',
      type: 'FontAwesome',
    },
    {
      title: ' Smart Charge Reminder',
      icon: 'notifications-active',
      screen: 'SmartChargingReminder',
      type: 'MaterialIcons',
    },
    {
      title: 'Calculator',
      icon: 'rupee',
      screen: 'CostCalculator',
      type: 'FontAwesome',
    },
    {
      title: 'Help',
      icon: 'face-agent',
      screen: 'EvHelp',
      type: 'MaterialCommunityIcons',
    },
  ];

  const [search, setSearch] = React.useState('');

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header label="Explore More !" />

     <View style={{ paddingHorizontal: 16, marginBottom: 16 ,marginTop: 16}}>

         <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search"

        />

 <View style={styles.grid}>

     
        {filteredData.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen as never)}
          >
            <View style={styles.iconBox}>
              <Icon
                name={item.icon}
                size={30}
                color={Colors.primary}
                type={item.type}
              />
            </View>

            <Text numberOfLines={2} style={styles.text}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>


     </View>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Ffff',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 16,

    alignItems: 'center',
    justifyContent: 'center',

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // Android shadow
    elevation: 10,
  },

  iconBox: {
    // backgroundColor: '#F1F3F5',
    height: 50,
    width: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  text: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    fontFamily: fontFamilyBold,
  },
});
