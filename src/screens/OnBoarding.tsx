import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BG_COLOR, TEXT_COLOR } from '../config/themes';
import { Text, OnboardingCard, OnboardingBackCard, Button } from '../components';
import { navigate } from '../services/NavigationService';

const { width, height } = Dimensions.get('window');

// Baseline design dimensions (standard mobile reference)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;
const scale = Math.min(Math.max(Math.min(width / BASE_WIDTH, height / BASE_HEIGHT), 0.72), 1);

const OnBoarding = () => {
    const buttonHeightStyle =
        scale < 1
            ? { height: Math.max(Math.round(56 * scale), 46) }
            : undefined;

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Background decorative curved arc */}
            <View style={styles.bgArcContainer} pointerEvents="none">
                <Image
                    source={require('../assets/vectors/OnboardingVector[Large].png')}
                    resizeMode="contain"
                    style={styles.vector}
                />
            </View>


            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <View style={styles.outerBadge}>
                        <View style={styles.badge}>
                            <Image
                                source={require('../assets/images/Logo.png')}
                                style={styles.logo}
                            />
                        </View>
                    </View>
                    <Text weight="medium" style={styles.brandTitle}>
                        SmartLearn
                    </Text>
                </View>


                <View style={styles.cardsWrapper}>

                    <View style={styles.pinkCardContainer}>
                        <OnboardingBackCard
                            text="Instant Feedback"
                            color="#F2D1D0"
                            textColor={TEXT_COLOR}
                            cardSize={{ width: 230, height: 120 }}
                            style={styles.pinkBackCard}
                        />
                        <Image
                            source={require('../assets/vectors/Bulb.png')}
                            style={styles.bulbIcon}
                            resizeMode="contain"
                        />
                    </View>


                    <OnboardingBackCard
                        text="Fun Games & Activities"
                        color="#DFF28A"
                        textColor="#01000080"
                        cardSize={{ width: 310, height: 140 }}
                        style={styles.limeBackCard}
                    />


                    <View style={styles.cardContainer}>
                        <OnboardingCard />
                    </View>
                </View>

                <View style={styles.buttonSection}>
                    <Button
                        title="Sign up"
                        variant="primary"
                        style={buttonHeightStyle}
                        onPress={() => { navigate('Main') }}
                    />
                    <Button
                        title="Log in"
                        variant="outline"
                        style={buttonHeightStyle}
                        onPress={() => { navigate('Main') }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default OnBoarding;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    bgArcContainer: {
        position: 'absolute',
        top: -width * 0.10,
        left: 75,
        width: width,
        height: width * (1012 / 665),
        zIndex: 0,
    },
    vector: {
        width: '100%',
        height: '100%',
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Math.round(40 * scale),
        paddingBottom: Math.round(20 * scale),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
    },
    outerBadge: {
        width: Math.round(110 * scale),
        height: Math.round(110 * scale),
        borderRadius: Math.round(55 * scale),
        backgroundColor: '#F0F4F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Math.round(8 * scale),
    },
    badge: {
        width: Math.round(88 * scale),
        height: Math.round(88 * scale),
        borderRadius: Math.round(44 * scale),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: Math.round(40 * scale),
        height: Math.round(30 * scale),
        resizeMode: 'contain',
    },
    brandTitle: {
        fontSize: Math.round(24 * scale),
        color: '#080C1E',
        letterSpacing: -0.3,
        textAlign: 'center',
    },
    cardsWrapper: {
        width: '100%',
        alignItems: 'center',
        transform: [{ scale }],
        marginVertical: Math.round(((scale - 1) * 440) / 2),
    },
    pinkCardContainer: {
        position: 'relative',
        zIndex: 1,
        top: -5,
    },
    pinkBackCard: {
        transform: [{ rotate: '-7.95deg' }],
    },
    bulbIcon: {
        position: 'absolute',
        top: 15,
        right: -60,
        width: 40,
        height: 40,
        zIndex: 10,
    },
    limeBackCard: {
        transform: [{ rotate: '7.47deg' }],
        marginTop: -55,
        zIndex: 2,
    },
    cardContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: -72,
        zIndex: 3,
        transform: [{ rotate: '-1.71deg' }],
    },
    buttonSection: {
        width: '100%',
        gap: Math.max(Math.round(6 * scale), 4),
    },
});