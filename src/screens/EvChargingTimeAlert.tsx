import {
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState,useRef  } from 'react';
import { Header, TextInput } from '../components';
import { fontFamilyBold } from '../modules/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'timerAlert';
const { AlarmModule } = NativeModules;




const EvChargingTimeAlert = () => {
    const intervalRef = useRef<any>(null);

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [remainingTime, setRemainingTime] = useState('');

  // 🚀 START TIMER

const startTimer = async () => {
  // ✅ clear old timer
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  setRemainingTime(''); // reset UI

  const totalMinutes = Number(hours) * 60 + Number(minutes);

  if (isNaN(totalMinutes) || totalMinutes <= 0) {
    alert('Enter valid time');
    return;
  }


  if (totalMinutes <= 0.2) {
    setRemainingTime('Time Completed');
    return;
  }

  const endTime = Date.now() + totalMinutes * 60 * 1000;

  const data = { endTime };

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
AlarmModule.showChargingNotification();
  AlarmModule.setAlarm(endTime);


  // ✅ start new interval
  intervalRef.current = setInterval(() => {
    updateTimer(data);
  }, 1000);

  updateTimer(data);
};

  // 🔥 COUNTDOWN LOGI
const updateTimer = (data: any) => {
  const now = Date.now();
  const remainingMs = data.endTime - now;

  if (remainingMs <= 0) {
    setRemainingTime('Time Completed');

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
    timeString = `${hrs}h ${mins}m ${secs}s`;
  } else if (mins > 0) {
    timeString = `${mins}m ${secs}s`;
  } else {
    timeString = `${secs}s`;
  }

  setRemainingTime(timeString);
};

  // 🔄 LOAD + LIVE UPDATE
useEffect(() => {
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

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, []);

  return (
    <View style={styles.container}>
      <Header label="Charge Time Alert" />

      <View style={styles.content}>

        <View style={styles.row}>
          <TextInput
            label="Hours"
            value={hours}
            placeholder="1"
            onChangeText={setHours}
            keyboardType="numeric"
            style={styles.input}
             maxLength={2}

          />

          <TextInput
            label="Minutes"
            value={minutes}
            placeholder="30"
            onChangeText={setMinutes}
            keyboardType="numeric"
            style={styles.input}
              maxLength={3}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={startTimer}>
          <Text style={styles.buttonText}>Start Timer</Text>
        </TouchableOpacity>

        {/* Countdown */}
        {remainingTime !== '' && (
          <View style={styles.resultBox}>
            <Text style={styles.timerText}>
              {remainingTime}
            </Text>
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
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  input: {
    width: 150,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#16A34A',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontFamilyBold,
  },
  resultBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 22,
    fontFamily: fontFamilyBold,
  },
});

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
