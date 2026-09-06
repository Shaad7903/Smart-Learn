import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, Easing } from 'react-native-reanimated';
import { StatsHeader, StreakCard, SkillProgressCard } from '../components';
import { BG_COLOR } from '../config/themes';

const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);

const StatsScreen = () => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Animated.View entering={FadeIn.duration(280)}>
                <StatsHeader title="Analytics" />
            </Animated.View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Animated.View entering={FadeInDown.delay(60).duration(340).easing(smoothEase)}>
                    <StreakCard style={styles.streakSection} />
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(120).duration(360).easing(smoothEase)}>
                    <SkillProgressCard style={styles.progressSection} />
                </Animated.View>
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
