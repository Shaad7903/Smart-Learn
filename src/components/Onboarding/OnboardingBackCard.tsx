import React from 'react';
import {
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import Text from '../Text';

export interface CardSize {
    width: number | string;
    height: number | string;
}

export interface OnboardingBackCardProps {
    text?: string;
    color?: string;
    textColor?: string;
    cardSize?: CardSize | number;
    width?: number | string;
    height?: number | string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    children?: React.ReactNode;
}

export const OnboardingBackCard: React.FC<OnboardingBackCardProps> = ({
    text,
    color = '#D9EF7A',
    textColor = '#556526',
    cardSize = { width: 260, height: 170 },
    width,
    height,
    style,
    textStyle,
    children,
}) => {
    const resolvedWidth =
        width ?? (typeof cardSize === 'object' ? cardSize.width : cardSize);
    const resolvedHeight =
        height ?? (typeof cardSize === 'object' ? cardSize.height : cardSize * 0.65);

    return (
        <View
            style={[
                styles.card,
                {
                    width: resolvedWidth,
                    height: resolvedHeight,
                    backgroundColor: color,
                },
                style,
            ]}
        >
            {text ? (
                <Text
                    weight="medium"
                    style={[
                        styles.text,
                        { color: textColor },
                        textStyle,
                    ]}
                >
                    {text}
                </Text>
            ) : null}
            {children}
        </View>
    );
};

export default OnboardingBackCard;

const styles = StyleSheet.create({
    card: {
        borderRadius: 28,
        borderWidth: 7,
        borderColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 16,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: -0.2,
    },
});
