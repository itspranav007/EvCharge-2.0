import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { api } from '../modules/services';
import { Header } from '../components';
import SearchBar from '../components/SearchBar';
import { Colors, fontFamily, fontFamilyBold, Size } from '../modules/themes';
import LoadingIndicator from '../components/LoadingIndicator';

const ChargerImage = require('../assets/images/C1.png');

const ChargingStations = () => {

const API_key =  'c33a04c0-edd2-4399-a302-f49d730e9796';

  const navigation = useNavigation();
  const [showdata, setshowData] = useState([]);
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const result = await api.get('https://api.openchargemap.io/v3/poi/', {
      params: {
        output: 'json',
        countrycode: 'IN',
        town: 'Nagpur',
        maxresults: 10,
        key:API_key,
      },
    });
    console.log(result.data);
    setshowData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredData = showdata.filter(item =>
    item?.AddressInfo?.Town?.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        {/* FAST BADGE */}
        {/* {item.Connections?.[0]?.Level?.IsFastChargeCapable && (
          <View style={styles.fastWrapper}>
            <Text style={styles.fastChip}>⚡ Fast</Text>
          </View>
        )} */}

        {/* TOP ROW */}
        <View style={styles.topRow}>
          <Image source={ChargerImage} style={styles.image} />

          <View style={{ flex: 1 }}>
            {/* TITLE */}
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={2}>
                {item.AddressInfo?.Title || 'Unknown Station'}
              </Text>

              {item.Connections?.[0]?.Level?.IsFastChargeCapable && (
                <View style={styles.fastWrapper}>
                  <Text style={styles.fastChip}>⚡ Fast</Text>
                </View>
              )}
            </View>

            {/* ADDRESS */}
            <Text style={styles.subText}>
              {item.AddressInfo?.AddressLine1 || 'Location not available'}
            </Text>

            {/* LOCATION */}
            <Text style={styles.subText}>
              {item.AddressInfo?.Town ||
                item.AddressInfo?.StateOrProvince ||
                'Unknown'}
            </Text>

            {/* META (STATIC FOR NOW) */}
            <Text style={styles.meta}>⭐ 4.5 / 3 km away</Text>
          </View>
        </View>

        {/* BOTTOM BOX */}
        <View style={styles.bottomBox}>
          {/* CONNECTION TYPE */}
          <View style={styles.boxItem}>
            <Text style={styles.boxTitle}>
              {item.Connections?.[0]?.ConnectionType?.Title?.trim() || 'Type'}
            </Text>
            <Text style={styles.boxSub}>Connection</Text>
          </View>

          {/* COST */}
          <View style={styles.boxItem}>
            <Text style={styles.boxTitle}>{item.UsageCost || '--'}</Text>
            <Text style={styles.boxSub}>Per kWh</Text>
          </View>

          {/* POWER */}
          <View style={[styles.boxItem, { borderRightWidth: 0 }]}>
            <Text style={styles.boxTitle}>
              {item.Connections?.[0]?.PowerKW || '--'} kW
            </Text>
            <Text style={styles.boxSub}>Power</Text>
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ChargingStationDescriptive', { item })
          }
          style={{
            alignSelf: 'center',
            backgroundColor: '#b9cbf2',
            marginTop: 10,
            paddingHorizontal: 110,
            paddingVertical: 2,
            borderRadius: 6,
          }}
        >
          <Text style={styles.link}>Show More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header label="Charging Stations" onBack={() => navigation.goBack()} />

      <View style={{ padding: 10 }}>
        <SearchBar
          value={search}
          onChangeText={(text: string) => {
            setSearch(text);
          }}
        />

        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '50%',
            }}
          >
            <LoadingIndicator size={50} color={Colors.primary} />
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          contentContainerStyle={{
  padding: 12,
  // paddingBottom:150, // ✅ important
}}
ListFooterComponent={<View style={{ height: 150 }} />}
          />
        )}
      </View>
    </View>
  );
};

export default ChargingStations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 3,
    height: 'auto',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontFamily: fontFamilyBold,
    color: '#111',
    flexShrink: 1,
  },

  subText: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },

  meta: {
    fontSize: 12,
    color: '#16A34A',
    marginTop: 4,
  },

  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D6E4FF',
    backgroundColor: '#EEF4FF',
    overflow: 'hidden',
  },

  boxItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#D6E4FF',
  },

  boxTitle: {
    fontSize: Size.sm,
    fontFamily: fontFamilyBold,
    color: '#111',
  },

  boxSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    fontFamily: fontFamily,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  fastWrapper: {
    backgroundColor: '#DCFCE7',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginLeft: 8,
  },

  fastChip: {
    fontSize: 10,
    color: '#16A34A',
    fontFamily: fontFamilyBold,
  },
  link: {
    marginTop: 5,
    color: '#0b54f3',
    fontSize: 13,
    fontFamily: fontFamilyBold,
  },
});
