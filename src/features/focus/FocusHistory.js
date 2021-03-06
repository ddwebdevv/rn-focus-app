import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import RoundedButton from '../../components/RoundedButton';

import { fontSizes, spacingSizes } from '../../utils/sizes';

const FocusHistory = ({ focusHistory, onClear }) => {
    const clearHistory = () => {
        onClear();
    };

    const historyItem = ({ item, index }) => (
        <Text style={styles.historyItem(item.status)}>
            {item.subject}
        </Text>
    );

    return (
        <SafeAreaView style={styles.container}>
            {focusHistory.length ? (
                <>
                    <Text style={styles.title}>Things we've focused on</Text>
                    <FlatList
                        style={styles.list}
                        contentContainerStyle={styles.listContainer}
                        data={focusHistory}
                        renderItem={historyItem}
                    />
                    <View style={styles.clearContainer}>
                        <RoundedButton
                            size={75}
                            title='Clear'
                            onPress={() => clearHistory()}
                        />
                    </View>
                </>
            ) : (
                    null
                )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center'
    },
    list: {
        width: '100%',
        height: '100%'
    },
    listContainer: {
        flex: 1,
        alignItems: 'center'
    },
    historyItem: (status) => ({
        color: status < 1 ? 'red' : 'green',
        fontSize: fontSizes.md
    }),
    title: {
        color: 'white',
        fontSize: fontSizes.lg
    },
    clearContainer: {
        alignItems: 'center',
        padding: spacingSizes.md
    }
});

export default FocusHistory;