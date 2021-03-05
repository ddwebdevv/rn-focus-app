import React, { useState } from 'react';
import { StyleSheet, Text, Platform, SafeAreaView } from 'react-native';

import Focus from './src/features/focus/Focus';
import Timer from './src/features/timer/Timer';

import { colors } from './src/utils/colors';
import { spacingSizes } from './src/utils/sizes';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            setFocusSubject(null);
          }}
        />
      ) : (
        <Focus
          addSubject={setFocusSubject}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacingSizes.xxl : spacingSizes.xxxxl,
    backgroundColor: colors.darkBlue
  },
});
