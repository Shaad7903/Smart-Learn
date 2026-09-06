import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Pressable,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Svg, {
    Defs,
    Pattern,
    Path,
    Rect,
    Text as SvgText,
} from 'react-native-svg';
import { ChevronDown } from 'lucide-react-native';
import { BlurView } from '@sbaiahmed1/react-native-blur';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedProps,
    withTiming,
    withDelay,
    Easing,
    LinearTransition,
} from 'react-native-reanimated';
import Text from '../Text';
import { PRIMARY_COLOR } from '../../config/themes';

const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

export interface BarData {
    day: string;
    height: number;
    isActive?: boolean;
    badgeText?: string;
}

export interface SkillProgressCardProps {
    title?: string;
    subtitle?: string;
    categories?: string[];
    selectedCategory?: string;
    onSelectCategory?: (category: string) => void;
    timeframe?: string;
    onPressTimeframe?: () => void;
    style?: StyleProp<ViewStyle>;
}

const DEFAULT_CATEGORIES = ['Letters', 'Colors', 'Shapes', 'Animals'];

const BARS_DATA: BarData[] = [
    { day: 'Mon', height: 100 },
    { day: 'Tue', height: 155 },
    { day: 'Wed', height: 145 },
    { day: 'Thu', height: 190, isActive: true, badgeText: '+30%' },
    { day: 'Fri', height: 122 },
    { day: 'Sat', height: 90 },
    { day: 'Sun', height: 145 },
];

interface AnimatedBarProps {
    barX: number;
    baseLineY: number;
    targetHeight: number;
    barWidth: number;
    barRadius: number;
    isActive?: boolean;
    index: number;
}

const AnimatedBar: React.FC<AnimatedBarProps> = ({
    barX,
    baseLineY,
    targetHeight,
    barWidth,
    barRadius,
    isActive,
    index,
}) => {
    const growthProgress = useSharedValue(0);

    useEffect(() => {
        growthProgress.value = withDelay(
            index * 45,
            withTiming(1, { duration: 520, easing: smoothEase })
        );
    }, [growthProgress, index]);

    const animatedProps = useAnimatedProps(() => {
        const currentHeight = Math.max(growthProgress.value * targetHeight, 0);
        return {
            y: baseLineY - currentHeight,
            height: currentHeight,
        };
    });

    return (
        <AnimatedRect
            x={barX}
            width={barWidth}
            rx={barRadius}
            ry={barRadius}
            fill={isActive ? '#1C274C' : 'url(#diagonalStripes)'}
            animatedProps={animatedProps}
        />
    );
};

