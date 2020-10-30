import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

export const Button = (props) => {
    const { onClick, text, backgroundColor, icon } = props;
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: backgroundColor }]}
            onPress={onClick}>
            {icon &&
                <Image
                    source={require('../../assets/bookmark.png')}
                    style={styles.iconStyle} />
            }
            <Text style={{ color: "white" }}>{text}</Text>
        </TouchableOpacity>
    )
}