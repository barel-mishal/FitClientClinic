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

    return <YearSelector years={years} setYear={setYear} />;
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
          renderHeader={(date: Date) => (
            <TouchableOpacity onPress={() => setYearSelectionMode(true)}>
              <Text>{date.getFullYear()} Year</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};



const YearSelector: React.FC<{years: number[], setYear: (year: number) => void}> = ({ years, setYear }) => {
  const [pageIndex, setPageIndex] = useState(0); // Current page index
  const rowsPerPage = 4; // Number of rows per page
  const yearsPerRow = 4; // Number of years per row

  // Function to chunk the years array into sub-arrays
  const chunkYears = (yearsArray: number[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < yearsArray.length; i += chunkSize) {
      chunks.push(yearsArray.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const yearChunks = chunkYears(years, yearsPerRow); // Split the years into chunks
  const totalPages = Math.ceil(yearChunks.length / rowsPerPage); // Total number of pages

  // Navigate to the previous page
  const goPrevPage = () => {
    setPageIndex(Math.max(pageIndex - 1, 0));
  };

  // Navigate to the next page
  const goNextPage = () => {
    setPageIndex(Math.min(pageIndex + 1, totalPages - 1));
  };

  // Get the chunks for the current page
  const currentPageChunks = yearChunks.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage);

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={goPrevPage} disabled={pageIndex === 0}>
        <Text>{"< Prev"}</Text>
      </TouchableOpacity>

      {currentPageChunks.map((chunk, index) => (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          {chunk.map(year => (
            <TouchableOpacity key={year} onPress={() => setYear(year)} style={{ flex: 1, marginHorizontal: 5 }}>
              <Text style={{ padding: 10, textAlign: 'center' }}>{year}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity onPress={goNextPage} disabled={pageIndex >= totalPages - 1}>
        <Text>{"Next >"}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default BirthdateSelector;
