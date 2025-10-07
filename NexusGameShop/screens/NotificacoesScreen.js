import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const notifications = [
    { id: '1', title: 'Bem-vindo!', message: 'Obrigado por usar o NexusGameShop.' },
    { id: '2', title: 'Promoção!', message: 'Confira nossas ofertas especiais de hoje.' },
];

const NotificacoesScreen = () => {
    const renderItem = ({ item }) => (
        <View style={styles.notification}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notificações</Text>
            <FlatList
                data={notifications}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.empty}>Nenhuma notificação encontrada.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    notification: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
        color: '#555',
    },
    empty: {
        textAlign: 'center',
        marginTop: 32,
        color: '#888',
    },
});

export default NotificacoesScreen;