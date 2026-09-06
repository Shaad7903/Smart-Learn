import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Pressable,
    ImageSourcePropType,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Text from '../Text';
import { TEXT_COLOR } from '../../config/themes';

export interface HomeHeaderProps {
    name?: string;
    greeting?: string;
    avatarSource?: ImageSourcePropType;
    selectedLanguage?: string;
    flagSource?: ImageSourcePropType;
    onPressLanguage?: () => void;
    onPressNotification?: () => void;
    onPressAvatar?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
    name = 'Max',
    greeting = 'Good Morning',
    avatarSource = require('../../assets/images/AvatarImage.png'),
    selectedLanguage = 'English',
    flagSource = require('../../assets/vectors/English.png'),
    onPressLanguage,
    onPressNotification,
    onPressAvatar,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Pressable
                    onPress={onPressAvatar}
                    disabled={!onPressAvatar}
                >
                    <Image
                        source={avatarSource}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                </Pressable>

                <View style={styles.textContainer}>
                    <Text weight="medium" style={styles.greetingSubtitle}>
                        Hello {name} 👋
                    </Text>
                    <Text weight="medium" style={styles.greetingTitle}>
                        {greeting}
                    </Text>
                </View>
            </View>

            <View style={styles.actionsSection}>
                <Pressable
                    style={styles.languagePill}
                    onPress={onPressLanguage}
                >
                    <Image
                        source={flagSource}
                        style={styles.flagIcon}
                        resizeMode="cover"
                    />
                    <Text weight="medium" style={styles.languageText}>{selectedLanguage}</Text>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M6 9L12 15L18 9"
                            stroke="#1C274C"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </Pressable>

                <Pressable
                    style={styles.notificationButton}
                    onPress={onPressNotification}
                >
                    <Image
                        source={require('../../assets/vectors/notification.png')}
                        style={styles.notificationIcon}
                        resizeMode="contain"
                    />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    textContainer: {
        justifyContent: 'center',
    },
    greetingSubtitle: {
        fontSize: 12,
        lineHeight: 16,
        color: '#708892',
    },
    greetingTitle: {
        fontSize: 15,
        lineHeight: 20,
        color: TEXT_COLOR,
    },
    actionsSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    languagePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F7F9',
        borderRadius: 28,
        paddingHorizontal: 12,
        paddingVertical: 12,
        gap: 6,
    },
    flagIcon: {
        width: 18,
        height: 18,
        borderRadius: 9,
    },
    languageText: {
        fontSize: 13,
        color: TEXT_COLOR,
    },
    notificationButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F6F7F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationIcon: {
        width: 22,
        height: 22,
    },
});

export default HomeHeader;
