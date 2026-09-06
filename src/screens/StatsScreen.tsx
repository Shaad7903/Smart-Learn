import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatsHeader, StreakCard, SkillProgressCard } from '../components';
import { BG_COLOR } from '../config/themes';

const StatsScreen = () => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatsHeader title="Analytics" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <StreakCard style={styles.streakSection} />
                <SkillProgressCard style={styles.progressSection} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default StatsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 110,
    },
    streakSection: {
        marginTop: 8,
    },
    progressSection: {
        marginTop: 16,
    },
});
