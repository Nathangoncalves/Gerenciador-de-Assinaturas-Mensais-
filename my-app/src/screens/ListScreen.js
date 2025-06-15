import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, TouchableOpacity, Text } from 'react-native-web';
import { onSubscriptionsSnapshot, deleteSubscription } from '../services/subscriptionService';
import { Alert } from 'react-native';

export default function ListScreen({ navigation }) {
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        const unsub = onSubscriptionsSnapshot(setSubs);
        return unsub;
    }, []);

    const confirmDelete = (id) => {
        Alert.alert('Excluir?', 'Confirma exclusão?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'OK', onPress: () => deleteSubscription(id) }
        ]);
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
            data={subs}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                style={{
                    padding: 12, 
                    borderBottomWidth: 1,
                    borderColor: '#ddd',
                    marginBottom: 4
                }}
                onPress={() => 
                    navigation.navigate('Add', {subsciption: item })
                }
                onLongPress={() => confirmDelete(item.id)} 
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {item.nome}
                    </Text>
                    <Text>R$ {item.valor.toFixed(2)}</Text>
                    <Text style={{ color: '#555' }}>
                        {new Date(item.dataRenovacao.seconds * 1000).toLocaleDateString}
                    </Text>
                </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    Nenhuma assinatura cadastrada.
                </Text>
                )}
            />
        </View>
    );
}