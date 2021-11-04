import React from "react"

import { TextInput, TextInputProps } from "react-native"

type Props = TextInputProps & {
    width?: string | number;
    height?: number | string;
}

import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.secondary40,
        color: theme.colors.heading,
        fontFamily: theme.fonts.text400,
        fontSize: 13,
        marginRight: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.secondary50,
        paddingHorizontal: 16,
        paddingTop: 16,
        textAlignVertical: "top",
    },
})

export function Input({ width, height, ...rest }: Props) {
    return (
        <TextInput
            style={[styles.container, { width: width ? width : 48, height: height ? height : 48 }]}
            {...rest}
        />
    );
}