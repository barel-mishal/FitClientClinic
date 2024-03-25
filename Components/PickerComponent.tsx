import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface Option {
    label: string;
    value: string;
}

interface CustomSelectInputProps {
    options: Option[];
    onSelect: (option: Option) => void;
    selected: null | string;
}

const CustomSelectInput: React.FC<CustomSelectInputProps> = ({ options, onSelect, selected }) => {
  const [visible, setVisible] = useState(false);
  const [select, setSelected] = useState<string | null>(selected);

  const handleSelect = (option: Option) => {
    onSelect(option);
    setVisible(false);
    setSelected(option.label);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.button}>
        <Text style={{ color: '#bae6fd',}}>{select || 'Select an option'}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent={true} animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <ScrollView>
              {options.map((option, index) => (
                <TouchableOpacity key={index} onPress={() => handleSelect(option)} style={styles.option}>
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#082f49',
    alignItems: 'center',
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    maxHeight: '80%',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
});

export default CustomSelectInput;
