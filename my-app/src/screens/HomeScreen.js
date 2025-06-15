import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { onSubscriptionsSnapshot } from '../services/subscriptionService';

export default function HomeScreen({ navigation }) {
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        const unsubscribe = onSubscriptionsSnapshot(setSubs);
        return () => unsubscribe();
    }, []);

    const total = subs.reduce((sum , s) => sum + s.valor, 0);
    const next0nes = subs.slice(0, 5);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 24 }}> Gasto Total: R$ {total.toFixed(2)}</Text>
            <Text style={{ marginTop: 16, fontSize: 18 }}>Próximas renovações:</Text>
            <FlatList 
            data={next0nes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={{ padding: 8 }}>
                    <Text>{item.nome} - R$ {item.valor.toFixed(2)}</Text>
                    <Text>{new Date(item.dataRenovacao.seconds * 1000).toLocaleDateString()}</Text>        
        </View>
    )}
    ListEmptyComponent={() => (
        <Text style={{ textAlign: 'center' , marginTop: 20 }}>Nenhuma assinatura cadastrada.</Text>
    )}
/>
    <TouchableOpacity
    style={{ position: 'absolute', bottom: 32, right: 32, backgroundColor: '#0066CC', padding: 16, borderRadius: 32 }}
    onPress={() => navigation.navigate('Add')}
    >
        <Text style={{ color: '#fff', fontSize: 24 }}>+</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('List')} style={{ marginTop: 16 }}>
        <Text>Ver todas assinaturas</Text>
    </TouchableOpacity>
    </View>
    );
}