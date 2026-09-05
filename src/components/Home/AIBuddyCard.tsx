import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Pressable,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Text from '../Text';
import { PRIMARY_COLOR, TEXT_COLOR } from '../../config/themes';
import { BookOpen, Clock, Play } from 'lucide-react-native';
import { BlurView } from '@react-native-community/blur';

export interface AIBuddyCardProps {
    buddyName?: string;
    buddyMessage?: string;
    topicTitle?: string;
    lessonsCount?: number;
    durationMinutes?: number;
    progressPercentage?: number;
    onPressPlay?: () => void;
    onPressCard?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const AIBuddyCard: React.FC<AIBuddyCardProps> = ({
    buddyName = 'Your A.i buddy',
    buddyMessage = 'You’re learning great today!',
    topicTitle = 'Today’s pick: Shapes',
    lessonsCount = 12,
    durationMinutes = 10,
    progressPercentage = 20,
    onPressPlay,
    onPressCard,
    style,
}) => {
    // Math for circular progress ring (matches the ~76% black arc in the mockup)
    const ringSize = 48;
    const strokeWidth = 3.5;
    const center = ringSize / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    // The design mockup shows a prominent ~76% progress arc with the gap on the upper right
    const arcCoverage = 0.76;
    const strokeDashoffset = circumference * (1 - arcCoverage);

    return (
        <Pressable
            style={[styles.container, style]}
            onPress={onPressCard}
            disabled={!onPressCard}
        >
            {/* Background Decorative Vector */}
            <Image
                source={require('../../assets/vectors/AIbuddycardVector.png')}
                style={styles.cardBgVector}
                resizeMode="contain"
            />

            {/* Top Section */}
            <View style={styles.topSection}>
                {/* Left: AI Buddy Avatar & Speech */}
                <View style={styles.buddyInfoWrapper}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('../../assets/images/AIBuddy.png')}
                            style={styles.buddyAvatar}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.speechContainer}>
                        <Text weight="medium" style={styles.buddyNameText}>
                            {buddyName}
                        </Text>
                        <Text weight="medium" style={styles.buddyMessageText}>
                            {buddyMessage}
                        </Text>
                    </View>
                </View>

                <Image
                    source={require('../../assets/images/Girl_Running.png')}
                    style={styles.girlIllustration}
                    resizeMode="contain"
                />
                <Image
                    source={require('../../assets/vectors/Bulb.png')}
                    style={styles.bulb}
                    resizeMode="contain"
                />
            </View>

            {/* Bottom Section: White Card */}
            <View style={styles.whiteCardContainer}>
                <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="light"
                    blurAmount={7}
                    overlayColor="rgba(255, 255, 255, 0.5)"
                />
                <View style={styles.whiteCard}>
                    {/* Left Stuff*/}
                    <View style={styles.topicInfo}>
                        <Text weight="medium" style={styles.topicTitleText}>
                            {topicTitle}
                        </Text>

                        <View style={styles.metaRow}>
                            <BookOpen size={14} color="#708892" strokeWidth={2} />
                            <Text weight="medium" style={styles.metaText}>
                                {lessonsCount} lessons
                            </Text>

                            <Text style={styles.metaDot}>•</Text>

                            <Clock size={14} color="#708892" strokeWidth={2} />
                            <Text weight="medium" style={styles.metaText}>
                                {durationMinutes} min
                            </Text>
                        </View>
                    </View>

                    {/* Right Stuff */}
                    <View style={styles.progressWrapper}>
                        <Text style={styles.progressText}>
                            <Text weight="normal" style={styles.progressPercentText}>
                                {progressPercentage}%
                            </Text>{' '}
                            <Text weight="normal" style={styles.progressLabelText}>
                                complete
                            </Text>
                        </Text>

                        {/* Circular Progress Play Button */}
                        <Pressable
                            style={styles.playButton}
                            onPress={onPressPlay}
                            disabled={!onPressPlay}
                        >
                            <Svg width={ringSize} height={ringSize}>
                                {/* Track Circle */}
                                <Circle
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    stroke="#EBF0F8"
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                />
                                {/* Progress Arc */}
                                <Circle
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    stroke="#161A34"
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={`${circumference} ${circumference}`}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    fill="none"
                                    transform={`rotate(50 ${center} ${center})`}
                                />
                            </Svg>

                            <View style={styles.playIconWrapper} pointerEvents="none">
                                <Play color={PRIMARY_COLOR} size={15} fill={PRIMARY_COLOR} />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBF1FA',
        borderRadius: 32,
        marginHorizontal: 20,
        marginTop: 34,
        overflow: 'visible',
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 24,
        position: 'relative',
    },
    buddyInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        zIndex: 2,
        maxWidth: '68%',
    },
    avatarContainer: {
        position: 'relative',
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buddyAvatar: {
        width: 55,
        height: 55,
    },
    speechContainer: {
        justifyContent: 'center',
    },
    buddyNameText: {
        fontSize: 12,
        letterSpacing: -0.132,
        lineHeight: 16,
        color: '#708892',
    },
    buddyMessageText: {
        fontSize: 14,
        letterSpacing: -0.2,
        lineHeight: 20,
        color: TEXT_COLOR,
        marginTop: 2,
    },
    girlIllustration: {
        position: 'absolute',
        right: 8,
        top: -24,
        width: 108,
        height: 138,
        zIndex: 5,
    },
    cardBgVector: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    bulb: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
        width: 40,
        height: 40,
    },
    whiteCardContainer: {
        borderRadius: 32,
        overflow: 'hidden',
        marginHorizontal: 2,
        marginBottom: 2,
        zIndex: 10,
    },
    whiteCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        paddingHorizontal: 16,
        paddingVertical: 23,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.65)',
    },
    topicInfo: {
        justifyContent: 'center',
        flex: 1,
    },
    topicTitleText: {
        fontSize: 14,
        lineHeight: 20,
        color: TEXT_COLOR,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    metaText: {
        fontSize: 12,
        lineHeight: 16,
        color: '#708892',
    },
    metaDot: {
        fontSize: 12,
        color: '#708892',
        marginHorizontal: 1,
    },
    progressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressText: {
        fontSize: 13,
        lineHeight: 16,
    },
    progressPercentText: {
        color: '#161A34',
    },
    progressLabelText: {
        color: '#708892',
    },
    playButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: '0px 2px 10px 0px #CED5DD',
        shadowColor: '#CED5DD',
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 2,
    },
    playIconWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 2,
    },
});


export default AIBuddyCard;
