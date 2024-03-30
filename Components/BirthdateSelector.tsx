import React, { useEffect, useState } from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';



interface BirthdateSelectorProps {
  initialBirthdate: Date | undefined;
  onBirthdateChange: (birthdate: Date) => void;
}

const BirthdateSelector: React.FC<BirthdateSelectorProps> = ({ initialBirthdate, onBirthdateChange }) => {
  const [dateShowing, setDateShowing] = useState<Date | undefined>(initialBirthdate);
  const [isYearSelectionMode, setYearSelectionMode] = useState<"years" | "days" | "months">("days");

  const handleDayPress = (day: { dateString: string }) => {
    const newDate = new Date(day.dateString);
    setDateShowing(newDate); // Update local state
    onBirthdateChange(newDate); // Propagate changes to the parent component
    setYearSelectionMode("days");
  };

  const renderYearSelector = () => {
    let years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 100; i <= currentYear; i++) {
      years.push(i);
    }
    return <YearSelector years={years} setYear={setYear} />;
  };

  const setMonth = (monthIndex: number) => {
    const newDate = new Date(dateShowing || new Date());
    newDate.setMonth(monthIndex);
    setDateShowing(newDate); // Update local state
    onBirthdateChange(newDate); // Propagate changes to the parent component
    setYearSelectionMode("days"); // Optionally transition to "days" mode
  };

  const renderMonthSelector = () => {
    const months = Array.from({ length: 12 }, (e, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
    return (
      <View style={{ padding: 20, backgroundColor: "white", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {months.map((month, index) => (
          <TouchableOpacity key={month} onPress={() => setMonth(index)} style={{ width: "30%", margin: 5 }}>
            <Text style={{ padding: 10, textAlign: 'center' }}>{month}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const setYear = (year: number) => {

    const newDate = new Date(dateShowing || new Date());
    newDate.setFullYear(year);
    onBirthdateChange(newDate);
    setDateShowing(newDate);
    setYearSelectionMode("months");
  };

  useEffect(() => {
    setDateShowing(initialBirthdate);
  }, [initialBirthdate]);



  return (
    <View>
      {isYearSelectionMode === "days" && (
        <Calendar
          initialDate={dateShowing ? dateShowing.toISOString() : undefined}
          minDate={new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 100).toISOString()}
          maxDate={new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18).toISOString()}
          onDayPress={handleDayPress}
          monthFormat={'yyyy MM'}
          renderArrow={(direction) => <FontAwesome5 name={`arrow-${direction}`} size={20} color="#075985" />}
          hideExtraDays
          firstDay={1}
          markedDates={dateShowing ? { [dateShowing?.toISOString().split('T')[0]]: { selected: true, selectedColor: '#075985' } }: {}}
          showWeekNumbers
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          enableSwipeMonths
          current={dateShowing?.toISOString()}
          onVisibleMonthsChange={(months) => setDateShowing(new Date(months[0].dateString))}
          renderHeader={(date) => (
            <TouchableOpacity onPress={() => setYearSelectionMode("years")}>
              {dateShowing ? <Text>{dateShowing?.getDate()}/{dateShowing?.getMonth() + 1}/{dateShowing?.getFullYear()}</Text> : "Select a date"}
            </TouchableOpacity>
          )}
        />
      )}
      {isYearSelectionMode === "years" && renderYearSelector()}
      {isYearSelectionMode === "months" && renderMonthSelector()}

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

  const isPrevDisabled = pageIndex === 0;
  const isNextDisabled = pageIndex >= totalPages - 1;

  return (
    <View style={{ padding: 20, backgroundColor: "white" }}>
      <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <TouchableOpacity onPress={goPrevPage} disabled={isPrevDisabled}>
          <FontAwesome5 name="arrow-left" size={20} color={isPrevDisabled ? "rgba(8, 47, 73, 0.5)" : "#082f49"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goNextPage} disabled={isNextDisabled}>
          <FontAwesome5 name="arrow-right" size={20} color={isNextDisabled ? "rgba(8, 47, 73, 0.5)" : "#082f49"} />
        </TouchableOpacity>
      </View>

      {currentPageChunks.map((chunk, index) => (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          {chunk.map(year => (
            <TouchableOpacity key={year} onPress={() => setYear(year)} style={{ flex: 1, marginHorizontal: 5 }}>
              <Text style={{ padding: 10, textAlign: 'center' }}>{year}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

    </View>
  );
};


export default BirthdateSelector;
