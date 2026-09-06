import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    useAnimatedProps,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import Text from '../Text';
import { TimelineNodeProps } from '../../types';

const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const nodeSize = 80;
const trackWidth = 7.5;
const innerNodeSize = 52;

export const TimelineNode: React.FC<TimelineNodeProps> = ({
    status,
    number,
    isFirst,
    isLast,
    index = 0,
    completedCount = 1,
}) => {
    const size = nodeSize;
    const strokeWidth = trackWidth;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const connectorHeight = 160;

    const spineProgress = useSharedValue(0);
    const circleProgress = useSharedValue(0);
    const gradientProgress = useSharedValue(0);
    const badgeScale = useSharedValue(status === 'locked' ? 1 : 0.88);
    const badgeOpacity = useSharedValue(status === 'locked' ? 1 : 0.3);

    React.useEffect(() => {
        if (status === 'completed') {
            badgeScale.value = withDelay(
                160 + index * 90,
                withTiming(1, { duration: 320, easing: smoothEase })
            );
            badgeOpacity.value = withDelay(
                160 + index * 90,
                withTiming(1, { duration: 250, easing: smoothEase })
            );

            spineProgress.value = withDelay(
                260 + index * 380,
                withTiming(1, { duration: 420, easing: smoothEase })
            );
        } else if (status === 'current') {
            const arrivalDelay = 260 + completedCount * 380;

            badgeScale.value = withDelay(
                arrivalDelay,
                withTiming(1, { duration: 300, easing: smoothEase })
            );
            badgeOpacity.value = withDelay(
                arrivalDelay,
                withTiming(1, { duration: 240, easing: smoothEase })
            );

            circleProgress.value = withDelay(
                arrivalDelay + 40,
                withTiming(1, { duration: 460, easing: smoothEase })
            );

            gradientProgress.value = withDelay(
                arrivalDelay + 360,
                withTiming(1, { duration: 340, easing: smoothEase })
            );
        }
    }, [status, index, completedCount]);

    const spineStyle = useAnimatedStyle(() => ({
        height: spineProgress.value * connectorHeight,
    }));

    const gradientStyle = useAnimatedStyle(() => ({
        height: gradientProgress.value * 100,
    }));

    const badgeStyle = useAnimatedStyle(() => ({
        transform: [{ scale: badgeScale.value }],
        opacity: badgeOpacity.value,
    }));

    const arcAnimatedProps = useAnimatedProps(() => ({
        strokeDashoffset: (circumference * 0.82) * (1 - circleProgress.value),
    }));

    return (
        <View style={styles.nodeWrapper}>
            {!isLast && (
                <>
                    <View
                        style={[
                            styles.spineTrack,
                            {
                                top: size / 2,
                                height: connectorHeight,
                                backgroundColor: '#F2F4F7',
                                zIndex: 1,
                            },
                        ]}
                    />

                    {status === 'completed' && (
                        <Animated.View
                            style={[
                                styles.spineTrack,
                                {
                                    top: size / 2,
                                    backgroundColor: '#70A325',
                                    zIndex: 2,
                                },
                                spineStyle,
                            ]}
                        />
                    )}

                    {status === 'current' && (
                        <Animated.View
                            style={[
                                styles.spineTrack,
                                {
                                    top: size / 2,
                                    backgroundColor: 'transparent',
                                    zIndex: 2,
                                    overflow: 'hidden',
                                },
                                gradientStyle,
                            ]}
                        >
                            <Svg width={trackWidth} height={100} style={StyleSheet.absoluteFill}>
                                <Defs>
                                    <LinearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
                                        <Stop offset="0%" stopColor="#70A325" stopOpacity="1" />
                                        <Stop offset="30%" stopColor="#70A325" stopOpacity="0.9" />
                                        <Stop offset="70%" stopColor="#70A325" stopOpacity="0.25" />
                                        <Stop offset="100%" stopColor="#70A325" stopOpacity="0" />
                                    </LinearGradient>
                                </Defs>
                                <Rect width={trackWidth} height={100} rx={trackWidth / 2} fill="url(#nodeGrad)" />
                            </Svg>
                        </Animated.View>
                    )}
                </>
            )}

            {status === 'completed' ? (
                <Animated.View style={[styles.completedOuterCircle, badgeStyle]}>
                    <View style={styles.completedInnerCircle}>
                        <Image
                            source={require('../../assets/vectors/Tick.png')}
                            style={styles.tickIcon}
                            resizeMode="contain"
                        />
                    </View>
                </Animated.View>
            ) : status === 'current' ? (
                <Animated.View style={[styles.currentNodeContainer, badgeStyle]}>
                    <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
                        <Circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke="#F2F4F7"
                            strokeWidth={strokeWidth}
                            fill="none"
                        />
                        <AnimatedCircle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke="#70A325"
                            strokeWidth={strokeWidth}
                            strokeDasharray={`${circumference * 0.82} ${circumference}`}
                            strokeLinecap="round"
                            fill="none"
                            rotation="18"
                            origin={`${size / 2}, ${size / 2}`}
                            animatedProps={arcAnimatedProps}
                        />
                    </Svg>
                    <View style={styles.currentInnerCircle}>
                        <Text weight="medium" style={styles.currentNodeNumber}>
                            {number}
                        </Text>
                    </View>
                </Animated.View>
            ) : (
                <View style={styles.lockedOuterHalo}>
                    <View style={styles.lockedInnerCircle}>
                        <Text weight="medium" style={styles.lockedNodeNumber}>
                            {number}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    nodeWrapper: {
        width: nodeSize,
        height: nodeSize,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginRight: 8,
    },
    spineTrack: {
        position: 'absolute',
        left: (nodeSize - trackWidth) / 2,
        width: trackWidth,
        borderRadius: trackWidth / 2,
    },
    completedOuterCircle: {
        width: nodeSize,
        height: nodeSize,
        borderRadius: nodeSize / 2,
        borderWidth: trackWidth,
        borderColor: '#70A325',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    completedInnerCircle: {
        width: innerNodeSize,
        height: innerNodeSize,
        borderRadius: innerNodeSize / 2,
        backgroundColor: '#70A325',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tickIcon: {
        width: 26,
        height: 20,
    },
    currentNodeContainer: {
        width: nodeSize,
        height: nodeSize,
        borderRadius: nodeSize / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        zIndex: 5,
    },
    currentInnerCircle: {
        width: innerNodeSize,
        height: innerNodeSize,
        borderRadius: innerNodeSize / 2,
        backgroundColor: '#DFECF3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentNodeNumber: {
        fontSize: 27,
        color: '#161A34',
    },
    lockedOuterHalo: {
        width: nodeSize,
        height: nodeSize,
        borderRadius: nodeSize / 2,
        borderWidth: trackWidth,
        borderColor: '#F2F4F7',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    lockedInnerCircle: {
        width: innerNodeSize,
        height: innerNodeSize,
        borderRadius: innerNodeSize / 2,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E8EBF0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lockedNodeNumber: {
        fontSize: 27,
        color: '#161A34',
    },
});

export default TimelineNode;
