import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/core";


import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";

import { styles } from "./styles";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { Background } from "../../components/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";

export function Home() {
    const [loading, setLoading] = useState(true);

    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if (category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage)
        }
        setLoading(false)
    }

    const [category, setCategory] = useState('')
    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
        /* if (categoryId === category) {
            setCategory("")
        } else {
            setCategory(categoryId)
        } */
    }

    const navigation = useNavigation()
    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate("AppointmentDetails", { guildSelected });
    }

    function handleAppointmentCreate() {
        navigation.navigate("AppointmentCreate");
    }
    
    useFocusEffect(useCallback(() => {
        loadAppointments();
    },[category]));

    return (
        // A FlatList é mais performática e indicada quando se há muitos elementos em uma lista, pois, diferente de uma ScrollView ela não renderiza todos os elementos de uma vez só, mas sim, somente os que estão visíveis no momento
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd
                    onPress={handleAppointmentCreate}
                />
            </View>
            
            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            {
                loading ? <Load /> :
                <>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle={`Total: ${appointments.length}`}
                    />
                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointment
                                data={item}
                                onPress={() => handleAppointmentDetails(item)}
                            />
                        )}
                        contentContainerStyle={{ paddingBottom: 69 }}
                        ItemSeparatorComponent={() => <ListDivider />}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            }
        </Background>
    );
}