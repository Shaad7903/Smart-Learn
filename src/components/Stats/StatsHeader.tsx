import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Pressable,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Text from '../Text';

export interface StatsHeaderProps {
    title?: string;
    onPressNotification?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({
    title = 'Analytics',
    onPressNotification,
    style,
}) => {
    return (
        <View style={[styles.header, style]}>
            <Text weight="semiBold" style={styles.title}>
                {title}
            </Text>

            <Pressable
                style={({ pressed }) => [
                    styles.notificationButton,
                    pressed && styles.notificationButtonPressed,
                ]}
                onPress={onPressNotification}
            >
                <Image
                    source={require('../../assets/vectors/notification.png')}
                    style={styles.notificationIcon}
                    resizeMode="contain"
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 12,
    },
    title: {
        fontSize: 28,
        lineHeight: 34,
        letterSpacing: -0.4,
        color: '#080C1E',
    },
    notificationButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F6F7F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationButtonPressed: {
        opacity: 0.75,
    },
    notificationIcon: {
        width: 22,
        height: 22,
    },
});

export default StatsHeader;
