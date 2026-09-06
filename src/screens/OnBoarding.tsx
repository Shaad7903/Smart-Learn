import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    PanResponder,
    ImageStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
    interpolate,
} from 'react-native-reanimated';
import { BG_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../config/themes';
import { Text, OnboardingCard, OnboardingBackCard, Button } from '../components';
import { navigate } from '../services/NavigationService';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const baseWidth = 375;
const baseHeight = 812;
const scale = Math.min(Math.max(Math.min(screenWidth / baseWidth, screenHeight / baseHeight), 0.72), 1);
const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);

const onboardingSlides: {
    id: string;
    title: string;
    badgeText: string;
    description: string;
    cardColor: string;
    badgeColor: string;
    dotColor?: string;
    activeDotColor?: string;
    inactiveDotColor?: string;
    imageSource: any;
    imageStyle?: ImageStyle;
    backText: string;
    backColor: string;
    backTextColor: string;
}[] = [
        {
            id: '1',
            title: 'Personalized',
            badgeText: 'Learning',
            description: "Lessons adapt to your child's pace, focusing on what they need most.",
            cardColor: '#CADDF7',
            badgeColor: '#71A6EE',
            imageSource: require('../assets/images/Onboarding1.png'),
            imageStyle: { right: -20, bottom: -10, width: 224, height: 254 },
            backText: 'Personalized Learning',
            backColor: '#CADDF7',
            backTextColor: '#1C274C',
            activeDotColor: PRIMARY_COLOR,
            inactiveDotColor: "#1C274C1A"
        },
        {
            id: '2',
            title: 'Fun Games &',
            badgeText: 'Activities',
            description: 'Interactive games that make learning letters and phonics exciting.',
            cardColor: '#DFF28A',
            badgeColor: '#9BB728',
            imageSource: require('../assets/images/Girl_Running.png'),
            imageStyle: { right: -45, bottom: -25, width: 224, height: 254 },
            backText: 'Fun Games & Activities',
            backColor: '#DFF28A',
            backTextColor: '#01000080',
            activeDotColor: '#9cbb22ff',
            inactiveDotColor: '#9BB72833',
        },
        {
            id: '3',
            title: 'Instant',
            badgeText: 'Feedback',
            description: 'Real-time encouragement and smart hints so your child never gets stuck.',
            cardColor: '#F2D1D0',
            badgeColor: '#E08583',
            imageSource: require('../assets/images/BulbBrain.png'),
            imageStyle: { right: -10, bottom: -2, width: 215, height: 235 },
            backText: 'Instant Feedback',
            backColor: '#F2D1D0',
            backTextColor: TEXT_COLOR,
            activeDotColor: '#e77f7eff',
            inactiveDotColor: '#E0858333',
        },
    ];

