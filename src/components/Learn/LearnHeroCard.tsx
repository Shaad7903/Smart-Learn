import React from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Image,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react-native';
import { BlurView } from '@sbaiahmed1/react-native-blur';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInRight,
    Easing,
} from 'react-native-reanimated';
import Text from '../Text';
import ProgressRing from './ProgressRing';
import { TEXT_COLOR } from '../../config/themes';

const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);

export interface LearnHeroCardProps {
    onPressBack?: () => void;
    category?: string;
    title?: string;
    lessonsCountText?: string;
    durationText?: string;
    buddySubtitle?: string;
    buddyTitle?: string;
    progressPercentage?: number;
    paddingTop?: number;
    style?: StyleProp<ViewStyle>;
}

export const LearnHeroCard: React.FC<LearnHeroCardProps> = ({
    onPressBack,
    category = 'Letters',
    title = 'Learn ABC with\nfun sounds',
    lessonsCountText = '26 lessons',
    durationText = '1hr 30 min',
    buddySubtitle = 'Your A.i buddy',
    buddyTitle = 'You’re learning great today!',
    progressPercentage = 12,
    paddingTop = 20,
    style,
}) => {
    return (
        <View style={[styles.heroCard, { paddingTop }, style]}>
            <Animated.View
                entering={FadeIn.delay(60).duration(400).easing(smoothEase)}
                style={styles.vectorContainer}
                pointerEvents="none"
            >
                <Image
                    source={require('../../assets/vectors/LearnHeroVector.png')}
                    style={styles.vectorImage}
                    resizeMode="contain"
                />
            </Animated.View>

            <Animated.View
                entering={FadeInRight.delay(80).duration(420).easing(smoothEase)}
                style={styles.illustrationAbsolute}
                pointerEvents="none"
            >
                <Image
                    source={require('../../assets/images/LetterHeroImage.png')}
                    style={styles.boyImage}
                    resizeMode="contain"
                />
            </Animated.View>

            <Animated.View
                entering={FadeIn.delay(40).duration(260)}
                style={styles.topBar}
            >
                <Pressable
                    style={({ pressed }) => [
                        styles.backButton,
                        pressed && styles.backButtonPressed,
                    ]}
                    onPress={onPressBack}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <ArrowLeft size={20} color="#161A34" strokeWidth={2.4} />
                </Pressable>
            </Animated.View>

            <Animated.View
                entering={FadeInDown.delay(70).duration(360).easing(smoothEase)}
                style={styles.headerContentSection}
            >
                <Text weight="medium" style={styles.categoryLabel}>
                    {category}
                </Text>
                <Text weight="medium" style={styles.mainTitle}>
                    {title}
                </Text>

                <Animated.View
                    entering={FadeInDown.delay(120).duration(360).easing(smoothEase)}
                    style={styles.badgesRow}
                >
                    <View style={styles.metaBadge}>
                        <BookOpen size={13} color="#161A34" strokeWidth={2.2} />
                        <Text weight="medium" style={styles.metaBadgeText}>
                            {lessonsCountText}
                        </Text>
                    </View>
                    <View style={styles.metaBadge}>
                        <Clock size={13} color="#161A34" strokeWidth={2.2} />
                        <Text weight="medium" style={styles.metaBadgeText}>
                            {durationText}
                        </Text>
                    </View>
                </Animated.View>
            </Animated.View>

            <Animated.View
                entering={FadeInDown.delay(180).duration(400).easing(smoothEase)}
                style={styles.aiCardWrapper}
            >
                <View style={styles.aiCard}>
                    <BlurView
                        style={StyleSheet.absoluteFill}
                        blurType="light"
                        blurAmount={43}
                    />
                    <View style={styles.aiCardGlassTint} />

                    <View style={styles.aiCardInner}>
                        <Image
                            source={require('../../assets/images/AIBuddy.png')}
                            style={styles.aiBuddyAvatar}
                            resizeMode="contain"
                        />

                        <View style={styles.aiTextContainer}>
                            <Text weight="medium" style={styles.aiSubtitle}>
                                {buddySubtitle}
                            </Text>
                            <Text weight="medium" style={styles.aiTitle}>
                                {buddyTitle}
                            </Text>
                        </View>

                        <ProgressRing
                            percentage={progressPercentage}
                            size={64}
                            strokeWidth={5.4}
                        />
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    heroCard: {
        backgroundColor: '#DFF28A',
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        overflow: 'hidden',
        paddingHorizontal: 20,
        position: 'relative',
    },
    vectorContainer: {
        position: 'absolute',
        top: 5,
        right: -100,
        width: 390,
        height: 300,
        zIndex: 0,
    },
    vectorImage: {
        width: '100%',
        height: '100%',
    },
    illustrationAbsolute: {
        position: 'absolute',
        right: -40,
        top: 50,
        width: 250,
        height: 350,
        zIndex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    boyImage: {
        width: 300,
        height: 350,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        zIndex: 5,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF66',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonPressed: {
        opacity: 0.75,
        transform: [{ scale: 0.96 }],
    },
    headerContentSection: {
        width: '58%',
        zIndex: 2,
        paddingTop: 2,
    },
    categoryLabel: {
        fontSize: 14.5,
        color: '#708892',
        marginBottom: 6,
    },
    mainTitle: {
        fontSize: 27,
        lineHeight: 33,
        color: TEXT_COLOR,
        letterSpacing: -0.5,
    },
    badgesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginTop: 14,
    },
    metaBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#FFFFFF4A',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 18,
    },
    metaBadgeText: {
        fontSize: 12,
        color: '#161A34',
    },
    aiCardWrapper: {
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 28,
        zIndex: 3,
    },
    aiCard: {
        borderRadius: 28,
        overflow: 'hidden',
        borderWidth: 0,
        borderColor: '#FFFFFF66',
        position: 'relative',
    },
    aiCardGlassTint: {
        ...StyleSheet.absoluteFill,
        backgroundColor: '#FFFFFF66',
    },
    aiCardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    aiBuddyAvatar: {
        width: 50,
        height: 50,
    },
    aiTextContainer: {
        flex: 1,
        marginLeft: 12,
        paddingRight: 8,
    },
    aiSubtitle: {
        fontSize: 12,
        color: '#01000080',
        marginBottom: 1,
    },
    aiTitle: {
        fontSize: 14,
        color: '#161A34',
        lineHeight: 20,
    },
});

export default LearnHeroCard;
