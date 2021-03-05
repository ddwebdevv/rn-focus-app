import React from 'react';
import { StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const RoundedButton = ({
    style={},
    textStyle = {},
    size = 125,
    ...props
}) => {
    // let TouchableComponent = TouchableOpacity;

    // // if (Platform.OS === 'android' && Platform.Version >= 21) {
    // //     TouchableComponent = TouchableNativeFeedback;
    // // }

    return (
        <TouchableOpacity
            style={[
                styles(size).radius,
                style
            ]}
            onPress={props.onPress}
        >
            <Text style={[
                styles(size).text,
                textStyle
            ]}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = (size) => StyleSheet.create({
    radius: {
        borderRadius: size / 2,
        borderColor: '#fff',
        borderWidth: 2,
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontSize: size / 3
    }
});

export default RoundedButton;