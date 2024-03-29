import React, { useState } from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const BirthdateSelector: React.FC<{initialBirthdate: Date}> = ({ initialBirthdate }) => {
  // Calculate default date 18 years ago if no initial birthdate is provided
  const defaultDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18);

  // State to manage selected date and year selection mode
  const [selectedDate, setSelectedDate] = useState(initialBirthdate || defaultDate);
  const [isYearSelectionMode, setYearSelectionMode] = useState(false);

  // Handler for day selection
  const handleDayPress = (day: DateData) => {
    console.log('selected day', day);
    setSelectedDate(new Date(day.dateString));
    setYearSelectionMode(false); // Exit year selection mode upon date selection
  };

  // Render year selection view
  const renderYearSelector = () => {
    // Generate a list of years for selection
    let years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 100; i <= currentYear - 8; i++) {
      years.push(i);
    }

    return (
      <View style={{ padding: 20 }}>
        {years.map(year => (
          <TouchableOpacity key={year} onPress={() => setYear(year)}>
            <Text style={{ padding: 10 }}>{year}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Set the year and switch back to date selection mode
  const setYear = (year: number) => {
    const newDate = new Date(selectedDate.setFullYear(year));
    setSelectedDate(newDate);
    setYearSelectionMode(false);
  };

  return (
    <View>
      {isYearSelectionMode ? (
        renderYearSelector()
      ) : (
        <Calendar
          initialDate={selectedDate.toISOString()}
          minDate={new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 100).toISOString()}
          maxDate={new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 8).toISOString()}
          onDayPress={handleDayPress}
          monthFormat={'yyyy MM'}
          renderArrow={(direction) => <FontAwesome5 name={`arrow-${direction}`} size={20} color="#075985" />}
          hideExtraDays={true}
          firstDay={1}
          showWeekNumbers={true}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          enableSwipeMonths={true}
          // Add a header for year selection
          renderHeader={(date) => (
            <TouchableOpacity onPress={() => setYearSelectionMode(true)}>
              <Text>Select Year</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};


export default BirthdateSelector;
