import React, { useEffect, useRef } from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    Animated,
    Easing,
    ImageSourcePropType,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRIMARY_COLOR } from '../../config/themes';

const TAB_ICONS: Record<string, ImageSourcePropType> = {
    Home: require('../../assets/vectors/Home.png'),
    AI: require('../../assets/vectors/AI.png'),
    Stats: require('../../assets/vectors/Stats.png'),
    Profile: require('../../assets/vectors/Profile.png'),
};

const tabButtonSize = 56;
const tabGap = 1;
const tabStep = tabButtonSize + tabGap;
const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    const insets = useSafeAreaInsets();
    const indicatorPosition = useRef(new Animated.Value(state.index * tabStep)).current;

    const tabAnimations = useRef(
        state.routes.map((routeItem, index) => new Animated.Value(index === state.index ? 1 : 0))
    ).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(indicatorPosition, {
                toValue: state.index * tabStep,
                duration: 280,
                easing: smoothEase,
                useNativeDriver: true,
            }),
            ...tabAnimations.map((animation, index) =>
                Animated.timing(animation, {
                    toValue: index === state.index ? 1 : 0,
                    duration: 280,
                    easing: smoothEase,
                    useNativeDriver: true,
                })
            ),
        ]).start();
    }, [state.index, indicatorPosition, tabAnimations]);

    const bottomOffset = Math.max(insets.bottom, 12) + 8;

    return (
        <View
            pointerEvents="box-none"
            style={[styles.containerWrapper, { bottom: bottomOffset }]}
        >
            <View style={styles.pillContainer}>
                <View style={styles.slotsRow} pointerEvents="none">
                    {state.routes.map((route) => (
                        <View key={`slot-${route.key}`} style={styles.slotCircle} />
                    ))}
                </View>

                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.activeIndicator,
                        {
                            transform: [{ translateX: indicatorPosition }],
                        },
                    ]}
                />

                <View style={styles.buttonsRow}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const iconSource = TAB_ICONS[route.name] ?? TAB_ICONS.Home;
                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        const activeIconOpacity = tabAnimations[index];
                        const inactiveIconOpacity = tabAnimations[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        });

                        return (
                            <Pressable
                                key={route.key}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel ?? route.name}
                                testID={options.tabBarButtonTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={styles.tabButton}
                            >
                                <Animated.Image
                                    source={iconSource}
                                    style={[
                                        styles.icon,
                                        styles.inactiveIcon,
                                        { opacity: inactiveIconOpacity },
                                    ]}
                                    resizeMode="contain"
                                />
                                <Animated.Image
                                    source={iconSource}
                                    style={[
                                        styles.icon,
                                        styles.activeIcon,
                                        styles.absoluteIcon,
                                        { opacity: activeIconOpacity },
                                    ]}
                                    resizeMode="contain"
                                />
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    pillContainer: {
        position: 'relative',
        backgroundColor: '#F4F3F3B2',
        borderRadius: 40,
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    slotsRow: {
        flexDirection: 'row',
        gap: tabGap,
    },
    slotCircle: {
        width: tabButtonSize,
        height: tabButtonSize,
        borderRadius: tabButtonSize / 2,
        backgroundColor: '#FFFFFF',
    },
    activeIndicator: {
        position: 'absolute',
        left: 8,
        top: 6,
        width: tabButtonSize,
        height: tabButtonSize,
        borderRadius: tabButtonSize / 2,
        backgroundColor: PRIMARY_COLOR,
        zIndex: 1,
    },
    buttonsRow: {
        position: 'absolute',
        left: 8,
        top: 6,
        flexDirection: 'row',
        gap: tabGap,
        zIndex: 2,
    },
    tabButton: {
        width: tabButtonSize,
        height: tabButtonSize,
        borderRadius: tabButtonSize / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    icon: {
        width: 24,
        height: 24,
    },
    absoluteIcon: {
        position: 'absolute',
    },
    activeIcon: {
        tintColor: '#FFFFFF',
    },
    inactiveIcon: {
        tintColor: PRIMARY_COLOR,
    },
});

export default CustomTabBar;
