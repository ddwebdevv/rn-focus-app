import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import RoundedButton from '../../components/RoundedButton';

import { fontSizes, spacingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';


const Focus = ({ addSubject }) => {
    const [tempItem, setTempItem] = useState(null);
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>What whould you like to focus on?</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.input}
                        onSubmitEditing={({ nativeEvent }) => {
                            setTempItem(nativeEvent.text);
                        }}
                        // onChange={({ nativeEvent }) => {
                        //     setTempItem(nativeEvent.text);
                        // }}
                    />
                    <RoundedButton
                        title='+'
                        size={50}
                        onPress={() => {
                            addSubject(tempItem);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        flex: 0.5,
        padding: spacingSizes.md,
        justifyContent: 'center'
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: fontSizes.mdl
    },
    textInputContainer: {
        paddingTop: spacingSizes.md,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        marginRight: spacingSizes.md
    }
});

export default Focus;