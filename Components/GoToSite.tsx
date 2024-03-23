import React from 'react';
import { Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';

type OpenURLButtonProps = {
    url: string;
    children: string;
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
    <TouchableOpacity onPress={handlePress} >
      <Text style={styles.linkText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    linkText: {
        color: '#0ea5e9',
        fontSize: 20,
        fontWeight: "600",
        fontStyle: "italic",
        textDecorationLine: "underline",
        textAlign: "center",

    }
})

export default OpenURLButton;