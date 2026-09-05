import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    StatusBar,
    Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { BG_COLOR, TEXT_COLOR } from '../config/themes';
import { reset } from '../services/NavigationService';
import { Text } from '../components';

const Splash = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.85)).current;
    const footerFade = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(footerFade, {
                toValue: 1,
                duration: 800,
                delay: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, scaleAnim, footerFade]);

    useEffect(() => {
        setTimeout(() => {
            reset('OnBoarding');
        }, 3000)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.centerContent}>
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <View style={styles.outerBadge}>
                        <View style={styles.badge}>
                            <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
                        </View>
                    </View>
                    <Text weight="extraBold" style={styles.brandTitle}>SmartLearn</Text>
                    <Text weight="medium" style={styles.brandSubtitle}>Empower Your Learning Journey</Text>
                </Animated.View>
            </View>

            <Animated.View style={[styles.footer, { opacity: footerFade }]}>
                <LottieView
                    source={require('../assets/lottie/PrimaryLoader.json')}
                    autoPlay
                    loop
                    style={styles.loader}
                />
                <Text style={styles.footerText}>SmartLearn Platform v1.0</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 24,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    badge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    badgeIcon: {
        fontSize: 46,
    },
    brandTitle: {
        fontSize: 34,
        color: TEXT_COLOR,
        letterSpacing: 0.5,
    },
    brandSubtitle: {
        fontSize: 15,
        color: TEXT_COLOR,
        marginTop: 8,
        letterSpacing: 0.2,
    },
    footer: {
        alignItems: 'center',
    },
    loader: {
        width: 200,
        height: 100,
        marginBottom: 8,
    },
    footerText: {
        fontSize: 12,
        color: TEXT_COLOR,
    },
});

export default Splash;
