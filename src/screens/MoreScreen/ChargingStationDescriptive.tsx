import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../../components';
import { fontFamily } from '../../modules';
import { fontFamilyBold, Size } from '../../modules/themes';

const Colors = {
  bg: '#f5f5f5',
  card: '#ffffff',
  text: '#111827',
  subText: '#6b7280',
  primary: '#22c55e',
  border: '#e5e7eb',
};

const FontFamily = 'Poppins-Regular';
const FontFamilyBold = 'Poppins-Bold';

const ChargingStationDescriptive = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { item } = route.params as { item: any };

  const openMap = () => {
    const lat = item?.AddressInfo?.Latitude;
    const lng = item?.AddressInfo?.Longitude;

    if (lat && lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        label="Charging Station Details"
        onBack={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= TOP CARD ================= */}
        <View style={styles.topCard}>
          <View
            style={{
              backgroundColor: item?.StatusType?.IsOperational
                ? '#6bca62f3'
                : '#f44b4bf3',
              alignSelf: 'flex-end',
              paddingHorizontal: 8,
              paddingVertical: 1,
              borderRadius: 10,
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  // color: item?.StatusType?.IsOperational ? 'green' : 'red',
                  color: '#fff',
                  fontSize: Size.sm,
                  textAlign: 'right',
                },
              ]}
            >
              {item?.StatusType?.IsOperational
                ? 'Operational'
                : 'Not Operational'}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Icon
              name="ev-station"
              size={25}
              color={Colors.primary}
              type="MaterialIcons"
            />
            <Text style={styles.title}>
              {item?.AddressInfo?.Title || item?.Title || 'Station Name'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              flexWrap: 'wrap',
            }}
          >
            <Icon
              name="location-on"
              size={20}
              color={'red'}
              type="MaterialIcons"
            />

            <Text style={styles.address}>
              {item?.AddressInfo?.AddressLine1 || 'Location not available'}
            </Text>
            <Text style={styles.address}>
              {item?.AddressInfo?.AddressLine2 || 'Location not available'}
            </Text>
            <Text style={styles.address}>{item?.AddressInfo?.Town},</Text>
            <Text style={styles.address}>
              {item?.AddressInfo?.Country?.Title}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.ratingRow}>
              <Icon name="star" size={18} color="gold" />
              <Icon name="star" size={18} color="gold" />
              <Icon name="star" size={18} color="gold" />
              <Icon name="star-half" size={18} color="gold" />
            </View>

            <TouchableOpacity style={styles.callBtn}>
              <Icon name="phone" size={20} color={'white'} type="FontAwesome" />

              <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= CONNECTOR CARD ================= */}
        <View style={styles.card}>

  {/* 🔌 Connector Type */}
  <View style={styles.row}>
    <Text style={styles.label}>Connector Type:</Text>
    <Text style={styles.value}>
      {item?.Connections?.[0]?.ConnectionType?.Title?.trim() || 'N/A'}
    </Text>
  </View>

  {/* ⚡ Power */}
  <View style={styles.row}>
    <Text style={styles.label}>Capacity:</Text>
    <Text style={styles.value}>
      {item?.Connections?.[0]?.PowerKW || '--'} kW
    </Text>
  </View>

  {/* 🔋 Current Type */}
  <View style={styles.row}>
    <Text style={styles.label}>Current Type:</Text>
    <Text style={styles.value}>
      {item?.Connections?.[0]?.CurrentType?.Title || 'N/A'}
    </Text>
  </View>

  {/* 🚀 Charger Level */}
  <View style={styles.row}>
    <Text style={styles.label}>Charger Type:</Text>
    <Text style={styles.value}>
      {item?.Connections?.[0]?.Level?.Title || 'N/A'}
    </Text>
  </View>

  {/* ⚡ Fast Charging */}
  <View style={styles.row}>
    <Text style={styles.label}>Fast Charging:</Text>
    <Text style={styles.value}>
      {item?.Connections?.[0]?.Level?.IsFastChargeCapable ? 'Yes' : 'No'}
    </Text>
  </View>

  {/* 🔢 Ports */}
  <View style={styles.row}>
    <Text style={styles.label}>Number of Points:</Text>
    <Text style={styles.value}>
      {item?.Connections?.[0]?.Quantity || item?.NumberOfPoints || '1'}
    </Text>
  </View>

  {/* ✅ Status */}
  {/* <View style={styles.row}>
    <Text style={styles.label}>Status:</Text>
    <Text style={[styles.value, { color: '#22c55e' }]}>
      {item?.Connections?.[0]?.StatusType?.Title || 'Unknown'}
    </Text>
  </View> */}

  {/* 📝 Comments */}
  <View style={styles.row}>
    <Text style={styles.label}>Notes:</Text>
    <Text style={styles.value}>
      {item?.Connections?.[0]?.Comments || 'No info'}
    </Text>
  </View>

  {/* 💰 Charging Price */}
  <View style={styles.row}>
    <Text style={styles.label}>Charging Price:</Text>
    <Text style={styles.value}>
      {item?.UsageCost || 'Not available'}
    </Text>
  </View>

  {/* 🚗 Parking */}
  <View style={styles.row}>
    <Text style={styles.label}>Parking Price:</Text>
    <Text style={styles.value}>Free / Unknown</Text>
  </View>

