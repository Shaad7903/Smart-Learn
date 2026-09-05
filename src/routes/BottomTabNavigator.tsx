import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types';
import CustomTabBar from '../components/Navigation/CustomTabBar';
import Home from '../screens/Home';
import AIScreen from '../screens/AIScreen';
import StatsScreen from '../screens/StatsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={renderTabBar}
            screenOptions={{
                headerShown: false,
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
