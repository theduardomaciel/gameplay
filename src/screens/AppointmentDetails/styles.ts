import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

import { getBottomSpace } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    members: {
        marginLeft: 27,
        marginTop: 24  
    },
    banner: {
        width: "100%",
        height: 234,
        justifyContent: "flex-end",
    },
    bannerContent: {
        // flex: 1,
        // justifyContent: "flex-end",
        paddingHorizontal: 24,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 21,
        fontFamily: theme.fonts.text400,
        color: theme.colors.heading
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        marginBottom: getBottomSpace()
    }
});