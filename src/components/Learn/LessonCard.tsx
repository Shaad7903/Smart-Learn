import React from 'react';
import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Clock, Play } from 'lucide-react-native';
import Text from '../Text';
import { LessonStep } from '../../types';
import { PRIMARY_COLOR, TEXT_COLOR } from '../../config/themes';

export interface LessonCardProps {
    lesson: LessonStep;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const LessonCard: React.FC<LessonCardProps> = ({
    lesson,
    onPress,
    style,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.lessonCard,
                { backgroundColor: lesson.backgroundColor },
                style,
                pressed && styles.lessonCardPressed,
            ]}
        >
            <View style={styles.cardTopRow}>
                <Text weight="medium" style={styles.cardTitle}>
                    {lesson.title}
                </Text>

                <View style={styles.durationPill}>
                    <Clock size={13} color="#073647" strokeWidth={2.4} />
                    <Text weight="semiBold" style={styles.durationText}>
                        {lesson.duration}
                    </Text>
                </View>
            </View>

            <View style={styles.cardBottomRow}>
                <Text weight="medium" style={styles.cardDescription}>
                    {lesson.description}
                </Text>

                <View style={styles.actionPill}>
                    <Text weight="semiBold" style={styles.actionText}>
                        {lesson.actionText}
                    </Text>
                    <View
                        style={[
                            styles.playCircle,
                        ]}
                    >
                        <Play size={8.5} color="#FFFFFF" fill="#FFFFFF" />
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    lessonCard: {
        flex: 1,
        borderRadius: 24,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    lessonCardPressed: {
        opacity: 0.88,
        transform: [{ scale: 0.985 }],
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    cardTitle: {
        fontSize: 17,
        color: TEXT_COLOR,
        letterSpacing: -0.3,
    },
    durationPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#FFFFFF61',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4.5,
    },
    durationText: {
        fontSize: 12,
        color: "#073647",
    },
    cardBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    cardDescription: {
        flex: 1,
        fontSize: 11.5,
        lineHeight: 16,
        color: '#01000080',
        marginRight: 8,
    },
    actionPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingLeft: 11,
        paddingRight: 5,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    actionText: {
        fontSize: 11.5,
        color: '#073647',
    },
    playCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 1,
        backgroundColor: PRIMARY_COLOR
    },
});

export default LessonCard;
