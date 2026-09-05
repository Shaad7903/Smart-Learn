import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    HomeHeader,
    AIBuddyCard,
    CategoryTabs,
    TabItem,
    Text,
    LearningCardsList,
    LearningCardData,
} from '../components';
import { BG_COLOR } from '../config/themes';
import { Palette, Shapes } from 'lucide-react-native';

const AaIcon = ({ color, size = 18 }: { color?: string; size?: number }) => (
    <Text weight="bold" style={{ fontSize: size, color, lineHeight: size + 2, letterSpacing: -2 }}>
        Aa
    </Text>
);

const CATEGORIES: TabItem[] = [
    {
        id: 'all',
        label: 'All',
        count: 12,
    },
    {
        id: 'letters',
        label: 'Letters',
        count: 3,
        icon: ({ color, size }) => <AaIcon color={color} size={size} />,
    },
    {
        id: 'colors',
        label: 'Colors',
        count: 4,
        icon: ({ color, size }) => <Palette size={size} color={color} strokeWidth={2.2} />,
    },
    {
        id: 'shapes',
        label: 'Shapes',
        count: 6,
        icon: ({ color, size }) => <Shapes size={size} color={color} strokeWidth={2.2} />,
    },
];

const LEARNING_CARDS: LearningCardData[] = [
    {
        id: 'colors',
        category: 'Colors',
        categoryColor: '#7C679E',
        backgroundColor: '#E8DCFF',
        title: 'Learn colors\nwith objects',
        lessonsCount: 12,
        durationMinutes: 10,
        illustrationSource: require('../assets/images/ColorCard.png'),
        icon: <Palette size={20} color="#161A34" strokeWidth={2} />,
    },
    {
        id: 'letters',
        category: 'Letters',
        categoryColor: '#728527',
        backgroundColor: '#E2F38C',
        title: 'Learn with\nfun sounds',
        lessonsCount: 8,
        durationMinutes: 15,
        illustrationSource: require('../assets/images/LettersCard_Image.png'),
        icon: (
            <Text weight="bold" style={{ fontSize: 18, color: '#161A34', letterSpacing: -1 }}>
                Aa
            </Text>
        ),
    },
];

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <HomeHeader
                name="Max"
                greeting="Good Morning"
                selectedLanguage="English"
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <AIBuddyCard />

                <CategoryTabs
                    title="Let’s learn"
                    tabs={CATEGORIES}
                    activeTab={selectedCategory}
                    onTabPress={setSelectedCategory}
                    style={styles.tabsSection}
                />

                <LearningCardsList
                    cards={LEARNING_CARDS}
                    style={styles.cardsSection}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    scrollContent: {
        paddingBottom: 110, // Leave room for floating bottom tab bar
    },
    tabsSection: {
        marginTop: 24,
    },
    cardsSection: {
        marginTop: 18,
    },
});
