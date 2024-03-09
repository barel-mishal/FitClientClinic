import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Option {
    label: string;
    value: string;
}

interface RadioButtonProps {
    options: Option[];
    onPress: (value: string) => void;
    val?: string | null;
}

const RadioButton: React.FC<RadioButtonProps> = ({ options, onPress, val = null }) => {
  const [value, setValue] = useState<string | null>(val);

  return (
    <>
      {options.map((item) => (
        <TouchableOpacity
          key={item.value}
          style={styles.radioContainer}
          onPress={() => {
            setValue(item.value);
            onPress(item.value);
          }}
        >
          <View style={[styles.outerCircle, value === item.value && styles.selectedOuterCircle]}>
            {value === item.value && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedOuterCircle: {
    borderColor: 'blue',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
  },
  label: {
    fontSize: 16,
  },
});

export default RadioButton;
