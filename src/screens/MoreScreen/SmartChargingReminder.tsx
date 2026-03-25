import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Image 
} from 'react-native'
import React from 'react'
import { Header } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { fontFamily } from '../../modules'
import { Colors, fontFamilyBold } from '../../modules/themes'

const nightimage = require('../../assets/images/nightImage.jpg')
const morningImage = require('../../assets/images/morningImage.jpg')
const afternoon = require('../../assets/images/afternoonImage.jpg')
const eveningImage = require('../../assets/images/eveningImage.jpg')
const office = require('../../assets/images/nightImage2.jpg')

const SmartChargingReminder = () => {

  const navigation = useNavigation();

  const Data = [
    {
      title: "Night Saver",
      time: "11:00 PM – 6:00 AM",
      benefit: "Lowest electricity cost (off-peak)",
      bestfor: "Home charging",
      tag: "Save Money",
      color: "#2E7D32",
      image: nightimage,
    },
    {
      title: "Early Morning",
      time: "5:00 AM – 8:00 AM",
      benefit: "Cool temperature charging",
      bestfor: "Daily use",
      tag: "Battery Safe",
      color: "#0288D1",
      image: morningImage,
    },
    {
      title: "Office Slot",
      time: "10:00 AM – 1:00 PM",
      benefit: "Use office power",
      bestfor: "Office users",
      tag: "Office Use",
      color: "#F9A825",
      image: office,
    },
    {
      title: "Solar Boost",
      time: "1:00 PM – 4:00 PM",
      benefit: "Best for solar homes",
      bestfor: "Solar charging",
      tag: "Free Energy",
      color: "#EF6C00",
      image: afternoon,
    },
    {
      title: "Evening Quick",
      time: "7:00 PM – 9:00 PM",
      benefit: "Quick Emergency charge",
      bestfor: "Urgent need",
      tag: "Fast Use",
      color: "#C62828",
      image: eveningImage,
    },
  ]

  const handleReminder = (item: any) => {
    console.log('Reminder set for:', item.title)
  }

  return (
    <View style={styles.container}>

      <Header 
        label={'Smart Charging Reminder'} 
        onBack={() => navigation.goBack()} 
      />

      <ScrollView 
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {Data.map((item, index) => (
          <View key={index} style={styles.card}>

            <View style={styles.rowMain}>

              {/* Image */}
              <Image source={item.image} style={styles.image} />

              {/* Content */}
              <View style={styles.content}>

                {/* Title + Tag */}
                <View style={styles.row}>
                  <Text style={styles.title}>{item.title}</Text>

                  <View style={[styles.tag, { backgroundColor: item.color + '30' }]}>
                    <Text style={[styles.tagText, { color: item.color }]}>
                      {item.tag}
                    </Text>
                  </View>
                </View>

                <Text style={styles.text}>⏰ {item.time}</Text>
                <Text style={styles.text}>⚡ {item.benefit}</Text>
                <Text style={styles.text}>🚗 {item.bestfor}</Text>

              </View>

            </View>

            {/* Button */}
            <TouchableOpacity 
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => handleReminder(item)}
            >
              <Text style={styles.buttonText}>Remind Me</Text>
            </TouchableOpacity>

          </View>
        ))}

      </ScrollView>
    </View>
  )
}

export default SmartChargingReminder

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  scroll: {
    padding: 16,
  },

  card: {
    marginBottom: 16,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,

    borderWidth: 1,
    borderColor: '#EAEAEA',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    elevation: 2,
  },

  rowMain: {
    flexDirection: 'row',
  },

  image: {
    height: 90,
    width: 90,
    borderRadius: 12,
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    justifyContent:"space-evenly",
    width:250,
  },

  title: {
    color: '#111',
    fontSize: 15,
    fontFamily: fontFamilyBold,
  },

  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },

  tagText: {
    fontSize:10,
    fontFamily: fontFamily,

  },

  text: {
    color: '#666',
    marginTop: 4,
    fontFamily: fontFamily,
    fontSize: 13,
  },

  button: {
    backgroundColor: Colors.primary,
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontFamily: fontFamilyBold,
    fontSize: 14,
  },

})