import { View, ViewStyle, StyleSheet } from "react-native";

const CardWrapper = (props: { children: React.ReactNode, styleOption?: ViewStyle}) => {
    return (
        <View style={{...styles.cardWrapper, ...props.styleOption}}>
            {props.children}
        </View>
    );
}


const styles = StyleSheet.create({
    cardWrapper: {
      display: "flex",
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      width: "100%", 
      padding: 20, 
      borderRadius: 12, 
      backgroundColor: "#7DD3FC", 
      shadowColor: "#082f49", 
      shadowOffset: {
        width: 0,
        height: 4, 
      },
      shadowOpacity: 0.25, 
      shadowRadius: 6, 
      elevation: 5, 
    },
  });
  
export default CardWrapper;