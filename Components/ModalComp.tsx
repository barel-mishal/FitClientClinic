import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ModalComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
  
    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{backgroundColor: 'white', padding: 20}}>
              <Text>Hello World!</Text>
              <Button title="Hide Modal" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
  
        <Button title="Show Modal" onPress={() => setModalVisible(true)} />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  centeredView: {
    zIndex: 10000,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalComponent;