const OnBoarding = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);
    activeIndexRef.current = activeIndex;

    const isTransitioningRef = useRef(false);

    const slideAnim = useSharedValue(0);
    const opacityAnim = useSharedValue(1);

    const buttonHeightStyle =
        scale < 1
            ? { height: Math.max(Math.round(56 * scale), 46) }
            : undefined;

    const handleSlideComplete = useCallback((targetIndex: number, slideDistance: number) => {
        setActiveIndex(targetIndex);
        slideAnim.value = -slideDistance * 0.35;
        slideAnim.value = withTiming(0, { duration: 260, easing: smoothEase });
        opacityAnim.value = withTiming(1, { duration: 260, easing: smoothEase });
        setTimeout(() => {
            isTransitioningRef.current = false;
        }, 280);
    }, [slideAnim, opacityAnim]);

    const changeSlide = useCallback((direction: 'next' | 'prev' | number) => {
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;

        const current = activeIndexRef.current;
        const targetIndex =
            typeof direction === 'number'
                ? direction
                : direction === 'next'
                    ? (current + 1) % onboardingSlides.length
                    : (current - 1 + onboardingSlides.length) % onboardingSlides.length;

        if (targetIndex === current) {
            isTransitioningRef.current = false;
            return;
        }

        const slideDistance = direction === 'prev' ? 130 : -130;

        slideAnim.value = withTiming(slideDistance, { duration: 220, easing: smoothEase }, (finished) => {
            if (finished) {
                runOnJS(handleSlideComplete)(targetIndex, slideDistance);
            }
        });
        opacityAnim.value = withTiming(0.18, { duration: 220, easing: smoothEase });
    }, [slideAnim, opacityAnim, handleSlideComplete]);

    useEffect(() => {
        const timer = setInterval(() => {
            changeSlide('next');
        }, 3800);

        return () => clearInterval(timer);
    }, [activeIndex, changeSlide]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (unusedEvent, gesture) => Math.abs(gesture.dx) > 15,
            onPanResponderRelease: (unusedEvent, gesture) => {
                if (gesture.dx < -25) {
                    changeSlide('next');
                } else if (gesture.dx > 25) {
                    changeSlide('prev');
                }
            },
        })
    ).current;

    const frontSlide = onboardingSlides[activeIndex];
    const middleSlide = onboardingSlides[(activeIndex + 1) % onboardingSlides.length];
    const rearSlide = onboardingSlides[(activeIndex + 2) % onboardingSlides.length];

    const frontCardStyle = useAnimatedStyle(() => ({
        transform: [
            { rotate: '-1.71deg' },
            { translateX: slideAnim.value },
        ],
        opacity: opacityAnim.value,
    }));

    const middleCardStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: interpolate(Math.abs(slideAnim.value), [0, 130], [1, 1.03]) },
        ],
    }));

    const rearCardStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: interpolate(Math.abs(slideAnim.value), [0, 130], [1, 1.02]) },
        ],
    }));

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Background Vector */}
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

                {/* Main Cards */}
                <View style={styles.cardsWrapper} {...panResponder.panHandlers}>
                    <View style={styles.fixedBulbContainer} pointerEvents="none">
                        <Image
                            source={require('../assets/vectors/Bulb.png')}
                            style={styles.bulbIcon}
                            resizeMode="contain"
                        />
                    </View>

                    <Animated.View style={[styles.pinkCardContainer, rearCardStyle]}>
                        <OnboardingBackCard
                            text={rearSlide.backText}
                            color={rearSlide.backColor}
                            textColor={rearSlide.backTextColor}
                            cardSize={{ width: 230, height: 120 }}
                            style={styles.pinkBackCard}
                        />
                    </Animated.View>

                    <Animated.View style={[styles.limeCardContainer, middleCardStyle]}>
                        <OnboardingBackCard
                            text={middleSlide.backText}
                            color={middleSlide.backColor}
                            textColor={middleSlide.backTextColor}
                            cardSize={{ width: 310, height: 140 }}
                            style={styles.limeBackCard}
                        />
                    </Animated.View>

                    <Animated.View style={[styles.cardContainer, frontCardStyle]}>
                        <OnboardingCard
                            title={frontSlide.title}
                            badgeText={frontSlide.badgeText}
                            description={frontSlide.description}
                            currentIndex={activeIndex}
                            totalCount={onboardingSlides.length}
                            imageSource={frontSlide.imageSource}
                            imageStyle={frontSlide.imageStyle}
                            cardColor={frontSlide.cardColor}
                            badgeColor={frontSlide.badgeColor}
                            dotColor={frontSlide.dotColor}
                            activeDotColor={frontSlide.activeDotColor}
                            inactiveDotColor={frontSlide.inactiveDotColor}
                            onDotPress={(index) => changeSlide(index)}
                        />
                    </Animated.View>
                </View>
                {/* Bottom buttons */}
                <View style={styles.buttonSection}>
                    <Button
                        title="Sign up"
                        variant="primary"
                        style={buttonHeightStyle}
                        onPress={() => { navigate('Main'); }}
                    />
                    <Button
                        title="Log in"
                        variant="outline"
                        style={buttonHeightStyle}
                        onPress={() => { navigate('Main'); }}
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
        top: -screenWidth * 0.10,
        left: 75,
        width: screenWidth,
        height: screenWidth * (1012 / 665),
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
    fixedBulbContainer: {
        position: 'absolute',
        top: -5,
        width: 230,
        height: 120,
        zIndex: 10,
    },
    bulbIcon: {
        position: 'absolute',
        top: 15,
        right: -60,
        width: 40,
        height: 40,
    },
    pinkCardContainer: {
        position: 'relative',
        zIndex: 1,
        top: -5,
    },
    pinkBackCard: {
        transform: [{ rotate: '-7.95deg' }],
    },
    limeCardContainer: {
        position: 'relative',
        zIndex: 2,
    },
    limeBackCard: {
        transform: [{ rotate: '7.47deg' }],
        marginTop: -55,
    },
    cardContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: -72,
        zIndex: 3,
    },
    buttonSection: {
        width: '100%',
        gap: Math.max(Math.round(6 * scale), 4),
    },
});