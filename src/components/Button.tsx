// import React, {ReactNode} from 'react';
// import {
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TouchableOpacityProps,
//   GestureResponderEvent,
//   TextStyle,
//   ActivityIndicator,
//   TextProps,
// } from 'react-native';
// import {Size, useTheme} from '../modules';
// import Animated, {SlideInRight, SlideOutRight} from 'react-native-reanimated';

// interface ButtonProps extends TouchableOpacityProps {
//   label: string;
//   onPress: (event: GestureResponderEvent) => void;
//   labelStyle?: TextStyle;
//   loading?: boolean;
//   disable?: boolean;
//   RightChild?: ReactNode;
//   labelProps?: TextProps;
//   loaderColor?: string;
// }
// const Button: React.FC<ButtonProps> = ({
//   label = 'Button',
//   onPress,
//   style,
//   disable,
//   loading,
//   labelStyle,
//   RightChild,
//   labelProps,
//   loaderColor,
//   ...rest
// }) => {
//   const colors = useTheme();
//   return (
//     <TouchableOpacity
//       style={[
//         {
//           height: 48,
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'row',
//           borderRadius: 8,
//           gap: 10,
//           backgroundColor: colors.primary2,
//         },
//         style,
//       ]}
//       onPress={onPress}
//       disabled={disable || loading}
//       {...rest}>
//       <Text
//         style={[
//           {
//             fontFamily: 'SF Pro Text',
//             fontWeight: 500,
//             fontSize: 16,
//             lineHeight: 24,
//             flex: 1,
//             textAlign: 'center',
//             color: '#FFF',
//           },
//           labelStyle,
//         ]}
//         {...labelProps}>
//         {'' + label}
//       </Text>
//       {RightChild ? (
//         <Animated.View
//           entering={SlideInRight.duration(300)}
//           exiting={SlideOutRight.duration(300)}>
//           {RightChild}
//         </Animated.View>
//       ) : null}
//       {loading ? (
//         <Animated.View
//           style={{position: 'absolute', right: Size.padding}}
//           entering={SlideInRight.duration(300)}
//           exiting={SlideOutRight.duration(300)}>
//           <ActivityIndicator
//             color={loaderColor ? loaderColor : colors.background}
//           />
//         </Animated.View>
//       ) : null}
//     </TouchableOpacity>
//   );
// };
// export default Button;
// const styles = StyleSheet.create({
//   _label: {
//     flex: 1,
//     // lineHeight: Size.button,
//     // height: Size.button,
//     textAlign: 'center',
//     fontSize: Size.lg,
//     letterSpacing: 0.89,
//   },
//   _button: {
//     flexDirection: 'row',
//     // height: Size.button,
//     alignSelf: 'stretch',
//     alignItems: 'center',
//     padding: Size.padding,
//     borderRadius: Size.padding,
//   },
// });
