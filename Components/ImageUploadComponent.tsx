import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Button, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

interface ImageUploadProps {
  onSuccess: (image: any) => void;
  onFail: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onSuccess, onFail}) => {
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
        onFail();
      } else if (response.didCancel) {
        console.log('ImagePicker Error: ', response.errorMessage);
        onFail();
      } else {
        const source = { uri: response.assets?.at(0)?.uri };
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
