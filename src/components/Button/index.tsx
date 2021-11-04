import React from "react";

import { Text } from "react-native"
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from "./styles";

/* interface Props {
    title?: string; // A ? faz com que o elemento não seja obrigatório
} ou */
type Props = RectButtonProps & {
    title: string
}

// Precisamos que o botão entenda que ela possui todas as nossas propriedades personalizadas, assim como as padrões do Touchable Opacity, por isso, utilizamos ...rest
export function Button({ title, ...rest } : Props) {
    return ( // A propriedade "activeOpacity" influencia na opacidade do botão ao ser pressionado
        <RectButton style={styles.container} {...rest}>
            <Text style={styles.title}>
                { title }
            </Text>
        </RectButton>
    )
}