import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButton } from "react-native-gesture-handler";
import {
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import uuid from "react-native-uuid"

import { ModalView } from '../../components/ModalView';
import { CategorySelect } from "../../components/CategorySelect";
import { Header } from '../../components/Header';
import { GuildIcon } from "../../components/GuildIcon";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";

import { Feather } from "@expo/vector-icons"
import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import { Background } from "../../components/Background";

import { COLLECTION_APPOINTMENTS } from "../../configs/database";

export function AppointmentCreate() {

    const navigation = useNavigation()

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [description, setDescription] = useState("");

    const [openGuildModal, setOpenGuildModal] = useState(false)
    function handleOpenGuilds() {
        setOpenGuildModal(true);
    }
    function handleCloseGuilds() {
        setOpenGuildModal(false);
    }

    async function HandleSave() {
        const newAppointment = {
            id: uuid.v4(),
            category,
            guild,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        };
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)

        // Verificamos se já existe algum agendamento no storage, se sim, somamos os dados que temos agora com os antigos
        const appointments = storage ? JSON.parse(storage) : [];
        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );

        navigation.navigate("Home");

    }

    const [guild, setGuild] = useState<GuildProps>({} as GuildProps)
    function handleGuildSelect(guildSelect: GuildProps) {
        setOpenGuildModal(false);
        setGuild(guildSelect);
    }

    const [category, setCategory] = useState('')
    function handleCategorySelect(categoryId: string) {
        setCategory(categoryId);
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
            style={styles.container}
        >
            <Background>
            <ScrollView>
                <Header
                    title="Agendar Partida"
                />

                <Text style={
                    [styles.label, {
                    marginLeft: 24,
                    marginTop: 36,
                    marginBottom: 18
                }]}>
                    Categoria
                </Text>

                <CategorySelect
                    hasCheckBox
                    setCategory={handleCategorySelect}
                    categorySelected={category}
                />

                <View style={styles.form}>
                    <RectButton onPress={handleOpenGuilds}>
                        <View style={styles.select}>

                            {
                                guild.icon
                                ? <GuildIcon guildId={guild.id} iconId={guild.icon} />
                                : <View style={styles.image} />
                            }
                            

                            <View style={styles.selectBody}>
                                <Text style={styles.label}>
                                    { guild.name ? guild.name : "Selecione um servidor"}
                                </Text>
                            </View>

                            <Feather
                                name="chevron-right"
                                color={theme.colors.heading}
                                size={18}
                            />

                        </View>
                    </RectButton>

                    <View style={styles.field}>
                        <View>
                            <Text style={[styles.label, { marginBottom: 12 }]}>
                                Data
                            </Text>

                            <View style={styles.column}>
                                <Input
                                    maxLength={2}
                                    keyboardType="numeric"
                                    onChangeText={setDay}
                                />
                                <Text style={styles.divider}>
                                    /
                                </Text>
                                <Input
                                    maxLength={2}
                                    keyboardType="numeric"
                                    onChangeText={setMonth}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={[styles.label, { marginBottom: 12 }]}>
                                Horário
                            </Text>

                            <View style={styles.column}>
                                <Input
                                    maxLength={2}
                                    keyboardType="numeric"
                                    onChangeText={setHour}
                                />
                                <Text style={styles.divider}>
                                    :
                                </Text>
                                <Input
                                    maxLength={2}
                                    keyboardType="numeric"
                                    onChangeText={setMinute}
                                />
                            </View>
                        </View>   
                    </View>

                    <View style={[styles.field, { marginBottom: 12 }]}>
                        <Text style={styles.label}>
                            Descrição
                        </Text>
                        <Text style={styles.description}>
                            100 caracteres no máximo
                        </Text>
                    </View>
                        <Input
                            onChangeText={setDescription}
                            multiline
                            autoCorrect={false}
                            maxLength={100}
                            numberOfLines={5}
                            height={95}
                            width={"100%"}
                        />
                    <View style={styles.footer}>
                        <Button title="Agendar" onPress={HandleSave} />
                    </View>
                </View>
            </ScrollView>
            </Background>
            <ModalView visible={openGuildModal} closeModal={handleCloseGuilds} >
                <Guilds handleGuildSelect={handleGuildSelect} />
            </ModalView>
        </KeyboardAvoidingView>
    )
}