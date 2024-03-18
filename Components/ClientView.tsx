import { View, Text, StyleSheet, Dimensions } from "react-native";

/*
This component is used to render the program details for the trainer
To avoid fetching the program each time it change state 
*/
const ClientView = ({ client }: { client: any }) => {
  console.log(client)


    return (
        <View style={styles.container}>

        <View key={client.id} style={styles.ClientContainer}>
          {/* profile image and name */}
            <Text style={styles.ClientTitle}>{client?.name}</Text>
            <Text style={styles.ClientDescription}>{client?.description}</Text>
            {/* profile description summary as text */}
            {/* space with divider */}
            {/* current program */}
            {/* space with divider */}
            {/* workouts */}
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: Dimensions.get('window').height,
    },
    ClientContainer: {
      padding: 20,
      alignItems: 'center',
    },
    ClientTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    ClientDescription: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    ClientDetail: {
      alignItems: 'center',
      marginBottom: 20,
    },
    ClientSet: {
      fontSize: 18,
      fontWeight: '600',
    },
    ClientDuration: {
      fontSize: 32,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    // Add styles for ClientImage if needed
    navigation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    navText: {
      fontSize: 18,
      color: 'blue',
    },
  });


export default ClientView;