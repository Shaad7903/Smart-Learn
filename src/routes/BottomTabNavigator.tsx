import React from 'react';
import { Dimensions, Easing } from 'react-native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types';
import CustomTabBar from '../components/Navigation/CustomTabBar';
import Home from '../screens/Home';
import AIScreen from '../screens/AIScreen';
import StatsScreen from '../screens/StatsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const { width: screenWidth } = Dimensions.get('window');
const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={renderTabBar}
            screenOptions={{
                headerShown: false,
                animation: 'shift',
                transitionSpec: {
                    animation: 'timing',
                    config: {
                        duration: 320,
                        easing: smoothEase,
                    },
                },
                sceneStyleInterpolator: ({ current }) => ({
                    sceneStyle: {
                        opacity: current.progress.interpolate({
                            inputRange: [-1, -0.5, 0, 0.5, 1],
                            outputRange: [0, 0.8, 1, 0.8, 0],
                        }),
                        transform: [
                            {
                                translateX: current.progress.interpolate({
                                    inputRange: [-1, 0, 1],
                                    outputRange: [-screenWidth * 0.45, 0, screenWidth * 0.45],
                                }),
                            },
                        ],
                    },
                }),
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="AI" component={AIScreen} />
            <Tab.Screen name="Stats" component={StatsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
