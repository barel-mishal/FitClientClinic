import { View, ViewStyle, StyleSheet } from "react-native";

interface Props {
    children: React.ReactNode;
    styleOption?: ViewStyle;
}

const Stack: React.FC<Props> = (props) => {
    return (
        <View style={{...styles.stack, ...props.styleOption}}>
            {props.children}
        </View>
    );
}


const styles = StyleSheet.create({
  stack: {
    marginVertical: 20,
    marginHorizontal: 16,
    display: "flex",
    gap: 16,
},
  });
  
export default Stack;