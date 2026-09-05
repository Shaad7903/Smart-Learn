import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
} from 'react-native';

import Text from '../Text';
import { PRIMARY_COLOR } from '../../config/themes';

export interface OnboardingCardProps {
    title?: string;
    badgeText?: string;
    description?: string;
    currentIndex?: number;
    totalCount?: number;
    imageSource?: ImageSourcePropType;
    style?: StyleProp<ViewStyle>;
}

export const OnboardingCard: React.FC<OnboardingCardProps> = ({
    title = 'Personalized',
    badgeText = 'Learning',
    description = "Lessons adapt to your child's pace, focusing on what they need most.",
    currentIndex = 0,
    totalCount = 3,
    imageSource = require('../../assets/images/Onboarding1.png'),
    style,
}) => {
    return (
        <View style={[styles.wrapper, style]}>
            <View style={styles.starContainer} pointerEvents="none">
                {/* Top Star */}
                <Image source={require('../../assets/vectors/Star.png')} style={styles.starImage} />
            </View>
            {/* Card wrapped with 7px padding and white border */}
            <View style={styles.cardBorderWrapper}>
                <View style={styles.cardBox}>
                    <View style={styles.vectorOverlay} pointerEvents="none">
                        <Image source={require('../../assets/vectors/OnboardingVector[Small].png')} style={styles.cardVector} />
                    </View>

                    {/* Left content area */}
                    <View style={styles.contentArea}>
                        <View>
                            <Text weight="medium" style={styles.title}>
                                {title}
                            </Text>

                            <View style={styles.badge}>
                                <Text weight="bold" style={styles.badgeText}>
                                    {badgeText}
                                </Text>
                            </View>

                            <Text weight="medium" style={styles.description}>
                                {description}
                            </Text>

                            <View style={styles.dots}>
                                {Array.from({ length: totalCount }).map((_, index) => {
                                    const isActive = index === currentIndex;
                                    return (
                                        <View
                                            key={index}
                                            style={[
                                                styles.dotBase,
                                                isActive ? styles.activeDot : styles.inactiveDot,
                                            ]}
                                        />
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Image
                source={imageSource}
                style={styles.characterImage}
                resizeMode="contain"
            />
        </View>
    );
};

export default OnboardingCard;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        position: 'relative',
        paddingTop: 8,
        paddingBottom: 16,
    },
    starContainer: {
        position: 'absolute',
        top: 0,
        left: 11,
        zIndex: 10,
    },
    starImage: {
        width: 26,
        height: 26,
    },
    cardBorderWrapper: {
        padding: 7,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderRadius: 39,
    },
    cardBox: {
        backgroundColor: '#CADDF7',
        borderRadius: 32,
        paddingTop: 30,
        paddingBottom: 28,
        paddingLeft: 22,
        paddingRight: 20,
        minHeight: 330,
        overflow: 'hidden',
        position: 'relative',
    },
    vectorOverlay: {
        position: 'absolute',
        top: 50,
        right: -37,

    },
    cardVector: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        transform: [{ rotate: '0deg' }]
    },
    contentArea: {
        flex: 1,
        justifyContent: 'space-between',
        zIndex: 2,
    },
    title: {
        fontSize: 32,
        lineHeight: 38,
        color: '#0A0D1E',
        letterSpacing: -0.3,
    },
    badge: {
        backgroundColor: '#71A6EE',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 18,
        marginTop: 6,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 24,
        lineHeight: 30,
    },
    description: {
        marginTop: 18,
        fontSize: 14,
        lineHeight: 21,
        color: '#1C274C80',
        maxWidth: 240,
    },
    dots: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    dotBase: {
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    activeDot: {
        width: 25,
        backgroundColor: PRIMARY_COLOR,
    },
    inactiveDot: {
        width: 10,
        backgroundColor: '#BDD0E8',
    },
    characterImage: {
        position: 'absolute',
        right: -20,
        bottom: -10,
        width: 224,
        height: 254,
        zIndex: 5,
    },
});