</View>

        {/* ================= Owner Info CARD ================= */}
        <View style={styles.card}>
          <Text style={styles.label}>Operator Information </Text>

          {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5  , }}>
            <Icon
              name="power"
              size={20}
              color={Colors.primary}
              type="MaterialIcons"
            />
            <Text style={styles.label}>Operator Info</Text>
          <Text style={styles.value}>
            {item?.Connections?.[0]?.ConnectionType?.Title?.trim() ||
              'AC Type 2'}
          </Text>

          </View> */}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={styles.label}>Operator Info :</Text>
            <Text style={styles.value}>
              {item?.OperatorInfo?.Title || '--'}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={styles.label}>Charger Type:</Text>
            <Text style={styles.value}>
              {item?.OperatorInfo?.WebsiteURL || ' No Website Available '}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>
              {item?.OperatorInfo?.PhonePrimaryContact || ' Not Available '}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>
              {item?.OperatorInfo?.PhoneSecondaryContact || ' Not Available '}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.value}>
              {item?.OperatorInfo?.ContactEmail || ' No Email Available '}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={styles.label}>Booking URL:</Text>
            <Text style={styles.value}>
              {item?.OperatorInfo?.BookingURL || ' -- '}
            </Text>
          </View>
        </View>

        {/* ================= ESTIMATE CARD ================= */}
        {/* <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Enter Amount</Text>
            <Text style={styles.clear}>Clear</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.label}>Charging Estimate</Text>
          <Text style={styles.value}>
            {item?.Connections?.[0]?.PowerKW || '--'} kW
          </Text>

          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>-- mins</Text>

          <Text style={styles.label}>Units:</Text>
          <Text style={styles.value}>-- kWh</Text>
        </View> */}

        {/* ================= BUTTON ================= */}
        {/* <TouchableOpacity style={styles.button} onPress={openMap}>
          <Icon name="directions" size={22} color="#fff" />
          <Text style={styles.buttonText}>Get Direction</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={openMap}>
          <Icon name="directions" size={22} color="#fff" />
          <Text style={styles.buttonText}>Get Direction</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChargingStationDescriptive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  topCard: {
    backgroundColor: Colors.card,
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },

  title: {
    fontSize:20,
    fontFamily: fontFamilyBold,
    color: Colors.text,
    
  },

  address: {
    fontSize:14,
    color: Colors.subText,
    marginTop: -10,
    fontFamily: fontFamily,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  ratingRow: {
    flexDirection: 'row',
  },

  callBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  callText: {
    color: '#fff',
    fontFamily: fontFamilyBold,
    fontSize: Size.md,
    textAlign: 'center',
  },

  card: {
    backgroundColor: Colors.card,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
  },
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  // marginBottom: 12,
},
  label: {
    color: '#0000',
    fontSize: Size.md,
    // marginTop: 10,
    fontFamily: fontFamilyBold,
    flex: 1,
    textAlign: 'left',
  },

  value: {
    color: Colors.text,
    fontSize: Size.md,
    fontFamily: fontFamily,
    marginTop: 11,
    textAlign: 'right',
    flex: 1,
  },

  sectionTitle: {
    fontFamily: fontFamilyBold,
    color: Colors.text,
  },

  clear: {
    color: 'red',
    fontFamily: fontFamily,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },

  button: {
    margin: 20,
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontFamily: fontFamilyBold,
  },
});
