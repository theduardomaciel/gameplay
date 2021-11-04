import React from "react";
//import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Text, Image, View, TouchableOpacity, TouchableOpacityProps } from "react-native"

import DiscordImage from "..//..//assets/discord.png"
import { styles } from "./styles";

/* interface Props {
    title?: string;
} ou */
type Props = TouchableOpacityProps & {
    // A ? faz com que o elemento não seja obrigatório
    title: string
}

// Precisamos que o botão entenda que ele possui todas as nossas propriedades personalizadas, assim como as padrões do Touchable Opacity, por isso, utilizamos ...rest
export function ButtonIcon({ title, ...rest } : Props) {
    return ( // A propriedade "activeOpacity" influencia na opacidade do botão ao ser pressionado
        <TouchableOpacity
            style={styles.container}
            /** Colocamos a propriedade "...rest" para passar ao botão todas as propriedades restantes que pertencem a ele */
            {...rest}
        >
            <View style={styles.iconWrapper}>
                <Image source={DiscordImage} style={styles.icon} />
            </View>

            <Text style={styles.title}>
                { title }
            </Text>
        </TouchableOpacity>
    )
}