export const SkillProgressCard: React.FC<SkillProgressCardProps> = ({
    title = 'Skill progress',
    subtitle = 'Avg improvement this week',
    categories = DEFAULT_CATEGORIES,
    selectedCategory: controlledCategory,
    onSelectCategory,
    timeframe = 'This Week',
    onPressTimeframe,
    style,
}) => {
    const [internalCategory, setInternalCategory] = useState(categories[0]);
    const activeCategory = controlledCategory || internalCategory;

    const handleCategoryPress = (category: string) => {
        setInternalCategory(category);
        onSelectCategory?.(category);
    };

    const chartWidth = 350;
    const chartHeight = 250;
    const baseLineY = 200;
    const labelY = 230;
    const barWidth = 40;
    const barRadius = barWidth / 2;

    const activeBar = BARS_DATA.find((barItem) => barItem.isActive);
    const activeBarY = activeBar ? baseLineY - activeBar.height : 0;

    const badgeScale = useSharedValue(0.7);
    const badgeOpacity = useSharedValue(0);

    useEffect(() => {
        badgeScale.value = withDelay(
            380,
            withTiming(1, { duration: 320, easing: smoothEase })
        );
        badgeOpacity.value = withDelay(
            380,
            withTiming(1, { duration: 260, easing: smoothEase })
        );
    }, [badgeScale, badgeOpacity]);

    const badgeAnimatedStyle = useAnimatedStyle(() => ({
        opacity: badgeOpacity.value,
        transform: [{ scale: badgeScale.value }],
    }));

    return (
        <View style={[styles.container, style]}>
            <View style={styles.headerRow}>
                <View style={styles.titleWrapper}>
                    <Text weight="medium" style={styles.title}>
                        {title}
                    </Text>
                    <Text weight="medium" style={styles.subtitle}>
                        {subtitle}
                    </Text>
                </View>

                <Pressable
                    style={({ pressed }) => [
                        styles.timeframeButton,
                        pressed && styles.timeframeButtonPressed,
                    ]}
                    onPress={onPressTimeframe}
                >
                    <Text weight="medium" style={styles.timeframeText}>
                        {timeframe}
                    </Text>
                    <ChevronDown size={14} color="#161A34" strokeWidth={2.2} />
                </Pressable>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesScroll}
                style={styles.categoriesWrapper}
            >
                {categories.map((category) => {
                    const isSelected = category === activeCategory;

                    return (
                        <Pressable
                            key={category}
                            onPress={() => handleCategoryPress(category)}
                            style={({ pressed }) => [
                                styles.categoryPill,
                                isSelected ? styles.activeCategoryPill : styles.inactiveCategoryPill,
                                pressed && { opacity: 0.75 },
                            ]}
                        >
                            <Text
                                weight="medium"
                                style={[
                                    styles.categoryText,
                                    isSelected ? styles.activeCategoryText : styles.inactiveCategoryText,
                                ]}
                            >
                                {category}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>

            <View style={styles.chartContainer}>
                <Svg
                    width="100%"
                    height={chartHeight}
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                >
                    <Defs>
                        <Pattern
                            id="diagonalStripes"
                            width="5"
                            height="5"
                            patternTransform="rotate(45 0 0)"
                            patternUnits="userSpaceOnUse"
                        >
                            <Path
                                d="M 0,0 L 0,5.5"
                                stroke="#1C274C"
                                strokeWidth="1.6"
                            />
                        </Pattern>
                    </Defs>

                    {BARS_DATA.map((bar, index) => {
                        const columnWidth = chartWidth / BARS_DATA.length;
                        const centerX = (index + 0.5) * columnWidth;
                        const barX = centerX - barWidth / 2;

                        return (
                            <React.Fragment key={bar.day}>
                                <AnimatedBar
                                    barX={barX}
                                    baseLineY={baseLineY}
                                    targetHeight={bar.height}
                                    barWidth={barWidth}
                                    barRadius={barRadius}
                                    isActive={bar.isActive}
                                    index={index}
                                />

                                <SvgText
                                    x={centerX}
                                    y={labelY}
                                    textAnchor="middle"
                                    fill="#080C1E"
                                    fontSize="13.5"
                                    fontWeight="500"
                                    fontFamily="Inter-Medium"
                                >
                                    {bar.day}
                                </SvgText>
                            </React.Fragment>
                        );
                    })}
                </Svg>

                {activeBar && (
                    <Animated.View
                        style={[
                            styles.badgeContainer,
                            { top: activeBarY - 25 },
                            badgeAnimatedStyle,
                        ]}
                        pointerEvents="none"
                    >
                        <BlurView
                            style={StyleSheet.absoluteFill}
                            blurType="light"
                            blurAmount={52}
                            overlayColor="rgba(255, 255, 255, 0.2)"
                            reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.2)"
                        />
                        <Text weight="semiBold" style={styles.badgeText}>
                            {activeBar.badgeText || '+30%'}
                        </Text>
                    </Animated.View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBF3FA',
        borderRadius: 32,
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    titleWrapper: {
        flex: 1,
    },
    title: {
        fontSize: 26,
        lineHeight: 32,
        letterSpacing: -0.3,
        color: '#080C1E',
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 18,
        color: '#708892',
        marginTop: 4,
    },
    timeframeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 6,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
    },
    timeframeButtonPressed: {
        opacity: 0.75,
    },
    timeframeText: {
        fontSize: 13,
        lineHeight: 16,
        color: '#161A34',
    },
    categoriesWrapper: {
        marginTop: 20,
    },
    categoriesScroll: {
        gap: 6,
    },
    categoryPill: {
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeCategoryPill: {
        backgroundColor: PRIMARY_COLOR,
    },
    inactiveCategoryPill: {
        borderWidth: 1,
        borderColor: '#0000000D',
    },
    categoryText: {
        fontSize: 14,
        lineHeight: 18,
    },
    activeCategoryText: {
        color: '#FFFFFF',
    },
    inactiveCategoryText: {
        color: '#080C1E',
    },
    chartContainer: {
        marginTop: 24,
        width: '100%',
        position: 'relative',
    },
    badgeContainer: {
        position: 'absolute',
        left: '50%',
        marginLeft: -21,
        width: 42,
        height: 42,
        borderRadius: 21,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        lineHeight: 14,
        textAlign: 'center',
        includeFontPadding: false,
    },
});

export default SkillProgressCard;
