import React from 'react';
import { Button, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ImageUpload = () => {
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    launchImageLibrary({
        mediaType: 'mixed',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.didCancel) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets?.at(0)?.uri };
        uploadFile(source);
      }
    });
  };

  const uploadFile = (source: any) => {
    console.log('uploading', source);
    // Implement file upload here
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};

export default ImageUpload;
