import 'react-native-gesture-handler';
import React from "react";
import { StatusBar, LogBox } from "react-native";

LogBox.ignoreLogs(["You are not currently signed in to Expo on your development machine."]);

import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';

import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter"
import { Rajdhani_500Medium, Rajdhani_700Bold } from "@expo-google-fonts/rajdhani"

import { Background } from "./src/components/Background";

import { Routes } from "./src/routes"
import { AuthProvider } from './src/hooks/auth';

export default function App() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Rajdhani_500Medium,
        Rajdhani_700Bold
    });
    if (!fontsLoaded) {
        return <AppLoading />
    }
    return ( // O <> é chamado de fragment, que serve como uma caixa que agrupa vários elementos
        <Background>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </Background>
    );
}