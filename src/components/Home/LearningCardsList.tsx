import React from 'react';
import {
    ScrollView,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native';
import LearningCard, { LearningCardData } from './LearningCard';
import CardConnector from './CardConnector';

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
                    <React.Fragment key={card.id}>
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
                    </React.Fragment>
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
});

export default LearningCardsList;
