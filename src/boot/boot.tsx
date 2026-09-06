import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from '../routes';

const Boot = () => {
    return (
        <SafeAreaProvider>
            <View style={{ flex: 1 }}>
                <Routes />
            </View>
        </SafeAreaProvider>
    );
};

export default Boot;
