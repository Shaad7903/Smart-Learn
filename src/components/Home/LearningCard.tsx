import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Pressable,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BookOpen, Clock, Play } from 'lucide-react-native';
import Text from '../Text';
import { PRIMARY_COLOR, TEXT_COLOR } from '../../config/themes';
import { BlurView } from '@sbaiahmed1/react-native-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CARD_WIDTH = Math.min(Math.round(SCREEN_WIDTH * 0.74), 295);
export const CARD_HEIGHT = 380;
export const CARD_GAP = 10;

export interface LearningCardData {
    id: string;
    category: string;
    categoryColor?: string;
    title: string;
    lessonsCount?: number;
    durationMinutes?: number;
    backgroundColor: string;
    illustrationSource: ImageSourcePropType;
    icon?: React.ReactNode;
    onPressStart?: () => void;
    onPressCard?: () => void;
}

export interface LearningCardProps {
    data: LearningCardData;
    isLast?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const LearningCard: React.FC<LearningCardProps> = ({
    data,
    isLast = false,
    style,
}) => {
    const {
        category,
        categoryColor = '#708892',
        title,
        lessonsCount = 12,
        durationMinutes = 10,
        backgroundColor,
        illustrationSource,
        icon,
        onPressStart,
        onPressCard,
    } = data;

    return (
        <View style={styles.outerWrapper}>
            <Pressable
                style={({ pressed }) => [
                    styles.cardContainer,
                    { backgroundColor },
                    pressed && styles.cardContainerPressed,
                    style,
                ]}
                onPress={onPressCard}
                disabled={!onPressCard}
            >
                <View style={styles.vectorContainer} pointerEvents="none">
                    <Image source={require('../../assets/vectors/LearnCardVector.png')} style={styles.vectorImage} resizeMode="cover" />
                </View>

                <View style={styles.topRow}>
                    <View style={styles.iconCircle}>{icon}</View>

                    <View style={styles.metaGroup}>
                        <View style={styles.metaBadge}>
                            <BookOpen size={13} color="#161A34" strokeWidth={2} />
                            <Text weight="medium" style={styles.metaText}>
                                {lessonsCount} lessons
                            </Text>
                        </View>

                        <View style={styles.metaBadge}>
                            <Clock size={13} color="#161A34" strokeWidth={2} />
                            <Text weight="medium" style={styles.metaText}>
                                {durationMinutes} min
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.contentSection}>
                    <Text weight="medium" style={[styles.categoryText, { color: categoryColor }]}>
                        {category}
                    </Text>
                    <Text weight="medium" style={styles.titleText}>
                        {title}
                    </Text>
                </View>

                <View style={styles.illustrationWrapper} pointerEvents="none">
                    <Image
                        source={illustrationSource}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.bottomCardWrapper}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.bottomCard,
                            pressed && styles.bottomCardPressed,
                        ]}
                        onPress={onPressStart}
                    >
                        <BlurView
                            style={styles.blurView}
                            blurType="light"
                            blurAmount={1}
                        />
                        <Text weight="semiBold" style={styles.startLearningText}>
                            Start learning
                        </Text>
                        <View style={styles.playButton}>
                            <Play size={13} color={PRIMARY_COLOR} fill={PRIMARY_COLOR} />
                        </View>
                    </Pressable>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    outerWrapper: {
        position: 'relative',
        marginRight: 0,
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 36,
        paddingTop: 18,
        paddingHorizontal: 18,
        paddingBottom: 14,
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
    },
    cardContainerPressed: {
        opacity: 0.88,
    },
    vectorContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 300,
        height: 232,
        zIndex: 0,
    },
    vectorImage: {
        width: '100%',
        height: '100%',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 2,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    metaGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20,
    },
    metaText: {
        fontSize: 12,
        lineHeight: 16,
        color: '#161A34',
    },
    contentSection: {
        marginTop: 16,
        zIndex: 2,
    },
    categoryText: {
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 4,
    },
    titleText: {
        fontSize: 28,
        color: TEXT_COLOR,
        letterSpacing: -0.4,
        maxWidth: 180,
    },
    illustrationWrapper: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        zIndex: 1,
        marginBottom: -45,
    },
    illustration: {
        width: 210,
        height: 185,
    },
    bottomCardWrapper: {
        zIndex: 3,
        marginTop: 6,
    },
    bottomCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
        borderRadius: 30,
        overflow: 'hidden',
        paddingLeft: 20,
        paddingRight: 8,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    bottomCardPressed: {
        opacity: 0.75,
    },
    blurView: {
        ...StyleSheet.absoluteFill,
        borderRadius: 28,
    },
    startLearningText: {
        fontSize: 16,
        lineHeight: 22,
        color: '#163A45',
    },
    playButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 2,
        boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.06)',
        elevation: 2,
    },
});

export default LearningCard;
