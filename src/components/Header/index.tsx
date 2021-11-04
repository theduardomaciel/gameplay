import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { ReactNode } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons"

import { View, Text } from 'react-native';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
    title: string;
    action?: ReactNode;
}


// Linha 40: Se existe uma ação, então
export function Header({ title, action }: Props) {
    const { secondary100, secondary40, heading } = theme.colors
    
    const navigation = useNavigation();
    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={[secondary100, secondary40]}
        >
            <BorderlessButton onPress={handleGoBack}>
                <Feather
                    name="arrow-left"
                    size={24}
                    color={heading}
                >
                </Feather>
            </BorderlessButton>

            <Text style={styles.title}>
                { title }
            </Text>

            {
                action
                ? <View>
                    { action }
                </View>
                : <View style={ { width: 24 } } />
            }

        </LinearGradient>
    )
}