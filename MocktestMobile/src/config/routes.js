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
            >
                <Stack.Screen
                    name="LandingScreen"
                    component={LandingScreen}
                    options={{
                        title: 'Mock Test',
                        headerStyle: {
                            backgroundColor: '#282c34',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="TestScreen"
                    component={TestScreen}
                    options={{
                        title: 'Mock Test',
                        headerLeft: null,
                        headerStyle: {
                            backgroundColor: '#282c34',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="ResultScreen"
                    component={ResultScreen}
                    options={{
                        title: 'Leaderboard',
                        headerLeft: null,
                        headerStyle: {
                            backgroundColor: '#282c34',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}