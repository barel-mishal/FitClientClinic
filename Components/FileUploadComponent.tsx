import React, { ReactNode, useState } from 'react';
import { View, Button, Text, Pressable } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface FileUploadProps {
    onFileUpload: (file: DocumentPicker.DocumentPickerResult) => void;
    children: ReactNode;
    style: object;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, children, style }) => {
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
    return <Pressable onPress={handleChooseFile} style={style}>
            {children}

        </Pressable>
};

export default FileUpload;
