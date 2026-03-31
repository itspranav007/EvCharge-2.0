import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing, Image} from 'react-native';
import {useTheme} from '../modules';
import {  Colors } from '../modules/themes';


interface LoadingIndicatorProps {
  size?: number;
  color?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 50,
  color = Colors.primary,
}) => {
  const colors = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dotSize = size * 0.15;
  const radius = size / 2;

  const dots = Array.from({length: 8});

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          width: size,
          height: size,
          transform: [{rotate}],
        }}>
        {dots.map((_, index) => {
          const angle = (index * 360) / dots.length;
          const rad = (angle * Math.PI) / 180;

          const x = radius + radius * 0.75 * Math.cos(rad) - dotSize / 2;
          const y = radius + radius * 0.75 * Math.sin(rad) - dotSize / 2;

          return (
            <View
              key={index}
              style={{
                position: 'absolute',
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize,
                backgroundColor: color || colors.primary,
                left: x,
                top: y,
                opacity: 0.3 + (index / dots.length),
              }}
            >
      
     </View>
          );
        })}
      </Animated.View>
         
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex:1
  },
});

export default LoadingIndicator;
