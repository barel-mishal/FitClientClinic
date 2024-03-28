import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Button, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import databaseMethods from '../services/databaseMethods';

interface ImageUploadProps {
  onSuccess: (uri: string | undefined) => void;
  onFail: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onSuccess, onFail}) => {
  const handleChoosePhoto = async () => {
    const options = {
      noData: true,
    };

    launchImageLibrary({
        mediaType: 'mixed',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
    }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        onFail();
      } else if (response.didCancel) {
        console.log('ImagePicker Error: ', response.errorMessage);
        onFail();
      } else {
        const source = await databaseMethods.uploadImageAndSaveLink(response.assets);
        if (source === null) {
          onFail();
          return;
        }
        onSuccess(source);
      }
    });
  };

  return (
    <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 10, borderColor: "#082F49", backgroundColor: "#bae6fd" }}>
      <AntDesign name="camera" size={24} color="#082F49"  />
      <Button title="Choose Photo" onPress={handleChoosePhoto} color={"#082F49"} />
    </View>
  );
};

export default ImageUpload;
