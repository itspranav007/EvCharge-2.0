import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { api } from '../../modules/services'

const ServiceCenter = () => {

  const navigation = useNavigation();
  const [showdata, setshowData] = useState([]);

  const getData = async () => {

  const result = await api.get(
  "https://api.openchargemap.io/v3/poi/",
  {
    params: {
      output: "json",
      countrycode: "IN",
      maxresults: 10,
      key: "c33a04c0-edd2-4399-a302-f49d730e9796"
    }
  }
);

console.log(result.data)

setshowData(result.data)
  }

  useEffect(() => {
    getData();
  }, []) // ✅ FIXED (runs only once)

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>
          {item.AddressInfo?.Title || "Charging Station"}
        </Text>

        <Text style={styles.text}>
          {item.AddressInfo?.AddressLine1}
        </Text>

        <Text style={styles.text}>
          {item.AddressInfo?.Town}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <Header 
        label="Near Service Center"  
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={showdata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

    </View>
  )
}

export default ServiceCenter

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#EAEAEA',

    elevation: 2,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },

  text: {
    fontSize: 13,
    color: '#666',
  }

})