export type RootStackParamList = {
    Splash: undefined;
    OnBoarding: undefined;
    Main: undefined;
    Home?: undefined;
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
