import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';

type OpenURLButtonProps = {
    url: string;
    children: ReactNode;
    };


const OpenURLButton: React.FC<OpenURLButtonProps> = ({ url, children }) => {
  const handlePress = React.useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" or "https", the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
        console.log(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress} style={{display: "flex", flexDirection: "row", alignItems: "baseline"}} >
      {children}
    </TouchableOpacity>
  );
};

export default OpenURLButton;