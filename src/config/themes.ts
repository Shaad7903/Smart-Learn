export const BG_COLOR = '#FFFFFF';
export const TEXT_COLOR = '#010000';
export const PRIMARY_COLOR = '#1C274C'

export const FONTS = {
    thin: 'Inter-Thin',
    light: 'Inter-Light',
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    extraBold: 'Inter-ExtraBold',
    black: 'Inter-Black',
    // Generic family name registered in ReactFontManager / iOS
    family: 'Inter',
} as const;

export type FontWeight =
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | 'normal'
    | 'bold'
    | 'thin'
    | 'light'
    | 'medium'
    | 'semiBold'
    | 'extraBold'
    | 'black';

/**
 * Returns the appropriate Inter font family string based on weight and italic style
 */
export const getFontFamily = (
    weight: FontWeight = 'normal',
    italic: boolean = false,
): string => {
    switch (weight) {
        case '100':
        case 'thin':
            return italic ? 'Inter-ThinItalic' : FONTS.thin;
        case '200':
        case '300':
        case 'light':
            return italic ? 'Inter-LightItalic' : FONTS.light;
        case '500':
        case 'medium':
            return italic ? 'Inter-MediumItalic' : FONTS.medium;
        case '600':
        case 'semiBold':
            return italic ? 'Inter-SemiBoldItalic' : FONTS.semiBold;
        case '700':
        case 'bold':
            return italic ? 'Inter-BoldItalic' : FONTS.bold;
        case '800':
        case 'extraBold':
            return italic ? 'Inter-ExtraBoldItalic' : FONTS.extraBold;
        case '900':
        case 'black':
            return italic ? 'Inter-BlackItalic' : FONTS.black;
        case '400':
        case 'normal':
        default:
            return italic ? 'Inter-Italic' : FONTS.regular;
    }
};

export const TYPOGRAPHY = {
    h1: {
        fontFamily: FONTS.bold,
        fontSize: 32,
        lineHeight: 40,
    },
    h2: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        lineHeight: 32,
    },
    h3: {
        fontFamily: FONTS.semiBold,
        fontSize: 20,
        lineHeight: 28,
    },
    h4: {
        fontFamily: FONTS.semiBold,
        fontSize: 18,
        lineHeight: 24,
    },
    bodyLarge: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        lineHeight: 24,
    },
    bodyMedium: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        lineHeight: 20,
    },
    bodySmall: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        lineHeight: 16,
    },
    caption: {
        fontFamily: FONTS.medium,
        fontSize: 11,
        lineHeight: 14,
    },
    button: {
        fontFamily: FONTS.semiBold,
        fontSize: 15,
        lineHeight: 20,
    },
} as const;