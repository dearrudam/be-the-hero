import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import api from './../../services/api';

import styles from './styles';

import logoImg from './../../assets/logo.png';


export default function Incidents() {

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    const [page, setPage] = useState(1);
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    async function loadIncidents() {
        if (loading) {
            return;
        }
        if (total > 0 && incidents.length == total) {
            return;
        }
        setLoading(true);

        try {
            const response = await api.get('incidents', {
                params: { page }
            });

            setIncidents([...incidents, ...response.data]);
            setTotal(response.headers['x-total-count']);
            setPage(page + 1);

        } catch (err) {
            alert('Erro ao carregar os casos, tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} caso(s)</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um caso abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />




        </View>
    );
}