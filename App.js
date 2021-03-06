import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, SafeAreaView, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import Focus from './src/features/focus/Focus';
import FocusHistory from './src/features/focus/FocusHistory';
import Timer from './src/features/timer/Timer';

import { colors } from './src/utils/colors';
import { spacingSizes } from './src/utils/sizes';

const STATUS = {
  complete: 1,
  cancelled: 0
}

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  
  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status, key: String(focusHistory.length + 1) }]);
  };
  
  const onClear = () => {
    setFocusHistory([]);
  };
  
  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch(error) {
      console.log(error)
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch(error) {
      console.log(error)
    };
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);
  
    useEffect(() => {
      saveFocusHistory();
    }, [focusSubject]);
  
  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUS.complete);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUS.cancelled);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus
            addSubject={setFocusSubject}
          />
          <FocusHistory
            focusHistory={focusHistory} onClear={onClear}
          />
        </>
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
