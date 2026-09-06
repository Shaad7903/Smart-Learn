export type RootStackParamList = {
    Splash: undefined;
    OnBoarding: undefined;
    Main: undefined;
    Home?: undefined;
    LearnLetters: undefined;
};

export type BottomTabParamList = {
    Home: undefined;
    AI: undefined;
    Stats: undefined;
    Profile: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export type LessonStatus = 'completed' | 'current' | 'locked';

export interface ProgressRingProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    trackColor?: string;
}

export interface TimelineNodeProps {
    status: LessonStatus;
    number: number;
    isFirst: boolean;
    isLast: boolean;
    index?: number;
    completedCount?: number;
}

export interface LessonStep {
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    duration: string;
    actionText: string;
    backgroundColor: string;
    status: LessonStatus;
}

export type { TextProps } from '../components/Text';
export type { ButtonProps } from '../components/shared/Button';
export type { OnboardingCardProps } from '../components/Onboarding/OnboardingCard';
export type { OnboardingBackCardProps, CardSize } from '../components/Onboarding/OnboardingBackCard';
export type { HomeHeaderProps } from '../components/Home/HomeHeader';
export type { AIBuddyCardProps } from '../components/Home/AIBuddyCard';
export type { CategoryTabsProps, TabItem } from '../components/Home/CategoryTabs';
export type { LearningCardProps, LearningCardData } from '../components/Home/LearningCard';
export type { LearningCardsListProps } from '../components/Home/LearningCardsList';
export type { CardConnectorProps } from '../components/Home/CardConnector';
export type { StatsHeaderProps } from '../components/Stats/StatsHeader';
export type { StreakCardProps, DayProgress } from '../components/Stats/StreakCard';
export type { SkillProgressCardProps, BarData } from '../components/Stats/SkillProgressCard';
export type { LessonCardProps } from '../components/Learn/LessonCard';
export type { FontWeight } from '../config/themes';
