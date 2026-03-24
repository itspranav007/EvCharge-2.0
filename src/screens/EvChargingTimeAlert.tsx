import {
  Alert,
  Image,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Header, Icon, TextInput } from '../components';
import { Colors, fontFamilyBold } from '../modules/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated, Easing } from 'react-native';

const evcarlog = require('../assets/images/evcar.png');

const STORAGE_KEY = 'timerAlert';
const { AlarmModule } = NativeModules;

const EvChargingTimeAlert = () => {
  const intervalRef = useRef<any>(null);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [remainingTime, setRemainingTime] = useState('00:00:00');
  const [haserror, seterror] = useState(false);

  const [progressbar, setprogress] = useState(0);

  // 🚀 START TIMER

  const startTimer = async () => {
    // ✅ clear old timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setRemainingTime('00:00:00'); // reset UI

    const totalMinutes = Number(hours) * 60 + Number(minutes);

    if (isNaN(totalMinutes) || totalMinutes <= 0) {
      // seterrormsg('Enter valid hours ');
      seterror(true);
      return;
    }

    if (totalMinutes <= 0.2) {
      // setRemainingTime('Time Completed');
      // seterrormsg('Enter valid Minutes');
      seterror(true);

      return;
    }
    seterror(false);
    const endTime = Date.now() + totalMinutes * 60 * 1000;

    const data = {
      startTime: Date.now(),
      endTime,
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    AlarmModule.showChargingNotification();
    AlarmModule.setAlarm(endTime);

    // ✅ start new interval
    intervalRef.current = setInterval(() => {
      updateTimer(data);
    }, 1000);

    updateTimer(data);
  };

  const resetTimer = async () => {
    seterror(false);

    setRemainingTime('00:00:00'); // reset UI

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    await AsyncStorage.removeItem(STORAGE_KEY);
    AlarmModule.stopAlarm();
  };

  // 🔥 COUNTDOWN LOGI
  const updateTimer = (data: any) => {
    const now = Date.now();
    const remainingMs = data.endTime - now;

    if (remainingMs <= 0) {
      setRemainingTime('00:00:00');

      // ✅ stop interval when done
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      return;
    }

    const totalSeconds = Math.floor(remainingMs / 1000);

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    let timeString = '';

    if (hrs > 0) {
      timeString = `${hrs}:${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    } else if (mins > 0) {
      timeString = `${mins}:${secs.toString().padStart(2, '0')}s`;
    } else {
      timeString = `${secs}s`;
    }

    setRemainingTime(timeString);

    const total = data.endTime - data.startTime;
    const progress = ((total - remainingMs) / total) * 100;

    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 800,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const shineAnim = useRef(new Animated.Value(0)).current;

  // 🔄 LOAD + LIVE UPDATE
  useEffect(() => {
    // 🔥 START SHINE ANIMATION
    Animated.loop(
      Animated.timing(shineAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();

    // 🔄 LOAD TIMER
    const init = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        const data = JSON.parse(stored);

        updateTimer(data);

        intervalRef.current = setInterval(() => {
          updateTimer(data);
        }, 1000);
      }
    };

    init();

    // 🧹 CLEANUP
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const translateX = shineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 300],
  });

  return (
    <View style={styles.container}>
      <Header label="Charge Time Alert" />

      <View style={styles.content}>
        <View style={{ width: '100%', height: 210, alignItems: 'center', backgroundColor: Colors.lGreen ,borderRadius:16}}>
         
          <Image
            source={evcarlog}
            style={{ width: '100%', height: 210, resizeMode: 'contain' }}
          />
        </View>

        {/* <Text style={styles.label}>Enter time for charging Alert</Text> */}

        <View style={styles.row}>
          <TextInput
            label="Hours"
            value={hours}
            placeholder="1"
            onChangeText={setHours}
            keyboardType="numeric"
            style={styles.input}
            maxLength={2}
            error={haserror}
            errorMessage={'Enter valid hours'}
          />

          <TextInput
            label="Minutes"
            value={minutes}
            placeholder="30"
            onChangeText={setMinutes}
            keyboardType="numeric"
            style={styles.input}
            maxLength={3}
            error={haserror}
            errorMessage={'Enter valid minutes'}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={resetTimer}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>{' '}
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.buttonText}>Start Timer</Text>
          </TouchableOpacity>
        </View>

        {/* Countdown */}
        {remainingTime !== 'Set Timer' && (
          <View style={styles.resultBox}>
            {/* Battery Header */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // gap: 10,
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Icon
                name={'electrical-services'}
                type={'MaterialIcons'}
                size={40}
                color={Colors.primary2}
              />
              <Text style={styles.chargeTitle}>Charging In Progress..</Text>
            </View>

            {/* Timer */}
            <Text style={styles.timerText}>{remainingTime}</Text>

            {/* Battery Bar */}

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <View style={styles.batteryContainer}>
                {/* 🔋 Battery Fill */}
                <Animated.View
                  style={[
                    styles.batteryFill,
                    {
                      width: animatedWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['5%', '110%'],
                      }),
                    },
                  ]}
                >
                  <Icon
                    name={'electric-bolt'}
                    type={'MaterialIcons'}
                    size={30}
                    color={'gold'}
                    style={{marginTop:20}}
                  />

                  {/* <View
                    style={{ width: 10, height: 10, backgroundColor: 'red',
                        alignItems: 'center',
                        marginTop:20

                     }}
                  /> */}
                </Animated.View>
              </View>
              <View
                style={{
                  backgroundColor: 'black',
                  width: 10,
                  height: 35,
                  alignSelf: 'center',
                  marginTop: 15,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default EvChargingTimeAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  shine: {
    position: 'absolute',
    width: 40,
    height: '100%',
    backgroundColor: 'red',
    left: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  input: {
    width: 150,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#16A34A',
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontFamilyBold,
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontFamily: fontFamilyBold,
    marginTop: 20,
  },
  resultBox: {
    marginTop: 25,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#ECECEC', // ✅ EV green
    elevation: 10,
    height: '40%',
    borderColor: '#9e9e9e',
    borderWidth: 1,
  },

  chargeTitle: {
    color: Colors.primary2,
    fontSize: 20,
    marginBottom: 10,
    fontFamily: fontFamilyBold,
    marginTop: 0,
    alignSelf: 'center',
  },

  timerText: {
    fontSize: 50,
    color: Colors.primary,
    fontFamily: fontFamilyBold,
  },

  batteryContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#fed7d7', // lighter gray
    borderRadius: 12,
    marginTop: 15,
    overflow: 'hidden',
    borderColor: '#9e9e9e',
    borderWidth: 2,
  },

  batteryFill: {
    height: '100%',
    backgroundColor: '#22c55e', // brighter green
   
    borderTopRightRadius:14,
    borderBottomRightRadius:14,
  },
});
