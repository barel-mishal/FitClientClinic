import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { getDocumentAsync } from 'expo-document-picker';
import { FontAwesome } from '@expo/vector-icons'; // Make sure you have expo vector icons installed
import OpenURLButton from './GoToSite';

const MedicalCertificateUploader = () => {
  const handleFileUpload = async () => {
    try {
      const file = await getDocumentAsync({
        type: 'application/pdf', // Specify any file type requirements here
        copyToCacheDirectory: false,
      });
      // TODO: Implement file upload logic
      console.log(JSON.stringify({file}, null, 2));
    } catch (error) {
      // TODO: Implement user feedback for the error
      console.error('Error picking file', error);
    }
  };

  const handleOpenURL = async (url: string) => {
    // TODO: Implement link opening logic
    console.log(`Open URL: ${url}`);
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
        <FontAwesome name="upload" size={20} color="#fff" />
        <Text style={styles.uploadButtonText}>Choose File to Upload</Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        If you haven't obtained a medical certificate yet, you can apply for one online.
      </Text>
      <OpenURLButton url="https://google.com">
        <FontAwesome name="external-link" size={20} color="#0ea5e9" />
        <Text style={styles.linkText}>Apply for a Medical Certificate</Text>
    </OpenURLButton>
      <TouchableOpacity style={styles.linkButton} onPress={() => handleOpenURL('https://google.com')}>
        
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: "solid",
    padding: 20,
    borderRadius: 20,
    borderColor: "rgba(8, 47, 73, 0.3)",
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#075985",
    marginBottom: 15,
    textAlign: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    color: "#0369a1",
    marginBottom: 15,
    textAlign: 'center',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    color: '#0ea5e9',
    fontSize: 18,
    textDecorationLine: "underline",
    marginLeft: 10,
  },
});

export default MedicalCertificateUploader;
