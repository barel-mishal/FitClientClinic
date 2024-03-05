import React from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface FileUploadProps {
    onFileUpload: (file: DocumentPicker.DocumentPickerResult) => void;
    label: string;

}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, label }) => {
    const handleChooseFile = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: false,
            });
            onFileUpload(file);
        }
        catch (error) {
            console.log('Error picking file', error);
        }
    };
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{label}</Text>
            <Button title="Choose File" onPress={handleChooseFile} />
        </View>;
};

export default FileUpload;
