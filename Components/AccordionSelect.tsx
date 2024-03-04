import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";


interface AccordionSelectProps {
    options: string[];
    onClick: (option: string, index: number) => void;
}

export const AccordionSelect: React.FC<AccordionSelectProps> = ({ options, onClick }) => {
    
    const [activeOption, setActiveOption] = useState<string>(options[0]); // Default active option
    const [isOpen, setIsOpen] = useState(false);
  
    const handlePress = (option: string, index: number) => {
      setActiveOption(option);
      setIsOpen(false); // Close the accordion after selection
      onClick(option, index);
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.option}>
          <Text>{activeOption}</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity key={index} onPress={() => handlePress(option, index)} style={styles.option}>
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };


const styles = StyleSheet.create({
    container: {
      marginTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionsContainer: {
      marginTop: 0,
    },
    option: {
      padding: 10,
      marginTop: 2,
      backgroundColor: '#f2f2f2',
      width: 200,
      alignItems: 'center',
    },
  });
  