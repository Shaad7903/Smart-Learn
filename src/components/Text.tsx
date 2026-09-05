import React from 'react';
import {
    Text as RNText,
    TextProps as RNTextProps,
    StyleSheet,
    TextStyle,
} from 'react-native';
import { FONTS, getFontFamily, FontWeight } from '../config/themes';

export interface TextProps extends RNTextProps {
    weight?: FontWeight;
    italic?: boolean;
}

export const Text: React.FC<TextProps> = ({
    style,
    weight,
    italic = false,
    ...props
}) => {
    const flattenedStyle = (StyleSheet.flatten(style) || {}) as TextStyle;
    const resolvedWeight =
        weight || (flattenedStyle.fontWeight as FontWeight) || 'normal';
    const isItalic = italic || flattenedStyle.fontStyle === 'italic';

    const fontFamily =
        flattenedStyle.fontFamily || getFontFamily(resolvedWeight, isItalic);

    return (
        <RNText
            {...props}
            style={[
                { fontFamily: FONTS.regular },
                style,
                { fontFamily },
            ]}
        />
    );
};

export default Text;
