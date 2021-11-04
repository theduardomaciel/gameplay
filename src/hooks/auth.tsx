import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { SCOPE } = process.env
const { CLIENT_ID } = process.env
const { CDN_IMAGE } = process.env
const { REDIRECT_URI } = process.env
const { RESPONSE_TYPE } = process.env

import { api } from "../services/api";
import { COLLECTION_APPOINTMENTS, COLLECTION_USERS } from "..//configs/database"

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
    children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        // Caso o usuário cancele a autenticação, não haverá um access_token e um erro será retornado
        access_token?: string;
        error?: string;
    }
}

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(false);

    async function signIn() {
        try {
            setLoading(true)

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            // Primeiramente criamos uma seção por meio do AuthSession
            const { type, params } = await AuthSession
            .startAsync({ authUrl }) as AuthorizationResponse;
            
            // O usuário é redirecionado para o navegador padrão de seu dispositivo em que a API do Discord o mostrará as informações que serão utilizadas pelo app para autenticação (scope)

            // Caso tivermos sucesso no requerimento, recuperamos os dados do usuário por meio de um access token
            if (type === "success" && !params.error) {
                // Inserimos o token de acesso no cabeçalho padrão de autorização, para que todas as requisições tenham acesso às informações
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                // Adquirimos os dados do usuário por meio do diretório que tem na documentação
                const userInfo = await api.get("users/@me");
                // e realizamos algumas formatações
                const firstName = userInfo.data.username.split(" ")[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                }

                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData))
                // Enfim salvamos os dados que obtivemos no objeto do usuário
                setUser(userData);
            }
        } catch {
            throw new Error("Não foi possível autenticar.")
        } finally {
            setLoading(false)
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USERS);
    }

    async function loadUserStorageData() {
        const storage = await AsyncStorage.getItem(COLLECTION_USERS);
        if (storage) {
            const userLogged = JSON.parse(storage) as User
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`;
            setUser(userLogged);
        }
    }

    useEffect(() => {
        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            signOut
        }}>
            { children }
        </AuthContext.Provider>
    )
}

// Os hooks geralmente começam com "use", e vamos criar o nosso próprio
function useAuth() {
    const context = useContext(AuthContext);
    return context
}

export {
    AuthProvider,
    useAuth
}