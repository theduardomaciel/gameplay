import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";

import { ButtonIcon } from "../../components/ButtonIcon";

import IllustrationImage from "../../assets/illustration.png"
import { styles } from "./styles";
import { Background } from "../../components/Background";

import { useAuth } from "../../hooks/auth";
import { theme } from "../../global/styles/theme";

export function SignIn() {
    // Dentro de nosso hook próprio (useAuth) temos diversos elementos que fazem parte do nosso Context
    const { user, loading, signIn } = useAuth();
    console.log(user)

    // Este evento está sendo executado por meio da função onPress do botão
    async function handleSignIn() {
        try {
            // A função "signIn" é assíncrona, ou seja, demanda de tempo para funcionar e foi determinada na pasta hooks, na parte de autenticação
            await signIn()
        } catch (error) {
            console.log(error)
        }
    }

    // Utilizamos os "states" para determinar valores que podem ser atualizados e precisam ser renderizados em tempo real em outro local
    // const [text, setText] = useState("")

    return (
        <Background>
            <View style={styles.container}>
                
                <Image source={IllustrationImage} style={styles.image} />
            
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se {"\n"}
                        e organize suas jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {"\n"}
                        favoritos com seus amigos
                    </Text>

                    {
                        loading ? <ActivityIndicator color={theme.colors.primary} /> :
                        <ButtonIcon
                            title="Entrar com Discord"
                            activeOpacity={0.7}
                            onPress={handleSignIn}
                        />
                    }
                </View>
            </View>
        </Background>
    );
}