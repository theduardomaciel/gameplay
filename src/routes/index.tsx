import React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { useAuth } from "../hooks/auth";

import { SignIn } from "../screens/SignIn";

export function Routes() {
    const { user } = useAuth();
    return (
        // Caso já haja um usuário cadastrado, o usuário está logado, caso não, redirecionaremos-o para a tela de login
        <NavigationContainer
            theme={{ colors: { background: 'transparent' } as any } as Theme}
        >
            {user.id ? <AppRoutes /> : <SignIn /> }
        </NavigationContainer>
    )
}