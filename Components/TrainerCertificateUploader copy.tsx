import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Make sure you have expo vector icons installed
import OpenURLButton from './GoToSite';
import FileUpload from './FileUploadComponent';
import { DocumentPickerResult } from 'expo-document-picker';
import databaseMethods from '../services/databaseMethods';

interface Props {
  onUpload: (url: string) => void;
}

const TrainerCertificateUploader: React.FC<Props> = ({onUpload}) => {
    const [file, setFile] = useState<DocumentPickerResult | null>(null);
    const getFileName = () => {
        if (file?.canceled) return ""
        return file?.assets[0].name;
    };

    

    useEffect(() => {
        if (!file) return;
        databaseMethods.uploadFileAndSaveLink(file).then(url => {
          if (url) onUpload(url);
        });
    }, [file]);


  return (
    <View style={styles.container}>
      <FileUpload style={styles.uploadButton} onFileUpload={(file) => {
        console.log(JSON.stringify(file, null, 2));
        setFile(file);
      }} >
            <FontAwesome name="upload" size={20} color="#fff" />
            <Text style={styles.uploadButtonText}>Choose File to Upload</Text>
      </FileUpload>
      <Text style={styles.fileName}>{getFileName()}</Text>
      <Text style={styles.description}>
        If you haven't obtained a trainer certificate yet, you can signup as client.
      </Text>
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

export default TrainerCertificateUploader;
