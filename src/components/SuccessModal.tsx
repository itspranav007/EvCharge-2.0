// import React from 'react';
// import { Modal, View, StyleSheet, SafeAreaView, Dimensions, Text } from 'react-native';
// import LottieView from 'lottie-react-native';

// const { width } = Dimensions.get('window');

// interface SuccessModalProps {
//   visible: boolean;
//   message: string;
//   onClose?: () => void;
// }

// const SuccessModal: React.FC<SuccessModalProps> = ({ visible, message, onClose }) => {
//   return (
//     <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
//       <SafeAreaView style={styles.overlay}>
//         <View style={styles.card}>
//           {/* Lottie Animation */}
//           <View style={styles.animationContainer}>
//             <LottieView
//               source={require('../assets/svg/successfully-done.json')}
//               autoPlay
//               loop={false}
//               style={styles.animation}
//             />
//           </View>
          
//           <Text style={styles.title}>OTP Verified Successfully!</Text>
//           <Text style={styles.message}>{message}</Text>
          
          
//         </View>
//       </SafeAreaView>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 12,
//     width: width * 0.8,
//     alignItems: 'center',
//   },
//   animationContainer: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   animation: {
//     width: '100%',
//     height: '100%',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   message: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 24,
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 24,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default SuccessModal;