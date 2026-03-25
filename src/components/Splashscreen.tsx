import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Colors, fontFamily,fontFamilyBold } from '../modules/themes';


interface SplashscreenProps {
  Logoimage: ImageSourcePropType;
  time?: number;
  screenname: string;
  title?: string;
  Subtitle?: string;
  Backgroundimage: any;
}

const Splashscreen: React.FC<SplashscreenProps> = ({
  Logoimage,
  time = 2000,
  screenname,
  title,
  Subtitle,
  Backgroundimage,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigation.replace(screenname);
    }, time);

    return () => clearTimeout(timer);
  }, [navigation, screenname, time]);

  return (
    <View style={styles.container}>
     
        {/* Dark overlay */}
       
          <View style={styles.centerContent}>
          
            <Image source={Logoimage} resizeMode="cover" style={styles.image} height={400} width={390} />
              <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{Subtitle}</Text>
          </View>
          
            
    
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.background, // ✅ Dark background 
  },
 
  
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom:20,
    // backgroundColor:'red'
    
   
  },
  title: {
    fontSize:50,
    color: Colors.primary, // ✅ Dark background, white text
    fontFamily: fontFamilyBold,
    letterSpacing: 1,
  
  },
  subtitle: {
    fontSize: 17,
    color: Colors.text,
    marginTop: 5,
    fontFamily,
    letterSpacing: 0.5,
  },
});
