import React, { useState, useMemo } from 'react';
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
import { navigate } from '../services/NavigationService';
import Animated, {
    FadeIn,
    FadeInDown,
    LinearTransition,
} from 'react-native-reanimated';

const AaIcon = ({ color, size = 18 }: { color?: string; size?: number }) => (
    <Text weight="bold" style={{ fontSize: size, color, lineHeight: size + 2, letterSpacing: -2 }}>
        Aa
    </Text>
);

const CATEGORY_CONFIGS: Omit<TabItem, 'count'>[] = [
    {
        id: 'all',
        label: 'All',
        icon: ({ color, size }) => <Shapes size={size} color={color} strokeWidth={2.2} />,
    },
    {
        id: 'letters',
        label: 'Letters',
        icon: ({ color, size }) => <AaIcon color={color} size={size} />,
    },
    {
        id: 'colors',
        label: 'Colors',
        icon: ({ color, size }) => <Palette size={size} color={color} strokeWidth={2.2} />,
    },
    {
        id: 'shapes',
        label: 'Shapes',
        icon: ({ color, size }) => <Shapes size={size} color={color} strokeWidth={2.2} />,
    },
];

const LEARNING_CARDS: LearningCardData[] = [
    {
        id: 'colors',
        category: 'Colors',
        categoryColor: '#9881B3',
        backgroundColor: '#E5CDFF',
        title: 'Learn colors\nwith objects',
        lessonsCount: 12,
        durationMinutes: 10,
        illustrationSource: require('../assets/images/ColorCard.png'),
        icon: <Palette size={20} color="#2B3556" strokeWidth={2} />,
    },
    {
        id: 'letters',
        category: 'Letters',
        categoryColor: '#708892',
        backgroundColor: '#E1F18C',
        title: 'Learn with\nfun sounds',
        lessonsCount: 8,
        durationMinutes: 15,
        illustrationSource: require('../assets/images/LettersCard_Image.png'),
        icon: (
            <Text weight="bold" style={{ fontSize: 18, color: '#161A34', letterSpacing: -2 }}>
                Aa
            </Text>
        ),
        onPressCard: () => navigate('LearnLetters'),
        onPressStart: () => navigate('LearnLetters'),
    },
];

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = useMemo<TabItem[]>(() => {
        return CATEGORY_CONFIGS.map((categoryConfig) => {
            if (categoryConfig.id === 'all') {
                return {
                    ...categoryConfig,
                    count: LEARNING_CARDS.length,
                };
            }
            const count = LEARNING_CARDS.filter(
                (card) =>
                    card.id.toLowerCase() === categoryConfig.id.toLowerCase() ||
                    card.category.toLowerCase() === categoryConfig.id.toLowerCase()
            ).length;

            return {
                ...categoryConfig,
                count,
            };
        });
    }, []);

    const filteredCards = useMemo(() => {
        if (selectedCategory === 'all') {
            return LEARNING_CARDS;
        }
        return LEARNING_CARDS.filter(
            (card) =>
                card.id.toLowerCase() === selectedCategory.toLowerCase() ||
                card.category.toLowerCase() === selectedCategory.toLowerCase()
        );
    }, [selectedCategory]);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Animated.View entering={FadeIn.duration(250)}>
                <HomeHeader
                    name="Max"
                    greeting="Good Morning"
                    selectedLanguage="English"
                />
            </Animated.View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Animated.View entering={FadeInDown.duration(300)}>
                    <AIBuddyCard />
                </Animated.View>

                <Animated.View entering={FadeInDown.duration(300)}>
                    <CategoryTabs
                        title="Let’s learn"
                        tabs={categories}
                        activeTab={selectedCategory}
                        onTabPress={setSelectedCategory}
                        style={styles.tabsSection}
                    />
                </Animated.View>

                <Animated.View layout={LinearTransition.duration(220)}>
                    <LearningCardsList
                        cards={filteredCards}
                        style={styles.cardsSection}
                    />
                </Animated.View>
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
        paddingBottom: 110,
    },
    tabsSection: {
        marginTop: 24,
    },
    cardsSection: {
        marginTop: 18,
    },
});
