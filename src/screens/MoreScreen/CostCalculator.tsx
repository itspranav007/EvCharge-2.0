import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Header, TextInput } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { Colors, fontFamilyBold } from '../../modules/themes';

const CostCalculator = () => {
  const navigation = useNavigation();

  const [batteryCapacity, setBatteryCapacity] = React.useState('');
  const [currentCharge, setCurrentCharge] = React.useState('');
  const [targetCharge, setTargetCharge] = React.useState('');
  const [costPerKWh, setCostPerKWh] = React.useState('');
 const [chargerType, setChargerType] = React.useState<'slow' | 'fast'>('slow');

  const [estimatedCost, setEstimatedCost] = React.useState(0);
  const [chargingTime, setChargingTime] = React.useState('');

  const [error, setError] = React.useState('');

  // ---------------- CLEAN INPUT ----------------
  const cleanInput = (text: string) => text.replace(/[^0-9.]/g, '');

  // ---------------- FORMAT TIME ----------------
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0 min';

    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);

    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} hr`;

    return `${hours} hr ${minutes} min`;
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const capacity = parseFloat(batteryCapacity);
    const current = parseFloat(currentCharge);
    const target = parseFloat(targetCharge);
    const price = parseFloat(costPerKWh);

    if (
      batteryCapacity === '' ||
      currentCharge === '' ||
      targetCharge === '' ||
      costPerKWh === ''
    ) {
      return 'All fields are required';
    }

    if (
      isNaN(capacity) ||
      isNaN(current) ||
      isNaN(target) ||
      isNaN(price)
    ) {
      return 'Enter valid numbers only';
    }

    if (capacity <= 0) {
      return 'Battery capacity must be greater than 0';
    }

    if (current < 0 || current > 100) {
      return 'Current charge must be between 0–100%';
    }

    if (target <= current || target > 100) {
      return 'Target must be greater than current and ≤ 100%';
    }

    if (price <= 0) {
      return 'Cost must be greater than 0';
    }

    return null;
  };

  // ---------------- CALCULATE ----------------
  const calculate = () => {
    const errorMsg = validate();

    if (errorMsg) {
      setError(errorMsg);
      setEstimatedCost(0);
      setChargingTime('');
      return;
    }

    setError('');

    const capacity = parseFloat(batteryCapacity);
    const current = parseFloat(currentCharge);
    const target = parseFloat(targetCharge);
    const price = parseFloat(costPerKWh);

    const efficiency = 0.9;

//   let chargerPower ;

// if (capacity < 5) {
//   chargerPower = 0.4; // scooter
// } else {
//   chargerPower = 7; // car
// }

    const energyNeeded = (capacity * (target - current)) / 100;
    const adjustedEnergy = energyNeeded / efficiency;

    const cost = adjustedEnergy * price;
    // const time = adjustedEnergy / chargerPower;

    setEstimatedCost(Number(cost.toFixed(2)));
    // setChargingTime(formatTime(time));
  };

  return (
    <View>
      <Header
        label="EV Charging Calculator"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <TextInput
          label="Battery Capacity (kWh)"
          placeholder="e.g. 40"
          value={batteryCapacity}
          onChangeText={(t) => setBatteryCapacity(cleanInput(t))}
          keyboardType="numeric"
        />

        <TextInput
          label="Current Charge (%)"
          placeholder="e.g. 20"
          value={currentCharge}
          onChangeText={(t) => setCurrentCharge(cleanInput(t))}
          keyboardType="numeric"
        />

        <TextInput
          label="Target Charge (%)"
          placeholder="e.g. 80"
          value={targetCharge}
          onChangeText={(t) => setTargetCharge(cleanInput(t))}
          keyboardType="numeric"
        />

        <TextInput
          label="Cost per kWh (₹)"
          placeholder="e.g. 10"
          value={costPerKWh}
          onChangeText={(t) => setCostPerKWh(cleanInput(t))}
          keyboardType="numeric"
        />

        {/* Charger Type */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              chargerType === 'slow' && styles.active,
            ]}
            onPress={() => setChargerType('slow')}
          >
            <Text style={styles.toggleText}>Slow</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              chargerType === 'fast' && styles.active,
            ]}
            onPress={() => setChargerType('fast')}
          >
            <Text style={styles.toggleText}>Fast</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={calculate}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            Estimated Cost: ₹ {estimatedCost}
          </Text>

          {/* <Text style={styles.resultText}>
            Charging Time: {chargingTime}
          </Text> */}
        </View>
      </View>
    </View>
  );
};

export default CostCalculator;

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: fontFamilyBold,
  },
  error: {
    color: 'red',
  },
  resultBox: {
    marginTop: 15,
  },
  resultText: {
    fontFamily: fontFamilyBold,
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleBtn: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    borderRadius: 5,
  },
  active: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    color: 'black',
  },
});