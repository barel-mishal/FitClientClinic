import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Button, View, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import databaseMethods from '../services/databaseMethods';

interface ImageUploadProps {
  onSuccess: (uri: string | undefined) => void;
  onFail: () => void;
  image?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onSuccess, onFail, image: img}) => {
  const [image, setImage] = React.useState<string | undefined>(img);
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
        setImage(undefined);
      } else if (response.didCancel) {
        console.log('ImagePicker Error: ', response.errorMessage);
        onFail();
        setImage(undefined);
      } else {
        const source = await databaseMethods.uploadImageAndSaveLink(response.assets);
        if (source === null) {
          onFail();
          setImage(undefined);
          return;
        }
        onSuccess(source);
        setImage(source);
      }
    });
  };

  return (
    <>
    
    <View style={{gap: 10, display: "flex"}} >
      <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 10, borderColor: "#082F49", backgroundColor: "#bae6fd" }}>
        <AntDesign name="camera" size={24} color="#082F49"  />
        <Button title="Choose Photo" onPress={handleChoosePhoto} color={"#082F49"} />
      </View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderWidth: 1, borderColor: '#082F49' }} borderRadius={20} />}
    </View>

    </>
  );
};

export default ImageUpload;
