import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { OutputClientProperties } from "../types";

interface Props { 
  client: OutputClientProperties; 
  numberOfWorkout: number; 
  avgWorkoutDuration: number;
}


const ClientView: React.FC<Props> = ({ client, numberOfWorkout, avgWorkoutDuration }) => {
  

    return (
        <View style={styles.container}>

          <View key={client.clientId} style={styles.ClientContainer}>
            {/* profile image and name */}
              <Text style={styles.ClientTitle}>{client?.name}</Text>
              <View style={{display: "flex", gap: 4, marginTop: 20}}>
                <Text style={{fontSize: 20, fontWeight: "500", }}>
                    Goals
                </Text>

                {client.goals && client.goals.map((goal, index) => (
                  <Text key={index} style={styles.ClientDescription}>
                      {goal}
                  </Text>
                ))}
              </View>
              {/* space with divider */}
              {/* current program */}
              {/* space with divider */}
              {/* workouts */}
              <View style={styles.statsRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Entypo name="stopwatch" size={20} color="#082f49" />
                      <Text style={styles.clientStats}>
                          Avg score: {avgWorkoutDuration} mins
                      </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <MaterialIcons name="fitness-center" size={20} color="#082f49" />
                      <Text style={styles.clientStats}>
                          Workouts: {numberOfWorkout}
                      </Text>
                  </View>
              </View>
          </View>
      </View>
    )
}



const COLORS = {
  primary: '#082f49', // Deep blue color for text and icons
  secondary: '#4CAF50', // Green color for buttons and highlights
  background: '#f0f9ff', // Sky color for card background
  text: '#082F49', // Primary text color

};

const SPACING = {
  small: 8,
  medium: 16,
  large: 24,
};

const FONTS: StyleSheet.NamedStyles<any> = {
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  ClientContainer: {

    backgroundColor: COLORS.background,

    padding: SPACING.medium,
    // borderRadius: 20,
    // shadowColor: '#082f49',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // display: 'flex',
    //   flexDirection: 'column',
    //   gap: 16,
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  ClientTitle: {
    ...FONTS.title,
    color: COLORS.text,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ClientDescription: {
    ...FONTS.text,
    color: COLORS.text,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: SPACING.small,
  },
  programCard: {
    backgroundColor: COLORS.background,
    padding: SPACING.medium,
    borderRadius: 20,
    shadowColor: '#082f49',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    display: 'flex',
      flexDirection: 'column',
      gap: 16,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: SPACING.medium,
    alignItems: 'flex-start',
    marginBottom: SPACING.small,
  },
  clientName: {
    ...FONTS.title,
    color: COLORS.text,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientContact: {
    ...FONTS.text,
    color: COLORS.text,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: SPACING.small,
  },
  detailsRow: {
    marginTop: SPACING.small,
  },
  clientDetails: {
    ...FONTS.text,
    color: COLORS.text,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  statsRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: SPACING.small,
    marginTop: SPACING.small,
  },
  clientStats: {
    ...FONTS.text,
    color: COLORS.text,
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.small,
    borderRadius: 10,
    flexDirection: 'row',
    gap: SPACING.small,
    marginTop: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    ...FONTS.button,
    color: '#fff',
  },
});

export default ClientView;