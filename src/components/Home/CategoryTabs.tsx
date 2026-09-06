import React from 'react';
import {
    View,
    ScrollView,
    Pressable,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Text from '../Text';
import { PRIMARY_COLOR, TEXT_COLOR } from '../../config/themes';

export interface TabItem {
    id: string;
    label: string;
    count?: number | string;
    icon?:
    | React.ReactNode
    | ((props: { color: string; size: number }) => React.ReactNode);
}

export interface CategoryTabsProps {
    tabs?: TabItem[];
    activeTab?: string;
    onTabPress?: (tabId: string) => void;
    title?: string;
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
    tabs = [],
    activeTab,
    onTabPress,
    title,
    style,
    contentContainerStyle,
}) => {
    return (
        <View style={[styles.container, style]}>
            {title ? (
                <Text weight="medium" style={styles.title}>
                    {title}
                </Text>
            ) : null}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[styles.scrollList, contentContainerStyle]}
            >
                {tabs.map((tab) => {
                    const isSelected = activeTab === tab.id;

                    const formattedCount =
                        tab.count !== undefined
                            ? typeof tab.count === 'number' && tab.count < 10 && tab.count >= 0
                                ? `0${tab.count}`
                                : `${tab.count}`
                            : null;

                    const iconColor = isSelected ? '#FFFFFF' : PRIMARY_COLOR;
                    const iconSize = 18;

                    let renderedIcon: React.ReactNode = null;
                    if (tab.icon) {
                        if (typeof tab.icon === 'function') {
                            renderedIcon = tab.icon({ color: iconColor, size: iconSize });
                        } else if (React.isValidElement(tab.icon)) {
                            renderedIcon = React.cloneElement(tab.icon as React.ReactElement<any>, {
                                color: iconColor,
                                size: iconSize,
                            });
                        } else {
                            renderedIcon = tab.icon;
                        }
                    }

                    return (
                        <Pressable
                            key={tab.id}
                            onPress={() => onTabPress?.(tab.id)}
                            style={({ pressed }) => [
                                styles.pill,
                                isSelected ? styles.activePill : styles.inactivePill,
                                pressed && styles.pressedPill,
                            ]}
                        >
                            {renderedIcon ? (
                                <View style={styles.iconContainer}>{renderedIcon}</View>
                            ) : null}

                            <Text
                                weight="medium"
                                style={[
                                    styles.label,
                                    isSelected ? styles.activeLabel : styles.inactiveLabel,
                                ]}
                            >
                                {tab.label}
                            </Text>

                            {formattedCount !== null ? (
                                <View
                                    style={[
                                        styles.badge,
                                        isSelected ? styles.activeBadge : styles.inactiveBadge,
                                    ]}
                                >
                                    <Text
                                        weight='medium'
                                        style={[
                                            styles.badgeText,
                                            isSelected ? styles.activeBadgeText : styles.inactiveBadgeText,
                                        ]}
                                    >
                                        {formattedCount}
                                    </Text>
                                </View>
                            ) : null}
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        fontSize: 26,
        lineHeight: 28,
        color: '#080C1E',
        letterSpacing: -0.3,
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    scrollList: {
        paddingHorizontal: 20,
        gap: 10,
        alignItems: 'center',
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: 26,
        paddingLeft: 16,
        paddingRight: 6,
    },
    activePill: {
        backgroundColor: PRIMARY_COLOR,
    },
    inactivePill: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#0000000D',
    },
    pressedPill: {
        opacity: 0.75,
    },
    iconContainer: {
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        lineHeight: 20,
    },
    activeLabel: {
        color: '#FFFFFF',
    },
    inactiveLabel: {
        color: TEXT_COLOR,
    },
    badge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    activeBadge: {
        backgroundColor: '#FFFFFF',
    },
    inactiveBadge: {
        backgroundColor: '#F4F3F380',
    },
    badgeText: {
        fontSize: 13,
        lineHeight: 16,
    },
    activeBadgeText: {
        color: PRIMARY_COLOR,
    },
    inactiveBadgeText: {
        color: '#6A8282',
    },
});

export default CategoryTabs;
