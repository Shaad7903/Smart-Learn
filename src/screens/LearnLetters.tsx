import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Animated as RNAnimated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import Animated, { FadeInDown, Easing } from 'react-native-reanimated';
import { LessonCard, TimelineNode, LearnHeroCard } from '../components';
import { LessonStep } from '../types';

const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);
const { width: screenWidth } = Dimensions.get('window');
const bottomGradientHeight = 160;

const lessons: LessonStep[] = [
    {
        id: '1',
        stepNumber: 1,
        title: 'A for Apple',
        description: 'Learn the sound of A and objects that start with A',
        duration: '2 min',
        actionText: 'Replay',
        backgroundColor: '#F4EFD7',
        status: 'completed',
    },
    {
        id: '2',
        stepNumber: 2,
        title: 'B for Ball',
        description: 'Recognize the letter B and its phonetic sound',
        duration: '3 min',
        actionText: 'Continue',
        backgroundColor: '#FFE9E9',
        status: 'current',
    },
    {
        id: '3',
        stepNumber: 3,
        title: 'D for Dog',
        description: 'Hear and repeat the D sound',
        duration: '5 min',
        actionText: 'Start Lesson',
        backgroundColor: '#D7EAF8',
        status: 'locked',
    },
    {
        id: '4',
        stepNumber: 4,
        title: 'C for Cat',
        description: 'Learn the “C” sound with fun animations',
        duration: '10 min',
        actionText: 'Start Lesson',
        backgroundColor: '#E5CDFF',
        status: 'locked',
    },
    {
        id: '5',
        stepNumber: 5,
        title: 'E for Elephant',
        description: 'Learn the sound of E and words',
        duration: '10 min',
        actionText: 'Start Lesson',
        backgroundColor: '#F9E9DC',
        status: 'locked',
    },
];

const LearnLetters = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const gradientOpacity = useRef(new RNAnimated.Value(1)).current;
    const isScrolledToBottom = useRef(false);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const reachedBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;

        if (reachedBottom !== isScrolledToBottom.current) {
            isScrolledToBottom.current = reachedBottom;
            RNAnimated.timing(gradientOpacity, {
                toValue: reachedBottom ? 0 : 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    };

    const completedLessonsCount = lessons.filter(
        (lesson) => lesson.status === 'completed'
    ).length;

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: Math.max(insets.bottom, 20) + 20 },
                ]}
                bounces={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <LearnHeroCard
                    paddingTop={Math.max(insets.top + 8, 20)}
                    onPressBack={() => navigation.goBack()}
                />

                <View style={styles.timelineSection}>
                    {lessons.map((lesson, index) => {
                        const isFirst = index === 0;
                        const isLast = index === lessons.length - 1;

                        return (
                            <Animated.View
                                key={lesson.id}
                                entering={FadeInDown.delay(230 + index * 55).duration(360).easing(smoothEase)}
                                style={[
                                    styles.timelineRow,
                                    { zIndex: index + 1 },
                                ]}
                            >
                                <TimelineNode
                                    status={lesson.status}
                                    number={lesson.stepNumber}
                                    isFirst={isFirst}
                                    isLast={isLast}
                                    index={index}
                                    completedCount={completedLessonsCount}
                                />

                                <LessonCard lesson={lesson} />
                            </Animated.View>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Bottom white fadeaway */}

            <RNAnimated.View
                style={[
                    styles.bottomFadeOverlay,
                    { opacity: gradientOpacity },
                ]}
                pointerEvents="none"
            >
                <Svg width={screenWidth} height={bottomGradientHeight} style={StyleSheet.absoluteFill}>
                    <Defs>
                        <LinearGradient id="bottomFadeGrad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                            <Stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.25" />
                            <Stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.7" />
                            <Stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.95" />
                            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Rect width={screenWidth} height={bottomGradientHeight} fill="url(#bottomFadeGrad)" />
                </Svg>
            </RNAnimated.View>
        </View>
    );
};

export default LearnLetters;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    timelineSection: {
        paddingTop: 24,
        paddingHorizontal: 12,
    },
    timelineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        position: 'relative',
    },
    bottomFadeOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: bottomGradientHeight,
        zIndex: 20,
    },
});