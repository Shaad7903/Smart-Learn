import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Pressable,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { X } from 'lucide-react-native';
import Text from '../Text';

export interface DayProgress {
    day: string;
    completed: boolean;
    isCurrent?: boolean;
}

export interface StreakCardProps {
    currentScore?: number;
    targetScore?: number;
    tipMessage?: string;
    activeDayIndex?: number;
    style?: StyleProp<ViewStyle>;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const StreakCard: React.FC<StreakCardProps> = ({
    currentScore = 3822,
    targetScore = 5000,
    tipMessage = 'You learn best with quick 5-min lessons.',
    activeDayIndex = 3,
    style,
}) => {
    const [isTipVisible, setIsTipVisible] = useState(true);

    const fillPercent = Math.min(Math.max(((activeDayIndex + 0.5) / DAYS.length) * 100, 0), 100);

    return (
        <View style={[styles.container, style]}>
            <View style={styles.topRow}>
                <Text weight="medium" style={styles.title}>
                    Your streak
                </Text>

                <View style={styles.scorePill}>
                    <Text weight="bold" style={styles.currentScoreText}>
                        {currentScore}
                    </Text>
                    <Text weight="medium" style={styles.targetScoreText}>
                        /{targetScore}
                    </Text>
                </View>
            </View>

            <View style={styles.trackerWrapper}>
                <View style={styles.trackContainer}>
                    <View style={[styles.activeTrackFill, { width: `${fillPercent}%` }]} />

                    <View style={styles.ticksRow}>
                        {DAYS.map((dayItem, index) => {
                            const isCompleted = index < activeDayIndex;
                            const isCurrent = index === activeDayIndex;

                            return (
                                <View key={index} style={styles.tickColumn}>
                                    {!isCurrent && (
                                        <View
                                            style={[
                                                styles.tickMark,
                                                isCompleted ? styles.completedTick : styles.inactiveTick,
                                            ]}
                                        />
                                    )}
                                </View>
                            );
                        })}
                    </View>

                    <View
                        style={[
                            styles.flameBadgeContainer,
                            { left: `${fillPercent}%` },
                        ]}
                    >
                        <View style={styles.flameBadge}>
                            <Image
                                source={require('../../assets/vectors/Flame.png')}
                                style={styles.flameIcon}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.daysLabelsRow}>
                    {DAYS.map((day, index) => {
                        const isCompleted = index < activeDayIndex;
                        const isCurrent = index === activeDayIndex;

                        return (
                            <View key={day} style={styles.dayLabelColumn}>
                                <Text
                                    weight="medium"
                                    style={[
                                        styles.dayText,
                                        isCurrent
                                            ? styles.currentDayText
                                            : isCompleted
                                                ? styles.completedDayText
                                                : styles.inactiveDayText,
                                    ]}
                                >
                                    {day}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>

            {isTipVisible && (
                <View style={styles.tipBanner}>
                    <View style={styles.tipLeftContent}>
                        <Image
                            source={require('../../assets/images/AIBuddy.png')}
                            style={styles.tipBuddyIcon}
                            resizeMode="contain"
                        />
                        <Text weight="medium" style={styles.tipText}>
                            {tipMessage}
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => setIsTipVisible(false)}
                        style={({ pressed }) => [styles.closeButton, pressed && { opacity: 0.6 }]}
                        hitSlop={8}
                    >
                        <X size={15} color="#080C1E" strokeWidth={2.4} />
                    </Pressable>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F180',
        borderRadius: 32,
        padding: 20,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 26,
        lineHeight: 32,
        letterSpacing: -0.3,
        color: '#080C1E',
    },
    scorePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.04)',
    },
    currentScoreText: {
        fontSize: 15,
        lineHeight: 20,
        color: '#080C1E',
    },
    targetScoreText: {
        fontSize: 15,
        lineHeight: 20,
        color: '#708892',
    },
    trackerWrapper: {
        marginTop: 22,
    },
    trackContainer: {
        height: 52,
        backgroundColor: '#FFFFFF',
        borderRadius: 26,
        position: 'relative',
        justifyContent: 'center',
        overflow: 'visible',
    },
    activeTrackFill: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#5AA02B30',
        borderTopLeftRadius: 26,
        borderBottomLeftRadius: 26,
    },
    ticksRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    tickColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tickMark: {
        width: 1.8,
        height: 14,
        borderRadius: 1,
    },
    completedTick: {
        backgroundColor: '#5AA02B',
    },
    inactiveTick: {
        backgroundColor: '#1C274C1A',
    },
    flameBadgeContainer: {
        position: 'absolute',
        top: '50%',
        marginTop: -25,
        marginLeft: -25,
        zIndex: 5,
    },
    flameBadge: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    flameIcon: {
        width: 26,
        height: 26,
    },
    daysLabelsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    dayLabelColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 14,
        lineHeight: 18,
    },
    completedDayText: {
        color: '#080C1E',
    },
    currentDayText: {
        color: '#557A8B',
    },
    inactiveDayText: {
        color: '#8E9FA8',
    },
    tipBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginTop: 20,
    },
    tipLeftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
        paddingRight: 8,
    },
    tipBuddyIcon: {
        width: 32,
        height: 32,
    },
    tipText: {
        fontSize: 13,
        lineHeight: 18,
        color: '#080C1E',
        flex: 1,
    },
    closeButton: {
        padding: 4,
    },
});

export default StreakCard;
