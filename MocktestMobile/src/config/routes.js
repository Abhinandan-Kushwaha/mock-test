import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from '../screens/LandingScreen';
import TestScreen from '../screens/TestScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen
                    name="LandingScreen"
                    component={LandingScreen}
                    options={{
                        animationEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="TestScreen"
                    component={TestScreen}
                    options={{
                        animationEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="ResultScreen"
                    component={ResultScreen}
                    options={{
                        animationEnabled: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}