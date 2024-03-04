import React, { useState, useRef, useEffect } from 'react';
import { Animated, ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const StickySelect: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const topContentRef = useRef<View>(null);
  const sectionRefs: React.RefObject<View>[] = useRef([]);
  const [stickyHeaderHeight, setStickyHeaderHeight] = useState(0);

  const sections: string[] = ['Section 1', 'Section 2']; // Section titles

  useEffect(() => {
    sectionRefs.current = sections.map((_, i) => sectionRefs.current[i] ?? React.createRef());
  }, [sections]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index].current?.measureLayout(
      scrollRef.current as any,
      (x, y, width, height) => {
        scrollRef.current?.scrollTo({ y: y - stickyHeaderHeight, animated: true });
      },
      (error) => console.error(error)
    );
  };

  const scrollToTopContent = () => {
    topContentRef.current?.measureLayout(
      scrollRef.current as any,
      (x, y, width, height) => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      },
      (error) => console.error(error)
    );
  };

  return (
    <ScrollView ref={scrollRef}>
      <View ref={topContentRef}>
        <Text>Top Content</Text>
      </View>

      <View onLayout={(event) => setStickyHeaderHeight(event.nativeEvent.layout.height)}>
        {sections.map((section, index) => (
          <TouchableOpacity key={index} onPress={() => scrollToSection(index)}>
            <Text>{section}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {sections.map((section, index) => (
        <View key={index} ref={sectionRefs.current[index]}>
          <Text>{section} Content</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default StickySelect;
