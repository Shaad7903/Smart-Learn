import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
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

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    const insets = useSafeAreaInsets();

    const bottomOffset = Math.max(insets.bottom, 12) + 8;

    return (
        <View
            pointerEvents="box-none"
            style={[styles.containerWrapper, { bottom: bottomOffset }]}
        >
            <View style={styles.pillContainer}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const { options } = descriptors[route.key];

                    const iconSource = TAB_ICONS[route.name] ?? TAB_ICONS.Home;

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

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel ?? route.name}
                            testID={options.tabBarButtonTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            activeOpacity={0.8}
                            style={[
                                styles.tabButton,
                                isFocused ? styles.activeTabButton : styles.inactiveTabButton,
                            ]}
                        >
                            <Image
                                source={iconSource}
                                style={[
                                    styles.icon,
                                    isFocused ? styles.activeIcon : styles.inactiveIcon,
                                ]}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    );
                })}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F3F3B2',
        borderRadius: 40,
        paddingHorizontal: 8,
        paddingVertical: 6,
        gap: 1,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.04)',
    },
    tabButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTabButton: {
        backgroundColor: PRIMARY_COLOR,
    },
    inactiveTabButton: {
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width: 24,
        height: 24,
    },
    activeIcon: {
        tintColor: '#FFFFFF',
    },
    inactiveIcon: {
        tintColor: PRIMARY_COLOR,
    },
});

export default CustomTabBar;
