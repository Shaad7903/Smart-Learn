import { createNavigationContainerRef, CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '../types';


export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
    ...args: RootStackParamList[RouteName] extends undefined
        ? [name: RouteName] | [name: RouteName, params: undefined]
        : [name: RouteName, params: RootStackParamList[RouteName]]
) {
    if (navigationRef.isReady()) {
        (navigationRef.navigate as any)(...args);
    }
}

export function reset<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName]
) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name, params }],
            })
        );
    }
}

export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
}
