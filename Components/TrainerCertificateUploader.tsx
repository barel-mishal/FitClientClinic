import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Make sure you have expo vector icons installed
import FileUpload from './FileUploadComponent';
import { DocumentPickerResult } from 'expo-document-picker';
import databaseMethods from '../services/databaseMethods';
import OpenURLButton from './GoToSite';
import MyPDFViewer from './MyPDFViewer';

interface Props {
  onUpload: (url: string) => void;
  certificateUrl?: string;
}

const TrainerCertificateUploader: React.FC<Props> = ({onUpload, certificateUrl}) => {
  const [file, setFile] = useState<DocumentPickerResult | null>(null);
  const [visible, setVisible] = useState(false);

  const getFileName = () => {
      if (certificateUrl) return "View Certificate";
      if (file?.canceled) return "";
      return file?.assets[0].name;
  };

  useEffect(() => {
      if (!file) return;
      databaseMethods.uploadFileAndSaveLink(file).then((uri) => {
        if (!uri) return;
          onUpload(uri);
      }); 
  }, [file]);


return (
  <View style={styles.container}>
    <FileUpload style={styles.uploadButton} onFileUpload={(file) => {
      setFile(file);
    }} >
          <FontAwesome name="upload" size={20} color="#fff" />
          <Text style={styles.uploadButtonText}>Choose File to Upload</Text>
    </FileUpload>
    <Pressable onPress={() => setVisible(true)} >
      <Text style={styles.fileName}>{getFileName()}</Text>
    </Pressable>
    
    <Text style={styles.description}>
      If you haven't obtained a medical certificate yet, you can apply for one online.
    </Text>
    <OpenURLButton url="https://google.com">
      <FontAwesome name="external-link" size={20} color="#0ea5e9" />
      <Text style={styles.linkText}>Apply for a Medical Certificate</Text>
    </OpenURLButton>
      <Modal visible={visible} transparent={true} animationType="slide" style={{position: "relative"}}>
          <Pressable style={{position: "absolute", zIndex:1000, backgroundColor: "#075985", padding: 30, borderRadius: 60, margin: 5, bottom: 0}} onPress={() => setVisible(false)}>
            <FontAwesome name="close" size={30} color="#fff" />
          </Pressable>
          <MyPDFViewer uri={certificateUrl} key={"google"} />
      </Modal>
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
  fileName: {
    fontSize: 20,
    color: "#082f49",
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 15,
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

export default TrainerCertificateUploader;
