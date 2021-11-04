import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import * as Linking from "expo-linking"

import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from "react-native";

import { Background } from '../../components/Background';
import { ListHeader } from "../../components/ListHeader";
import { Header } from '../../components/Header';

import BannerImg from "../../assets/banner.png"

import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons"

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { AppointmentProps } from "../../components/Appointment";
import { Load } from "../../components/Load";

import { api } from "../../services/api";

type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}

export function AppointmentDetails() {
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const { guildSelected } = route.params as Params;

    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        } catch (error) {
            Alert.alert(`Opa, parece que algo não rolou como o esperado.`, `Este servidor não possui a função de Widget habilitada nas configurações, portanto, não é possível acessar as informações de jogadores.`)
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation() {
        if (widget.instant_invite) {
            const message = Platform.OS === "ios"
                ? `Junte-se a ${guildSelected.guild.name}`
                : widget.instant_invite
            console.log(widget.instant_invite)
            Share.share({
                message,
                url: widget.instant_invite
            });
        } else {
            Alert.alert(`Opa, parece que algo não rolou como o esperado.`, `Seu servidor não possui um link gerado para comparilhamento.\nSendo assim, não é possível enviar um convite :(`)
        }
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuildWidget();
    }, [])

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    widget.instant_invite &&
                    <BorderlessButton onPress={handleShareInvitation}>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        { guildSelected.guild.name }
                    </Text>

                    <Text style={styles.subtitle}>
                        { guildSelected.description }
                    </Text>
                </View>
            </ImageBackground>
            
            {
                loading ? <Load /> :
                widget.members ?
                <>
                <ListHeader
                    title="Jogadores"
                    subtitle={`Total: ${widget.members.length}`}
                />

                <FlatList
                    data={widget.members}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Member
                            data={ item }
                        />
                    )}
                    ItemSeparatorComponent={() => <ListDivider />}
                    style={styles.members}
                >

                </FlatList>
                <View style={styles.footer}>
                {
                    widget.instant_invite &&                   
                    <ButtonIcon
                    title={"Entrar na partida"}
                    activeOpacity={0.7}
                    onPress={handleOpenGuild} />
                }
                </View>
            </>
                : console.log("O servidor não possui as configurações necessárias.")
            }
            
        </Background>
    )
}