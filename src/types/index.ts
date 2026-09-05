export type RootStackParamList = {
    Splash: undefined;
    OnBoarding: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
