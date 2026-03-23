
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, fontFamily } from './src/modules/themes'
import { Icon } from './src/components'
import Navigation from './src/routes/Navigation'
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {

  return (
          <SafeAreaView style={{ flex: 1 }}>
      <Navigation/>
 </SafeAreaView>

      )
}

export default App

const styles = StyleSheet.create({})