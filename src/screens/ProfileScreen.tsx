import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components';
import { BG_COLOR, PRIMARY_COLOR, TYPOGRAPHY } from '../config/themes';

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.subtitle}>Manage your account and preferences.</Text>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    title: {
        ...TYPOGRAPHY.h2,
        color: PRIMARY_COLOR,
        marginBottom: 8,
    },
    subtitle: {
        ...TYPOGRAPHY.bodyMedium,
        color: '#666666',
        textAlign: 'center',
    },
});
