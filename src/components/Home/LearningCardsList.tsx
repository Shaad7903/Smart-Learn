import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native';
import LearningCard, { LearningCardData } from './LearningCard';
import CardConnector from './CardConnector';
import Text from '../Text';
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from 'react-native-reanimated';

export interface LearningCardsListProps {
    cards: LearningCardData[];
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const LearningCardsList: React.FC<LearningCardsListProps> = ({
    cards,
    style,
    contentContainerStyle,
}) => {
    if (cards.length === 0) {
        return (
            <View style={[styles.container, styles.emptyContainer, style]}>
                <Text weight="medium" style={styles.emptyText}>
                    No lessons available in this category yet.
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            style={[styles.container, style]}
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        >
            {cards.map((card, index) => {
                const isLast = index === cards.length - 1;
                const nextCard = !isLast ? cards[index + 1] : null;

                return (
                    <Animated.View
                        key={card.id}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(150)}
                        layout={LinearTransition.duration(200)}
                        style={styles.cardItemRow}
                    >
                        <LearningCard
                            data={card}
                            isLast={isLast}
                        />
                        {nextCard && (
                            <CardConnector
                                leftColor={card.backgroundColor}
                                rightColor={nextCard.backgroundColor}
                            />
                        )}
                    </Animated.View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    cardItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emptyContainer: {
        paddingHorizontal: 24,
        paddingVertical: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#708892',
    },
});

export default LearningCardsList;
