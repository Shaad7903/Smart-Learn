import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../services/NavigationService';
import Splash from '../screens/Splash';
import OnBoarding from '../screens/OnBoarding';
import LearnLetters from '../screens/LearnLetters';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="Main" component={BottomTabNavigator} />
                <Stack.Screen name="LearnLetters" component={LearnLetters} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;