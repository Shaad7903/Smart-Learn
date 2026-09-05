import React from 'react';
import {
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    Pressable,
} from 'react-native';
import Text from '../Text';
import { PRIMARY_COLOR } from '../../config/themes';

export interface ButtonProps {
    title: string;
    onPress?: () => void;
    variant?: 'primary' | 'outline';
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
    disabled = false,
}) => {
    const isPrimary = variant === 'primary';

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                isPrimary ? styles.primaryButton : styles.outlineButton,
                disabled && styles.disabledButton,
                style,
            ]}
        >
            <Text
                weight="bold"
                style={[
                    styles.text,
                    isPrimary ? styles.primaryText : styles.outlineText,
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: PRIMARY_COLOR,
    },
    outlineButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: PRIMARY_COLOR,
    },
    disabledButton: {
        opacity: 0.5,
    },
    text: {
        fontSize: 16,
        letterSpacing: 0.2,
    },
    primaryText: {
        color: '#FFFFFF',
    },
    outlineText: {
        color: PRIMARY_COLOR,
    },
});