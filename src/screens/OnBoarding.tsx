import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BG_COLOR, TEXT_COLOR } from '../config/themes';
import { OnboardingCard, OnboardingBackCard, Button } from '../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const OnBoarding = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Background decorative curved arc */}
            <View style={styles.bgArcContainer} pointerEvents="none">
                <Image source={require('../assets/vectors/OnboardingVector[Large].png')} resizeMode='contain' style={styles.vector} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                {/* Header with App Logo & Title */}
                <View style={styles.outerBadge}>
                    <View style={styles.badge}>
                        <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
                    </View>
                </View>

                {/* Stacked Cards Section */}
                <View style={styles.cardsWrapper}>
                    {/* Pink Back Card: Instant Feedback + Bulb */}
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

                    {/* Lime Back Card: Fun Games & Activities */}
                    <OnboardingBackCard
                        text="Fun Games & Activities"
                        color="#DFF28A"
                        textColor="#01000080"
                        cardSize={{ width: 310, height: 140 }}
                        style={styles.limeBackCard}
                    />

                    {/* Front Onboarding Card */}
                    <View style={styles.cardContainer}>
                        <OnboardingCard />
                    </View>
                </View>

                {/* Bottom Action Buttons */}
                <View style={styles.buttonSection}>
                    <Button
                        title="Sign up"
                        variant="primary"
                        onPress={() => { }}
                    />
                    <Button
                        title="Log in"
                        variant="outline"
                        onPress={() => { }}
                    />
                </View>
            </ScrollView>
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
        top: -SCREEN_WIDTH * 0.10,
        left: 75,
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * (1012 / 665),
        zIndex: 0,
    },
    vector: {
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 28,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    outerBadge: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F0F4F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    badge: {
        width: 95,
        height: 95,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginTop: 6,
    },
    logoCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#EFF5FC',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1C274C',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 1,
    },
    logo: {
        width: 40,
        height: 30,
    },
    brandTitle: {
        fontSize: 22,
        color: '#080C1E',
        marginTop: 10,
        letterSpacing: -0.2,
    },
    cardsWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
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
        gap: 6,
    },
});