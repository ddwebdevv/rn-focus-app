import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import Countdown from '../../components/Countdown';
import RoundedButton from '../../components/RoundedButton';
import Timing from './Timing';

import { colors } from '../../utils/colors';
import { spacingSizes } from '../../utils/sizes';

const Timer = ({ focusSubject, onTimerEnd }) => {
    useKeepAwake();
    const [minutes, setMinutes] = useState(0.1);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);

    const vibrate = () => {
        if (Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 5000);
        } else {
            Vibration.vibrate(5000);
        }
    };

    const onProgress = (progress) => {
        setProgress(progress);
    };

    const changeTime = (min) => {
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);
    };

    const onEnd = () => {
        vibrate();
        setMinutes(5);
        setProgress(1);
        setIsStarted(false);
        onTimerEnd();
    };

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown
                    minutes={minutes}
                    isPaused={!isStarted}
                    onProgress={onProgress}
                    onEnd={onEnd}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={styles.progressContainer}>
                <ProgressBar
                    color={colors.progress}
                    style={styles.progress}
                    progress={progress}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Timing onChangeTime={changeTime} />
            </View>
            <View style={styles.buttonContainer}>
                {isStarted ? (
                    <RoundedButton
                        title='Pause'
                        onPress={() => setIsStarted(false)}
                    />
                ) : (
                        <RoundedButton
                            title='Start'
                            onPress={() => setIsStarted(true)}
                        />
                    )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        paddingTop: spacingSizes.xxl
    },
    title: {
        color: colors.white,
        textAlign: 'center'
    },
    task: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonContainer: {
        flex: 0.3,
        flexDirection: 'row',
        padding: spacingSizes.md,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progress: {
        height: 20
    },
    progressContainer: {
        paddingTop: spacingSizes.md
    }
});

export default Timer;