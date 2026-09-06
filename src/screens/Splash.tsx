import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    StatusBar,
    Image,
    Dimensions,
    Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { BG_COLOR, PRIMARY_COLOR } from '../config/themes';
import { reset } from '../services/NavigationService';
import { Text } from '../components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const baseWidth = 375;
const baseHeight = 812;
const scale = Math.min(Math.max(Math.min(screenWidth / baseWidth, screenHeight / baseHeight), 0.72), 1);
const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);

const Splash = () => {
    const fadeAnimation = useRef(new Animated.Value(0)).current;
    const scaleAnimation = useRef(new Animated.Value(0.92)).current;
    const footerFadeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 850,
                easing: smoothEase,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnimation, {
                toValue: 1,
                duration: 850,
                easing: smoothEase,
                useNativeDriver: true,
            }),
            Animated.timing(footerFadeAnimation, {
                toValue: 1,
                duration: 650,
                delay: 350,
                easing: smoothEase,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnimation, scaleAnimation, footerFadeAnimation]);

    useEffect(() => {
        const timer = setTimeout(() => {
            reset('OnBoarding');
        }, 2600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <SafeAreaView style={styles.safeContent}>
                {/* Center Section */}
                <View style={styles.centerSection}>
                    <Animated.View
                        style={[
                            styles.logoWrapper,
                            {
                                opacity: fadeAnimation,
                                transform: [{ scale: scaleAnimation }],
                            },
                        ]}
                    >
                        <View style={styles.outerBadge}>
                            <View style={styles.badge}>
                                <Image
                                    source={require('../assets/images/Logo.png')}
                                    style={styles.logo}
                                />
                            </View>
                        </View>
                        <Text weight="bold" style={styles.brandTitle}>
                            SmartLearn
                        </Text>
                        <Text weight="medium" style={styles.brandSubtitle}>
                            Empower Your Learning Journey
                        </Text>
                    </Animated.View>
                </View>

                {/* Bottom Lottie */}
                <Animated.View style={[styles.footerSection, { opacity: footerFadeAnimation }]}>
                    <LottieView
                        source={require('../assets/lottie/PrimaryLoader.json')}
                        autoPlay
                        loop
                        style={styles.loader}
                    />
                    <Text weight="medium" style={styles.footerText}>
                        SmartLearn Platform v1.0
                    </Text>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    backgroundArcContainer: {
        position: 'absolute',
        top: -screenWidth * 0.1,
        left: 75,
        width: screenWidth,
        height: screenWidth * (1012 / 665),
        zIndex: 0,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    safeContent: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Math.round(36 * scale),
        paddingHorizontal: 24,
        zIndex: 1,
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoWrapper: {
        alignItems: 'center',
    },
    outerBadge: {
        width: Math.round(116 * scale),
        height: Math.round(116 * scale),
        borderRadius: Math.round(58 * scale),
        backgroundColor: '#F0F4F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Math.round(18 * scale),
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 3,
    },
    badge: {
        width: Math.round(92 * scale),
        height: Math.round(92 * scale),
        borderRadius: Math.round(46 * scale),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: Math.round(48 * scale),
        height: Math.round(36 * scale),
        resizeMode: 'contain',
    },
    brandTitle: {
        fontSize: Math.round(30 * scale),
        color: PRIMARY_COLOR,
        letterSpacing: -0.4,
        textAlign: 'center',
    },
    brandSubtitle: {
        fontSize: Math.round(14 * scale),
        color: '#64748B',
        marginTop: 8,
        letterSpacing: 0.1,
        textAlign: 'center',
    },
    footerSection: {
        alignItems: 'center',
    },
    loader: {
        width: Math.round(120 * scale),
        height: Math.round(60 * scale),
        marginBottom: 4,
    },
    footerText: {
        fontSize: Math.round(12 * scale),
        color: '#94A3B8',
        letterSpacing: 0.2,
    },
});

export default Splash;
